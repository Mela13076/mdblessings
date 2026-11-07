import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return <PlaceholderPage title="Contact" description="Our approved contact channels will be added here before launch. Online quote requests are not available yet." />;
}
