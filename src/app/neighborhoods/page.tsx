import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { CTABanner } from "@/components/marketing/CTABanner";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { communities } from "@/data/communities";
import { marketingHeroes } from "@/data/page-images";
import { generatePageMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Neighborhood Guide Directory",
  description:
    "The full directory of San Diego neighborhood buyer guides. Start at the San Diego Neighborhoods overview or the interactive neighborhood map for a guided comparison.",
  path: "/neighborhoods",
  noindex: true,
});

const sorted = [...communities].filter((c) => c.hasGuide).sort((a, b) => a.name.localeCompare(b.name));

export default function NeighborhoodsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "Neighborhood Guide Directory",
            "Full directory of San Diego neighborhood buyer guides.",
            "/neighborhoods",
          ),
          breadcrumbSchema([{ name: "Neighborhoods", path: "/neighborhoods" }]),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Neighborhoods" }]} />
      </div>

      <PageHero
        kicker="Guide Directory"
        headline="Every San Diego Neighborhood Guide"
        subheadline="This is the full A–Z directory behind our neighborhood comparisons. For a guided starting point, use the San Diego Neighborhoods overview or the interactive neighborhood map."
        primaryCta={{ label: "Compare Neighborhoods", href: "/" }}
        secondaryCta={{ label: "Open the Neighborhood Map", href: "/san-diego-neighborhood-map" }}
        heroImage={marketingHeroes.neighborhoods.src}
        heroImageAlt={marketingHeroes.neighborhoods.alt}
      />

      <Section kicker="A–Z Directory">
        <p className="max-w-2xl text-espresso/90">
          Every guide below covers housing stock, lifestyle, and commute for one San Diego
          community. Prefer a curated comparison first? Start with{" "}
          <Link href="/" className="text-cabernet hover:underline">San Diego Neighborhoods</Link>{" "}
          or the{" "}
          <Link href="/san-diego-neighborhood-map" className="text-cabernet hover:underline">
            interactive neighborhood map
          </Link>
          .
        </p>
        <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((c) => (
            <li key={c.slug}>
              <Link href={`/neighborhoods/${c.slug}`} className="text-espresso hover:text-cabernet hover:underline">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTABanner
        headline="Not Sure Which Neighborhood Fits?"
        description="Book a free strategy call to compare areas based on your commute, budget, and lifestyle."
      />
    </>
  );
}
