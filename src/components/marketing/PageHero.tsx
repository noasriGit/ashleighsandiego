import { Hero } from "@/components/marketing/Hero";

type PageHeroProps = {
  headline: string;
  subheadline: string;
  kicker?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Optional hero photo. When omitted (or fallbackGradient), the brand gradient shows. */
  heroImage?: string;
  heroImageAlt?: string;
  /** Kept for call-site clarity; the gradient always renders when no image is set. */
  fallbackGradient?: boolean;
  /** Theme the fallback gradient (e.g. per-community color identity). */
  gradientClassName?: string;
  /** Small pills under the subheadline (e.g. lifestyle tags). */
  badges?: string[];
  layout?: "centered" | "asymmetric";
  size?: "default" | "display";
  className?: string;
};

/**
 * Content-page hero. Renders a full-bleed photo with a brand overlay when
 * `heroImage` is supplied, otherwise falls back to the Cabernet gradient so
 * every page works before photography is added.
 */
export function PageHero({
  headline,
  subheadline,
  kicker,
  primaryCta,
  secondaryCta,
  heroImage,
  heroImageAlt = "",
  fallbackGradient = true,
  gradientClassName,
  badges,
  layout = "centered",
  size = "default",
  className,
}: PageHeroProps) {
  return (
    <Hero
      headline={headline}
      subheadline={subheadline}
      kicker={kicker}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      backgroundImage={heroImage}
      backgroundImageAlt={heroImageAlt}
      gradientClassName={gradientClassName}
      badges={badges}
      layout={layout}
      size={size}
      className={className}
    />
  );
}
