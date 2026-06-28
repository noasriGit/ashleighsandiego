import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Community } from "@/data/communities";

type CommunityMapPopupProps = {
  community: Community;
  showTapHint?: boolean;
};

export function CommunityMapPopup({ community, showTapHint = false }: CommunityMapPopupProps) {
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
      <Link
        href={`/neighborhoods/${community.slug}`}
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cabernet hover:underline"
      >
        View guide
        <span aria-hidden>→</span>
      </Link>
      {showTapHint && (
        <p className="mt-2 text-[10px] leading-snug text-espresso/60">
          Tap this area again to open the guide.
        </p>
      )}
    </div>
  );
}
