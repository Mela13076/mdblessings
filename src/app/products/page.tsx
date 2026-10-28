import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/product-grid";
import { CategoryFilters } from "@/components/products/category-filters";
import { catalogPageContent as content } from "@/content/catalog-page";
import { getPublishedCategories, getPublishedProducts } from "@/lib/catalog";
import "@/components/products/products.css";

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
    <section className="container catalog-page" aria-labelledby="catalog-heading">
      <div className="catalog-intro">
        <p className="catalog-preview-note">{content.previewNotice}</p>
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id="catalog-heading">{content.title}</h1>
        <p className="intro-copy">{content.description}</p>
        <p className="catalog-pricing-note">{content.pricingNotice}</p>
      </div>
      <CategoryFilters categories={categories} selectedSlug={categorySlug} />
      <p className="catalog-result-count">{products.length} {products.length === 1 ? "product" : "products"}</p>
      <ProductGrid products={products} categories={categories} filtered={Boolean(categorySlug)} />
    </section>
  );
}
