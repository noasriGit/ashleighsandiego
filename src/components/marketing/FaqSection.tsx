"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  title?: string;
  faqs: FaqItem[];
};

export function FaqSection({ title = "Frequently Asked Questions", faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {title && <h2 className="heading-section text-cabernet">{title}</h2>}
      <div className="mt-6 divide-y divide-surface-muted border-y border-surface-muted">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <div
              key={faq.question}
              className={cn(
                "border-l-2 transition-colors",
                isOpen ? "border-l-cabernet bg-rose/20" : "border-l-transparent",
              )}
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left font-semibold text-cabernet transition-colors hover:text-cabernet/80"
                >
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cabernet/40 text-lg leading-none transition-transform",
                      isOpen && "rotate-45",
                    )}
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
                className="accordion-panel px-4"
                data-open={isOpen}
              >
                <div>
                  <p className="pb-5 leading-relaxed text-espresso/90">{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
