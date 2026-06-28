"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the element animates in once visible. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

type RevealCallback = () => void;

let sharedObserver: IntersectionObserver | null = null;
const revealCallbacks = new WeakMap<Element, RevealCallback>();

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const callback = revealCallbacks.get(entry.target);
          if (callback) callback();
          revealCallbacks.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
  }
  return sharedObserver;
}

/**
 * Wraps content in a subtle scroll-triggered fade/rise.
 * Respects prefers-reduced-motion via the .reveal CSS rule and
 * renders fully visible if IntersectionObserver is unavailable.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Tag = as as React.ElementType;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = getSharedObserver();
    revealCallbacks.set(node, () => setVisible(true));
    observer.observe(node);

    return () => {
      revealCallbacks.delete(node);
      observer.unobserve(node);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
