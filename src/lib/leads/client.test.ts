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
    resolveFetch(new Response(null, { status: 202 }));
    await first;
  });

  it("reuses the idempotency key for a retry and rotates it when the payload changes", async () => {
    const requestIds: string[] = [];
    const responses = [502, 202, 202];
    let nextId = 1;
    const controller = createLeadSubmissionController(
      async (_input, init) => {
        requestIds.push(new Headers(init?.headers).get("Idempotency-Key") ?? "");
        return new Response(null, { status: responses.shift() });
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
