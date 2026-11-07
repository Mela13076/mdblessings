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
    <section className="min-w-0" aria-label={`Example photos of ${productName}`}>
      <figure>
        <div className="aspect-square overflow-hidden rounded-lg border border-border bg-surface-accent" id={imageId}>
          {image && !failed ? (
            <Image key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height}
              sizes="(min-width: 1280px) 584px, (min-width: 768px) 48vw, calc(100vw - 40px)"
              loading="eager" className="h-full w-full object-contain"
              onError={() => setFailedSources((sources) => [...sources, image.src])} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center text-sm/[inherit] text-muted-foreground">
              <svg className="size-10 shrink-0" aria-hidden="true" width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="8" width="38" height="32" rx="3" /><circle cx="17" cy="18" r="3" /><path d="m6 34 10-10 8 8 8-12 11 15" />
              </svg>
              <p>{failed ? "This photo could not be loaded. Please try another example." : "Example photos are coming soon."}</p>
            </div>
          )}
        </div>
        <figcaption className="mt-3 min-h-[1.6em] text-sm/[inherit] wrap-anywhere text-muted-foreground" aria-live="polite" aria-atomic="true">
          {image ? `Example ${selected + 1} of ${images.length}${image.caption ? ` · ${image.caption}` : ""}${failed ? " · Photo unavailable" : ""}` : "Product photography is being prepared."}
        </figcaption>
      </figure>
      {images.length > 1 && <>
        <div className="my-3 flex justify-between gap-3">
          <button className="min-h-11 rounded-[.35rem] border border-border bg-surface px-3 py-2 text-foreground" type="button" aria-controls={imageId} onClick={() => move(-1)}>← Previous photo</button>
          <button className="min-h-11 rounded-[.35rem] border border-border bg-surface px-3 py-2 text-foreground" type="button" aria-controls={imageId} onClick={() => move(1)}>Next photo →</button>
        </div>
        <ul className="flex list-none flex-wrap gap-3 p-2" aria-label="Choose an example photo">
          {images.map((example, index) => (
            <li key={`${example.src}-${index}`}>
              <button className="relative size-18 min-h-11 rounded-[.35rem] border border-border bg-surface p-1 text-foreground aria-pressed:border-3 aria-pressed:border-foreground" type="button" aria-label={`Show example ${index + 1}: ${example.alt}`} aria-pressed={index === selected}
                aria-controls={imageId} onClick={() => setSelected(index)}>
                <Image className="h-full w-full object-contain" src={example.src} alt="" width={example.width} height={example.height} sizes="72px" />
                <span className="absolute right-0 bottom-0 bg-surface px-1 text-xs/[inherit]">{index + 1}</span>
              </button>
            </li>
          ))}
        </ul>
      </>}
    </section>
  );
}
