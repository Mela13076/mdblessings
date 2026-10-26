import type { Product } from "@/types/product";

/** Development examples only. Keep unpublished until owner content approval. */
export const products: readonly Product[] = [
  {
    id: "product-shirt",
    slug: "custom-shirt",
    name: "Custom shirt — sample",
    description: "Provisional shirt example for development. Customization details need owner approval.",
    categoryId: "apparel",
    startingPriceCents: null,
    images: [],
    featured: true,
    published: false,
    displayOrder: 1,
  },
  {
    id: "product-tumbler",
    slug: "custom-tumbler",
    name: "Custom tumbler — sample",
    description: "Provisional tumbler example for development. Sizes and customization details need owner approval.",
    categoryId: "drinkware",
    startingPriceCents: null,
    images: [],
    featured: true,
    published: false,
    displayOrder: 2,
  },
  {
    id: "product-memorial-keepsake",
    slug: "memorial-keepsake",
    name: "Memorial keepsake — sample",
    description: "Provisional keepsake example for development. Product format and customization details need owner approval.",
    categoryId: "keepsakes",
    startingPriceCents: null,
    images: [],
    featured: false,
    published: false,
    displayOrder: 3,
  },
];
