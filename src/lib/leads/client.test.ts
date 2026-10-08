import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createLeadSubmissionController,
  LEAD_SUBMISSION_ERROR_MESSAGE,
  LeadSubmissionError,
} from "./client";

const PAYLOAD = {
  leadType: "relocation-checklist",
  name: "Test Person",
  email: "test@example.invalid",
};

function acceptedResponse(requestId: string) {
  return Response.json({ success: true, delivery: "accepted", requestId }, { status: 202 });
}

describe("lead submission controller", () => {
  it("shows a delivery-specific user error when the API does not confirm delivery", async () => {
    const controller = createLeadSubmissionController(
      async () => Response.json({ success: false }, { status: 503 }),
      () => "request-key-00001",
    );

    await assert.rejects(controller.submit(PAYLOAD), (error: unknown) => {
      assert.ok(error instanceof LeadSubmissionError);
      assert.equal(error.message, LEAD_SUBMISSION_ERROR_MESSAGE);
      return true;
    });
  });

  it("coalesces duplicate clicks into one in-flight request", async () => {
    let fetchCalls = 0;
    let resolveFetch: ((response: Response) => void) | undefined;
    const controller = createLeadSubmissionController(
      async () => {
        fetchCalls += 1;
        return new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        });
      },
      () => "request-key-00001",
    );

    const first = controller.submit(PAYLOAD);
    const duplicate = controller.submit(PAYLOAD);

    assert.strictEqual(duplicate, first);
    assert.equal(fetchCalls, 1);
    assert.ok(resolveFetch);
    resolveFetch(acceptedResponse("request-key-00001"));
    await first;
  });

  it("rejects 2xx responses without the exact accepted-delivery acknowledgement", async () => {
    const responses = [
      new Response(null, { status: 204 }),
      Response.json(
        { success: false, delivery: "accepted", requestId: "request-key-00001" },
        { status: 200 },
      ),
      Response.json(
        { success: true, delivery: "accepted", requestId: "different-request" },
        { status: 200 },
      ),
    ];
    const controller = createLeadSubmissionController(
      async () => responses.shift() ?? new Response(null, { status: 500 }),
      () => "request-key-00001",
    );

    for (let index = 0; index < 3; index += 1) {
      await assert.rejects(controller.submit(PAYLOAD), LeadSubmissionError);
    }
  });

  it("reuses the idempotency key for a retry and rotates it when the payload changes", async () => {
    const requestIds: string[] = [];
    const responses = [502, 202, 202];
    let nextId = 1;
    const controller = createLeadSubmissionController(
      async (_input, init) => {
        requestIds.push(new Headers(init?.headers).get("Idempotency-Key") ?? "");
        const status = responses.shift() ?? 500;
        return status === 202
          ? acceptedResponse(requestIds.at(-1) ?? "")
          : new Response(null, { status });
      },
      () => `request-key-0000${nextId++}`,
    );

    await assert.rejects(controller.submit(PAYLOAD), LeadSubmissionError);
    await controller.submit(PAYLOAD);
    await controller.submit({ ...PAYLOAD, name: "Updated Test Person" });

    assert.deepEqual(requestIds, [
      "request-key-00001",
      "request-key-00001",
      "request-key-00002",
    ]);
  });
});
