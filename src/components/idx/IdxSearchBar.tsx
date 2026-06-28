"use client";

import { useState } from "react";
import Link from "next/link";
import { communities, launchCommunitySlugs } from "@/data/communities";
import { GENERAL_KEY, getIdxSearchConfig } from "@/data/idx-search-config";
import { IDX_BASE_URL, isIdxPublicEnabled } from "@/data/idx-links";
import { resolveIdxSearchFromFilters } from "@/lib/idx-search-url";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { cn } from "@/lib/utils";

type PricePreset = {
  label: string;
  value: string;
  minPrice?: number;
  maxPrice?: number;
};

const PRICE_PRESETS: PricePreset[] = [
  { label: "Any price", value: "" },
  { label: "Under $1M", value: "under-1m", maxPrice: 999_999 },
  { label: "$1M – $2M", value: "1m-2m", minPrice: 1_000_000, maxPrice: 2_000_000 },
  { label: "$2M+", value: "2m-plus", minPrice: 2_000_000 },
];

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

const idxEnabled = isIdxPublicEnabled();

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
      minPrice: preset?.minPrice,
      maxPrice: preset?.maxPrice,
      minBed: minBed ? Number(minBed) : undefined,
    });

    onSearch?.();
    window.location.href = searchUrl;
  };

  const isHeader = variant === "header";
  const areaOptions = AREA_OPTIONS.map((option) => ({
    value: option.slug,
    label: option.label,
  }));
  const priceOptions = PRICE_PRESETS.map((preset) => ({
    value: preset.value,
    label: preset.label,
  }));
  const bedOptions = [
    { value: "", label: "Any beds" },
    ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n}+ beds` })),
  ];

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
          "relative z-10 flex flex-1 flex-col gap-1 overflow-visible p-1.5 sm:flex-row sm:items-stretch sm:gap-0 sm:p-1",
          "rounded-2xl border border-dove/30 bg-white/95 shadow-md backdrop-blur-md sm:rounded-full",
        )}
      >
        <SearchSelect
          label="Area"
          fieldLabel="Area"
          value={areaSlug}
          onChange={setAreaSlug}
          options={areaOptions}
          className="sm:min-w-[9rem] sm:flex-[1.4]"
        />

        <div className="hidden w-px shrink-0 self-stretch bg-dove/25 sm:block" aria-hidden="true" />

        <SearchSelect
          label="Price"
          fieldLabel="Price"
          value={pricePreset}
          onChange={setPricePreset}
          options={priceOptions}
          className="sm:max-w-[9.5rem]"
        />

        <div className="hidden w-px shrink-0 self-stretch bg-dove/25 sm:block" aria-hidden="true" />

        <SearchSelect
          label="Minimum bedrooms"
          fieldLabel="Beds"
          value={minBed}
          onChange={setMinBed}
          options={bedOptions}
          className="sm:max-w-[7.5rem]"
        />
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
