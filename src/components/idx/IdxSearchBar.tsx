"use client";

import { useState } from "react";
import Link from "next/link";
import { communities, launchCommunitySlugs } from "@/data/communities";
import { GENERAL_KEY, getIdxSearchConfig } from "@/data/idx-search-config";
import { IDX_BASE_URL } from "@/data/idx-links";
import { resolveIdxSearchFromFilters } from "@/lib/idx-search-url";
import { cn } from "@/lib/utils";

const PRICE_PRESETS = [
  { label: "Any price", value: "" },
  { label: "Under $1M", value: "under-1m", minPrice: undefined, maxPrice: 999_999 },
  { label: "$1M – $2M", value: "1m-2m", minPrice: 1_000_000, maxPrice: 2_000_000 },
  { label: "$2M+", value: "2m-plus", minPrice: 2_000_000, maxPrice: undefined },
] as const;

const AREA_OPTIONS = [
  { slug: GENERAL_KEY, label: "All San Diego" },
  ...launchCommunitySlugs.map((slug) => {
    const community = communities.find((c) => c.slug === slug);
    return { slug, label: community?.name ?? slug };
  }),
];

type IdxSearchBarProps = {
  variant?: "header" | "inline";
  className?: string;
  /** Called after a successful search navigation (e.g. close mobile drawer). */
  onSearch?: () => void;
};

const idxEnabled =
  process.env.NEXT_PUBLIC_IDX_ENABLED === "true" && Boolean(IDX_BASE_URL);

const selectClassName =
  "w-full min-w-0 appearance-none bg-transparent py-2 pl-3 pr-8 text-sm text-espresso outline-none focus-visible:ring-2 focus-visible:ring-cabernet/30 rounded-md";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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

export function IdxSearchBar({
  variant = "header",
  className,
  onSearch,
}: IdxSearchBarProps) {
  const [areaSlug, setAreaSlug] = useState(GENERAL_KEY);
  const [pricePreset, setPricePreset] = useState("");
  const [minBed, setMinBed] = useState("");

  if (!idxEnabled) {
    return (
      <Link
        href="/search-homes"
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-dove/30 bg-white/90 px-5 py-2.5 text-sm font-medium text-cabernet shadow-md backdrop-blur-md transition-shadow hover:shadow-lg",
          className,
        )}
      >
        <SearchIcon className="h-4 w-4" />
        Search homes
      </Link>
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const config = getIdxSearchConfig(areaSlug === GENERAL_KEY ? undefined : areaSlug);
    const preset = PRICE_PRESETS.find((p) => p.value === pricePreset);

    const searchUrl = resolveIdxSearchFromFilters(IDX_BASE_URL, config, {
      minPrice: preset && "minPrice" in preset ? preset.minPrice : undefined,
      maxPrice: preset && "maxPrice" in preset ? preset.maxPrice : undefined,
      minBed: minBed ? Number(minBed) : undefined,
    });

    onSearch?.();
    window.location.href = searchUrl;
  };

  const isHeader = variant === "header";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full max-w-3xl flex-col gap-2 sm:flex-row sm:items-stretch",
        isHeader && "sm:gap-0",
        className,
      )}
      aria-label="Search MLS listings"
    >
      <div
        className={cn(
          "flex flex-1 flex-col divide-y divide-dove/25 sm:flex-row sm:divide-x sm:divide-y-0",
          "rounded-2xl border border-dove/30 bg-white/90 shadow-md backdrop-blur-md sm:rounded-full",
        )}
      >
        <label className="relative flex min-w-0 flex-1 items-center">
          <span className="sr-only">Area</span>
          <select
            value={areaSlug}
            onChange={(e) => setAreaSlug(e.target.value)}
            className={cn(selectClassName, isHeader && "sm:rounded-l-full")}
          >
            {AREA_OPTIONS.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-earth" />
        </label>

        <label className="relative flex min-w-0 flex-1 items-center sm:max-w-[9.5rem]">
          <span className="sr-only">Price</span>
          <select
            value={pricePreset}
            onChange={(e) => setPricePreset(e.target.value)}
            className={selectClassName}
          >
            {PRICE_PRESETS.map((preset) => (
              <option key={preset.value || "any"} value={preset.value}>
                {preset.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-earth" />
        </label>

        <label className="relative flex min-w-0 flex-1 items-center sm:max-w-[6.5rem]">
          <span className="sr-only">Minimum bedrooms</span>
          <select
            value={minBed}
            onChange={(e) => setMinBed(e.target.value)}
            className={selectClassName}
          >
            <option value="">Any beds</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={String(n)}>
                {n}+ beds
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-earth" />
        </label>
      </div>

      <button
        type="submit"
        className={cn(
          "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-cabernet px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-cabernet/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2",
          isHeader && "sm:ml-2",
        )}
      >
        <SearchIcon className="h-4 w-4" />
        <span>Search</span>
      </button>
    </form>
  );
}
