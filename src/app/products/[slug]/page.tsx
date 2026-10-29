import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductGrid } from "@/components/products/product-grid";
import { catalogPageContent } from "@/content/catalog-page";
import { productDetailContent as content } from "@/content/product-detail";
import { getProductBySlug, getPublishedCategories, getPublishedProducts } from "@/lib/catalog";
import { formatStartingPrice } from "@/lib/format-price";
import "@/components/products/products.css";
import "@/components/products/product-detail.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedProducts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return { title: product.name, description: product.description };
}

export default async function ProductDetail({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const categories = getPublishedCategories();
  const category = categories.find(({ id }) => id === product.categoryId);
  const categoryHref = category ? `/products?category=${encodeURIComponent(category.slug)}` : "/products";
  const related = category ? getPublishedProducts(category.slug).filter(({ id }) => id !== product.id).slice(0, 3) : [];

  return (
    <div className="container product-detail-page">
      <nav className="product-breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          {category && <li><Link href={categoryHref}>{category.name}</Link></li>}
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>
      <p className="catalog-preview-note">{catalogPageContent.previewNotice}</p>
      <div className="product-detail-overview">
        <ProductGallery key={product.id} images={product.images} productName={product.name} />
        <section className="product-detail-summary" aria-labelledby="product-title">
          <p className="eyebrow">{category?.name ?? catalogPageContent.categoryFallback}</p>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-detail-price">{formatStartingPrice(product.startingPriceCents)}</p>
          <p className="intro-copy">{product.description}</p>
          <p className="catalog-pricing-note">{content.quoteNotice}</p>
          <div className="product-detail-actions">
            <Link className="button" href={`/request?product=${encodeURIComponent(product.slug)}`}>{content.quoteLabel}</Link>
            <Link className="button button-secondary" href={categoryHref}>Browse {category?.name ?? "all products"}</Link>
          </div>
          <p className="product-detail-form-note">{content.formNotice}</p>
        </section>
      </div>
      <div className="product-detail-information">
        <details open>
          <summary>{content.detailsTitle}</summary>
          <p>{product.description}</p>
        </details>
        <details open>
          <summary>{content.informationTitle}</summary>
          <dl>
            <dt>Pricing</dt><dd>{content.pricingNotice}</dd>
            <dt>Customization</dt><dd>{content.customizationNotice}</dd>
            <dt>Pickup</dt><dd>{content.pickupNotice}</dd>
          </dl>
        </details>
      </div>
      {related.length > 0 && <section className="product-detail-related" aria-labelledby="related-heading">
        <h2 id="related-heading">Related products</h2>
        <ProductGrid products={related} categories={categories} />
      </section>}
      <section className="product-detail-custom" aria-labelledby="custom-heading">
        <div><h2 id="custom-heading">{content.customTitle}</h2><p>{content.customDescription}</p></div>
        <Link className="button" href="/request">Request a custom quote</Link>
      </section>
    </div>
  );
}
