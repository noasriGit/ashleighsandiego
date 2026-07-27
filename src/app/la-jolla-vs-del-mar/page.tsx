import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { CTABanner } from "@/components/marketing/CTABanner";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { marketingHeroes } from "@/data/page-images";
import { getKeywordsForPage } from "@/data/keywords";
import { generatePageMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "La Jolla vs Del Mar | Which Coastal Community Fits You?",
  description:
    "A side-by-side comparison of La Jolla and Del Mar: median price, housing stock, HOA prevalence, beach access, commute, and who each community suits.",
  path: "/la-jolla-vs-del-mar",
  keywords: getKeywordsForPage("/la-jolla-vs-del-mar"),
});

const comparisonRows: { factor: string; laJolla: string; delMar: string }[] = [
  { factor: "Housing stock", laJolla: "Mix of condos, mid-century homes, and coastal estates", delMar: "Mostly single-family, with limited condo inventory" },
  { factor: "HOA prevalence", laJolla: "Common in Village and Shores condo buildings", delMar: "Less common; mostly HOA-free single-family streets" },
  { factor: "Beach access & type", laJolla: "Multiple beaches, including La Jolla Cove and Shores", delMar: "Single main beach and dog beach, more compact stretch" },
  { factor: "Commute to UTC / Downtown", laJolla: "Closer to UTC, roughly 30-40 min to Downtown", delMar: "Closer to North County job centers, 35-45 min to Downtown" },
  { factor: "Walkability", laJolla: "Village core is highly walkable with shops and dining", delMar: "Village is walkable but smaller in scale" },
  { factor: "Coastal conditions", laJolla: "Rocky coves alongside sandy stretches; tide-pool access", delMar: "Sandy beach with bluff-top neighborhoods above" },
];

export default function LaJollaVsDelMarPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: "La Jolla vs Del Mar",
            description: "A side-by-side comparison of La Jolla and Del Mar for home buyers.",
            path: "/la-jolla-vs-del-mar",
          }),
          breadcrumbSchema([{ name: "La Jolla vs Del Mar", path: "/la-jolla-vs-del-mar" }]),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "La Jolla vs Del Mar" }]} />
      </div>

      <PageHero
        kicker="Coastal Comparison"
        headline="La Jolla vs Del Mar: Which Fits You?"
        subheadline="Both are premier San Diego coastal communities. The right one depends on housing type, commute, and the kind of beach town you want."
        primaryCta={{ label: "Still Deciding? Book a Call", href: "/contact" }}
        secondaryCta={{ label: "Explore La Jolla", href: "/la-jolla-neighborhoods" }}
        heroImage={marketingHeroes.movingToLaJolla.src}
        heroImageAlt={marketingHeroes.movingToLaJolla.alt}
      />

      <Section>
        <p className="max-w-2xl text-lg text-espresso/90">
          Both La Jolla and Del Mar offer premium coastal living, upscale dining, and strong long-term
          value. La Jolla offers more housing variety, including condos, and a larger village core.
          Del Mar offers a smaller, more single-family-dominated footprint with a tighter-knit village
          feel centered around the fairgrounds and racetrack.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-2xl text-left text-sm">
            <thead>
              <tr className="bg-cabernet text-white">
                <th className="p-4 font-semibold">Factor</th>
                <th className="p-4 font-semibold">La Jolla</th>
                <th className="p-4 font-semibold">Del Mar</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.factor} className={i % 2 === 0 ? "bg-white" : "bg-rose/30"}>
                  <td className="p-4 font-semibold text-cabernet">{row.factor}</td>
                  <td className="p-4 text-espresso/90">{row.laJolla}</td>
                  <td className="p-4 text-espresso/90">{row.delMar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="heading-card text-cabernet">Who La Jolla Suits</h2>
            <p className="mt-2 text-sm leading-relaxed text-espresso/90">
              Buyers who want more housing-type flexibility (condos and single-family), a larger
              walkable village, and closer proximity to UTC and UCSD.
            </p>
          </div>
          <div>
            <h2 className="heading-card text-cabernet">Who Del Mar Suits</h2>
            <p className="mt-2 text-sm leading-relaxed text-espresso/90">
              Buyers focused on single-family homes, a compact village scale, and North County
              proximity, with less day-to-day reliance on condo-style living.
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-espresso/90">
          Ready to go deeper? Explore{" "}
          <Link href="/la-jolla-neighborhoods" className="text-cabernet hover:underline">
            La Jolla&apos;s 8 subareas
          </Link>{" "}
          or{" "}
          <Link href="/del-mar-new-luxury-homes" className="text-cabernet hover:underline">
            Del Mar new construction &amp; luxury homes
          </Link>
          . Considering a La Jolla condo instead of a single-family home?{" "}
          <Link href="/la-jolla-condos-for-sale" className="text-cabernet hover:underline">
            See the La Jolla condo guide
          </Link>
          .
        </p>

        <p className="mt-6 max-w-2xl text-espresso/90">
          Whichever direction you lean, both markets carry a premium and move quickly when well-priced
          inventory appears. If you&apos;re still deciding,{" "}
          <Link href="/contact" className="text-cabernet hover:underline">
            a short strategy call
          </Link>{" "}
          can map the trade-offs to your specific budget and must-haves.
        </p>
      </Section>

      <CTABanner
        headline="Still Deciding Between La Jolla and Del Mar?"
        description="Book a free strategy call to talk through the trade-offs for your specific situation."
        ctaLabel="Book a Strategy Call"
      />
    </>
  );
}
