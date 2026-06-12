import { cn } from "@/lib/utils";

type CalloutType = "quote" | "tip" | "stat";

type CalloutBlockProps = {
  children: React.ReactNode;
  type?: CalloutType;
  /** Small label shown above the content (e.g. "Good to know.®", attribution). */
  label?: string;
  className?: string;
};

const typeLabel: Record<CalloutType, string> = {
  quote: "",
  tip: "Good to know.®",
  stat: "By the numbers",
};

export function CalloutBlock({
  children,
  type = "tip",
  label,
  className,
}: CalloutBlockProps) {
  const resolvedLabel = label ?? typeLabel[type];

  return (
    <aside
      className={cn(
        "rounded-r-xl border-l-4 border-cabernet bg-rose/40 px-6 py-5",
        className,
      )}
    >
      {resolvedLabel && (
        <p className="kicker mb-2">{resolvedLabel}</p>
      )}
      <div
        className={cn(
          "leading-relaxed text-espresso",
          type === "quote" && "font-display text-xl italic sm:text-2xl",
        )}
      >
        {children}
      </div>
    </aside>
  );
}
