import type { Category, Product } from "../types/product";

type OrderedRecord = { readonly id: string; readonly displayOrder: number };

function compareDisplayOrder(a: OrderedRecord, b: OrderedRecord): number {
  return a.displayOrder - b.displayOrder || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}

/** Pure selectors; pages use the content-backed functions in catalog.ts. */
export function selectPublishedProducts(records: readonly Product[]): readonly Readonly<Product>[] {
  return records.filter((product) => product.published).sort(compareDisplayOrder);
}

export function selectFeaturedProducts(records: readonly Product[]): readonly Readonly<Product>[] {
  return selectPublishedProducts(records).filter((product) => product.featured);
}

export function selectProductBySlug(records: readonly Product[], slug: string): Readonly<Product> | undefined {
  return records.find((product) => product.published && product.slug === slug);
}

export function selectPublishedCategories(
  categoryRecords: readonly Category[],
  productRecords: readonly Product[],
): readonly Readonly<Category>[] {
  const publishedCategoryIds = new Set(
    selectPublishedProducts(productRecords).map((product) => product.categoryId),
  );
  return categoryRecords.filter((category) => publishedCategoryIds.has(category.id)).sort(compareDisplayOrder);
}
