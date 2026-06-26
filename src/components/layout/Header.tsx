"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/data/site-config";
import { IdxSearchBar } from "@/components/idx/IdxSearchBar";
import {
  HeaderContactNavSlot,
  HeaderContactPanel,
  HeaderContactProvider,
} from "@/components/layout/HeaderContactCard";
import { cn } from "@/lib/utils";

function navLinkLabel(item: (typeof siteConfig.nav)[number], compact = false) {
  if (compact && "shortLabel" in item && item.shortLabel) {
    return item.shortLabel;
  }
  return item.label;
}

export function Header() {
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
      <header className="site-header relative sticky top-0 z-50 border-b border-surface-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mr-6 flex shrink-0 items-center lg:mr-10"
          aria-label={`${siteConfig.name} home`}
        >
          <img
            src="/images/berkshirelogo.png"
            alt=""
            width={4074}
            height={960}
            className="block h-9 w-auto max-w-[190px] object-contain object-left sm:h-10 sm:max-w-[220px]"
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        <nav
          className="ml-auto hidden min-w-0 items-center divide-x divide-espresso/15 lg:flex"
          aria-label="Main navigation"
        >
          {siteConfig.nav.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap px-4 text-sm text-espresso transition-colors hover:text-cabernet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2 xl:px-5"
            >
              {navLinkLabel(item, true)}
            </Link>
          ))}
          <div className="shrink-0 px-4 xl:px-5">
            <HeaderContactNavSlot />
          </div>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-cabernet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2 lg:hidden"
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
      </div>

      <div className="hidden overflow-visible border-t border-surface-muted lg:block">
        <div className="mx-auto flex max-w-6xl justify-center px-4 py-2 sm:px-6 lg:px-8">
          <IdxSearchBar variant="header" />
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
            <IdxSearchBar
              variant="header"
              onSearch={() => setMobileOpen(false)}
            />
          </div>
          {siteConfig.nav.map((item) => (
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
    </header>
    </HeaderContactProvider>
  );
}
