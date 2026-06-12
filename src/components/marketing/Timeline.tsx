import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type TimelineStep = {
  step?: number;
  title: string;
  description: string;
};

type TimelineProps = {
  title?: string;
  intro?: string;
  kicker?: string;
  steps: TimelineStep[];
  variant?: "default" | "sand" | "pearl";
};

export function Timeline({
  title,
  intro,
  kicker,
  steps,
  variant = "default",
}: TimelineProps) {
  return (
    <Section variant={variant} kicker={kicker}>
      {title && <h2 className="heading-section text-cabernet">{title}</h2>}
      {intro && <p className="mt-3 max-w-2xl text-espresso/90">{intro}</p>}

      <ol className="mt-12 space-y-0">
        {steps.map((step, index) => {
          const number = step.step ?? index + 1;
          const isLast = index === steps.length - 1;

          return (
            <li key={step.title} className="relative flex gap-6 pb-12 last:pb-0">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-[1.4375rem] top-12 h-[calc(100%-3rem)] w-px bg-cabernet/30"
                />
              )}
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cabernet font-display text-lg text-white shadow-sm">
                {number}
              </span>
              <Reveal className="pt-1.5" delay={index * 60}>
                <h3 className="heading-card text-cabernet">{step.title}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-espresso/90">
                  {step.description}
                </p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
