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
  className,
}: HeroProps) {
  const hasImage = Boolean(backgroundImage);
  const viewportHeight = "min-h-[calc(100dvh-var(--site-header-height))]";
  const isSideLayout = layout === "left" || layout === "right";

  return (
    <section
      className={cn(
        "relative overflow-hidden text-white [&_h1]:text-white",
        fullViewport && viewportHeight,
        !hasImage && (gradientClassName ?? DEFAULT_GRADIENT),
        className,
      )}
    >
      {hasImage ? (
        backgroundImageWidth &&
        backgroundImageHeight &&
        backgroundImageFit === "contain" ? (
          <div className="hero-enter-bg absolute inset-0 overflow-hidden">
            <Image
              src={backgroundImage as string}
              alt={backgroundImageAlt}
              width={backgroundImageWidth}
              height={backgroundImageHeight}
              priority
              quality={90}
              sizes="100vw"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="hero-enter-bg absolute inset-0 overflow-hidden">
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
                  quality={90}
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
                quality={90}
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
        <div className="absolute inset-0 bg-[url('/images/coastal-pattern.svg')] opacity-10" />
      )}

      <Container
        className={cn(
          "relative",
          fullViewport
            ? cn(
                "flex flex-col justify-center py-12 sm:py-16",
                viewportHeight,
                layout === "left" && "items-start",
                layout === "right" && "items-end",
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
            layout === "right" && "ml-auto text-right",
            hasImage &&
              cn(
                "rounded-2xl p-8 shadow-lg backdrop-blur-sm sm:p-10",
                layout === "left"
                  ? "bg-gradient-to-r from-espresso/92 via-cabernet/88 to-cabernet/80"
                  : layout === "right"
                    ? "bg-gradient-to-l from-espresso/92 via-cabernet/88 to-cabernet/80"
                    : "bg-gradient-to-br from-espresso/90 via-cabernet/85 to-cabernet/80",
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
          <p
            className={cn(
              "hero-enter-up mt-6 text-lg leading-relaxed text-white/90 sm:text-xl",
              kicker ? "hero-enter-up--3" : "hero-enter-up--2",
            )}
          >
            {subheadline}
          </p>
          {badges && badges.length > 0 && (
            <ul
              className={cn(
                "hero-enter-up mt-6 flex flex-wrap gap-2",
                kicker ? "hero-enter-up--4" : "hero-enter-up--3",
                layout === "right" && "justify-end",
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
                "hero-enter-up mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center",
                badges && badges.length > 0
                  ? "hero-enter-up--5"
                  : kicker
                    ? "hero-enter-up--4"
                    : "hero-enter-up--3",
                isSideLayout && "text-center",
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
