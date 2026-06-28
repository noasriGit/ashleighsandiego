import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AgentContactCard } from "@/components/layout/AgentContactCard";
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
  /** Intrinsic pixel size of the background photo (preserves aspect ratio). */
  backgroundImageWidth?: number;
  backgroundImageHeight?: number;
  /** How the background photo fills the hero area. */
  backgroundImageFit?: "cover" | "contain";
  /** Tailwind object-position class(es) for the background photo (cover mode). */
  backgroundImagePosition?: string;
  /** Horizontal pan (%). Negative shifts the photo left so the subject sits further left. */
  backgroundImagePanX?: number;
  /** Optional scale/origin classes for the background photo (cover mode). */
  backgroundImageScale?: string;
  /** Override the default gradient (used to theme heroes per page/community). */
  gradientClassName?: string;
  /** Small pills rendered under the subheadline (e.g. lifestyle tags). */
  badges?: string[];
  layout?: "centered" | "left" | "right";
  size?: "default" | "display";
  /** Fill the viewport below the sticky site header (homepage-style heroes). */
  fullViewport?: boolean;
  /** Show agent contact card under the headline on mobile. */
  mobileContactCard?: boolean;
  className?: string;
};

const DEFAULT_GRADIENT = "bg-gradient-to-br from-cabernet via-cabernet to-espresso";

/** Tailwind object-position utilities → CSS object-position values. */
function toObjectPosition(position: string): string {
  if (position.startsWith("object-[")) {
    return position.slice(7, -1).replace(/_/g, " ");
  }

  const preset: Record<string, string> = {
    "object-center": "center center",
    "object-top": "center top",
    "object-bottom": "center bottom",
    "object-left": "left center",
    "object-right": "right center",
    "object-left-top": "left top",
    "object-left-bottom": "left bottom",
    "object-right-top": "right top",
    "object-right-bottom": "right bottom",
  };

  return preset[position] ?? "center center";
}

