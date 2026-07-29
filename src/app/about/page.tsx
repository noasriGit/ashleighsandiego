import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { CTABanner } from "@/components/marketing/CTABanner";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig, getSdmlsIdxDisclaimer } from "@/data/site-config";
import { marketingHeroes } from "@/data/page-images";
import { generatePageMetadata } from "@/lib/metadata";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "About Ashleigh Dodero",
  description:
    "About Ashleigh Dodero, California DRE #02351643, and how SDCommunities helps relocating, military, and first-time buyers compare San Diego neighborhoods.",
  path: "/about",
});

const credentials = [
  { title: "License", description: `California DRE #${siteConfig.agent.dreNumber}` },
  { title: "Brokerage", description: siteConfig.brokerage.name },
  { title: "Office", description: siteConfig.brokerage.officeAddress },
  { title: "Focus Areas", description: "Relocation, military/VA, first-time buyers, and La Jolla-area coastal communities" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutPageSchema("/about"),
          breadcrumbSchema([{ name: "About", path: "/about" }]),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About" }]} />
      </div>

      <PageHero
        kicker="About SDCommunities"
        headline="A San Diego Neighborhood Guide Built for Buyers, Not Portals"
        subheadline="SDCommunities exists to answer one question well: which San Diego neighborhood actually fits your budget, commute, and lifestyle, before you start touring homes."
        primaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "Compare Neighborhoods", href: "/" }}
        heroImage={marketingHeroes.contact.src}
        heroImageAlt={marketingHeroes.contact.alt}
      />

      <Section kicker="The Agent">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:items-start">
          <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-2xl lg:w-full">
            <Image
              src={siteConfig.agent.photo}
              alt={siteConfig.agent.name}
              fill
              sizes="(max-width: 1024px) 192px, 240px"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="heading-section text-cabernet">{siteConfig.agent.name}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-espresso/90">{siteConfig.agent.bio}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-espresso/90">
              This site is built around the same question every relocating buyer asks first: &quot;which
              neighborhood is actually right for me?&quot; Rather than another portal listing every San Diego
              ZIP code the same way, SDCommunities groups the region into buyer-decision guides, by
              commute, budget, lifestyle, and life stage, so you can shortlist areas before spending a
              weekend touring homes that don&apos;t fit.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {credentials.map((item) => (
                <Card key={item.title} accent="cabernet">
                  <h3 className="heading-card text-cabernet">{item.title}</h3>
                  <p className="mt-1 text-sm text-espresso/90">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section variant="sand" kicker="How This Site Works">
        <h2 className="heading-section text-cabernet">Buyer-First, Not SEO-First</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-espresso/90">
          SDCommunities is organized around 15 buyer-decision guides, covering relocation, military/VA
          moves, La Jolla subareas, affordability, county suburbs, condos, and new-luxury construction,
          plus a full directory of 43 individual neighborhood guides. Every page links to the next
          logical step in your research, from broad comparison to a specific home search.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-espresso/90">
          Explore the{" "}
          <Link href="/" className="text-cabernet hover:underline">San Diego Neighborhoods</Link> overview,
          the{" "}
          <Link href="/san-diego-neighborhood-map" className="text-cabernet hover:underline">
            interactive neighborhood map
          </Link>
          , or jump straight to{" "}
          <Link href="/la-jolla-real-estate-agent" className="text-cabernet hover:underline">
            working with an agent
          </Link>{" "}
          if you&apos;re ready to search.
        </p>
      </Section>

      <Section>
        <p className="max-w-3xl text-xs leading-relaxed text-espresso/70">{siteConfig.disclaimer}</p>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-espresso/70">{getSdmlsIdxDisclaimer()}</p>
      </Section>

      <CTABanner
        headline="Ready to Talk Through Your Move?"
        description="Book a free strategy call, no pressure, just neighborhood guidance and a plan."
      />
    </>
  );
}
