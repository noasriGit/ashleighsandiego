const MAX_BODY_BYTES = 32_000;
const DEFAULT_TIMEOUT_MS = 5_000;

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
  getWebhookUrl?: () => string | undefined;
  fetchImpl?: LeadFetch;
  logger?: LeadLogger;
  timeoutMs?: number;
};

class InvalidLeadError extends Error {}

function jsonError(status: number, code: string, message: string) {
  return Response.json(
    { success: false, error: { code, message } },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function getRequestId(request: Request) {
  const supplied = request.headers.get("idempotency-key");
  if (supplied === null) return globalThis.crypto.randomUUID();

  const requestId = supplied.trim();
  if (!/^[A-Za-z0-9._:-]{16,128}$/.test(requestId)) {
    throw new InvalidLeadError("Invalid idempotency key");
  }

  return requestId;
}

function getWebhookUrl(rawUrl: string | undefined) {
  if (!rawUrl?.trim()) return null;

  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return url.toString();
  } catch {
    return null;
  }
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
  getWebhookUrl: readWebhookUrl = () => process.env.CRM_WEBHOOK_URL,
  fetchImpl = fetch,
  logger = console,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: LeadHandlerOptions = {}) {
  return async function POST(request: Request) {
    let requestId: string;
    let lead: LeadPayload;

    try {
      requestId = getRequestId(request);
      lead = await parseLead(request);
    } catch (error) {
      logger.warn("[lead-delivery] invalid request", {
        reason: error instanceof InvalidLeadError ? error.message : "Unreadable request",
      });
      return jsonError(400, "invalid_request", "Please check the form and try again.");
    }

    const webhookUrl = getWebhookUrl(readWebhookUrl());
    if (!webhookUrl) {
      logger.error("[lead-delivery] destination unavailable", {
        requestId,
        leadType: lead.leadType,
      });
      return jsonError(
        503,
        "delivery_unavailable",
        "Lead delivery is temporarily unavailable. Please use the contact page.",
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const upstream = await fetchImpl(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Idempotency-Key": requestId,
        },
        body: JSON.stringify(lead),
        cache: "no-store",
        redirect: "error",
        signal: controller.signal,
      });

      if (!upstream.ok) {
        logger.error("[lead-delivery] destination rejected request", {
          requestId,
          leadType: lead.leadType,
          upstreamStatus: upstream.status,
        });
        return jsonError(
          502,
          "delivery_rejected",
          "We could not confirm delivery. Please try again.",
        );
      }

      logger.info("[lead-delivery] destination accepted request", {
        requestId,
        leadType: lead.leadType,
        upstreamStatus: upstream.status,
      });
      return Response.json(
        { success: true, delivery: "accepted", requestId },
        { status: 202, headers: { "Cache-Control": "no-store" } },
      );
    } catch {
      const timedOut = controller.signal.aborted;
      logger.error(
        timedOut ? "[lead-delivery] destination timed out" : "[lead-delivery] destination failed",
        { requestId, leadType: lead.leadType },
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

export const POST = createLeadHandler();
