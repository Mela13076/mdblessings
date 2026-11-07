import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { CategoryFilters } from "./category-filters";
import { ProductGrid } from "./product-grid";
import { getPublishedCategories, getPublishedProducts } from "../../lib/catalog";

const categories = [
  { id: "apparel", slug: "apparel", name: "Apparel", displayOrder: 1 },
  { id: "drinkware", slug: "drinkware", name: "Drinkware", displayOrder: 2 },
];

test("filter navigation exposes real links and exactly one active category", () => {
  const html = renderToStaticMarkup(<CategoryFilters categories={categories} selectedSlug="apparel" />);
  assert.match(html, /<nav[^>]*aria-label="Filter products by category"/);
  assert.match(html, /<a(?=[^>]*href="\/products\?category=apparel")(?=[^>]*aria-current="page")[^>]*>/);
  assert.match(html, /href="\/products\?category=drinkware"/);
  assert.match(html, /href="\/products"/);
  assert.equal((html.match(/aria-current="page"/g) ?? []).length, 1);
});

test("All products is active without a selection, including an empty catalog", () => {
  const html = renderToStaticMarkup(<CategoryFilters categories={[]} />);
  assert.match(html, /<a(?=[^>]*href="\/products")(?=[^>]*aria-current="page")[^>]*>/);
  assert.match(html, /All products/);
  assert.equal((html.match(/<a\s/g) ?? []).length, 1);
});

test("unknown category does not incorrectly mark All products as selected", () => {
  const html = renderToStaticMarkup(<CategoryFilters categories={categories} selectedSlug="unknown" />);
  assert.doesNotMatch(html, /aria-current/);
});

test("unmatched filtered results offer a clear route back to all products", () => {
  const html = renderToStaticMarkup(<ProductGrid products={[]} categories={categories} filtered />);
  assert.match(html, /No creations in this category yet/);
  assert.match(html, /href="\/products"/);
  assert.match(html, /All products/);
  assert.doesNotMatch(html, /Our collection is coming together|<article/);
});

test("published catalog can render a filtered grid without other category records", () => {
  const selected = getPublishedProducts("apparel");
  const html = renderToStaticMarkup(<ProductGrid products={selected} categories={getPublishedCategories()} filtered />);
  assert.equal((html.match(/<article/g) ?? []).length, selected.length);
  assert.match(html, /Custom hoodie/);
  assert.match(html, /Custom long-sleeve shirt/);
  assert.doesNotMatch(html, /Custom tumbler|Custom mug|Memorial rosary/);
});
