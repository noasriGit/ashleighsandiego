import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Community, LifestyleTag } from "@/data/communities";

type CommunityCardProps = {
  community: Community;
  /** Optional real photo. When absent, a brand-tinted placeholder header shows. */
  thumbnail?: string;
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

export function CommunityCard({ community, thumbnail }: CommunityCardProps) {
  const hasPage = community.hasGuide;
  const gradient =
    lifestyleGradient[community.lifestyles[0]] ?? "from-cabernet to-espresso";

  const content = (
    <Card
      hover={hasPage}
      accent={community.tier === 1 ? "cabernet" : undefined}
      className={`flex h-full flex-col overflow-hidden p-0 ${!hasPage ? "opacity-75" : ""}`}
    >
      <div className={`relative h-28 bg-gradient-to-br ${gradient}`}>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${community.name}, San Diego`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[url('/images/coastal-pattern.svg')] bg-cover opacity-20" />
        )}
        {community.tier === 1 && (
          <Badge className="absolute right-3 top-3 shrink-0 bg-white/90 text-cabernet">
            Featured
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="heading-card text-cabernet">{community.name}</h3>
        <p className="mt-2 text-sm text-espresso/80 line-clamp-2">{community.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {community.lifestyles.slice(0, 3).map((l) => (
            <Badge key={l} className="text-xs">
              {l}
            </Badge>
          ))}
        </div>
        {!hasPage && (
          <p className="mt-3 text-xs text-muted-foreground">Guide coming soon</p>
        )}
      </div>
    </Card>
  );

  if (hasPage) {
    return (
      <Link href={`/neighborhoods/${community.slug}`} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
