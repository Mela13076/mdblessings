import type { Category } from "@/types/product";

/** Provisional labels for development; owner approval required before publishing. */
export const categories: readonly Category[] = [
  { id: "apparel", slug: "apparel", name: "Apparel", displayOrder: 1 },
  { id: "drinkware", slug: "drinkware", name: "Drinkware", displayOrder: 2 },
  { id: "keepsakes", slug: "keepsakes", name: "Keepsakes", displayOrder: 3 },
  { id: "prints", slug: "prints", name: "DTF prints", displayOrder: 4 },
  { id: "wooden-items", slug: "wooden-items", name: "Wooden items", displayOrder: 5 },
  { id: "bags", slug: "bags", name: "Bags", displayOrder: 6 },
  { id: "memorial", slug: "memorial", name: "Memorial items", displayOrder: 7 },
];
