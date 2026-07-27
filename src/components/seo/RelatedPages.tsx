import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export type RelatedPageItem = {
  title: string;
  description: string;
  href: string;
};

type RelatedPagesProps = {
  title?: string;
  items: RelatedPageItem[];
  variant?: "default" | "sand" | "pearl";
};

/**
 * Shared "keep exploring" grid used at the bottom of every cluster and
 * community-guide page. Extracted from the inline block in
 * neighborhoods/[slug]/page.tsx so the internal-linking plan (src/data/internal-links.ts)
 * has one rendering target instead of N copy-pasted blocks.
 */
export function RelatedPages({ title = "Keep Exploring", items, variant = "sand" }: RelatedPagesProps) {
  if (items.length === 0) return null;

  return (
    <Section variant={variant} kicker="Related">
      <h2 className="heading-section text-cabernet">{title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card hover accent="cabernet" className="h-full">
              <h3 className="heading-card text-cabernet">{item.title}</h3>
              <p className="mt-1 text-sm text-espresso/80">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
