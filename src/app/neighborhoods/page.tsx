import { Hero } from "@/components/marketing/Hero";
import { NeighborhoodsExplorer } from "@/components/community/NeighborhoodsExplorer";
import { CTABanner } from "@/components/marketing/CTABanner";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site-config";
import { communities } from "@/data/communities";
import { marketingHeroes } from "@/data/page-images";
import { generatePageMetadata } from "@/lib/metadata";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "San Diego Neighborhoods Near La Jolla | Community Guide",
  description:
    "Explore communities within a 12-mile radius of La Jolla Beach. Compare coastal, UTC, family-friendly, and affordable neighborhoods for relocating buyers.",
  path: "/neighborhoods",
  keywords: ["best neighborhoods near La Jolla", "where to live near La Jolla", "San Diego neighborhoods"],
});

export default function NeighborhoodsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            "San Diego Neighborhoods Near La Jolla",
            "Community directory for relocating buyers.",
            "/neighborhoods",
          ),
          breadcrumbSchema([{ name: "Neighborhoods", path: "/neighborhoods" }]),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Neighborhoods" }]} />
      </div>

      <Hero
        kicker="Neighborhood Directory"
        headline="Explore Communities Near La Jolla and Coastal San Diego"
        subheadline={`Browse neighborhood guides within a ${siteConfig.geo.radiusMiles}-mile radius of ${siteConfig.geo.center}. Filter by lifestyle to find areas that match your commute, budget, and priorities.`}
        primaryCta={{ label: siteConfig.ctas.strategyCall, href: "/contact" }}
        secondaryCta={{ label: siteConfig.ctas.searchHomes, href: "/search-homes" }}
        backgroundImage={marketingHeroes.neighborhoods.src}
        backgroundImageAlt={marketingHeroes.neighborhoods.alt}
      />

      <Section kicker="Coastal to Inland">
        <div className="max-w-3xl">
          <h2 className="heading-section text-cabernet">From the Coast to Central San Diego</h2>
          <p className="mt-4 leading-relaxed text-espresso/90">
            Each community near La Jolla has its own character, upscale coastal villages, biotech-corridor
            convenience, family-friendly master plans, and walkable urban neighborhoods. Use the filters to
            narrow by lifestyle, then open a guide to see who each area fits best.
          </p>
        </div>
        <div className="mt-10">
          <NeighborhoodsExplorer communities={communities} />
        </div>
      </Section>

      <CTABanner
        headline="Not Sure Which Neighborhood Fits?"
        description="Book a free strategy call to compare areas based on your commute, budget, and lifestyle."
      />
    </>
  );
}
