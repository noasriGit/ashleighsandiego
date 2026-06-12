import { cn } from "@/lib/utils";

type CardVariant = "flat" | "outlined" | "filled";
type CardAccent = "cabernet" | "espresso" | "earth";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: CardVariant;
  accent?: CardAccent;
  elevated?: boolean;
};

const variantStyles: Record<CardVariant, string> = {
  flat: "border border-surface-muted bg-white",
  outlined: "border border-dove/40 bg-white",
  filled: "border border-rose bg-rose/30",
};

const accentStyles: Record<CardAccent, string> = {
  cabernet: "border-t-2 border-t-cabernet",
  espresso: "border-t-2 border-t-espresso",
  earth: "border-t-2 border-t-earth",
};

export function Card({
  children,
  className,
  hover = false,
  variant = "flat",
  accent,
  elevated = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        variantStyles[variant],
        elevated ? "shadow-md" : "shadow-sm",
        accent && accentStyles[accent],
        hover && "transition-shadow hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
