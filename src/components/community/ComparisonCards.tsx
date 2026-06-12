import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

type Comparison = {
  name: string;
  slug: string;
  note: string;
};

type ComparisonCardsProps = {
  comparisons: Comparison[];
};

export function ComparisonCards({ comparisons }: ComparisonCardsProps) {
  return (
    <Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((area) => (
          <Link
            key={area.slug + area.name}
            href={`/neighborhoods/${area.slug}`}
            className="group flex flex-col rounded-xl border border-surface-muted border-t-2 border-t-transparent bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-t-cabernet hover:shadow-lg"
          >
            <h3 className="heading-card text-cabernet">{area.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-espresso/80">
              {area.note}
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-cabernet">
              View guide &rarr;
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
