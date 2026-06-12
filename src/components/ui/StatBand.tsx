import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Stat = {
  value: string;
  label: string;
};

type StatBandProps = {
  stats: Stat[];
  heading?: string;
  kicker?: string;
  variant?: "cabernet" | "espresso";
  className?: string;
};

const variantBg: Record<string, string> = {
  cabernet: "bg-cabernet",
  espresso: "bg-espresso",
};

export function StatBand({
  stats,
  heading,
  kicker,
  variant = "cabernet",
  className,
}: StatBandProps) {
  return (
    <section className={cn("py-14 text-white sm:py-16", variantBg[variant], className)}>
      <Container>
        <Reveal>
          {kicker && (
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
              {kicker}
            </p>
          )}
          {heading && (
            <h2 className="mb-10 text-center text-white">{heading}</h2>
          )}
          <dl
            className={cn(
              "grid gap-8 text-center",
              stats.length === 2 && "sm:grid-cols-2",
              stats.length === 3 && "sm:grid-cols-3",
              stats.length >= 4 && "grid-cols-2 lg:grid-cols-4",
            )}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl leading-tight break-words sm:text-4xl">
                  {stat.value}
                </dd>
                <p
                  aria-hidden="true"
                  className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/70"
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
