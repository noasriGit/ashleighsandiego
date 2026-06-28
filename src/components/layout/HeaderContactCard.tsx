"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AgentContactCard, AGENT_CARD_IMAGE } from "@/components/layout/AgentContactCard";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

type HeaderContactContextValue = {
  open: boolean;
  handleDismiss: () => void;
  handleReopen: () => void;
};

const HeaderContactContext = createContext<HeaderContactContextValue | null>(null);

function useHeaderContact() {
  const ctx = useContext(HeaderContactContext);
  if (!ctx) {
    throw new Error("Header contact components must be used within HeaderContactProvider");
  }
  return ctx;
}

export function HeaderContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  function handleDismiss() {
    setOpen(false);
  }

  function handleReopen() {
    setOpen(true);
  }

  return (
    <HeaderContactContext.Provider value={{ open, handleDismiss, handleReopen }}>
      {children}
    </HeaderContactContext.Provider>
  );
}

/** Nav slot: always shows Ashleigh's contact chip. */
export function HeaderContactNavSlot() {
  const { handleReopen } = useHeaderContact();
  const firstName = siteConfig.agent.name.split(" ")[0];

  return (
    <button
      type="button"
      onClick={handleReopen}
      aria-label={`Open contact card for ${siteConfig.agent.name}`}
      className="group flex items-center gap-2 rounded-full border border-cabernet/25 bg-rose/50 py-1 pl-1 pr-3 shadow-sm transition-all hover:border-cabernet/40 hover:bg-rose hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet"
    >
      <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-2 ring-cabernet/20 transition-transform group-hover:scale-105">
        <Image
          src={AGENT_CARD_IMAGE}
          alt=""
          fill
          sizes="32px"
          className="object-cover object-[center_20%]"
        />
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-espresso">
        <span className="hidden xl:inline">{firstName} · </span>
        <span className="text-cabernet">Contact</span>
      </span>
    </button>
  );
}

export function HeaderContactPanel() {
  const { open, handleDismiss } = useHeaderContact();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-full z-50 hidden overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none lg:grid",
        open ? "pointer-events-auto grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
      {...(!open ? { inert: true } : {})}
    >
      <div className="min-h-0 overflow-hidden border-t border-surface-muted bg-background shadow-lg">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="relative">
            <AgentContactCard id="header-contact-card" />
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-earth shadow-sm transition-colors hover:text-cabernet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet"
              aria-label="Hide contact card"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
