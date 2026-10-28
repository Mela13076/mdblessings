import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { Product } from "../../types/product";
import { getPublishedCategories, getPublishedProducts } from "../../lib/catalog";
import { ProductCard } from "./product-card";
import { ProductGrid } from "./product-grid";

const product: Product = {
  id: "fixture-shirt", slug: "fixture-shirt", name: "Fixture shirt", description: "Test-only record",
  categoryId: "apparel", startingPriceCents: 2599, images: [], featured: false, published: true, displayOrder: 1,
};
const category = { id: "apparel", slug: "apparel", name: "Apparel", displayOrder: 1 };

test("card renders product identity, category, starting price, and canonical link", () => {
  const html = renderToStaticMarkup(<ProductCard product={product} category={category} />);
  assert.match(html, /<h2[^>]*>Fixture shirt<\/h2>/);
  assert.match(html, />Apparel<\/p>/);
  assert.match(html, /Starting at \$25\.99/);
  assert.match(html, /href="\/products\/fixture-shirt"/);
  assert.match(html, /aria-label="View Fixture shirt"/);
  assert.equal((html.match(/<a\s/g) ?? []).length, 1);
});

test("missing photo and price use honest fallbacks with no broken image", () => {
  const html = renderToStaticMarkup(<ProductCard product={{ ...product, startingPriceCents: null }} />);
  assert.match(html, /Photo coming soon/);
  assert.match(html, /Request a quote/);
  assert.match(html, /Custom creation/);
  assert.doesNotMatch(html, /<img|Starting at|\$0\.00/);
  assert.match(html, /width="40" height="40"/);
});

test("approved images use responsive Next.js optimization and supplied alt text", () => {
  const html = renderToStaticMarkup(<ProductCard product={{ ...product, images: [{
    src: "/images/products/fixture-shirt.webp", alt: "Fixture shirt with a floral design", width: 800, height: 600,
  }] }} category={category} />);
  assert.match(html, /<img/);
  assert.match(html, /alt="Fixture shirt with a floral design"/);
  assert.match(html, /width="800" height="600"/);
  assert.match(html, /srcSet=/);
  assert.match(html, /sizes="/);
  assert.match(html, /\/_next\/image\?url=%2Fimages%2Fproducts%2Ffixture-shirt.webp/);
  assert.doesNotMatch(html, /Photo coming soon/);
});

test("grid preserves the selected catalog order and shows matching categories", () => {
  const html = renderToStaticMarkup(<ProductGrid products={[product, { ...product, id: "second", slug: "second", name: "Second item" }]} categories={[category]} />);
  assert.match(html, /<ul[^>]*aria-label="Products"/);
  assert.equal((html.match(/<article/g) ?? []).length, 2);
  assert.ok(html.indexOf("Fixture shirt") < html.indexOf("Second item"));
  assert.equal((html.match(/>Apparel<\/p>/g) ?? []).length, 2);
});

test("the current unpublished catalog renders only an empty state and valid general CTAs", () => {
  const html = renderToStaticMarkup(<ProductGrid products={getPublishedProducts()} categories={getPublishedCategories()} />);
  assert.match(html, /Our collection is coming together/);
  assert.match(html, /href="\/request"/);
  assert.match(html, /href="\/"/);
  assert.doesNotMatch(html, /<article|<img|href="\/products\/|— draft|— sample/);
});
