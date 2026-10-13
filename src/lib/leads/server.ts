const MAX_BODY_BYTES = 32_000;
const DEFAULT_TIMEOUT_MS = 5_000;
const RESEND_API_URL = "https://api.resend.com/emails";

const LEAD_TYPES = new Set([
  "buyer-questionnaire",
  "custom-search",
  "first-time-checklist",
  "military-checklist",
  "relocation-checklist",
]);

const STRING_FIELDS = {
  leadType: { required: true, maxLength: 80 },
  name: { required: true, maxLength: 120 },
  email: { required: true, maxLength: 254 },
  phone: { required: false, maxLength: 50 },
  outOfArea: { required: false, maxLength: 40 },
  currentLocation: { required: false, maxLength: 160 },
  timeline: { required: false, maxLength: 80 },
  budget: { required: false, maxLength: 80 },
  preferredAreas: { required: false, maxLength: 500 },
  vaFinancing: { required: false, maxLength: 40 },
  firstTimeBuyer: { required: false, maxLength: 40 },
  lenderIntro: { required: false, maxLength: 40 },
  message: { required: false, maxLength: 4_000 },
} as const;

type LeadPayload = Partial<Record<keyof typeof STRING_FIELDS, string>> & {
  leadType: string;
  name: string;
  email: string;
  priorities?: string[];
};

type LeadLogger = Pick<Console, "info" | "warn" | "error">;
type LeadFetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

type LeadHandlerOptions = {
  getResendConfig?: () => ResendConfig;
  fetchImpl?: LeadFetch;
  logger?: LeadLogger;
  timeoutMs?: number;
};

type ResendConfig = {
  apiKey?: string;
  from?: string;
  to: string;
};

class InvalidLeadError extends Error {}

function jsonError(status: number, code: string, message: string) {
  return Response.json(
    { success: false, error: { code, message } },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function getIdempotencyKey(request: Request) {
  const supplied = request.headers.get("idempotency-key");
  if (supplied === null) return globalThis.crypto.randomUUID();

  const requestId = supplied.trim();
  if (!/^[A-Za-z0-9._:-]{16,128}$/.test(requestId)) {
    throw new InvalidLeadError("Invalid idempotency key");
  }

  return requestId;
}

function getDefaultResendConfig(): ResendConfig {
  return {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.RESEND_FROM_EMAIL,
    to: process.env.LEAD_NOTIFICATION_EMAIL ?? "",
  };
}

function getConfiguredResend(config: ResendConfig) {
  const apiKey = config.apiKey?.trim();
  const from = config.from?.trim();
  const to = config.to.trim();
  if (!apiKey || !from || !isEmailAddress(from) || !isEmailAddress(to)) return null;
  return { apiKey, from, to };
}

function isEmailAddress(value: string) {
  const bracketedAddress = value.match(/<([^<>]+)>\s*$/)?.[1];
  const address = bracketedAddress ?? value;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
}

async function parseLead(request: Request): Promise<LeadPayload> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    throw new InvalidLeadError("Expected JSON");
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new InvalidLeadError("Request body is too large");
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
    throw new InvalidLeadError("Request body is too large");
  }

  let input: unknown;
  try {
    input = JSON.parse(text);
  } catch {
    throw new InvalidLeadError("Malformed JSON");
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new InvalidLeadError("Expected an object");
  }

  const record = input as Record<string, unknown>;
  const allowedFields = new Set([...Object.keys(STRING_FIELDS), "priorities"]);
  if (Object.keys(record).some((field) => !allowedFields.has(field))) {
    throw new InvalidLeadError("Unexpected field");
  }

  const lead: Record<string, string | string[]> = {};
  for (const [field, rules] of Object.entries(STRING_FIELDS)) {
    const value = record[field];
    if (value === undefined) {
      if (rules.required) throw new InvalidLeadError(`Missing ${field}`);
      continue;
    }

    if (typeof value !== "string") throw new InvalidLeadError(`Invalid ${field}`);
    const normalized = value.trim();
    if ((rules.required && normalized.length === 0) || normalized.length > rules.maxLength) {
      throw new InvalidLeadError(`Invalid ${field}`);
    }
    lead[field] = normalized;
  }

  if (!LEAD_TYPES.has(lead.leadType as string)) {
    throw new InvalidLeadError("Invalid leadType");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email as string)) {
    throw new InvalidLeadError("Invalid email");
  }

  if (record.priorities !== undefined) {
    if (
      !Array.isArray(record.priorities) ||
      record.priorities.length > 8 ||
      record.priorities.some(
        (priority) =>
          typeof priority !== "string" ||
          priority.trim().length === 0 ||
          priority.trim().length > 80,
      )
    ) {
      throw new InvalidLeadError("Invalid priorities");
    }
    lead.priorities = record.priorities.map((priority) => (priority as string).trim());
  }

  return lead as LeadPayload;
}

