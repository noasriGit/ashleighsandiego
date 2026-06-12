import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const { agent, brokerage, disclaimer, franchiseDisclaimer } = siteConfig;
  const year = new Date().getFullYear();
  const franchiseText = franchiseDisclaimer.replace("{year}", String(year));

  return (
    <footer className="mt-auto border-t border-surface-muted bg-cabernet text-white">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-serif text-lg font-semibold text-white">San Diego Relocation Home Guide</h3>
            <p className="mt-2 text-sm text-white/80">
              Neighborhood guidance and buyer support for people moving to San Diego.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white">Buyer Resources</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/relocating-to-san-diego" className="text-white/80 hover:text-white">Relocating to San Diego</Link></li>
              <li><Link href="/moving-to-la-jolla" className="text-white/80 hover:text-white">Moving to La Jolla</Link></li>
              <li><Link href="/neighborhoods" className="text-white/80 hover:text-white">Neighborhoods</Link></li>
              <li><Link href="/search-homes" className="text-white/80 hover:text-white">Search Homes</Link></li>
              <li><Link href="/first-time-home-buyer-san-diego" className="text-white/80 hover:text-white">First-Time Buyers</Link></li>
              <li><Link href="/military-va-relocation-san-diego" className="text-white/80 hover:text-white">Military / VA</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Get Started</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/contact" className="text-white/80 hover:text-white">Book a Strategy Call</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-white">Request Custom Search</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="text-white/80 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/80 hover:text-white">Terms & Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-8 text-sm text-white/70">
          <p className="font-medium text-white/90">
            {agent.name} | California DRE #{agent.dreNumber}
          </p>
          <p className="mt-1">{brokerage.name}</p>
          <p className="mt-1">
            {brokerage.licenseNumber} | {brokerage.officeAddress}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-white/60">{franchiseText}</p>
          <p className="mt-3 text-xs leading-relaxed text-white/60">{disclaimer}</p>
          <p className="mt-4 text-xs text-white/50">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
