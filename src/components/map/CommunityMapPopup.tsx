import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Community } from "@/data/communities";
import { getNeighborhoodGuideHref } from "@/lib/seo-indexability";

type CommunityMapPopupProps = {
  community: Community;
  showTapHint?: boolean;
};

export function CommunityMapPopup({ community, showTapHint = false }: CommunityMapPopupProps) {
  const href = getNeighborhoodGuideHref(community.slug);

  return (
    <div className="max-w-[220px] p-1">
      <div className="flex items-start justify-between gap-2">
        <h3 className="heading-card text-sm text-cabernet">{community.name}</h3>
        {community.tier === 1 && (
          <Badge className="shrink-0 bg-blush/80 text-[10px] text-cabernet">Featured</Badge>
        )}
      </div>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-espresso/85">
        {community.tagline}
      </p>
      {href ? (
        <Link
          href={href}
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cabernet hover:underline"
        >
          View guide
          <span aria-hidden>→</span>
        </Link>
      ) : (
        <p className="mt-2 text-xs font-medium text-espresso/60">Guide in development</p>
      )}
      {showTapHint && href && (
        <p className="mt-2 text-[10px] leading-snug text-espresso/60">
          Tap this area again to open the guide.
        </p>
      )}
    </div>
  );
}
