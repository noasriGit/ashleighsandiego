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
    const handler = createLeadHandler({
      getWebhookUrl: () => undefined,
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
    assert.equal(fetchCalls, 0);
  });

  it("rejects malformed JSON and invalid lead fields before delivery", async () => {
    let fetchCalls = 0;
    const handler = createLeadHandler({
      getWebhookUrl: () => "https://crm.example.invalid/leads",
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
        getWebhookUrl: () => "https://crm.example.invalid/leads",
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
      getWebhookUrl: () => "https://crm.example.invalid/leads",
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
    let deliveredBody: unknown;
    let deliveredRequestId: string | null = null;
    const logEntries: unknown[] = [];
    const handler = createLeadHandler({
      getWebhookUrl: () => "https://crm.example.invalid/leads",
      fetchImpl: async (_input, init) => {
        deliveredBody = JSON.parse(String(init?.body));
        deliveredRequestId = new Headers(init?.headers).get("Idempotency-Key");
        return new Response(null, { status: 204 });
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
    assert.deepEqual(deliveredBody, VALID_LEAD);
    assert.equal(deliveredRequestId, REQUEST_ID);
    const serializedLogs = JSON.stringify(logEntries);
    assert.doesNotMatch(
      serializedLogs,
      /Test Person|test@example\.invalid|555-0100|test-request-0001/,
    );
  });
});
