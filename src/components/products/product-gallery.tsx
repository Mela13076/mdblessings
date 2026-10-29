"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { ProductImage } from "../../types/product";

type ProductGalleryProps = { images: readonly ProductImage[]; productName: string };

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [failedSources, setFailedSources] = useState<readonly string[]>([]);
  const imageId = useId();
  const image = images[selected];
  const failed = image && failedSources.includes(image.src);

  function move(offset: number) {
    setSelected((current) => (current + offset + images.length) % images.length);
  }

  return (
    <section className="product-gallery" aria-label={`Example photos of ${productName}`}>
      <figure>
        <div className="product-gallery-stage" id={imageId}>
          {image && !failed ? (
            <Image key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height}
              sizes="(min-width: 1280px) 584px, (min-width: 768px) 48vw, calc(100vw - 40px)"
              loading="eager" className="product-gallery-image"
              onError={() => setFailedSources((sources) => [...sources, image.src])} />
          ) : (
            <div className="product-card-placeholder">
              <svg aria-hidden="true" width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="8" width="38" height="32" rx="3" /><circle cx="17" cy="18" r="3" /><path d="m6 34 10-10 8 8 8-12 11 15" />
              </svg>
              <p>{failed ? "This photo could not be loaded. Please try another example." : "Example photos are coming soon."}</p>
            </div>
          )}
        </div>
        <figcaption className="product-gallery-caption" aria-live="polite" aria-atomic="true">
          {image ? `Example ${selected + 1} of ${images.length}${image.caption ? ` · ${image.caption}` : ""}${failed ? " · Photo unavailable" : ""}` : "Product photography is being prepared."}
        </figcaption>
      </figure>
      {images.length > 1 && <>
        <div className="product-gallery-controls">
          <button type="button" aria-controls={imageId} onClick={() => move(-1)}>← Previous photo</button>
          <button type="button" aria-controls={imageId} onClick={() => move(1)}>Next photo →</button>
        </div>
        <ul className="product-gallery-thumbnails" aria-label="Choose an example photo">
          {images.map((example, index) => (
            <li key={`${example.src}-${index}`}>
              <button type="button" aria-label={`Show example ${index + 1}: ${example.alt}`} aria-pressed={index === selected}
                aria-controls={imageId} onClick={() => setSelected(index)}>
                <Image src={example.src} alt="" width={example.width} height={example.height} sizes="72px" />
                <span>{index + 1}</span>
              </button>
            </li>
          ))}
        </ul>
      </>}
    </section>
  );
}
