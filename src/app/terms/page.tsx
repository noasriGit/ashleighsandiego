import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Terms & Disclaimer",
  description: "Terms of use and disclaimer for San Diego Relocation Home Guide.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Terms & Disclaimer" }]} />
      </div>

      <Section>
        <h1 className="heading-display text-cabernet">Terms & Disclaimer</h1>
        <div className="mt-8 max-w-3xl space-y-6 text-espresso/90">
          <p>{siteConfig.disclaimer}</p>

          <h2 className="heading-card text-cabernet">Website Terms</h2>
          <p>
            By using this website, you agree that all information provided is for general guidance
            purposes only. Neighborhood descriptions, market conditions, and availability of homes
            may change without notice.
          </p>

          <h2 className="heading-card text-cabernet">Not Professional Advice</h2>
          <p>
            Content on this website is not intended as legal, tax, lending, or financial advice.
            Consult licensed professionals for advice specific to your situation. For VA loan
            eligibility and financing questions, consult a licensed VA-approved lender.
          </p>

          <h2 className="heading-card text-cabernet">Real Estate Services</h2>
          <p>
            Real estate services are provided by {siteConfig.agent.name}, California DRE #
            {siteConfig.agent.dreNumber}, affiliated with {siteConfig.brokerage.name}.
          </p>

          <h2 className="heading-card text-cabernet">Equal Housing Opportunity</h2>
          <p>
            We are pledged to the letter and spirit of U.S. policy for the achievement of equal
            housing opportunity throughout the Nation. We encourage and support an affirmative
            advertising and marketing program in which there are no barriers to obtaining housing
            because of race, color, religion, sex, handicap, familial status, or national origin.
          </p>

          <h2 className="heading-card text-cabernet">IDX / MLS Data</h2>
          <p>
            Property listing data displayed on this website, when available, is deemed reliable but
            is not guaranteed accurate by the MLS. All information should be independently verified.
          </p>
        </div>
      </Section>
    </>
  );
}
