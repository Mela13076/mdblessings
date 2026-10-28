import Link from "next/link";
import type { Category, Product } from "../../types/product";
import { catalogPageContent as content } from "../../content/catalog-page";
import { site } from "../../content/site";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: readonly Readonly<Product>[];
  categories: readonly Readonly<Category>[];
};

export function ProductGrid({ products, categories }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="catalog-empty">
        <h2>{content.empty.title}</h2>
        <p>{content.empty.description}</p>
        <div className="page-actions">
          <Link className="button" href={site.inquiry.href}>{site.inquiry.label}</Link>
          <Link className="button button-secondary" href="/">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <ul className="product-grid" aria-label="Products">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} category={categories.find((category) => category.id === product.categoryId)} />
        </li>
      ))}
    </ul>
  );
}
