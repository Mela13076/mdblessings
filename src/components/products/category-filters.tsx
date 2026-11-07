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
    <nav className="mb-5" aria-label={content.filtersLabel}>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        <li className="min-w-0 max-w-full">
          <Link className="flex min-h-11 items-center rounded-[.35rem] border border-border bg-surface px-4 py-2 wrap-anywhere hover:underline hover:underline-offset-[.25em] aria-[current=page]:border-primary aria-[current=page]:bg-primary aria-[current=page]:font-semibold aria-[current=page]:text-primary-foreground" href="/products" aria-current={!selectedSlug ? "page" : undefined}>{content.allProductsLabel}</Link>
        </li>
        {categories.map((category) => (
          <li className="min-w-0 max-w-full" key={category.id}>
            <Link className="flex min-h-11 items-center rounded-[.35rem] border border-border bg-surface px-4 py-2 wrap-anywhere hover:underline hover:underline-offset-[.25em] aria-[current=page]:border-primary aria-[current=page]:bg-primary aria-[current=page]:font-semibold aria-[current=page]:text-primary-foreground" href={{ pathname: "/products", query: { category: category.slug } }} aria-current={selectedSlug === category.slug ? "page" : undefined}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
