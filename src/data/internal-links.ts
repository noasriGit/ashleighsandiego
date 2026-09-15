/**
 * Internal-linking plan (docs/seo-rebuild-plan.md §10) as data, not prose.
 * Each cluster page declares which other cluster pages it must link to, so the
 * hub-and-spoke structure is enforced by a lint (`npm run routes:validate`)
 * instead of relying on every page author remembering the diagram.
 */

import { routes, getPathRedirects } from "./routes";

export type LinkPlanEntry = {
  /** The page doing the linking. */
  from: string;
  /** Paths it must link to somewhere in its rendered content. */
  linksTo: string[];
};

export const internalLinkPlan: LinkPlanEntry[] = [
  { from: "/", linksTo: ["/san-diego-neighborhood-map", "/moving-to-san-diego", "/military-realtor-san-diego", "/la-jolla-neighborhoods", "/mission-valley-condos-for-sale", "/san-diego-condos-for-sale", "/san-diego-suburbs", "/affordable-neighborhoods-san-diego"] },
  { from: "/san-diego-neighborhood-map", linksTo: ["/", "/neighborhoods"] },
  { from: "/moving-to-san-diego", linksTo: ["/", "/living-in-san-diego", "/military-realtor-san-diego", "/san-diego-neighborhood-map", "/affordable-neighborhoods-san-diego"] },
  { from: "/living-in-san-diego", linksTo: ["/", "/moving-to-san-diego", "/san-diego-suburbs"] },
  { from: "/military-realtor-san-diego", linksTo: ["/", "/moving-to-san-diego", "/affordable-neighborhoods-san-diego"] },
  { from: "/la-jolla-neighborhoods", linksTo: ["/", "/la-jolla-real-estate-agent", "/la-jolla-condos-for-sale", "/la-jolla-vs-del-mar"] },
  { from: "/la-jolla-real-estate-agent", linksTo: ["/la-jolla-neighborhoods", "/la-jolla-condos-for-sale", "/contact"] },
  { from: "/affordable-neighborhoods-san-diego", linksTo: ["/", "/san-diego-suburbs", "/moving-to-san-diego"] },
  { from: "/san-diego-suburbs", linksTo: ["/", "/cities-near-san-diego", "/affordable-neighborhoods-san-diego"] },
  { from: "/cities-near-san-diego", linksTo: ["/san-diego-suburbs", "/"] },
  { from: "/san-diego-condos-for-sale", linksTo: ["/downtown-san-diego-condos-for-sale", "/la-jolla-condos-for-sale", "/mission-valley-condos-for-sale", "/"] },
  { from: "/downtown-san-diego-condos-for-sale", linksTo: ["/san-diego-condos-for-sale", "/"] },
  { from: "/la-jolla-condos-for-sale", linksTo: ["/san-diego-condos-for-sale", "/la-jolla-neighborhoods"] },
  { from: "/mission-valley-condos-for-sale", linksTo: ["/san-diego-condos-for-sale", "/"] },
  { from: "/del-mar-new-luxury-homes", linksTo: ["/la-jolla-vs-del-mar", "/la-jolla-neighborhoods"] },
  { from: "/la-jolla-vs-del-mar", linksTo: ["/la-jolla-neighborhoods", "/del-mar-new-luxury-homes"] },
  { from: "/about", linksTo: ["/la-jolla-real-estate-agent", "/contact"] },
];

/** True when a path is a redirect source and must never be an internal-link target. */
export function isRedirectSource(path: string): boolean {
  return getPathRedirects().some((r) => r.source === path);
}

/** Lint: every `linksTo` target must be a real, non-redirect-source route. */
export function validateInternalLinkPlan(): string[] {
  const errors: string[] = [];
  const knownPaths = new Set(routes.map((r) => r.path));

  for (const entry of internalLinkPlan) {
    if (!knownPaths.has(entry.from)) {
      errors.push(`internal-links.ts: "${entry.from}" is not a known route.`);
    }
    for (const target of entry.linksTo) {
      if (isRedirectSource(target)) {
        errors.push(`internal-links.ts: "${entry.from}" links to "${target}", which is a 301 redirect source.`);
      }
      if (!knownPaths.has(target)) {
        errors.push(`internal-links.ts: "${entry.from}" links to unknown route "${target}".`);
      }
    }
  }

  return errors;
}
