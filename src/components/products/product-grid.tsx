import Link from "next/link";
import type { Category, Product } from "../../types/product";
import { catalogPageContent as content } from "../../content/catalog-page";
import { site } from "../../content/site";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: readonly Readonly<Product>[];
  categories: readonly Readonly<Category>[];
  filtered?: boolean;
};

export function ProductGrid({ products, categories, filtered = false }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-[clamp(1.5rem,5vw,4rem)]">
        <h2 className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] font-normal">{filtered ? content.noMatches.title : content.empty.title}</h2>
        <p className="mt-4 max-w-[42rem] text-muted-foreground">{filtered ? content.noMatches.description : content.empty.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {filtered && <Link className="inline-flex min-h-12 items-center justify-center rounded-[.35rem] border border-primary bg-primary px-5 py-[.65rem] text-center font-semibold text-primary-foreground hover:underline hover:underline-offset-[.2em]" href="/products">{content.allProductsLabel}</Link>}
          <Link className={filtered ? "inline-flex min-h-12 items-center justify-center rounded-[.35rem] border border-primary bg-transparent px-5 py-[.65rem] text-center font-semibold text-foreground hover:underline hover:underline-offset-[.2em]" : "inline-flex min-h-12 items-center justify-center rounded-[.35rem] border border-primary bg-primary px-5 py-[.65rem] text-center font-semibold text-primary-foreground hover:underline hover:underline-offset-[.2em]"} href={site.inquiry.href}>{site.inquiry.label}</Link>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-[.35rem] border border-primary bg-transparent px-5 py-[.65rem] text-center font-semibold text-foreground hover:underline hover:underline-offset-[.2em]" href="/">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3" aria-label="Products">
      {products.map((product) => (
        <li className="min-w-0" key={product.id}>
          <ProductCard product={product} category={categories.find((category) => category.id === product.categoryId)} />
        </li>
      ))}
    </ul>
  );
}
