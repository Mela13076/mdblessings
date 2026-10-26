import type { Category } from "@/types/product";

/** Provisional labels for development; owner approval required before publishing. */
export const categories: readonly Category[] = [
  { id: "apparel", slug: "apparel", name: "Apparel", displayOrder: 1 },
  { id: "drinkware", slug: "drinkware", name: "Drinkware", displayOrder: 2 },
  { id: "keepsakes", slug: "keepsakes", name: "Keepsakes", displayOrder: 3 },
];
