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

function Tile({ item }: { item: BentoItem }) {
  const isLink = Boolean(item.href);

  const inner = (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border p-6 transition-all sm:p-8",
        item.highlight
          ? "border-transparent bg-gradient-to-br from-cabernet to-espresso text-white"
          : "border-surface-muted bg-white text-espresso",
        isLink && "hover:-translate-y-1 hover:shadow-lg",
        isLink && !item.highlight && "hover:border-cabernet/40",
      )}
    >
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
          Learn more &rarr;
        </span>
      )}
    </div>
  );

  return (
    <div className={cn(spanStyles[item.span ?? "default"])}>
      {isLink ? (
        <Link href={item.href as string} className="block h-full">
          {inner}
        </Link>
      ) : (
        inner
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
