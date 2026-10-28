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
    <article className="product-card">
      <Link className="product-card-link" href={`/products/${encodeURIComponent(product.slug)}`} aria-label={`View ${product.name}`}>
        <div className="product-card-media">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1280px) 384px, (min-width: 1024px) calc((100vw - 88px) / 3), (min-width: 640px) calc((100vw - 64px) / 2), calc(100vw - 40px)"
              className="product-card-image"
            />
          ) : (
            <div className="product-card-placeholder">
              <svg aria-hidden="true" focusable="false" width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="8" width="38" height="32" rx="3" />
                <circle cx="17" cy="18" r="3" />
                <path d="m6 34 10-10 8 8 8-12 11 15" />
              </svg>
              <span>{content.imagePlaceholder}</span>
            </div>
          )}
        </div>
        <div className="product-card-copy">
          <p className="product-card-category">{category?.name ?? content.categoryFallback}</p>
          <h2 className="product-card-title">{product.name}</h2>
          <p className="product-card-price">{formatStartingPrice(product.startingPriceCents)}</p>
          <span className="product-card-details">{content.detailsLabel} <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  );
}
