import assert from "node:assert/strict";
import { test } from "node:test";
import type { Category, Product } from "../types/product";
import { products } from "../content/products";
import { categories } from "../content/categories";
import { getFeaturedProducts, getProductBySlug, getPublishedCategories, getPublishedProducts } from "./catalog";
import { selectFeaturedProducts, selectProductBySlug, selectPublishedCategories, selectPublishedProducts, selectProductsByCategory } from "./catalog-selectors";

function product(id: string, overrides: Partial<Product> = {}): Product {
  return {
    id, slug: id, name: id, description: "Test fixture", categoryId: "apparel",
    startingPriceCents: null, images: [], featured: false, published: true, displayOrder: 1,
    ...overrides,
  };
}

const fixtures: readonly Product[] = Object.freeze([
  Object.freeze(product("z-shirt", { displayOrder: 2, featured: true })),
  Object.freeze(product("draft", { published: false, featured: true, displayOrder: 0, categoryId: "draft-only" })),
  Object.freeze(product("b-cup", { categoryId: "drinkware", startingPriceCents: 0 })),
  Object.freeze(product("a-shirt", { featured: true })),
]);

const categoryFixtures: readonly Category[] = Object.freeze([
  Object.freeze({ id: "empty", slug: "empty", name: "Empty", displayOrder: 0 }),
  Object.freeze({ id: "drinkware", slug: "drinkware", name: "Drinkware", displayOrder: 1 }),
  Object.freeze({ id: "draft-only", slug: "draft-only", name: "Draft only", displayOrder: 0 }),
  Object.freeze({ id: "apparel", slug: "apparel", name: "Apparel", displayOrder: 1 }),
]);

const ids = (records: readonly { readonly id: string }[]) => records.map((record) => record.id);

test("published products exclude drafts and sort by display order, then ID", () => {
  assert.deepEqual(ids(selectPublishedProducts(fixtures)), ["a-shirt", "b-cup", "z-shirt"]);
  assert.deepEqual(ids(selectPublishedProducts([...fixtures].reverse())), ["a-shirt", "b-cup", "z-shirt"]);
});

test("featured products must also be published and keep catalog order", () => {
  assert.deepEqual(ids(selectFeaturedProducts(fixtures)), ["a-shirt", "z-shirt"]);
});

test("slug lookup matches exactly and never reveals drafts", () => {
  assert.equal(selectProductBySlug(fixtures, "a-shirt")?.id, "a-shirt");
  for (const slug of ["draft", "missing", "", "A-SHIRT", " a-shirt", "a-shirt/", "__proto__"]) {
    assert.equal(selectProductBySlug(fixtures, slug), undefined);
  }
});

test("public categories exclude empty and draft-only categories and sort deterministically", () => {
  assert.deepEqual(ids(selectPublishedCategories(categoryFixtures, fixtures)), ["apparel", "drinkware"]);
  assert.deepEqual(ids(selectPublishedCategories([...categoryFixtures].reverse(), fixtures)), ["apparel", "drinkware"]);
});

test("empty and entirely unpublished catalogs produce empty results", () => {
  for (const records of [[], [product("draft", { published: false, featured: true })]]) {
    assert.deepEqual(selectPublishedProducts(records), []);
    assert.deepEqual(selectFeaturedProducts(records), []);
    assert.deepEqual(selectPublishedCategories(categoryFixtures, records), []);
    assert.equal(selectProductBySlug(records, "draft"), undefined);
  }
});

test("selectors do not reorder or modify source records and preserve unknown and zero prices", () => {
  const before = JSON.stringify({ fixtures, categoryFixtures });
  const result = selectPublishedProducts(fixtures);
  assert.notEqual(result, fixtures);
  assert.equal(result.find((record) => record.id === "b-cup")?.startingPriceCents, 0);
  assert.equal(result.find((record) => record.id === "a-shirt")?.startingPriceCents, null);
  selectFeaturedProducts(fixtures);
  selectPublishedCategories(categoryFixtures, fixtures);
  selectProductBySlug(fixtures, "a-shirt");
  assert.equal(JSON.stringify({ fixtures, categoryFixtures }), before);
});

test("content-backed access functions respect the current publication settings", () => {
  const visible = getPublishedProducts();
  assert.equal(visible.length, products.filter((record) => record.published).length);
  assert.ok(visible.every((record) => record.published));
  assert.ok(getFeaturedProducts().every((record) => record.published && record.featured));
  for (const record of products) {
    assert.equal(getProductBySlug(record.slug)?.id, record.published ? record.id : undefined);
  }
  for (const category of getPublishedCategories()) {
    assert.ok(visible.some((record) => record.categoryId === category.id));
  }
});

test("category filtering returns every matching published product in catalog order", () => {
  const before = JSON.stringify(fixtures);
  assert.deepEqual(ids(selectProductsByCategory(fixtures, categoryFixtures, "apparel")), ["a-shirt", "z-shirt"]);
  assert.deepEqual(ids(selectProductsByCategory(fixtures, categoryFixtures, "drinkware")), ["b-cup"]);
  assert.equal(JSON.stringify(fixtures), before);
});

test("all-items filtering includes all published records, while empty and invalid categories match nothing", () => {
  assert.deepEqual(ids(selectProductsByCategory(fixtures, categoryFixtures)), ["a-shirt", "b-cup", "z-shirt"]);
  assert.deepEqual(ids(selectProductsByCategory(fixtures, categoryFixtures, "")), ["a-shirt", "b-cup", "z-shirt"]);
  for (const slug of ["draft-only", "empty", "unknown", "APPAREL", "__proto__"]) {
    assert.deepEqual(selectProductsByCategory(fixtures, categoryFixtures, slug), []);
  }
  assert.deepEqual(selectProductsByCategory([], categoryFixtures, "apparel"), []);
});

test("filter resolves category slugs independently of internal IDs", () => {
  const records = [product("visible", { categoryId: "internal-id" }), product("hidden", { categoryId: "internal-id", published: false })];
  const category = [{ id: "internal-id", slug: "public-slug", name: "Category", displayOrder: 1 }];
  assert.deepEqual(ids(selectProductsByCategory(records, category, "public-slug")), ["visible"]);
  assert.deepEqual(selectProductsByCategory(records, category, "internal-id"), []);
});

test("published test samples provide multiple items within Apparel and Drinkware", () => {
  assert.ok(getPublishedProducts("apparel").length >= 3);
  assert.ok(getPublishedProducts("drinkware").length >= 2);
  assert.deepEqual(getPublishedProducts("not-a-category"), []);
  assert.ok(getPublishedProducts("apparel").every((record) => record.categoryId === "apparel" && record.published));
});

test("catalog records have unique stable identifiers, valid category references, and safe prices", () => {
  assert.equal(new Set(products.map((record) => record.id)).size, products.length);
  assert.equal(new Set(products.map((record) => record.slug)).size, products.length);
  assert.equal(new Set(categories.map((record) => record.id)).size, categories.length);
  assert.equal(new Set(categories.map((record) => record.slug)).size, categories.length);
  const categoryIds = new Set(categories.map((record) => record.id));
  for (const record of [...products, ...categories]) {
    assert.match(record.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(Number.isSafeInteger(record.displayOrder) && record.displayOrder >= 0);
  }
  for (const record of products) {
    assert.ok(categoryIds.has(record.categoryId), `Missing category for ${record.id}`);
    assert.ok(record.startingPriceCents === null || (Number.isSafeInteger(record.startingPriceCents) && record.startingPriceCents >= 0));
  }
});
