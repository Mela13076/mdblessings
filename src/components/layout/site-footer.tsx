import Link from "next/link";
import Image from "next/image";
import { navigationLinks, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link className="brand" href="/" aria-label={`${site.name} — Home`}>
            <Image className="brand-logo" src="/Logo.png" width={200} height={200} alt={site.fullName} sizes="160px" />
          </Link>
          <p>{site.fullName}</p>
          <p>Custom merchandise · Local pickup only</p>
        </div>
        <nav aria-label="Footer" className="footer-navigation">
          {navigationLinks.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
          <Link href={site.inquiry.href}>{site.inquiry.label}</Link>
        </nav>
        <p className="quote-notice">{site.quoteNotice}</p>
      </div>
    </footer>
  );
}
