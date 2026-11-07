export interface ProductImage {
  /** Repository-hosted public asset, e.g. /images/products/tumbler-front.webp. */
  src: `/images/${string}`;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  displayOrder: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: Category["id"];
  /** Nonnegative integer USD cents; null means no approved starting price. */
  startingPriceCents: number | null;
  /** Ordered examples; empty until approved photographs are available. */
  images: readonly ProductImage[];
  featured: boolean;
  /** Set true only after all public content and media are approved. */
  published: boolean;
  displayOrder: number;
}
