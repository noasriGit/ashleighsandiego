import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const AGENT_CARD_IMAGE = siteConfig.agent.photo;

function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:+1${digits.replace(/^1/, "")}` : undefined;
}

type AgentContactCardProps = {
  id?: string;
  className?: string;
  /** Compact horizontal layout for hero mobile. */
  variant?: "stacked" | "inline" | "sidebar";
  cta?: { label: string; href: string };
};

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
  );
}

function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function ContactField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="kicker mb-0.5">{label}</dt>
      <dd className="text-sm text-espresso/90">{children}</dd>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose/60 text-cabernet">
        {icon}
      </div>
      <div className="min-w-0">
        <dt className="kicker mb-0.5">{label}</dt>
        <dd className="text-sm text-espresso/90">{children}</dd>
      </div>
    </div>
  );
}

function ContactStripLink({
  icon,
  href,
  children,
  external,
}: {
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-cabernet transition-colors hover:text-cabernet/80 hover:underline"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="text-earth">{icon}</span>
      {children}
    </Link>
  );
}

function AgentPhotoBlock({
  variant,
  showMobileNameOverlay,
}: {
  variant: "stacked" | "inline" | "sidebar";
  showMobileNameOverlay?: boolean;
}) {
  const isInline = variant === "inline";
  const isSidebar = variant === "sidebar";

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden",
        isInline && "h-40 w-full sm:h-auto sm:w-36",
        variant === "stacked" && "h-40 w-full lg:h-auto lg:w-[38%] lg:shrink-0 lg:self-stretch",
        isSidebar && "h-52 w-full",
      )}
    >
      <div className="absolute inset-y-0 left-0 z-10 hidden w-1 bg-cabernet lg:block" aria-hidden />
      <Image
        src={AGENT_CARD_IMAGE}
        alt={siteConfig.agent.name}
        fill
        sizes={
          isInline
            ? "(max-width: 640px) 100vw, 144px"
            : isSidebar
              ? "(max-width: 1024px) 100vw, 340px"
              : "(max-width: 1024px) 100vw, 280px"
        }
        className={cn(
          "object-cover object-center",
          variant === "stacked" && "lg:object-[center_18%] lg:scale-[1.03]",
        )}
      />
      <div
        className={cn(
          "absolute inset-0",
          isInline &&
            "bg-gradient-to-t from-espresso/85 via-espresso/25 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-espresso/15 sm:to-espresso/60",
          variant === "stacked" &&
            "bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent lg:bg-gradient-to-r lg:from-espresso/5 lg:via-espresso/15 lg:to-espresso/50",
          isSidebar &&
            "bg-gradient-to-t from-espresso/90 via-espresso/35 to-transparent",
        )}
      />
      {showMobileNameOverlay && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white lg:hidden">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
            Your local guide
          </p>
          <h2 className="font-serif text-lg font-semibold leading-tight">
            {siteConfig.agent.name}
          </h2>
        </div>
      )}
      {isSidebar && (
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
            Your local guide
          </p>
          <h2 className="font-serif text-2xl font-semibold leading-tight">
            {siteConfig.agent.name}
          </h2>
        </div>
      )}
    </div>
  );
}

function InlineContent({ phoneLink }: { phoneLink: string | undefined }) {
  return (
    <div className="flex flex-1 flex-col justify-center p-4 sm:py-3">
      <div className="mb-3">
        <p className="kicker">Your local guide</p>
        <h2 className="font-serif text-lg font-semibold text-cabernet">
          {siteConfig.agent.name}
        </h2>
      </div>

      <p className="text-xs text-espresso/80 sm:text-sm">{siteConfig.brokerage.name}</p>

      <dl className="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
        <ContactField label="DRE #">{siteConfig.agent.dreNumber}</ContactField>
        <ContactField label="Phone">
          {phoneLink ? (
            <Link href={phoneLink} className="font-medium text-cabernet hover:underline">
              {siteConfig.agent.phone}
            </Link>
          ) : (
            siteConfig.agent.phone
          )}
        </ContactField>
        <ContactField label="Email" className="sm:col-span-2">
          <Link
            href={`mailto:${siteConfig.agent.email}`}
            className="break-all font-medium text-cabernet hover:underline"
          >
            {siteConfig.agent.email}
          </Link>
        </ContactField>
        <ContactField label="Instagram">
          <Link
            href={siteConfig.agent.instagram.url}
            className="font-medium text-cabernet hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.agent.instagram.handle}
          </Link>
        </ContactField>
        <ContactField label="Office" className="sm:col-span-2">
          {siteConfig.brokerage.officeAddress}
        </ContactField>
      </dl>
    </div>
  );
}

function StackedMobileContent({ phoneLink }: { phoneLink: string | undefined }) {
  return (
    <div className="flex flex-1 flex-col justify-center p-4 lg:hidden">
      <p className="text-xs text-espresso/80 sm:text-sm">{siteConfig.brokerage.name}</p>

      <dl className="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
        <ContactField label="DRE #">{siteConfig.agent.dreNumber}</ContactField>
        <ContactField label="Phone">
          {phoneLink ? (
            <Link href={phoneLink} className="font-medium text-cabernet hover:underline">
              {siteConfig.agent.phone}
            </Link>
          ) : (
            siteConfig.agent.phone
          )}
        </ContactField>
        <ContactField label="Email">
          <Link
            href={`mailto:${siteConfig.agent.email}`}
            className="break-all font-medium text-cabernet hover:underline"
          >
            {siteConfig.agent.email}
          </Link>
        </ContactField>
        <ContactField label="Instagram">
          <Link
            href={siteConfig.agent.instagram.url}
            className="font-medium text-cabernet hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.agent.instagram.handle}
          </Link>
        </ContactField>
        <ContactField label="Office" className="sm:col-span-2">
          {siteConfig.brokerage.officeAddress}
        </ContactField>
      </dl>
    </div>
  );
}

function StackedDesktopContent({
  phoneLink,
  cta,
}: {
  phoneLink: string | undefined;
  cta: { label: string; href: string };
}) {
  return (
    <div className="hidden flex-1 flex-col justify-center bg-gradient-to-br from-white to-pearl/60 p-5 lg:flex lg:p-6">
      <p className="kicker">Your local guide</p>
      <h2 className="font-serif text-xl font-semibold text-cabernet">
        {siteConfig.agent.name}
      </h2>
      <p className="mt-1 text-sm text-earth">{siteConfig.brokerage.name}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {phoneLink && (
          <ContactStripLink icon={<IconPhone className="h-4 w-4" />} href={phoneLink}>
            {siteConfig.agent.phone}
          </ContactStripLink>
        )}
        <ContactStripLink
          icon={<IconMail className="h-4 w-4" />}
          href={`mailto:${siteConfig.agent.email}`}
        >
          Email
        </ContactStripLink>
        <ContactStripLink
          icon={<IconInstagram className="h-4 w-4" />}
          href={siteConfig.agent.instagram.url}
          external
        >
          {siteConfig.agent.instagram.handle}
        </ContactStripLink>
      </div>

      <p className="mt-3 text-xs text-espresso/70">
        DRE #{siteConfig.agent.dreNumber} · {siteConfig.brokerage.officeAddress}
      </p>

      <Button href={cta.href} size="sm" className="mt-4 self-start">
        {cta.label}
      </Button>
    </div>
  );
}

function SidebarContent({
  phoneLink,
  cta,
}: {
  phoneLink: string | undefined;
  cta: { label: string; href: string };
}) {
  const firstName = siteConfig.agent.name.split(" ")[0];

  return (
    <div className="flex flex-col bg-white p-6">
      <p className="text-sm leading-relaxed text-espresso/80">{siteConfig.agent.bio}</p>

      <dl className="mt-5 space-y-4 border-t border-rose/40 pt-5">
        <ContactRow icon={<IconPhone className="h-4 w-4" />} label="Phone">
          {phoneLink ? (
            <Link href={phoneLink} className="font-medium text-cabernet hover:underline">
              {siteConfig.agent.phone}
            </Link>
          ) : (
            siteConfig.agent.phone
          )}
        </ContactRow>
        <ContactRow icon={<IconMail className="h-4 w-4" />} label="Email">
          <Link
            href={`mailto:${siteConfig.agent.email}`}
            className="break-all font-medium text-cabernet hover:underline"
          >
            {siteConfig.agent.email}
          </Link>
        </ContactRow>
        <ContactRow icon={<IconInstagram className="h-4 w-4" />} label="Instagram">
          <Link
            href={siteConfig.agent.instagram.url}
            className="font-medium text-cabernet hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.agent.instagram.handle}
          </Link>
        </ContactRow>
        <ContactRow icon={<IconMapPin className="h-4 w-4" />} label="Office">
          {siteConfig.brokerage.officeAddress}
        </ContactRow>
        <ContactRow icon={<span className="text-xs font-semibold">#</span>} label="DRE">
          {siteConfig.agent.dreNumber}
        </ContactRow>
      </dl>

      <Button href={cta.href} size="sm" className="mt-6 w-full">
        {cta.label}
      </Button>
      <Link
        href={`mailto:${siteConfig.agent.email}`}
        className="mt-3 text-center text-sm font-medium text-cabernet hover:underline"
      >
        Or email {firstName}
      </Link>
    </div>
  );
}

export function AgentContactCard({
  id,
  className,
  variant = "stacked",
  cta,
}: AgentContactCardProps) {
  const phoneLink = phoneHref(siteConfig.agent.phone);
  const isInline = variant === "inline";
  const isSidebar = variant === "sidebar";

  const resolvedCta =
    cta ??
    (isSidebar && phoneLink
      ? { label: `Call ${siteConfig.agent.name.split(" ")[0]}`, href: phoneLink }
      : { label: siteConfig.ctas.strategyCall, href: "/contact" });

  if (isSidebar) {
    return (
      <article
        id={id}
        className={cn(
          "overflow-hidden rounded-2xl bg-white text-espresso shadow-xl ring-1 ring-cabernet/10",
          className,
        )}
      >
        <AgentPhotoBlock variant="sidebar" />
        <SidebarContent phoneLink={phoneLink} cta={resolvedCta} />
      </article>
    );
  }

  return (
    <article
      id={id}
      className={cn(
        "overflow-hidden rounded-2xl bg-white text-espresso shadow-lg",
        isInline
          ? "flex flex-col border border-white/20 sm:flex-row"
          : "flex flex-col shadow-xl ring-1 ring-cabernet/10 lg:flex-row lg:items-stretch",
        className,
      )}
    >
      <AgentPhotoBlock variant={variant} showMobileNameOverlay={!isInline} />

      {isInline ? (
        <InlineContent phoneLink={phoneLink} />
      ) : (
        <>
          <StackedMobileContent phoneLink={phoneLink} />
          <StackedDesktopContent phoneLink={phoneLink} cta={resolvedCta} />
        </>
      )}
    </article>
  );
}
