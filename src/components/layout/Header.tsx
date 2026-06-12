"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-lg font-semibold text-cabernet sm:text-xl">
            San Diego Relocation
          </span>
          <span className="text-xs text-muted-foreground sm:text-sm">Home Guide</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {siteConfig.nav.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-espresso transition-colors hover:text-cabernet"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" size="sm">
            {siteConfig.ctas.strategyCall}
          </Button>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-cabernet lg:hidden"
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

      <nav
        className={cn(
          "border-t border-surface-muted bg-background lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-espresso hover:bg-rose"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/contact" className="mt-2 w-full" size="sm">
            {siteConfig.ctas.strategyCall}
          </Button>
        </div>
      </nav>
    </header>
  );
}
