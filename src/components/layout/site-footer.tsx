import Link from "next/link";
import Image from "next/image";
import { navigationLinks, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-[calc(100%_-_2.5rem)] max-w-[76rem] grid gap-8 py-10 md:grid-cols-2">
        <div>
          <Link className="flex w-fit flex-col py-3" href="/" aria-label={`${site.name} — Home`}>
            <Image className="h-auto w-40" src="/Logo.png" width={200} height={200} alt={site.fullName} sizes="160px" />
          </Link>
          <p className="mt-2 text-sm/[inherit] text-muted-foreground">{site.fullName}</p>
          <p className="mt-2 text-sm/[inherit] text-muted-foreground">Custom merchandise · Local pickup only</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap content-start gap-x-6 gap-y-1">
          {navigationLinks.map(({ href, label }) => <Link className="inline-flex min-h-11 items-center hover:underline hover:underline-offset-[.3em]" key={href} href={href}>{label}</Link>)}
          <Link className="inline-flex min-h-11 items-center hover:underline hover:underline-offset-[.3em]" href={site.inquiry.href}>{site.inquiry.label}</Link>
        </nav>
        <p className="max-w-[76ch] border-t border-border pt-6 text-sm/[inherit] text-muted-foreground md:col-span-full">{site.quoteNotice}</p>
      </div>
    </footer>
  );
}
