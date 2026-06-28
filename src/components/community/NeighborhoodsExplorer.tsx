"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CommunityGrid } from "@/components/community/CommunityGrid";
import type { Community, LifestyleTag } from "@/data/communities";
import { LIFESTYLE_TAGS } from "@/data/communities";

const CommunityMap = dynamic(
  () => import("@/components/map/CommunityMap").then((m) => m.CommunityMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-2xl bg-blush/20 text-sm text-espresso/70 ring-1 ring-cabernet/10 md:h-[520px]">
        Loading map…
      </div>
    ),
  },
);

type NeighborhoodsExplorerProps = {
  communities: Community[];
};

export function NeighborhoodsExplorer({ communities }: NeighborhoodsExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<LifestyleTag | "all">("all");
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="heading-card text-cabernet">Community Map</h3>
          <p className="mt-1 max-w-2xl text-sm text-espresso/80">
            Hover or tap a zone to preview a neighborhood. Click to open its buyer guide.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge active={activeFilter === "all"} onClick={() => setActiveFilter("all")}>
            All
          </Badge>
          {LIFESTYLE_TAGS.map((tag) => (
            <Badge
              key={tag}
              active={activeFilter === tag}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <CommunityMap
        communities={communities}
        activeFilter={activeFilter}
        highlightedSlug={highlightedSlug}
        onCommunityHover={setHighlightedSlug}
      />

      <p className="mt-3 text-xs text-muted-foreground">
        Boundaries are approximate marketing guides for relocation research—not legal or
        MLS-defined neighborhood lines.
      </p>

      <div className="mt-10">
        <CommunityGrid
          communities={communities}
          showFilters={false}
          activeFilter={activeFilter}
          highlightedSlug={highlightedSlug}
          onCommunityHover={setHighlightedSlug}
        />
      </div>
    </div>
  );
}
