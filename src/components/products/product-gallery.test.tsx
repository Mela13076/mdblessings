import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { ProductImage } from "../../types/product";
import { ProductGallery } from "./product-gallery";

const first: ProductImage = {
  src: "/images/products/test-front.webp", alt: "Test shirt with a floral front design",
  width: 800, height: 1000, caption: "Front example",
};

test("empty gallery has an honest placeholder and no broken image or controls", () => {
  const html = renderToStaticMarkup(<ProductGallery images={[]} productName="Test shirt" />);
  assert.match(html, /aria-label="Example photos of Test shirt"/);
  assert.match(html, /Example photos are coming soon/);
  assert.doesNotMatch(html, /<img|<button|NaN|undefined/);
});

test("single image has descriptive alt text, responsive sizing and caption without redundant controls", () => {
  const html = renderToStaticMarkup(<ProductGallery images={[first]} productName="Test shirt" />);
  assert.match(html, /alt="Test shirt with a floral front design"/);
  assert.match(html, /width="800" height="1000"/);
  assert.match(html, /sizes="/);
  assert.match(html, /Example 1 of 1 · Front example/);
  assert.doesNotMatch(html, /<button/);
});

test("multiple images expose native keyboard controls, named thumbnails and an announced selection", () => {
  const html = renderToStaticMarkup(<ProductGallery images={[first, {
    ...first, src: "/images/products/test-back.webp", alt: "Test shirt back design", caption: undefined,
  }]} productName="Test shirt" />);
  assert.match(html, /Previous photo/);
  assert.match(html, /Next photo/);
  assert.match(html, /aria-label="Show example 2: Test shirt back design"/);
  assert.match(html, /aria-live="polite" aria-atomic="true"/);
  assert.equal((html.match(/aria-pressed="true"/g) ?? []).length, 1);
  assert.equal((html.match(/aria-pressed="false"/g) ?? []).length, 1);
  assert.equal((html.match(/aria-controls=/g) ?? []).length, 4);
  assert.match(html, /Example 1 of 2 · Front example/);
});
