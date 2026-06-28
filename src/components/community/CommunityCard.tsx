import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Community, LifestyleTag } from "@/data/communities";

type CommunityCardProps = {
  community: Community;
  /** Optional real photo. When absent, a brand-tinted placeholder header shows. */
  thumbnail?: string;
  thumbnailAlt?: string;
};

const lifestyleGradient: Record<LifestyleTag, string> = {
  Coastal: "from-earth via-blush to-cabernet",
  "Close to UCSD/UTC": "from-cabernet to-espresso",
  "Commute-friendly": "from-earth to-espresso",
  "More affordable nearby": "from-dove to-earth",
  "Nightlife/walkability": "from-cabernet via-blush to-earth",
  "Family-oriented": "from-blush to-rose",
  "Military/commute considerations": "from-espresso to-earth",
};

export function CommunityCard({ community, thumbnail, thumbnailAlt }: CommunityCardProps) {
  const hasPage = community.hasGuide;
  const gradient =
    lifestyleGradient[community.lifestyles[0]] ?? "from-cabernet to-espresso";

  const content = (
    <Card
      hover={false}
      accent={community.tier === 1 ? "cabernet" : undefined}
      className={cn(
        "flex h-full flex-col overflow-hidden p-0",
        !hasPage && "opacity-75",
        hasPage &&
          "transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transition-none group-hover:-translate-y-2 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-cabernet/15",
      )}
    >
      <div className={cn("relative h-28 overflow-hidden bg-gradient-to-br", gradient)}>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={thumbnailAlt ?? `${community.name}, San Diego`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-500 ease-out motion-reduce:transition-none",
              hasPage && "group-hover:scale-110",
            )}
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 bg-cover opacity-20 transition-transform duration-500 ease-out motion-reduce:transition-none",
              hasPage && "group-hover:scale-110",
            )}
            style={{ backgroundImage: "url('/images/coastal-pattern.svg')" }}
          />
        )}

        {hasPage && (
          <>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cabernet/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
              aria-hidden
            />
          </>
        )}

        {community.tier === 1 && (
          <Badge
            className={cn(
              "absolute right-3 top-3 shrink-0 bg-white/90 text-cabernet transition-transform duration-300 motion-reduce:transition-none",
              hasPage && "group-hover:scale-105",
            )}
          >
            Featured
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3
          className={cn(
            "heading-card text-cabernet transition-[transform,color] duration-300 ease-out motion-reduce:transition-none",
            hasPage && "group-hover:translate-x-1 group-hover:text-cabernet/90",
          )}
        >
          {community.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-espresso/80">{community.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {community.lifestyles.slice(0, 3).map((l) => (
            <Badge
              key={l}
              className={cn(
                "text-xs transition-[transform,background-color] duration-300 motion-reduce:transition-none",
                hasPage && "group-hover:-translate-y-0.5 group-hover:bg-blush/60",
              )}
            >
              {l}
            </Badge>
          ))}
        </div>

        {hasPage ? (
          <span
            className={cn(
              "mt-4 inline-flex items-center gap-1 text-sm font-medium text-cabernet",
              "translate-y-2 opacity-0 transition-[transform,opacity] duration-300 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
              "group-hover:translate-y-0 group-hover:opacity-100",
            )}
            aria-hidden="true"
          >
            Explore guide
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        ) : (
          <p className="mt-3 text-xs text-muted-foreground">Guide coming soon</p>
        )}
      </div>
    </Card>
  );

  if (hasPage) {
    return (
      <Link
        href={`/neighborhoods/${community.slug}`}
        className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2"
        aria-label={`${community.name}: ${community.tagline}`}
      >
        {content}
      </Link>
    );
  }

  return content;
}
