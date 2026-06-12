import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

type ContentBlock = {
  title: string;
  content: string;
  /** Optional anchor id for in-page table-of-contents linking. */
  id?: string;
  /** Optional Manrope uppercase label above the heading. */
  kicker?: string;
};

type ContentSectionsProps = {
  sections: ContentBlock[];
};

export function ContentSections({ sections }: ContentSectionsProps) {
  return (
    <Section>
      <div className="space-y-14">
        {sections.map((section) => (
          <div key={section.title} id={section.id} className="scroll-mt-28 max-w-3xl">
            {section.kicker && <p className="kicker mb-3">{section.kicker}</p>}
            <h2 className="heading-section text-cabernet">{section.title}</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-espresso/90">
              {section.content.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

type InfoGridProps = {
  items: { title: string; description: string }[];
};

export function InfoGrid({ items }: InfoGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <Card key={item.title} accent="cabernet" hover>
          <h3 className="heading-card text-cabernet">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-espresso/90">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
