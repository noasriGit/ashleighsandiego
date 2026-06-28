"use client";

import { useState } from "react";
import Link from "next/link";
import { communities, launchCommunitySlugs } from "@/data/communities";
import {
  getMaxPriceOptions,
  getMinPriceOptions,
  LISTING_TYPE_OPTIONS,
  listingTypeToPropertyType,
  resolvePriceAmount,
  type ListingType,
} from "@/data/idx-search-bar-config";
import { GENERAL_KEY, getIdxSearchConfig } from "@/data/idx-search-config";
import { IDX_BASE_URL, isIdxPublicEnabled } from "@/data/idx-links";
import { resolveIdxSearchFromFilters } from "@/lib/idx-search-url";
import { SearchSelect } from "@/components/ui/SearchSelect";
import { cn } from "@/lib/utils";

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

function FieldDivider() {
  return <div className="hidden w-px shrink-0 self-stretch bg-dove/25 sm:block" aria-hidden="true" />;
}

export function IdxSearchBar({
  variant = "header",
  className,
  onSearch,
}: IdxSearchBarProps) {
  const [listingType, setListingType] = useState<ListingType>("buy");
  const [areaSlug, setAreaSlug] = useState(GENERAL_KEY);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
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

  function handleListingTypeChange(type: ListingType) {
    setListingType(type);
    setMinPrice("");
    setMaxPrice("");
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const config = getIdxSearchConfig(areaSlug === GENERAL_KEY ? undefined : areaSlug);
    let min = resolvePriceAmount(minPrice);
    let max = resolvePriceAmount(maxPrice);
    if (min != null && max != null && min > max) {
      [min, max] = [max, min];
    }

    const searchUrl = resolveIdxSearchFromFilters(IDX_BASE_URL, config, {
      minPrice: min,
      maxPrice: max,
      minBed: minBed ? Number(minBed) : undefined,
      propertyType: listingTypeToPropertyType(listingType),
    });

    onSearch?.();
    window.location.href = searchUrl;
  };

  const isHeader = variant === "header";
  const areaOptions = AREA_OPTIONS.map((option) => ({
    value: option.slug,
    label: option.label,
  }));
  const minPriceOptions = getMinPriceOptions(listingType).map((option) => ({
    value: option.value,
    label: option.label,
  }));
  const maxPriceOptions = getMaxPriceOptions(listingType).map((option) => ({
    value: option.value,
    label: option.label,
  }));
  const bedOptions = [
    { value: "", label: "Any beds" },
    ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n}+ beds` })),
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full max-w-6xl flex-col gap-2 lg:flex-row lg:items-stretch",
        isHeader && "lg:gap-2",
        className,
      )}
      aria-label="Search MLS listings"
    >
      <div
        className={cn(
          "relative z-10 flex flex-1 flex-col gap-2 overflow-visible p-2 sm:flex-row sm:flex-wrap sm:items-stretch lg:flex-nowrap lg:gap-0 lg:p-1.5",
          "rounded-2xl border border-dove/30 bg-white/95 shadow-md backdrop-blur-md lg:rounded-full",
        )}
      >
        <div
          role="group"
          aria-label="Buy or rent"
          className="flex shrink-0 rounded-full bg-rose/50 p-0.5 sm:self-center lg:mx-1"
        >
          {LISTING_TYPE_OPTIONS.map((option) => {
            const active = listingType === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => handleListingTypeChange(option.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet/40 focus-visible:ring-offset-1",
                  active
                    ? "bg-cabernet text-white shadow-sm"
                    : "text-espresso/80 hover:text-cabernet",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <FieldDivider />

        <SearchSelect
          label="Area"
          fieldLabel="Area"
          value={areaSlug}
          onChange={setAreaSlug}
          options={areaOptions}
          className="sm:min-w-[10rem] sm:flex-[1.35]"
        />

        <FieldDivider />

        <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-stretch lg:max-w-[15rem]">
          <SearchSelect
            label="Minimum price"
            fieldLabel="Min price"
            value={minPrice}
            onChange={setMinPrice}
            options={minPriceOptions}
            className="sm:flex-1"
          />
          <SearchSelect
            label="Maximum price"
            fieldLabel="Max price"
            value={maxPrice}
            onChange={setMaxPrice}
            options={maxPriceOptions}
            className="sm:flex-1"
          />
        </div>

        <FieldDivider />

        <SearchSelect
          label="Minimum bedrooms"
          fieldLabel="Beds"
          value={minBed}
          onChange={setMinBed}
          options={bedOptions}
          className="sm:max-w-[8rem]"
        />
      </div>

      <button
        type="submit"
        className={cn(
          "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-cabernet px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-cabernet/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2",
          isHeader && "lg:ml-0",
        )}
      >
        <SearchIcon className="h-4 w-4" />
        <span>Search</span>
      </button>
    </form>
  );
}
