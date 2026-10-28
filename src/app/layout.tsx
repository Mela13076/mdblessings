import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.fullName}`, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {/* <a className="skip-link" href="#main-content">Skip to main content</a> */}
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
