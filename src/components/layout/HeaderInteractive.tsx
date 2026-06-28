"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  HeaderContactNavSlot,
  HeaderContactPanel,
  HeaderContactProvider,
} from "@/components/layout/HeaderContactCard";
import { cn } from "@/lib/utils";

const IdxSearchBar = dynamic(
  () => import("@/components/idx/IdxSearchBar").then((mod) => mod.IdxSearchBar),
  { ssr: false },
);

type HeaderInteractiveProps = {
  items: ReadonlyArray<{ label: string; href: string }>;
};

export function HeaderInteractive({ items }: HeaderInteractiveProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <HeaderContactProvider>
      <button
        ref={menuButtonRef}
        type="button"
        className="absolute right-4 top-4 z-[60] flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-cabernet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2 sm:right-6 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-expanded={mobileOpen}
        aria-controls={mobileNavId}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div className="hidden overflow-visible border-t border-surface-muted lg:block">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex-1">
            <IdxSearchBar variant="header" />
          </div>
          <div className="shrink-0">
            <HeaderContactNavSlot />
          </div>
        </div>
      </div>

      <HeaderContactPanel />

      <nav
        id={mobileNavId}
        className={cn(
          "border-t border-surface-muted bg-background lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col divide-y divide-espresso/10 px-4 py-2">
          <div className="py-3">
            <IdxSearchBar variant="header" onSearch={() => setMobileOpen(false)} />
          </div>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-espresso hover:bg-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cabernet"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </HeaderContactProvider>
  );
}
