import Link from "next/link";
import Image from "next/image";
import { navigationLinks, site } from "@/content/site";
import { SiteNavigation } from "./site-navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label={`${site.name} — Home`}>
          <Image className="brand-logo" src="/Logo.png" width={1254} height={1254} alt={site.fullName} sizes="(min-width: 64rem) 112px, 96px" preload />
        </Link>
        <SiteNavigation links={navigationLinks} inquiry={site.inquiry} />
      </div>
    </header>
  );
}
