import { HeaderInteractive } from "@/components/layout/HeaderInteractive";
import { siteConfig } from "@/data/site-config";

export function Header() {
  return (
    <header className="site-header relative sticky top-0 z-50 border-b border-surface-muted bg-background">
      <HeaderInteractive items={siteConfig.nav} />
    </header>
  );
}
