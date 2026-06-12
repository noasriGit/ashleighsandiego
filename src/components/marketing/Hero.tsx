import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type HeroProps = {
  headline: string;
  subheadline: string;
  kicker?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Optional full-bleed background photo. Falls back to the brand gradient. */
  backgroundImage?: string;
  backgroundImageAlt?: string;
  /** Override the default gradient (used to theme heroes per page/community). */
  gradientClassName?: string;
  /** Small pills rendered under the subheadline (e.g. lifestyle tags). */
  badges?: string[];
  layout?: "centered" | "asymmetric";
  size?: "default" | "display";
  className?: string;
};

const DEFAULT_GRADIENT = "bg-gradient-to-br from-cabernet via-cabernet to-espresso";

export function Hero({
  headline,
  subheadline,
  kicker,
  primaryCta,
  secondaryCta,
  backgroundImage,
  backgroundImageAlt = "",
  gradientClassName,
  badges,
  layout = "centered",
  size = "default",
  className,
}: HeroProps) {
  const hasImage = Boolean(backgroundImage);

  return (
    <section
      className={cn(
        "relative overflow-hidden text-white [&_h1]:text-white",
        !hasImage && (gradientClassName ?? DEFAULT_GRADIENT),
        className,
      )}
    >
      {hasImage ? (
        <>
          <Image
            src={backgroundImage as string}
            alt={backgroundImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-espresso/85 via-cabernet/75 to-cabernet/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[url('/images/coastal-pattern.svg')] opacity-10" />
      )}

      <Container
        className={cn(
          "relative",
          size === "display" ? "py-24 sm:py-36" : "py-20 sm:py-28",
        )}
      >
        <div
          className={cn(
            layout === "asymmetric"
              ? "max-w-2xl lg:max-w-3xl"
              : "max-w-3xl",
          )}
        >
          {kicker && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
              {kicker}
            </p>
          )}
          <h1
            className={cn(
              "text-white",
              size === "display" ? "heading-display" : "heading-hero",
            )}
          >
            {headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/90 sm:text-xl">
            {subheadline}
          </p>
          {badges && badges.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur"
                >
                  {badge}
                </li>
              ))}
            </ul>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {primaryCta && (
                <Button href={primaryCta.href} variant="secondary" size="lg">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-cabernet"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
