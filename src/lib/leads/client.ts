export const LEAD_SUBMISSION_ERROR_MESSAGE =
  "We couldn't confirm that your request reached Ashleigh's team. Please try again or use the contact page.";

type LeadPayload = Record<string, unknown>;
type LeadFetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export class LeadSubmissionError extends Error {
  constructor() {
    super(LEAD_SUBMISSION_ERROR_MESSAGE);
    this.name = "LeadSubmissionError";
  }
}

export function createLeadSubmissionController(
  fetchImpl: LeadFetch = fetch,
  createRequestId: () => string = () => globalThis.crypto.randomUUID(),
) {
  let inFlight: Promise<void> | null = null;
  let lastPayload = "";
  let requestId = "";

  function submit(payload: LeadPayload) {
    if (inFlight) return inFlight;

    const serializedPayload = JSON.stringify(payload);
    if (serializedPayload !== lastPayload) {
      lastPayload = serializedPayload;
      requestId = createRequestId();
    }

    const submission = fetchImpl("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": requestId,
      },
      body: serializedPayload,
    }).then((response) => {
      if (!response.ok) throw new LeadSubmissionError();
    });

    const trackedSubmission = submission.finally(() => {
      if (inFlight === trackedSubmission) inFlight = null;
    });
    inFlight = trackedSubmission;
    return trackedSubmission;
  }

  return { submit };
}
