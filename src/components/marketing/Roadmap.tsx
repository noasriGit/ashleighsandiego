import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

type RoadmapStep = {
  step: number;
  title: string;
  description: string;
};

type RoadmapProps = {
  title?: string;
  steps: RoadmapStep[];
};

export function Roadmap({ title = "Your Relocation Buyer Roadmap", steps }: RoadmapProps) {
  return (
    <Section variant="sand">
      <h2 className="heading-section text-cabernet">{title}</h2>
      <p className="mt-3 max-w-2xl text-espresso/90">
        A clear plan helps you compare neighborhoods, understand your budget, and tour homes with confidence.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.step} className="relative" accent="cabernet">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cabernet text-lg font-bold text-white">
              {step.step}
            </span>
            <h3 className="mt-4 heading-card text-cabernet">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-espresso/90">{step.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
