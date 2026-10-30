import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductGrid } from "@/components/products/product-grid";
import { catalogPageContent } from "@/content/catalog-page";
import { productDetailContent as content } from "@/content/product-detail";
import { getProductBySlug, getPublishedCategories, getPublishedProducts } from "@/lib/catalog";
import { formatStartingPrice } from "@/lib/format-price";

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
    <div className="mx-auto w-[calc(100%_-_2.5rem)] max-w-[76rem] pt-8 pb-16">
      <nav className="mb-6 text-sm/[inherit]" aria-label="Breadcrumb">
        <ol className="flex list-none flex-wrap items-baseline gap-2 p-0">
          <li className="wrap-anywhere not-first:before:mr-2 not-first:before:text-muted-foreground not-first:before:content-['›']"><Link className="inline-block py-2 underline underline-offset-[.25em]" href="/">Home</Link></li>
          <li className="wrap-anywhere not-first:before:mr-2 not-first:before:text-muted-foreground not-first:before:content-['›']"><Link className="inline-block py-2 underline underline-offset-[.25em]" href="/products">Products</Link></li>
          {category && <li className="wrap-anywhere not-first:before:mr-2 not-first:before:text-muted-foreground not-first:before:content-['›']"><Link className="inline-block py-2 underline underline-offset-[.25em]" href={categoryHref}>{category.name}</Link></li>}
          <li className="wrap-anywhere not-first:before:mr-2 not-first:before:text-muted-foreground not-first:before:content-['›']" aria-current="page">{product.name}</li>
        </ol>
      </nav>
      <p className="mb-6 rounded-[.35rem] border border-border bg-surface-accent px-4 py-3 text-sm/[inherit] text-foreground">{catalogPageContent.previewNotice}</p>
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-10">
        <ProductGallery key={product.id} images={product.images} productName={product.name} />
        <section className="min-w-0" aria-labelledby="product-title">
          <p className="mb-4 text-xs/[inherit] font-semibold tracking-[.15em] text-muted-foreground uppercase">{category?.name ?? catalogPageContent.categoryFallback}</p>
          <h1 className="max-w-none text-[clamp(2.25rem,4vw,3.5rem)] wrap-anywhere" id="product-title">{product.name}</h1>
          <p className="mt-4 text-xl/[inherit] font-semibold">{formatStartingPrice(product.startingPriceCents)}</p>
          <p className="mt-6 max-w-[40rem] text-lg/[inherit] text-muted-foreground">{product.description}</p>
          <p className="mt-6 border-l-2 border-border pl-4 text-sm/[inherit] text-muted-foreground">{content.quoteNotice}</p>
          <div className="mt-6 grid gap-3">
            <Link className="inline-flex min-h-12 items-center justify-center rounded-[.35rem] border border-primary bg-primary px-5 py-[.65rem] text-center font-semibold text-primary-foreground hover:underline hover:underline-offset-[.2em]" href={`/request?product=${encodeURIComponent(product.slug)}`}>{content.quoteLabel}</Link>
            <Link className="inline-flex min-h-12 items-center justify-center rounded-[.35rem] border border-primary bg-transparent px-5 py-[.65rem] text-center font-semibold text-foreground hover:underline hover:underline-offset-[.2em]" href={categoryHref}>Browse {category?.name ?? "all products"}</Link>
          </div>
          <p className="mt-4 text-sm/[inherit] text-muted-foreground">{content.formNotice}</p>
        </section>
      </div>
      <div className="my-12 grid gap-6 md:grid-cols-2">
        <details className="rounded-lg border border-border bg-surface p-5" open>
          <summary className="min-h-11 cursor-pointer font-heading text-2xl leading-[normal] font-normal">{content.detailsTitle}</summary>
          <p className="mt-4">{product.description}</p>
        </details>
        <details className="rounded-lg border border-border bg-surface p-5" open>
          <summary className="min-h-11 cursor-pointer font-heading text-2xl leading-[normal] font-normal">{content.informationTitle}</summary>
          <dl className="mt-4">
            <dt className="font-semibold">Pricing</dt><dd className="mt-1 mb-4 text-muted-foreground">{content.pricingNotice}</dd>
            <dt className="font-semibold">Customization</dt><dd className="mt-1 mb-4 text-muted-foreground">{content.customizationNotice}</dd>
            <dt className="font-semibold">Pickup</dt><dd className="mt-1 mb-4 text-muted-foreground">{content.pickupNotice}</dd>
          </dl>
        </details>
      </div>
      {related.length > 0 && <section aria-labelledby="related-heading">
        <h2 className="mb-4 font-heading text-[2rem] leading-[normal] font-normal" id="related-heading">Related products</h2>
        <ProductGrid products={related} categories={categories} />
      </section>}
      <section className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-lg bg-surface-accent p-[clamp(1.25rem,4vw,2.5rem)]" aria-labelledby="custom-heading">
        <div><h2 className="mb-4 font-heading text-[2rem] leading-[normal] font-normal" id="custom-heading">{content.customTitle}</h2><p className="max-w-[40rem]">{content.customDescription}</p></div>
        <Link className="inline-flex min-h-12 items-center justify-center rounded-[.35rem] border border-primary bg-primary px-5 py-[.65rem] text-center font-semibold text-primary-foreground hover:underline hover:underline-offset-[.2em]" href="/request">Request a custom quote</Link>
      </section>
    </div>
  );
}
