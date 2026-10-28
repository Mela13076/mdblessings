import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Products" };

export default function Page() {
  return <PlaceholderPage title="Products" description="Our product collection is being prepared. Approved photos, descriptions, and starting prices will appear here." />;
}
