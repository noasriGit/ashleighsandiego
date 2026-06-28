"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CommunityOption = {
  slug: string;
  name: string;
};

type ListingsFilterBarProps = {
  activeCommunity?: string;
  options: CommunityOption[];
};

export function ListingsFilterBar({ activeCommunity, options }: ListingsFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateCommunity = (community?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (community) params.set("community", community);
    else params.delete("community");
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="rounded-2xl border border-dove/35 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-medium text-espresso">Community:</span>
          <button
            type="button"
            onClick={() => updateCommunity(undefined)}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
              !activeCommunity
                ? "bg-cabernet text-white"
                : "bg-rose/50 text-espresso hover:bg-rose"
            }`}
          >
            All areas
          </button>
          {options.map((option) => (
            <button
              key={option.slug}
              type="button"
              onClick={() => updateCommunity(option.slug)}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                activeCommunity === option.slug
                  ? "bg-cabernet text-white"
                  : "bg-rose/50 text-espresso hover:bg-rose"
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="listings-sort" className="text-sm text-espresso/70">
            Sort
          </label>
          <select
            id="listings-sort"
            value="newest"
            disabled
            className="min-h-10 rounded-lg border border-dove/45 bg-pearl px-3 text-sm text-espresso/75"
          >
            <option value="newest">Newest first</option>
          </select>
        </div>
      </div>
    </div>
  );
}
