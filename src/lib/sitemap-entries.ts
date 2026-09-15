/**
 * Sitemap URL entries derived from the route registry and community indexability.
 * lastmod is included only when a verified YYYY-MM-DD date exists.
 * Never fall back to build time or the current deployment timestamp.
 */

import { getCommunityContent } from "@/data/community-content";
import { getRouteByPath, type RouteEntry } from "@/data/routes";
import { getSitemapPaths } from "@/lib/seo-indexability";

export const LASTMOD_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export type SitemapUrlEntry = {
  path: string;
  lastmod?: string;
  changeFrequency: RouteEntry["changeFrequency"];
  priority: number;
};

/** Accept an explicit real calendar date only. Reject timestamps, ISO datetimes, empty values, and impossible dates such as 2026-99-99. */
export function parseVerifiedLastmod(value: string | undefined | null): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!LASTMOD_DATE_RE.test(trimmed)) return undefined;

  const year = Number(trimmed.slice(0, 4));
  const month = Number(trimmed.slice(5, 7));
  const day = Number(trimmed.slice(8, 10));
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return undefined;
  }

  // Date.UTC is used only to confirm the Y-M-D tuple exists on the calendar.
  // It is never used as a lastmod fallback or build-time stamp.
  const calendar = new Date(Date.UTC(year, month - 1, day));
  if (
    calendar.getUTCFullYear() !== year ||
    calendar.getUTCMonth() + 1 !== month ||
    calendar.getUTCDate() !== day
  ) {
    return undefined;
  }

  return trimmed;
}

export function getLastmodForPath(path: string): string | undefined {
  const route = getRouteByPath(path);
  if (route?.lastModified) {
    return parseVerifiedLastmod(route.lastModified);
  }

  const neighborhoodMatch = path.match(/^\/neighborhoods\/([a-z0-9-]+)$/);
  if (neighborhoodMatch) {
    const content = getCommunityContent(neighborhoodMatch[1]!);
    return parseVerifiedLastmod(content?.lastSubstantialUpdate);
  }

  return undefined;
}

export function getSitemapUrlEntries(): SitemapUrlEntry[] {
  return getSitemapPaths().map((path) => {
    const route = getRouteByPath(path);
    return {
      path,
      lastmod: getLastmodForPath(path),
      changeFrequency: route?.changeFrequency ?? "monthly",
      priority: route?.priority ?? 0.8,
    };
  });
}
