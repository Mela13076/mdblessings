import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/product-grid";
import { catalogPageContent as content } from "@/content/catalog-page";
import { getPublishedCategories, getPublishedProducts } from "@/lib/catalog";
import "@/components/products/products.css";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore Mimi’s Divine Blessings custom merchandise. Starting prices are subject to a personal quote; local pickup only.",
};

export default function ProductsPage() {
  const products = getPublishedProducts();
  const categories = getPublishedCategories();

  return (
    <section className="container catalog-page" aria-labelledby="catalog-heading">
      <div className="catalog-intro">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id="catalog-heading">{content.title}</h1>
        <p className="intro-copy">{content.description}</p>
        <p className="catalog-pricing-note">{content.pricingNotice}</p>
      </div>
      <ProductGrid products={products} categories={categories} />
    </section>
  );
}
