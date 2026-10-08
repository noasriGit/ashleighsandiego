import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { JSDOM } from "jsdom";
import { act } from "react";
import type { Root } from "react-dom/client";
import { LEAD_SUBMISSION_ERROR_MESSAGE } from "@/lib/leads/client";

describe("LeadMagnet browser behavior", () => {
  let dom: JSDOM;
  let container: HTMLDivElement;
  let root: Root;
  let LeadMagnet: typeof import("./LeadMagnet").LeadMagnet;

  beforeEach(async () => {
    dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
      url: "https://sdcommunities.com/",
    });
    Object.defineProperties(globalThis, {
      window: { configurable: true, value: dom.window },
      document: { configurable: true, value: dom.window.document },
      navigator: { configurable: true, value: dom.window.navigator },
      HTMLElement: { configurable: true, value: dom.window.HTMLElement },
      HTMLInputElement: { configurable: true, value: dom.window.HTMLInputElement },
      Event: { configurable: true, value: dom.window.Event },
    });
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean })
      .IS_REACT_ACT_ENVIRONMENT = true;
    container = dom.window.document.querySelector("#root") as HTMLDivElement;
    const [{ createRoot }, leadMagnetModule] = await Promise.all([
      import("react-dom/client"),
      import("./LeadMagnet"),
    ]);
    LeadMagnet = leadMagnetModule.LeadMagnet;
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
