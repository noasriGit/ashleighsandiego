import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type FeatureItem = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

type FeatureHighlightProps = {
  items: FeatureItem[];
  columns?: 2 | 3;
  className?: string;
};

function DefaultIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

export function FeatureHighlight({ items, columns = 3, className }: FeatureHighlightProps) {
  return (
    <Reveal>
      <div
        className={cn(
          "grid gap-8",
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
          className,
        )}
      >
        {items.map((item) => (
          <div key={item.title} className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose text-cabernet">
              {item.icon ?? <DefaultIcon />}
            </span>
            <div>
              <h3 className="heading-card text-cabernet">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-espresso/90">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
