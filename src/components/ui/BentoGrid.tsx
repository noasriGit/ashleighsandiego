import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type BentoItem = {
  title: string;
  description: string;
  href?: string;
  eyebrow?: string;
  /** Tile sizing on the desktop grid. */
  span?: "default" | "wide" | "tall" | "feature";
  /** Render with a dark cabernet fill (use for the hero/feature tile). */
  highlight?: boolean;
  /** Optional background image for highlight tiles, with cabernet gradient overlay. */
  imageSrc?: string;
  imageAlt?: string;
};

type BentoGridProps = {
  items: BentoItem[];
  className?: string;
};

const spanStyles: Record<string, string> = {
  default: "",
  wide: "lg:col-span-2",
  tall: "lg:row-span-2",
  feature: "lg:col-span-2 lg:row-span-2",
};

function TileContent({ item }: { item: BentoItem }) {
  const isLink = Boolean(item.href);
  const hasImage = Boolean(item.highlight && item.imageSrc);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all sm:p-8",
        item.highlight
          ? "border-transparent text-white"
          : "border-surface-muted bg-white text-espresso",
        !hasImage && item.highlight && "bg-gradient-to-br from-cabernet to-espresso",
        isLink && "hover:-translate-y-1 hover:shadow-lg",
        isLink && !item.highlight && "hover:border-cabernet/40",
      )}
    >
      {hasImage && (
        <>
          <Image
            src={item.imageSrc as string}
            alt={item.imageAlt ?? ""}
            fill
            sizes="(max-width: 1024px) 100vw, 700px"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-cabernet/90 via-cabernet/75 to-espresso/90"
            aria-hidden
          />
        </>
      )}

      <div className="relative z-10 flex h-full flex-col">
        {item.eyebrow && (
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.12em]",
              item.highlight ? "text-white/70" : "text-cabernet",
            )}
          >
            {item.eyebrow}
          </p>
        )}
        <h3
          className={cn(
            "mt-2 font-display",
            item.span === "feature" ? "text-2xl sm:text-3xl" : "text-xl",
            item.highlight ? "text-white" : "text-cabernet",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-3 flex-1 text-sm leading-relaxed",
            item.highlight ? "text-white/90" : "text-espresso/90",
          )}
        >
          {item.description}
        </p>
        {isLink && (
          <span
            className={cn(
              "mt-5 inline-flex items-center text-sm font-medium",
              item.highlight ? "text-white" : "text-cabernet",
            )}
          >
            Learn more →
          </span>
        )}
      </div>
    </div>
  );
}

function Tile({ item }: { item: BentoItem }) {
  const content = <TileContent item={item} />;

  return (
    <div className={cn(spanStyles[item.span ?? "default"])}>
      {item.href ? (
        <Link href={item.href} className="block h-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}

export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <Reveal>
      <div
        className={cn(
          "grid auto-rows-[minmax(0,1fr)] gap-4 sm:gap-5 lg:grid-cols-3",
          className,
        )}
      >
        {items.map((item) => (
          <Tile key={item.title} item={item} />
        ))}
      </div>
    </Reveal>
  );
}
