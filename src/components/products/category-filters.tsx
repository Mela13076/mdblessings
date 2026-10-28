import Link from "next/link";
import type { Category } from "../../types/product";
import { catalogPageContent as content } from "../../content/catalog-page";

type CategoryFiltersProps = {
  categories: readonly Readonly<Category>[];
  selectedSlug?: string;
};

/** Ordinary links support keyboard, touch, sharing, and browser history. */
export function CategoryFilters({ categories, selectedSlug }: CategoryFiltersProps) {
  return (
    <nav className="category-filters" aria-label={content.filtersLabel}>
      <ul>
        <li>
          <Link href="/products" aria-current={!selectedSlug ? "page" : undefined}>{content.allProductsLabel}</Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={{ pathname: "/products", query: { category: category.slug } }} aria-current={selectedSlug === category.slug ? "page" : undefined}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
