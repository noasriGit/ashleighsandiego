"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SearchSelectOption = {
  value: string;
  label: string;
};

type SearchSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SearchSelectOption[];
  className?: string;
  /** Short label shown above the value on wider breakpoints. */
  fieldLabel?: string;
};

function ChevronDown({ className, open }: { className?: string; open: boolean }) {
  return (
    <svg
      className={cn("h-4 w-4 shrink-0 text-earth transition-transform", open && "rotate-180", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
    </svg>
  );
}

export function SearchSelect({
  label,
  value,
  onChange,
  options,
  className,
  fieldLabel,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function selectOption(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
  }

  function openList() {
    setActiveIndex(selectedIndex);
    setOpen(true);
  }

  function toggleList() {
    if (open) {
      setOpen(false);
    } else {
      openList();
    }
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openList();
      requestAnimationFrame(() => optionRefs.current[selectedIndex]?.focus());
    }
  }

  function handleListKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = (index + 1) % options.length;
      setActiveIndex(next);
      optionRefs.current[next]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = (index - 1 + options.length) % options.length;
      setActiveIndex(next);
      optionRefs.current[next]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
      optionRefs.current[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      const last = options.length - 1;
      setActiveIndex(last);
      optionRefs.current[last]?.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(index);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className={cn("relative min-w-0 flex-1", className)}>
      <button
        type="button"
        id={`${listId}-trigger`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={toggleList}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "flex w-full min-w-0 items-center justify-between gap-2 px-3 py-2 text-left transition-colors",
          "rounded-lg hover:bg-rose/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet/30 focus-visible:ring-offset-1",
          open && "bg-rose/50",
        )}
      >
        <span className="min-w-0">
          {fieldLabel && (
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-earth">
              {fieldLabel}
            </span>
          )}
          <span className="block truncate text-sm font-medium text-espresso">
            {selected.label}
          </span>
        </span>
        <ChevronDown open={open} />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          aria-activedescendant={`${listId}-option-${activeIndex}`}
          className={cn(
            "absolute left-0 top-[calc(100%+0.25rem)] z-[60] max-h-56 min-w-full overflow-y-auto",
            "rounded-xl border border-dove/30 bg-white py-1.5 shadow-lg ring-1 ring-espresso/5",
          )}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value || "default"} role="none">
                <button
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  type="button"
                  id={`${listId}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onKeyDown={(event) => handleListKeyDown(event, index)}
                  onClick={() => selectOption(index)}
                  className={cn(
                    "flex w-full px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cabernet/40",
                    isSelected
                      ? "bg-cabernet/10 font-medium text-cabernet"
                      : "text-espresso hover:bg-rose/70",
                  )}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
