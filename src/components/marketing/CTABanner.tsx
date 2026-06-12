import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

type CTABannerProps = {
  headline: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "default" | "navy";
};

export function CTABanner({
  headline,
  description,
  ctaLabel = "Book a Free Buyer Strategy Call",
  ctaHref = "/contact",
  variant = "navy",
}: CTABannerProps) {
  return (
    <Section variant={variant}>
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className={cn(
            "heading-section",
            variant === "navy" ? "text-white" : "text-cabernet",
          )}
        >
          {headline}
        </h2>
        {description && (
          <p className="mt-4 text-lg opacity-90">{description}</p>
        )}
        <Button href={ctaHref} variant="secondary" size="lg" className="mt-8">
          {ctaLabel}
        </Button>
      </div>
    </Section>
  );
}
