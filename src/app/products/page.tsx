import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/product-grid";
import { CategoryFilters } from "@/components/products/category-filters";
import { catalogPageContent as content } from "@/content/catalog-page";
import { getPublishedCategories, getPublishedProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Mimi’s Divine Blessings custom merchandise. Starting prices are subject to a personal quote; local pickup only.",
};

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
  const query = await searchParams;
  // For repeated query parameters, use the first value consistently.
  const categorySlug = (Array.isArray(query.category) ? query.category[0] : query.category) || undefined;
  const products = getPublishedProducts(categorySlug);
  const categories = getPublishedCategories();

  return (
    <section className="mx-auto w-[calc(100%_-_2.5rem)] max-w-[76rem] py-[clamp(2.5rem,6vw,5rem)]" aria-labelledby="catalog-heading">
      <div className="mb-10 max-w-[46rem]">
        <p className="mb-6 rounded-[.35rem] border border-border bg-surface-accent px-4 py-3 text-sm/[inherit] text-foreground">{content.previewNotice}</p>
        <p className="mb-4 text-xs/[inherit] font-semibold tracking-[.15em] text-muted-foreground uppercase">{content.eyebrow}</p>
        <h1 className="max-w-[20ch] text-[clamp(2.5rem,5vw,4rem)]" id="catalog-heading">{content.title}</h1>
        <p className="mt-6 max-w-[40rem] text-lg/[inherit] text-muted-foreground">{content.description}</p>
        <p className="mt-6 border-l-2 border-border pl-4 text-sm/[inherit] text-muted-foreground">{content.pricingNotice}</p>
      </div>
      <CategoryFilters categories={categories} selectedSlug={categorySlug} />
      <p className="mb-6 text-sm/[inherit] text-muted-foreground">{products.length} {products.length === 1 ? "product" : "products"}</p>
      <ProductGrid products={products} categories={categories} filtered={Boolean(categorySlug)} />
    </section>
  );
}
