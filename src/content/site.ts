export type NavigationLink = { readonly href: string; readonly label: string };

export const navigationLinks: readonly NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "Our Story" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const site = {
  name: "MDBlessings",
  fullName: "Mimi’s Divine Blessings",
  description: "Custom merchandise showcase and quote inquiries for Mimi’s Divine Blessings. Local pickup only; final details are confirmed personally.",
  inquiry: { href: "/request", label: "Request a quote" },
  quoteNotice: "An inquiry is a request for a quote, not a confirmed order. Design, final pricing, payment, and local pickup are confirmed personally.",
} as const;
