"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import type { NavigationLink } from "@/content/site";

type NavigationProps = { links: readonly NavigationLink[]; inquiry: NavigationLink };

export function SiteNavigation(props: NavigationProps) {
  const pathname = usePathname();
  // Reset the disclosure on route changes, including browser back/forward.
  return <NavigationDisclosure key={pathname} {...props} pathname={pathname} />;
}

function NavigationDisclosure({ links, inquiry, pathname }: NavigationProps & { pathname: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="contents" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }}>
      <button ref={toggleRef} className="flex min-h-11 items-center justify-center gap-2 rounded-[.35rem] border border-border px-3 py-2 lg:hidden" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d={open ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
        {open ? "Close" : "Menu"}
      </button>
      <nav id="primary-navigation" aria-label="Primary" className={`${open ? "flex" : "hidden"} basis-full flex-col gap-1 pb-5 lg:flex lg:basis-auto lg:flex-row lg:items-center lg:gap-2 lg:p-0`}>
        {links.map(({ href, label }) => (
          <Link className="flex min-h-11 items-center rounded px-3 py-2 hover:underline hover:underline-offset-[.3em] aria-[current=page]:bg-surface-accent aria-[current=page]:underline aria-[current=page]:underline-offset-[.4em]" key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
        ))}
        <Link className="inline-flex min-h-12 items-center justify-center rounded-[.35rem] border border-primary bg-primary px-5 py-[.65rem] text-center font-semibold text-primary-foreground hover:underline hover:underline-offset-[.2em] mt-2 lg:mt-0 lg:ml-3" href={inquiry.href} aria-current={pathname === inquiry.href ? "page" : undefined} onClick={() => setOpen(false)}>{inquiry.label}</Link>
      </nav>
    </div>
  );
}
