import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Request a quote" };

export default function Page() {
  return <PlaceholderPage title="Request a quote" description="Online quote requests are not available yet. Our custom request form is being prepared; nothing is submitted from this preview page." />;
}
