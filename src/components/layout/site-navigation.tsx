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
    <div className="site-navigation" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }}>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d={open ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
        {open ? "Close" : "Menu"}
      </button>
      <nav id="primary-navigation" aria-label="Primary" className={`primary-navigation${open ? " is-open" : ""}`}>
        {links.map(({ href, label }) => (
          <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
        ))}
        <Link className="button navigation-cta" href={inquiry.href} aria-current={pathname === inquiry.href ? "page" : undefined} onClick={() => setOpen(false)}>{inquiry.label}</Link>
      </nav>
    </div>
  );
}
