import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createLeadHandler } from "@/lib/leads/server";

const VALID_LEAD = {
  leadType: "custom-search",
  name: "Test Person",
  email: "test@example.invalid",
  phone: "555-0100",
  budget: "$500K - $750K",
  priorities: ["Commute"],
};

const REQUEST_ID = "test-request-0001";
const RESEND_CONFIG = {
  apiKey: "test-resend-api-key",
  from: "SDCommunities <leads@sdcommunities.test>",
  to: "ashleigh@serhant.com",
};

function leadRequest(body: unknown = VALID_LEAD, headers: Record<string, string> = {}) {
  return new Request("https://sdcommunities.com/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": REQUEST_ID,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function silentLogger() {
  return {
    info() {},
    warn() {},
    error() {},
  };
}

describe("lead delivery route", () => {
  it("fails clearly when the delivery destination is not configured", async () => {
    let fetchCalls = 0;
    const incompleteConfigs = [
      { ...RESEND_CONFIG, apiKey: undefined },
      { ...RESEND_CONFIG, from: undefined },
      { ...RESEND_CONFIG, to: "" },
    ];

    for (const config of incompleteConfigs) {
      const handler = createLeadHandler({
        getResendConfig: () => config,
        fetchImpl: async () => {
          fetchCalls += 1;
          return new Response(null, { status: 204 });
        },
        logger: silentLogger(),
      });
      const response = await handler(leadRequest());
      const body = await response.json();

      assert.equal(response.status, 503);
      assert.equal(body.success, false);
      assert.equal(body.error.code, "delivery_unavailable");
    }
    assert.equal(fetchCalls, 0);
  });

  it("rejects malformed JSON and invalid lead fields before delivery", async () => {
    let fetchCalls = 0;
    const handler = createLeadHandler({
      getResendConfig: () => RESEND_CONFIG,
      fetchImpl: async () => {
        fetchCalls += 1;
        return new Response(null, { status: 204 });
      },
      logger: silentLogger(),
    });

    const cases = [
      leadRequest("{"),
      leadRequest({ ...VALID_LEAD, email: "not-an-email" }),
      leadRequest({ ...VALID_LEAD, leadType: "contact-test@example.invalid" }),
      leadRequest({ ...VALID_LEAD, unexpected: "field" }),
      new Request("https://sdcommunities.com/api/leads", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(VALID_LEAD),
      }),
    ];

    for (const request of cases) {
      const response = await handler(request);
      assert.equal(response.status, 400);
      assert.equal((await response.json()).error.code, "invalid_request");
    }
    assert.equal(fetchCalls, 0);
  });

  it("reports upstream 4xx and 5xx responses as unconfirmed delivery", async () => {
    for (const upstreamStatus of [400, 503]) {
      const handler = createLeadHandler({
        getResendConfig: () => RESEND_CONFIG,
        fetchImpl: async () => new Response(null, { status: upstreamStatus }),
        logger: silentLogger(),
      });

      const response = await handler(leadRequest());
      assert.equal(response.status, 502);
      assert.equal((await response.json()).error.code, "delivery_rejected");
    }
  });

  it("bounds delivery time and reports an upstream timeout", async () => {
    const handler = createLeadHandler({
      getResendConfig: () => RESEND_CONFIG,
      timeoutMs: 5,
      fetchImpl: async (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
      logger: silentLogger(),
    });

    const response = await handler(leadRequest());
    assert.equal(response.status, 504);
    assert.equal((await response.json()).error.code, "delivery_timeout");
  });

  it("returns accepted only after a 2xx destination response and logs no contact data", async () => {
    let deliveredUrl: string | URL | Request | undefined;
    let deliveredBody: unknown;
    let deliveredRequestId: string | null = null;
    let deliveredAuthorization: string | null = null;
    const logEntries: unknown[] = [];
    const handler = createLeadHandler({
      getResendConfig: () => RESEND_CONFIG,
      fetchImpl: async (input, init) => {
        deliveredUrl = input;
        deliveredBody = JSON.parse(String(init?.body));
        const headers = new Headers(init?.headers);
        deliveredRequestId = headers.get("Idempotency-Key");
        deliveredAuthorization = headers.get("Authorization");
        assert.equal(headers.get("User-Agent"), "sdcommunities.com/lead-delivery");
        return Response.json({ id: "resend-message-id" }, { status: 200 });
      },
      logger: {
        info: (...values: unknown[]) => logEntries.push(values),
        warn: (...values: unknown[]) => logEntries.push(values),
        error: (...values: unknown[]) => logEntries.push(values),
      },
    });

    const response = await handler(leadRequest());
    const body = await response.json();

    assert.equal(response.status, 202);
    assert.deepEqual(body, {
      success: true,
      delivery: "accepted",
      requestId: REQUEST_ID,
    });
    assert.equal(String(deliveredUrl), "https://api.resend.com/emails");
    assert.equal(deliveredAuthorization, `Bearer ${RESEND_CONFIG.apiKey}`);
    assert.deepEqual(deliveredBody, {
      from: RESEND_CONFIG.from,
      to: [RESEND_CONFIG.to],
      reply_to: VALID_LEAD.email,
      subject: "New custom home search request",
      text:
        "New custom home search request\n\nName: Test Person\nEmail: test@example.invalid\nPhone: 555-0100\nBudget: $500K - $750K\nPriorities: Commute",
      html:
        '<h1>New custom home search request</h1><table><tr><th align="left" valign="top" style="padding:6px 12px 6px 0">Name</th><td style="padding:6px 0">Test Person</td></tr><tr><th align="left" valign="top" style="padding:6px 12px 6px 0">Email</th><td style="padding:6px 0">test@example.invalid</td></tr><tr><th align="left" valign="top" style="padding:6px 12px 6px 0">Phone</th><td style="padding:6px 0">555-0100</td></tr><tr><th align="left" valign="top" style="padding:6px 12px 6px 0">Budget</th><td style="padding:6px 0">$500K - $750K</td></tr><tr><th align="left" valign="top" style="padding:6px 12px 6px 0">Priorities</th><td style="padding:6px 0">Commute</td></tr></table>',
    });
    assert.equal(deliveredRequestId, REQUEST_ID);
    const serializedLogs = JSON.stringify(logEntries);
    assert.doesNotMatch(
      serializedLogs,
      /Test Person|test@example\.invalid|555-0100|test-request-0001/,
    );
  });

  it("rejects a 2xx provider response without a Resend message id", async () => {
    const handler = createLeadHandler({
      getResendConfig: () => RESEND_CONFIG,
      fetchImpl: async () => Response.json({ id: "" }, { status: 200 }),
      logger: silentLogger(),
    });

    const response = await handler(leadRequest());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error.code, "delivery_failed");
  });

  it("accepts every current form lead type through the same Resend boundary", async () => {
    const leadTypes = [
      "buyer-questionnaire",
      "custom-search",
      "first-time-checklist",
      "military-checklist",
      "relocation-checklist",
    ];
    const deliveredSubjects: string[] = [];
    const handler = createLeadHandler({
      getResendConfig: () => RESEND_CONFIG,
      fetchImpl: async (_input, init) => {
        const email = JSON.parse(String(init?.body)) as { subject: string; to: string[] };
        deliveredSubjects.push(email.subject);
        assert.deepEqual(email.to, [RESEND_CONFIG.to]);
        return Response.json({ id: `resend-message-${deliveredSubjects.length}` });
      },
      logger: silentLogger(),
    });

    for (const leadType of leadTypes) {
      const response = await handler(leadRequest({ ...VALID_LEAD, leadType }));
      assert.equal(response.status, 202);
    }

    assert.deepEqual(deliveredSubjects, [
      "New buyer questionnaire submission",
      "New custom home search request",
      "First-time buyer checklist request",
      "Military / VA buyer checklist request",
      "Relocation buyer checklist request",
    ]);
  });

  it("HTML-escapes user-supplied lead content before provider acceptance", async () => {
    let html = "";
    const handler = createLeadHandler({
      getResendConfig: () => RESEND_CONFIG,
      fetchImpl: async (_input, init) => {
        html = (JSON.parse(String(init?.body)) as { html: string }).html;
        return Response.json({ id: "resend-message-id" });
      },
      logger: silentLogger(),
    });

    const response = await handler(
      leadRequest({ ...VALID_LEAD, message: '<script>alert("lead")</script>' }),
    );
    assert.equal(response.status, 202);
    assert.doesNotMatch(html, /<script>/);
    assert.match(html, /&lt;script&gt;alert\(&quot;lead&quot;\)&lt;\/script&gt;/);
  });
});
