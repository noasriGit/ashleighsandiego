import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for San Diego Relocation Home Guide.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      </div>

      <Section>
        <h1 className="heading-display text-cabernet">Privacy Policy</h1>
        <div className="mt-8 max-w-3xl space-y-6 text-espresso/90">
          <p>
            This Privacy Policy describes how {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            collects, uses, and protects information when you visit our website or submit forms.
          </p>

          <h2 className="heading-card text-cabernet">Information We Collect</h2>
          <p>
            When you submit a contact form, buyer questionnaire, or lead magnet request, we collect
            information you provide such as your name, email address, phone number, and details about
            your home search preferences.
          </p>

          <h2 className="heading-card text-cabernet">How We Use Your Information</h2>
          <p>
            We use your information to respond to your inquiries, provide buyer guidance, send requested
            resources, and improve our services. We do not sell your personal information to third parties.
          </p>

          <h2 className="heading-card text-cabernet">Third-Party Services</h2>
          <p>
            Our website may use analytics services (Google Analytics, Google Tag Manager), advertising
            pixels (Meta Pixel), and CRM integrations. These services may collect usage data according
            to their own privacy policies.
          </p>

          <h2 className="heading-card text-cabernet">Contact</h2>
          <p>
            For privacy-related questions, contact {siteConfig.agent.name} at {siteConfig.agent.email}.
          </p>

          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>
      </Section>
    </>
  );
}
