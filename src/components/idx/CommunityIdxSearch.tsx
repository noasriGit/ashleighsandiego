"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { IdxSearchConfig } from "@/data/idx-search-config";
import { buildIdxSearchUrl, resolveIdxBrowseUrl } from "@/lib/idx-search-url";

type CommunityIdxSearchProps = {
  communityName: string;
  config: IdxSearchConfig;
  idxBaseUrl: string;
  /** Override card spacing when the form is the section's only content (e.g. neighborhood #search). */
  className?: string;
};

export function CommunityIdxSearch({
  communityName,
  config,
  idxBaseUrl,
  className = "mt-6",
}: CommunityIdxSearchProps) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBed, setMinBed] = useState("");
  const [minBath, setMinBath] = useState("");

  const hasFilters = Boolean(minPrice || maxPrice || minBed || minBath);

  // With filters, build a dynamic zip-filtered results URL so the filters actually apply.
  // Without filters, prefer the branded saved-search URL for a cleaner /i/{slug} landing.
  const searchUrl = hasFilters
    ? (buildIdxSearchUrl(idxBaseUrl, config, {
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        minBed: minBed ? Number(minBed) : undefined,
        minBath: minBath ? Number(minBath) : undefined,
      }) ?? idxBaseUrl)
    : (resolveIdxBrowseUrl(idxBaseUrl, config) ?? idxBaseUrl);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.href = searchUrl;
  };

  return (
    <Card className={`${className} border-t-2 border-t-cabernet bg-rose/30`}>
      <h3 className="heading-card text-cabernet">
        Search {communityName} listings
      </h3>
      <p className="mt-2 text-sm text-espresso/90">
        Pre-filtered to{" "}
        {config.zipCodes.length > 0
          ? `ZIP ${config.zipCodes.join(", ")}`
          : communityName}
        . Add optional filters, then browse live MLS results on our search portal.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block text-sm">
          <span className="font-medium text-espresso">Min price</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="500000"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-3 py-2 text-espresso"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-espresso">Max price</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder="1500000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-3 py-2 text-espresso"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-espresso">Min beds</span>
          <select
            value={minBed}
            onChange={(e) => setMinBed(e.target.value)}
            className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-3 py-2 text-espresso"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={String(n)}>
                {n}+
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-espresso">Min baths</span>
          <select
            value={minBath}
            onChange={(e) => setMinBath(e.target.value)}
            className="mt-1 w-full rounded-lg border border-dove/40 bg-white px-3 py-2 text-espresso"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={String(n)}>
                {n}+
              </option>
            ))}
          </select>
        </label>

        <div className="sm:col-span-2 lg:col-span-4">
          <Button type="submit">Search homes in {communityName}</Button>
        </div>
      </form>

      {config.zipCodes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {config.zipCodes.map((zip) => (
            <span
              key={zip}
              className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-cabernet"
            >
              {zip}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}
