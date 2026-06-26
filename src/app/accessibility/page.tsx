import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/data/site-config";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Accessibility Statement",
  description:
    "Accessibility statement for San Diego Relocation Home Guide. Learn about our accessibility efforts and how to report barriers.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  const phoneHref = `tel:${siteConfig.agent.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Accessibility" }]} />
      </div>

      <Section>
        <h1 className="heading-display text-cabernet">Accessibility Statement</h1>
        <div className="mt-8 max-w-3xl space-y-6 text-espresso/90">
          <p>
            {siteConfig.name} is committed to making our website accessible and usable for as many
            people as possible. We aim to follow generally recognized accessibility standards,
            including WCAG 2.1 AA and WCAG 2.2 AA where practical.
          </p>

          <p>
            We continue to review and improve this site for keyboard navigation, screen reader
            compatibility, color contrast, form usability, and clear page structure. Some areas may
            still need manual review or updates over time.
          </p>

          <h2 className="heading-card text-cabernet">Known Limitations</h2>
          <p>
            Some third-party tools and embedded services may not fully meet accessibility
            standards. These may include:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>MLS / IDX listing search and detail experiences hosted on external domains</li>
            <li>Online booking or scheduling widgets, when enabled</li>
            <li>Analytics, advertising, and marketing tracking scripts, when enabled</li>
          </ul>
          <p>
            If you encounter a barrier related to these services, please contact us and we will
            work with you to provide the information or assistance you need through an alternative
            method when possible.
          </p>

          <h2 className="heading-card text-cabernet">Feedback &amp; Assistance</h2>
          <p>
            If you experience difficulty accessing any part of this website, please contact us so
            we can assist you and work to address the issue. When contacting us, include the page
            URL and a brief description of the barrier you encountered.
          </p>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <a href={`mailto:${siteConfig.agent.email}`} className="text-cabernet hover:underline">
                {siteConfig.agent.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href={phoneHref} className="text-cabernet hover:underline">
                {siteConfig.agent.phone}
              </a>
            </li>
            <li>
              Contact page:{" "}
              <Link href="/contact" className="text-cabernet hover:underline">
                Book a strategy call or send a message
              </Link>
            </li>
          </ul>

          <h2 className="heading-card text-cabernet">Ongoing Improvements</h2>
          <p>
            Accessibility is an ongoing effort. We review site updates for usability and welcome
            feedback from visitors, clients, and assistive technology users. This statement may be
            updated as we make improvements.
          </p>

          <p className="text-sm text-espresso/70">
            Last updated: June 2026
          </p>
        </div>
      </Section>
    </>
  );
}
