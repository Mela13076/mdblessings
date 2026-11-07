import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Frequently asked questions" };

export default function Page() {
  return <PlaceholderPage title="Frequently asked questions" description="Answers about customization, quotes, and local pickup will be added after owner review." />;
}
