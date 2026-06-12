import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type SplitSectionProps = {
  kicker?: string;
  heading: string;
  body?: string | string[];
  children?: React.ReactNode;
  cta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  /** Width of the image column as a percentage of the row. */
  imageRatio?: 40 | 50 | 60;
  /** Background treatment for the whole band. */
  variant?: "default" | "sand" | "pearl";
  id?: string;
  className?: string;
};

const ratioToCols: Record<number, string> = {
  40: "lg:grid-cols-[2fr_3fr]",
  50: "lg:grid-cols-2",
  60: "lg:grid-cols-[3fr_2fr]",
};

const variantBg: Record<string, string> = {
  default: "bg-background",
  sand: "bg-rose/40",
  pearl: "bg-white",
};

export function SplitSection({
  kicker,
  heading,
  body,
  children,
  cta,
  imageSrc,
  imageAlt = "",
  imagePosition = "right",
  imageRatio = 50,
  variant = "default",
  id,
  className,
}: SplitSectionProps) {
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];
  const imageFirst = imagePosition === "left";

  const media = (
    <div
      className={cn(
        "relative min-h-64 overflow-hidden rounded-2xl lg:min-h-full",
        imageFirst ? "lg:order-first" : "lg:order-last",
      )}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-cabernet via-earth to-espresso">
          <div className="absolute inset-0 bg-[url('/images/coastal-pattern.svg')] bg-cover opacity-20" />
        </div>
      )}
    </div>
  );

  const text = (
    <div className="flex flex-col justify-center">
      {kicker && <p className="kicker mb-3">{kicker}</p>}
      <h2 className="heading-section text-cabernet">{heading}</h2>
      {paragraphs.length > 0 && (
        <div className="mt-4 space-y-4 leading-relaxed text-espresso/90">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      )}
      {children && <div className="mt-6">{children}</div>}
      {cta && (
        <div className="mt-8">
          <Button href={cta.href}>{cta.label}</Button>
        </div>
      )}
    </div>
  );

  return (
    <section id={id} className={cn("py-16 sm:py-20", variantBg[variant], className)}>
      <Container>
        <Reveal>
          <div className={cn("grid items-stretch gap-10 lg:gap-14", ratioToCols[imageRatio])}>
            {imageFirst ? (
              <>
                {media}
                {text}
              </>
            ) : (
              <>
                {text}
                {media}
              </>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
