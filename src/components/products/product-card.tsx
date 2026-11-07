import Image from "next/image";
import Link from "next/link";
import type { Category, Product } from "../../types/product";
import { formatStartingPrice } from "../../lib/format-price";
import { catalogPageContent as content } from "../../content/catalog-page";

type ProductCardProps = {
  product: Readonly<Product>;
  category?: Readonly<Category>;
};

/** Receive a published record selected by the server-side catalog functions. */
export function ProductCard({ product, category }: ProductCardProps) {
  const image = product.images[0];

  return (
    <article className="h-full rounded-lg border border-border bg-surface">
      <Link className="group flex h-full flex-col rounded-[inherit]" href={`/products/${encodeURIComponent(product.slug)}`} aria-label={`View ${product.name}`}>
        <div className="aspect-4/3 overflow-hidden rounded-t-lg bg-surface-accent">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1280px) 384px, (min-width: 1024px) calc((100vw - 88px) / 3), (min-width: 640px) calc((100vw - 64px) / 2), calc(100vw - 40px)"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center text-sm/[inherit] text-muted-foreground">
              <svg className="size-10 shrink-0" aria-hidden="true" focusable="false" width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="8" width="38" height="32" rx="3" />
                <circle cx="17" cy="18" r="3" />
                <path d="m6 34 10-10 8 8 8-12 11 15" />
              </svg>
              <span>{content.imagePlaceholder}</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 wrap-anywhere">
          <p className="text-sm/[inherit] text-muted-foreground">{category?.name ?? content.categoryFallback}</p>
          <h2 className="font-heading text-[1.625rem] leading-[1.25] font-normal">{product.name}</h2>
          <p className="font-semibold">{formatStartingPrice(product.startingPriceCents)}</p>
          <span className="mt-auto flex min-h-11 items-center justify-between gap-4 pt-2 text-muted-foreground group-hover:text-foreground group-hover:underline group-hover:underline-offset-[.3em]">{content.detailsLabel} <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  );
}
