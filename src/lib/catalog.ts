import { categories } from "../content/categories";
import { products } from "../content/products";
import {
  selectFeaturedProducts,
  selectProductBySlug,
  selectPublishedCategories,
  selectPublishedProducts,
  selectProductsByCategory,
} from "./catalog-selectors";

/** Use in Server Components; pass only selected published records to client UI. */
export function getPublishedProducts(categorySlug?: string) {
  return categorySlug
    ? selectProductsByCategory(products, categories, categorySlug)
    : selectPublishedProducts(products);
}

export function getFeaturedProducts() {
  return selectFeaturedProducts(products);
}

/** Exact, case-sensitive slug lookup. Unknown and draft slugs return undefined. */
export function getProductBySlug(slug: string) {
  return selectProductBySlug(products, slug);
}

/** Only categories represented by at least one published product are public. */
export function getPublishedCategories() {
  return selectPublishedCategories(categories, products);
}
