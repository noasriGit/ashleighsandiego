import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
};

export function Badge({ children, className, active, onClick }: BadgeProps) {
  const Component = onClick ? "button" : "span";

  return (
    <Component
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors",
        active
          ? "bg-cabernet text-white"
          : "bg-rose text-espresso hover:bg-blush/40",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </Component>
  );
}
