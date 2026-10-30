import Link from "next/link";
import Image from "next/image";
import { navigationLinks, site } from "@/content/site";
import { SiteNavigation } from "./site-navigation";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto w-[calc(100%_-_2.5rem)] max-w-[76rem] flex min-h-24 flex-wrap items-center justify-between gap-4 lg:flex-nowrap lg:gap-8">
        <Link className="flex flex-col py-3" href="/" aria-label={`${site.name} — Home`}>
          <Image className="h-auto w-24 lg:w-28" src="/Logo.png" width={1254} height={1254} alt={site.fullName} sizes="(min-width: 64rem) 112px, 96px" preload />
        </Link>
        <SiteNavigation links={navigationLinks} inquiry={site.inquiry} />
      </div>
    </header>
  );
}
