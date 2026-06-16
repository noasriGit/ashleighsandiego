"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CommunityCard } from "./CommunityCard";
import type { Community, LifestyleTag } from "@/data/communities";
import { LIFESTYLE_TAGS } from "@/data/communities";
import { communityContent } from "@/data/community-content";

type CommunityGridProps = {
  communities: Community[];
  showFilters?: boolean;
};

export function CommunityGrid({ communities, showFilters = true }: CommunityGridProps) {
  const [activeFilter, setActiveFilter] = useState<LifestyleTag | "all">("all");

  const filtered =
    activeFilter === "all"
      ? communities
      : communities.filter((c) => c.lifestyles.includes(activeFilter));

  return (
    <div>
      {showFilters && (
        <div className="mb-8 flex flex-wrap gap-2">
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
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((community) => {
          const content = communityContent[community.slug];
          return (
            <CommunityCard
              key={community.slug}
              community={community}
              thumbnail={content?.thumbnail}
              thumbnailAlt={content?.thumbnailAlt}
            />
          );
        })}
      </div>
    </div>
  );
}
