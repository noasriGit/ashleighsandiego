import Image from "next/image";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionVariant =
  | "default"
  | "sand"
  | "pearl"
  | "navy"
  | "cabernet"
  | "espresso";
type SectionSpacing = "default" | "tight" | "loose" | "none";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  variant?: SectionVariant;
  spacing?: SectionSpacing;
  /** Manrope uppercase label rendered above the section content. */
  kicker?: string;
  /** Full-bleed background photo with a dark variant overlay. */
  backgroundImage?: string;
  backgroundImageAlt?: string;
};

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-background",
  sand: "bg-rose/40",
  pearl: "bg-white",
  // `navy` retained as a backward-compatible alias of the dark cabernet band.
  navy: "bg-cabernet text-white [&_h2]:text-white [&_h3]:text-white",
  cabernet: "bg-cabernet text-white [&_h2]:text-white [&_h3]:text-white",
  espresso: "bg-espresso text-white [&_h2]:text-white [&_h3]:text-white",
};

const spacingStyles: Record<SectionSpacing, string> = {
  default: "py-16 sm:py-20",
  tight: "py-10 sm:py-12",
  loose: "py-20 sm:py-28",
  none: "",
};

export function Section({
  children,
  className,
  containerClassName,
  id,
  variant = "default",
  spacing = "default",
  kicker,
  backgroundImage,
  backgroundImageAlt,
}: SectionProps) {
  const hasBackgroundImage = Boolean(backgroundImage);
  const isDarkText = variant === "navy" || variant === "cabernet" || variant === "espresso";

  return (
    <section
      id={id}
      className={cn(
        spacingStyles[spacing],
        hasBackgroundImage && isDarkText
          ? "relative overflow-hidden text-white [&_h2]:text-white [&_h3]:text-white"
          : variantStyles[variant],
        className,
      )}
    >
      {hasBackgroundImage && (
        <>
          <Image
            src={backgroundImage as string}
            alt={backgroundImageAlt ?? ""}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className={cn(
              "absolute inset-0",
              variant === "espresso" && "bg-espresso/90",
              variant === "cabernet" && "bg-cabernet/90",
              variant === "navy" && "bg-cabernet/90",
              !isDarkText && "bg-espresso/90",
            )}
            aria-hidden
          />
        </>
      )}
      <Container className={cn(hasBackgroundImage && "relative z-10", containerClassName)}>
        {kicker && <p className="kicker mb-3">{kicker}</p>}
        {children}
      </Container>
    </section>
  );
}
