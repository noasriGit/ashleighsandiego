import Image from "next/image";
import Link from "next/link";
import { getSdmlsIdxDisclaimer, siteConfig } from "@/data/site-config";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const { agent, brokerage, disclaimer, franchiseDisclaimer } = siteConfig;
  const year = new Date().getFullYear();
  const franchiseText = franchiseDisclaimer.replace("{year}", String(year));
  const sdmlsText = getSdmlsIdxDisclaimer();

  return (
    <footer className="mt-auto border-t border-surface-muted bg-cabernet text-white">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="min-w-0">
            <div className="relative mb-4 h-9 w-[148px] max-w-full">
              <Image
                src={brokerage.logoWhite}
                alt={brokerage.name}
                fill
                sizes="148px"
                className="object-contain object-left"
              />
            </div>
            <h3 className="font-serif text-lg font-semibold leading-snug text-white">{siteConfig.name}</h3>
            <p className="mt-2 text-sm break-words text-white/90">{siteConfig.tagline}</p>
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-semibold leading-snug text-white">Neighborhoods</h4>
            <ul className="mt-3 space-y-2 text-sm break-words">
              <li><Link href="/" className="text-white/90 hover:text-white">San Diego Neighborhoods</Link></li>
              <li><Link href="/san-diego-neighborhood-map" className="text-white/90 hover:text-white">Neighborhood Map</Link></li>
              <li><Link href="/la-jolla-neighborhoods" className="text-white/90 hover:text-white">La Jolla Neighborhoods</Link></li>
              <li><Link href="/affordable-neighborhoods-san-diego" className="text-white/90 hover:text-white">Affordable Neighborhoods</Link></li>
              <li><Link href="/san-diego-suburbs" className="text-white/90 hover:text-white">San Diego Suburbs</Link></li>
              <li><Link href="/cities-near-san-diego" className="text-white/90 hover:text-white">Cities Near San Diego</Link></li>
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-semibold leading-snug text-white">Buying Here</h4>
            <ul className="mt-3 space-y-2 text-sm break-words">
              <li><Link href="/moving-to-san-diego" className="text-white/90 hover:text-white">Moving to San Diego</Link></li>
              <li><Link href="/living-in-san-diego" className="text-white/90 hover:text-white">Living in San Diego</Link></li>
              <li><Link href="/military-realtor-san-diego" className="text-white/90 hover:text-white">Military / VA Buyers</Link></li>
              <li><Link href="/la-jolla-real-estate-agent" className="text-white/90 hover:text-white">La Jolla Real Estate Agent</Link></li>
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-semibold leading-snug text-white">Condos &amp; Luxury</h4>
            <ul className="mt-3 space-y-2 text-sm break-words">
              <li><Link href="/san-diego-condos-for-sale" className="text-white/90 hover:text-white">San Diego Condos</Link></li>
              <li><Link href="/downtown-san-diego-condos-for-sale" className="text-white/90 hover:text-white">Downtown Condos</Link></li>
              <li><Link href="/la-jolla-condos-for-sale" className="text-white/90 hover:text-white">La Jolla Condos</Link></li>
              <li><Link href="/del-mar-new-luxury-homes" className="text-white/90 hover:text-white">Del Mar New Luxury Homes</Link></li>
              <li><Link href="/la-jolla-vs-del-mar" className="text-white/90 hover:text-white">La Jolla vs Del Mar</Link></li>
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-semibold leading-snug text-white">Get Started</h4>
            <ul className="mt-3 space-y-2 text-sm break-words">
              <li><Link href="/about" className="text-white/90 hover:text-white">About</Link></li>
              <li><Link href="/contact" className="text-white/90 hover:text-white">Book a Strategy Call</Link></li>
              <li><Link href="/contact" className="text-white/90 hover:text-white">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-white/90 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/90 hover:text-white">Terms &amp; Disclaimer</Link></li>
              <li><Link href="/accessibility" className="text-white/90 hover:text-white">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-8 text-sm text-white/80 break-words">
          <p className="font-medium text-white/90">
            {agent.name} | California DRE #{agent.dreNumber}
          </p>
          <p className="mt-1">{brokerage.name}</p>
          <p className="mt-1">{brokerage.officeAddress}</p>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            <a href={`tel:${agent.phone.replace(/[^0-9+]/g, "")}`} className="text-white/90 hover:text-white">
              {agent.phone}
            </a>
            <span aria-hidden="true" className="text-white/60">
              ·
            </span>
            <a href={`mailto:${agent.email}`} className="break-all text-white/90 hover:text-white">
              {agent.email}
            </a>
          </p>
          <p className="mt-1">
            <a
              href={agent.instagram.url}
              className="text-white/90 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              {agent.instagram.handle}
            </a>
          </p>
          <p className="mt-4 text-xs leading-relaxed text-white/75">{franchiseText}</p>
          <p className="mt-3 text-xs leading-relaxed text-white/75">{sdmlsText}</p>
          <p className="mt-3 text-xs leading-relaxed text-white/75">{disclaimer}</p>
          <p className="mt-4 text-xs text-white/70">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