export function Hero({
  headline,
  subheadline,
  kicker,
  primaryCta,
  secondaryCta,
  backgroundImage,
  backgroundImageAlt = "",
  backgroundImageWidth,
  backgroundImageHeight,
  backgroundImageFit = "cover",
  backgroundImagePosition = "object-center",
  backgroundImagePanX,
  backgroundImageScale,
  gradientClassName,
  badges,
  layout = "centered",
  size = "default",
  fullViewport = false,
  mobileContactCard = false,
  className,
}: HeroProps) {
  const hasImage = Boolean(backgroundImage);
  const viewportHeight = "min-h-[calc(100dvh-var(--site-header-height))]";
  const isSideLayout = layout === "left" || layout === "right";
  const showMobileGradient = hasImage;

  return (
    <section
      data-page-hero
      className={cn(
        "relative overflow-hidden text-white [&_h1]:text-white",
        fullViewport && viewportHeight,
        (!hasImage || showMobileGradient) && (gradientClassName ?? DEFAULT_GRADIENT),
        className,
      )}
    >
      {hasImage ? (
        backgroundImageWidth &&
        backgroundImageHeight &&
        backgroundImageFit === "contain" ? (
          <div className="hero-enter-bg absolute inset-0 hidden overflow-hidden lg:block">
            <Image
              src={backgroundImage as string}
              alt={backgroundImageAlt}
              width={backgroundImageWidth}
              height={backgroundImageHeight}
              priority
              quality={75}
              sizes="100vw"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="hero-enter-bg absolute inset-0 hidden overflow-hidden lg:block">
            {backgroundImagePanX != null ? (
              <div
                className="absolute left-0 top-0 h-full w-[114%] max-w-none"
                style={{ transform: `translateX(${backgroundImagePanX}%)` }}
              >
                <Image
                  src={backgroundImage as string}
                  alt={backgroundImageAlt}
                  fill
                  priority
                  quality={75}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: toObjectPosition(backgroundImagePosition) }}
                />
              </div>
            ) : (
              <Image
                src={backgroundImage as string}
                alt={backgroundImageAlt}
                fill
                priority
                quality={75}
                sizes="100vw"
                className={cn(
                  "object-cover",
                  backgroundImagePosition,
                  backgroundImageScale,
                )}
              />
            )}
          </div>
        )
      ) : (
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/images/coastal-pattern.svg')" }}
        />
      )}

      {showMobileGradient && (
        <div
          className="absolute inset-0 opacity-10 lg:hidden"
          style={{ backgroundImage: "url('/images/coastal-pattern.svg')" }}
        />
      )}

      <Container
        className={cn(
          "relative",
          fullViewport
            ? cn(
                "flex flex-col justify-center py-12 sm:py-16",
                viewportHeight,
                layout === "left" && "items-start",
                layout === "right" && "max-lg:items-start lg:items-end",
              )
            : size === "display"
              ? "py-24 sm:py-36"
              : "py-20 sm:py-28",
        )}
      >
        <div
          className={cn(
            isSideLayout
              ? "w-full max-w-xl sm:max-w-2xl lg:max-w-[34rem]"
              : "max-w-3xl",
            layout === "right" && "max-lg:mr-auto max-lg:text-left lg:ml-auto lg:text-right",
            hasImage &&
              cn(
                "rounded-2xl p-8 shadow-lg backdrop-blur-sm sm:p-10",
                "max-lg:bg-gradient-to-br max-lg:from-espresso/95 max-lg:via-cabernet/90 max-lg:to-cabernet/85",
                layout === "left"
                  ? "lg:bg-gradient-to-r lg:from-espresso/92 lg:via-cabernet/88 lg:to-cabernet/80"
                  : layout === "right"
                    ? "lg:bg-gradient-to-l lg:from-espresso/92 lg:via-cabernet/88 lg:to-cabernet/80"
                    : "lg:bg-gradient-to-br lg:from-espresso/90 lg:via-cabernet/85 lg:to-cabernet/80",
              ),
            "hero-enter-up hero-enter-up--panel",
          )}
        >
          {kicker && (
            <p className="hero-enter-up hero-enter-up--1 mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
              {kicker}
            </p>
          )}
          <h1
            className={cn(
              "hero-enter-up text-white",
              kicker ? "hero-enter-up--2" : "hero-enter-up--1",
              size === "display" ? "heading-display" : "heading-hero",
            )}
          >
            {headline}
          </h1>

          {mobileContactCard && (
            <div
              className={cn(
                "hero-enter-up mt-5 lg:hidden",
                kicker ? "hero-enter-up--3" : "hero-enter-up--2",
              )}
            >
              <AgentContactCard variant="inline" />
            </div>
          )}

          <p
            className={cn(
              "hero-enter-up mt-6 text-lg leading-relaxed text-white/90 sm:text-xl",
              mobileContactCard
                ? kicker
                  ? "hero-enter-up--4"
                  : "hero-enter-up--3"
                : kicker
                  ? "hero-enter-up--3"
                  : "hero-enter-up--2",
            )}
          >
            {subheadline}
          </p>
          {badges && badges.length > 0 && (
            <ul
              className={cn(
                "hero-enter-up mt-6 flex flex-wrap gap-2",
                kicker ? "hero-enter-up--4" : "hero-enter-up--3",
                layout === "right" && "max-lg:justify-start lg:justify-end",
              )}
            >
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
            <div
              className={cn(
                "hero-enter-up mt-8 flex flex-col gap-4",
                layout === "right"
                  ? "max-lg:items-start lg:flex-row lg:justify-center lg:text-center"
                  : "sm:flex-row sm:justify-center",
                badges && badges.length > 0
                  ? "hero-enter-up--5"
                  : kicker
                    ? "hero-enter-up--4"
                    : "hero-enter-up--3",
                isSideLayout && layout !== "right" && "text-center",
              )}
            >
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
