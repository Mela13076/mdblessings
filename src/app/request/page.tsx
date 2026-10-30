import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";
import Link from "next/link";
import { getProductBySlug } from "@/lib/catalog";

export const metadata: Metadata = { title: "Request a quote" };

export default async function Page({ searchParams }: PageProps<"/request">) {
  const query = await searchParams;
  const slug = Array.isArray(query.product) ? query.product[0] : query.product;
  const product = slug ? getProductBySlug(slug) : undefined;
  return <PlaceholderPage title="Request a quote" description="Online quote requests are not available yet. Our custom request form is being prepared; nothing is submitted from this preview page.">
    {product && <p className="mt-6 max-w-[40rem] border-l-2 border-border pl-4 text-muted-foreground">Selected item: <Link className="inline-flex min-h-11 items-center gap-2 underline underline-offset-[.3em]" href={`/products/${encodeURIComponent(product.slug)}`}>{product.name}</Link>. Your design and final price require owner confirmation; a request is not a confirmed order.</p>}
    {slug && !product && <p className="mt-6 max-w-[40rem] border-l-2 border-border pl-4 text-muted-foreground">This product is no longer available in the preview catalog. <Link className="inline-flex min-h-11 items-center gap-2 underline underline-offset-[.3em]" href="/products">Browse products</Link> to choose another item.</p>}
  </PlaceholderPage>;
}