export function createLeadHandler({
  getResendConfig: readResendConfig = getDefaultResendConfig,
  fetchImpl = fetch,
  logger = console,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: LeadHandlerOptions = {}) {
  return async function handleLead(request: Request) {
    let idempotencyKey: string;
    let lead: LeadPayload;

    try {
      idempotencyKey = getIdempotencyKey(request);
      lead = await parseLead(request);
    } catch (error) {
      logger.warn("[lead-delivery] invalid request", {
        reason: error instanceof InvalidLeadError ? error.message : "Unreadable request",
      });
      return jsonError(400, "invalid_request", "Please check the form and try again.");
    }

    const correlationId = globalThis.crypto.randomUUID();
    const logContext = { correlationId, leadType: lead.leadType };
    const resend = getConfiguredResend(readResendConfig());
    if (!resend) {
      logger.error("[lead-delivery] destination unavailable", logContext);
      return jsonError(
        503,
        "delivery_unavailable",
        "Lead delivery is temporarily unavailable. Please use the contact page.",
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const upstream = await fetchImpl(RESEND_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resend.apiKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Idempotency-Key": idempotencyKey,
          "User-Agent": "sdcommunities.com/lead-delivery",
        },
        body: JSON.stringify(createResendEmail(lead, resend.from, resend.to)),
        cache: "no-store",
        redirect: "error",
        signal: controller.signal,
      });

      if (!upstream.ok) {
        logger.error("[lead-delivery] destination rejected request", {
          ...logContext,
          upstreamStatus: upstream.status,
        });
        return jsonError(
          502,
          "delivery_rejected",
          "We could not confirm delivery. Please try again.",
        );
      }

      let providerMessageId: string | undefined;
      try {
        const acknowledgement: unknown = await upstream.json();
        if (acknowledgement && typeof acknowledgement === "object") {
          const id = (acknowledgement as Record<string, unknown>).id;
          if (typeof id === "string" && id.trim()) providerMessageId = id;
        }
      } catch {
        // A successful HTTP status without Resend's message id is not a confirmed acceptance.
      }

      if (!providerMessageId) {
        logger.error("[lead-delivery] destination returned an invalid acknowledgement", {
          ...logContext,
          upstreamStatus: upstream.status,
        });
        return jsonError(
          502,
          "delivery_failed",
          "We could not confirm delivery. Please try again.",
        );
      }

      logger.info("[lead-delivery] destination accepted request", {
        ...logContext,
        upstreamStatus: upstream.status,
      });
      return Response.json(
        { success: true, delivery: "accepted", requestId: idempotencyKey },
        { status: 202, headers: { "Cache-Control": "no-store" } },
      );
    } catch {
      const timedOut = controller.signal.aborted;
      logger.error(
        timedOut ? "[lead-delivery] destination timed out" : "[lead-delivery] destination failed",
        logContext,
      );
      return jsonError(
        timedOut ? 504 : 502,
        timedOut ? "delivery_timeout" : "delivery_failed",
        "We could not confirm delivery. Please try again.",
      );
    } finally {
      clearTimeout(timeout);
    }
  };
}

const SUBJECTS: Record<string, string> = {
  "buyer-questionnaire": "New buyer questionnaire submission",
  "custom-search": "New custom home search request",
  "first-time-checklist": "First-time buyer checklist request",
  "military-checklist": "Military / VA buyer checklist request",
  "relocation-checklist": "Relocation buyer checklist request",
};

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  outOfArea: "Moving from out of area",
  currentLocation: "Current location",
  timeline: "Timeline",
  budget: "Budget",
  preferredAreas: "Preferred areas",
  vaFinancing: "Using VA financing",
  firstTimeBuyer: "First-time buyer",
  lenderIntro: "Needs lender introduction",
  priorities: "Priorities",
  message: "Message",
};

function createResendEmail(lead: LeadPayload, from: string, to: string) {
  const details = Object.entries(lead)
    .filter(([field]) => field !== "leadType")
    .map(([field, value]) => ({
      label: FIELD_LABELS[field] ?? field,
      value: Array.isArray(value) ? value.join(", ") : value,
    }));
  const subject = SUBJECTS[lead.leadType];
  const text = [subject, "", ...details.map(({ label, value }) => `${label}: ${value}`)].join("\n");
  const htmlRows = details
    .map(
      ({ label, value }) =>
        `<tr><th align="left" valign="top" style="padding:6px 12px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  return {
    from,
    to: [to],
    reply_to: lead.email,
    subject,
    text,
    html: `<h1>${escapeHtml(subject)}</h1><table>${htmlRows}</table>`,
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
