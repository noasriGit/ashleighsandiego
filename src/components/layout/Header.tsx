import Image from "next/image";
import Link from "next/link";
import { HeaderInteractive } from "@/components/layout/HeaderInteractive";
import { siteConfig } from "@/data/site-config";

function navLinkLabel(item: (typeof siteConfig.nav)[number], compact = false) {
  if (compact && "shortLabel" in item && item.shortLabel) {
    return item.shortLabel;
  }
  return item.label;
}

export function Header() {
  return (
    <header className="site-header relative sticky top-0 z-50 border-b border-surface-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-4 pr-16 sm:px-6 sm:pr-20 lg:px-8 lg:pr-8">
        <Link
          href="/"
          className="mr-6 flex shrink-0 items-center lg:mr-10"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/images/berkshirelogo.webp"
            alt="Berkshire Hathaway HomeServices California Properties"
            width={220}
            height={52}
            sizes="(max-width: 640px) 190px, 220px"
            className="block h-9 w-auto max-w-[190px] object-contain object-left sm:h-10 sm:max-w-[220px]"
          />
        </Link>

        <nav
          className="ml-auto hidden min-w-0 items-center divide-x divide-espresso/15 lg:flex"
          aria-label="Main navigation"
        >
          {siteConfig.nav.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap px-4 text-sm text-espresso transition-colors hover:text-cabernet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2 xl:px-5"
            >
              {navLinkLabel(item, true)}
            </Link>
          ))}
          <Link
            href="/contact"
            className="shrink-0 whitespace-nowrap px-4 text-sm font-medium text-cabernet transition-colors hover:text-cabernet/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cabernet focus-visible:ring-offset-2 xl:px-5"
          >
            Book a Call
          </Link>
        </nav>
      </div>

      <HeaderInteractive items={siteConfig.nav} />
    </header>
  );
}
