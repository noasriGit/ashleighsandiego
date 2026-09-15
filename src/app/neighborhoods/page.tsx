import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { CTABanner } from "@/components/marketing/CTABanner";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { communities } from "@/data/communities";
import { isCommunityIndexable } from "@/lib/seo-indexability";
import { marketingHeroes } from "@/data/page-images";
import { generatePageMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Neighborhood Guide Directory",
  description:
    "The full directory of San Diego neighborhood buyer guides. Start at the San Diego Neighborhoods overview or the interactive neighborhood map for a guided comparison.",
  path: "/neighborhoods",
});

const guides = communities.filter((c) => c.hasGuide);
const featured = guides.filter((c) => isCommunityIndexable(c.slug)).sort((a, b) => a.name.localeCompare(b.name));
const previews = guides.filter((c) => !isCommunityIndexable(c.slug)).sort((a, b) => a.name.localeCompare(b.name));

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

      <Section id="featured" kicker="Featured Guides">
        <p className="max-w-2xl text-espresso/90">
          These are our full buyer&apos;s guides, covering housing stock, lifestyle, and commute in
          depth. Prefer a curated comparison first? Start with{" "}
          <Link href="/" className="text-cabernet hover:underline">San Diego Neighborhoods</Link>{" "}
          or the{" "}
          <Link href="/san-diego-neighborhood-map" className="text-cabernet hover:underline">
            interactive neighborhood map
          </Link>
          .
        </p>
        <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <li key={c.slug}>
              <Link href={`/neighborhoods/${c.slug}`} className="text-espresso hover:text-cabernet hover:underline">
                {c.name}
              </Link>
              <p className="mt-1 text-sm text-espresso/70">{c.tagline}</p>
            </li>
          ))}
        </ul>
      </Section>

      {previews.length > 0 && (
        <Section variant="sand" kicker="Additional Neighborhood Previews">
          <p className="max-w-2xl text-espresso/90">
            These communities have a short preview page while we finish full buyer&apos;s guides.
            Content, lifestyle detail, and comparisons will expand over time, start with a{" "}
            <Link href="#featured" className="text-cabernet hover:underline">featured guide</Link>{" "}
            above if you want the most complete picture today.
          </p>
          <ul className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {previews.map((c) => (
              <li key={c.slug}>
                <p className="text-espresso/70">{c.name}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-espresso/50">
                  Guide in development
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTABanner
        headline="Not Sure Which Neighborhood Fits?"
        description="Book a free strategy call to compare areas based on your commute, budget, and lifestyle."
      />
    </>
  );
}
