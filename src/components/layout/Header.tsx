"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/Button";
import { IdxSearchBar } from "@/components/idx/IdxSearchBar";
import { cn } from "@/lib/utils";

function navLinkLabel(item: (typeof siteConfig.nav)[number], compact = false) {
  if (compact && "shortLabel" in item && item.shortLabel) {
    return item.shortLabel;
  }
  return item.label;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-surface-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mr-6 flex shrink-0 items-center lg:mr-10"
          aria-label={`${siteConfig.name} home`}
        >
          <img
            src="/images/berkshirelogo.png"
            alt="Berkshire Hathaway HomeServices California Properties"
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
              className="shrink-0 whitespace-nowrap px-4 text-sm text-espresso transition-colors hover:text-cabernet xl:px-5"
            >
              {navLinkLabel(item, true)}
            </Link>
          ))}
          <div className="shrink-0 px-4 xl:px-5">
            <Button href="/contact" size="sm" className="whitespace-nowrap">
              Book a Call
            </Button>
          </div>
        </nav>

        <button
          type="button"
          className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-cabernet lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className="hidden border-t border-surface-muted lg:block">
        <div className="mx-auto flex max-w-6xl justify-center px-4 py-2 sm:px-6 lg:px-8">
          <IdxSearchBar variant="header" />
        </div>
      </div>

      <nav
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
              className="rounded-lg px-3 py-2.5 text-espresso hover:bg-rose"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="px-3 py-2.5">
            <Button href="/contact" className="w-full" size="sm">
              {siteConfig.ctas.strategyCall}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
