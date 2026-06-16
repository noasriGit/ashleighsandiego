import { PageHero } from "@/components/marketing/PageHero";
import { BuyerQuestionnaire } from "@/components/forms/BuyerQuestionnaire";
import { CustomSearchForm } from "@/components/forms/CustomSearchForm";
import { AgentContactCard } from "@/components/layout/AgentContactCard";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site-config";
import { marketingHeroes } from "@/data/page-images";
import { generatePageMetadata } from "@/lib/metadata";
import { realEstateAgentSchema, webPageSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata = generatePageMetadata({
  title: "Contact | Book a Free San Diego Buyer Strategy Call",
  description:
    "Book a free San Diego relocation buyer strategy call. Share your timeline, budget, and neighborhood preferences.",
  path: "/contact",
});

function BookingEmbed() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_EMBED_URL;

  if (bookingUrl) {
    return (
      <Card className="overflow-hidden p-0">
        <iframe
          src={bookingUrl}
          title="Book a strategy call"
          className="h-[600px] w-full border-0"
          loading="lazy"
        />
      </Card>
    );
  }

  return (
    <Card className="border-dashed border-cabernet/30 bg-rose/30">
      <h3 className="heading-card text-cabernet">Schedule Your Strategy Call</h3>
      <p className="mt-2 text-espresso/90">
        Booking calendar will appear here once connected. In the meantime, submit the buyer questionnaire below or reach out directly:
      </p>
      <div className="mt-4 space-y-1 text-espresso/90">
        <p>Email: {siteConfig.agent.email}</p>
        <p>Phone: {siteConfig.agent.phone}</p>
      </div>
    </Card>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          realEstateAgentSchema(),
          webPageSchema(
            "Contact - Book a Strategy Call",
            "Book a free San Diego buyer strategy call.",
            "/contact",
          ),
          breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact" }]} />
      </div>

      <PageHero
        kicker="Let's Talk"
        headline="Book a Free San Diego Buyer Strategy Call"
        subheadline="Share your relocation timeline, budget, and neighborhood preferences. We'll help you build a clear home-buying plan."
        heroImage={marketingHeroes.contact.src}
        heroImageAlt={marketingHeroes.contact.alt}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] xl:gap-14">
          <div>
            <h2 className="heading-section text-cabernet">Schedule a Call</h2>
            <div className="mt-6">
              <BookingEmbed />
            </div>
            <div className="mt-10">
              <BuyerQuestionnaire />
            </div>
          </div>
          <div>
            <AgentContactCard variant="sidebar" className="sidebar-sticky" />
          </div>
        </div>
      </Section>

      <Section variant="sand" kicker="Prefer Email?">
        <h2 className="heading-section text-cabernet">{siteConfig.ctas.customSearch}</h2>
        <p className="mt-2 max-w-2xl text-espresso/90">
          Not ready for a call? Tell us your criteria and we&apos;ll send matching listings.
        </p>
        <div className="mt-6">
          <CustomSearchForm />
        </div>
      </Section>
    </>
  );
}
