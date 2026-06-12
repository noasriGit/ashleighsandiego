import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

type Audience = {
  title: string;
  description: string;
  href?: string;
};

type AudienceCardsProps = {
  title?: string;
  audiences: Audience[];
};

export function AudienceCards({
  title = "Who This Guide Is For",
  audiences,
}: AudienceCardsProps) {
  return (
    <Section>
      <h2 className="heading-section text-cabernet">{title}</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((audience) => (
          <Card key={audience.title} hover accent="cabernet">
            <h3 className="heading-card text-cabernet">{audience.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-espresso/90">{audience.description}</p>
            {audience.href && (
              <Link href={audience.href} className="mt-4 inline-block text-sm font-medium text-cabernet hover:underline">
                Learn more &rarr;
              </Link>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
