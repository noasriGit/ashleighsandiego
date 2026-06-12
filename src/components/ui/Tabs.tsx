"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  className?: string;
};

export function Tabs({ tabs, className }: TabsProps) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (index + dir + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Base sections"
        className="flex flex-wrap gap-2 border-b border-surface-muted"
      >
        {tabs.map((tab, index) => {
          const isActive = index === active;
          return (
            <button
              key={tab.label}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-cabernet text-cabernet"
                  : "border-transparent text-espresso/70 hover:text-cabernet",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== active}
          className="pt-6"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
