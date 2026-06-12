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
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(spacingStyles[spacing], variantStyles[variant], className)}
    >
      <Container className={containerClassName}>
        {kicker && <p className="kicker mb-3">{kicker}</p>}
        {children}
      </Container>
    </section>
  );
}
