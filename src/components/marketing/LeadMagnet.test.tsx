import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { JSDOM } from "jsdom";
import { act } from "react";
import type { Root } from "react-dom/client";
import { LEAD_SUBMISSION_ERROR_MESSAGE } from "@/lib/leads/client";

describe("lead form browser behavior", () => {
  let dom: JSDOM;
  let container: HTMLDivElement;
  let root: Root;
  let LeadMagnet: typeof import("./LeadMagnet").LeadMagnet;
  let BuyerQuestionnaire: typeof import("@/components/forms/BuyerQuestionnaire").BuyerQuestionnaire;
  let CustomSearchForm: typeof import("@/components/forms/CustomSearchForm").CustomSearchForm;

  beforeEach(async () => {
    dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
      url: "https://sdcommunities.com/",
    });
    Object.defineProperties(globalThis, {
      window: { configurable: true, value: dom.window },
      self: { configurable: true, value: dom.window },
      document: { configurable: true, value: dom.window.document },
      navigator: { configurable: true, value: dom.window.navigator },
      HTMLElement: { configurable: true, value: dom.window.HTMLElement },
      HTMLInputElement: { configurable: true, value: dom.window.HTMLInputElement },
      Event: { configurable: true, value: dom.window.Event },
      FormData: { configurable: true, value: dom.window.FormData },
    });
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean })
      .IS_REACT_ACT_ENVIRONMENT = true;
    container = dom.window.document.querySelector("#root") as HTMLDivElement;
    const [{ createRoot }, leadMagnetModule, buyerModule, customSearchModule] = await Promise.all([
      import("react-dom/client"),
      import("./LeadMagnet"),
      import("@/components/forms/BuyerQuestionnaire"),
      import("@/components/forms/CustomSearchForm"),
    ]);
    LeadMagnet = leadMagnetModule.LeadMagnet;
    BuyerQuestionnaire = buyerModule.BuyerQuestionnaire;
    CustomSearchForm = customSearchModule.CustomSearchForm;
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    dom.window.close();
  });

  it("coalesces double submission and retains entered values when delivery is unconfirmed", async () => {
    let fetchCalls = 0;
    let resolveFetch: ((response: Response) => void) | undefined;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      fetchCalls += 1;
      return new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      });
    };

    try {
      await act(async () => {
        root.render(
          <LeadMagnet
            title="Relocation checklist"
            description="Test description"
            leadType="relocation-checklist"
          />,
        );
      });

      const [nameInput, emailInput] = Array.from(
        container.querySelectorAll<HTMLInputElement>("input"),
      );
      setInputValue(nameInput, "Test Person");
      setInputValue(emailInput, "test@example.invalid");
      const form = container.querySelector("form");
      assert.ok(form);

      await act(async () => {
        form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
        form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
        await Promise.resolve();
      });

      assert.equal(fetchCalls, 1);
      const completeRequest = resolveFetch;
      assert.ok(completeRequest);
      await act(async () => {
        completeRequest(Response.json({ success: false }, { status: 503 }));
        await Promise.resolve();
      });

      assert.equal(nameInput.value, "Test Person");
      assert.equal(emailInput.value, "test@example.invalid");
      assert.match(container.textContent ?? "", new RegExp(escapeRegex(LEAD_SUBMISSION_ERROR_MESSAGE)));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("submits BuyerQuestionnaire through the shared lead endpoint", async () => {
    const submissions: Record<string, unknown>[] = [];
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (_input, init) => {
      submissions.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
      const requestId = new Headers(init?.headers).get("Idempotency-Key");
      return Response.json({ success: true, delivery: "accepted", requestId }, { status: 202 });
    };

    try {
      await act(async () => root.render(<BuyerQuestionnaire />));
      setInputValue(getInput("name"), "Buyer Test");
      setInputValue(getInput("email"), "buyer@example.invalid");
      setInputValue(getInput("phone"), "555-0101");
      await submitCurrentForm();

      assert.equal(submissions.length, 1);
      assert.equal(submissions[0].leadType, "buyer-questionnaire");
      assert.equal(submissions[0].email, "buyer@example.invalid");
      assert.match(container.textContent ?? "", /accepted for delivery/i);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("submits CustomSearchForm through the shared lead endpoint", async () => {
    const submissions: Record<string, unknown>[] = [];
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (_input, init) => {
      submissions.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
      const requestId = new Headers(init?.headers).get("Idempotency-Key");
      return Response.json({ success: true, delivery: "accepted", requestId }, { status: 202 });
    };

    try {
      await act(async () => root.render(<CustomSearchForm defaultArea="La Jolla" />));
      setInputValue(getInput("name"), "Search Test");
      setInputValue(getInput("email"), "search@example.invalid");
      await submitCurrentForm();

      assert.equal(submissions.length, 1);
      assert.equal(submissions[0].leadType, "custom-search");
      assert.equal(submissions[0].preferredAreas, "La Jolla");
      assert.match(container.textContent ?? "", /accepted for delivery/i);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  function getInput(name: string) {
    const input = container.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    assert.ok(input);
    return input;
  }

  async function submitCurrentForm() {
    const form = container.querySelector("form");
    assert.ok(form);
    await act(async () => {
      form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
      await Promise.resolve();
    });
  }
});

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  assert.ok(setter);
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
