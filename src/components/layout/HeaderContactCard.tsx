"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AgentContactCard, AGENT_CARD_IMAGE } from "@/components/layout/AgentContactCard";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

const AUTO_OPEN_KEY = "contact-card-auto-opened";
const DISMISSED_KEY = "contact-card-dismissed";

type HeaderContactContextValue = {
  open: boolean;
  reopenNavVisible: boolean;
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
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasDismissedOnce, setHasDismissedOnce] = useState(false);

  useEffect(() => {
    setHasDismissedOnce(sessionStorage.getItem(DISMISSED_KEY) === "true");
  }, []);

  useEffect(() => {
    const hero = document.querySelector("[data-page-hero]");
    if (!hero) {
      setPastHero(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-72px 0px 0px 0px",
      },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pastHero) return;

    const alreadyAutoOpened = sessionStorage.getItem(AUTO_OPEN_KEY) === "true";
    if (!alreadyAutoOpened) {
      setOpen(true);
      sessionStorage.setItem(AUTO_OPEN_KEY, "true");
    }
  }, [pastHero]);

  useEffect(() => {
    document.documentElement.classList.toggle("site-header--contact-open", open);
    return () => {
      document.documentElement.classList.remove("site-header--contact-open");
    };
  }, [open]);

  function handleDismiss() {
    setOpen(false);
    setHasDismissedOnce(true);
    sessionStorage.setItem(DISMISSED_KEY, "true");
  }

  function handleReopen() {
    setOpen(true);
  }

  const reopenNavVisible = hasDismissedOnce && pastHero && !open;

  return (
    <HeaderContactContext.Provider
      value={{ open, reopenNavVisible, handleDismiss, handleReopen }}
    >
      {children}
    </HeaderContactContext.Provider>
  );
}

/** Nav slot: agent chip when the card is closed, otherwise the default CTA. */
export function HeaderContactNavSlot() {
  const { reopenNavVisible, handleReopen } = useHeaderContact();
  const firstName = siteConfig.agent.name.split(" ")[0];

  if (reopenNavVisible) {
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

  return (
    <Button href="/contact" size="sm" className="whitespace-nowrap">
      Book a Call
    </Button>
  );
}

export function HeaderContactPanel() {
  const { open, handleDismiss } = useHeaderContact();

  return (
    <div
      className={cn(
        "hidden overflow-hidden border-t border-surface-muted transition-[grid-template-rows,opacity] duration-300 ease-out lg:grid",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="min-h-0 overflow-hidden">
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
