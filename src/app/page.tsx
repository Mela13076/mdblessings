import Link from "next/link";
import { site } from "@/content/site";

export default function Home() {
  return (
    <section className="page-intro container">
      <p className="eyebrow">Mimi’s Divine Blessings</p>
      <h1>Custom creations, personal connections.</h1>
      <p className="intro-copy">A family custom-merchandise showcase. Explore the site as we prepare our collection and quote-request experience.</p>
      <p className="preview-note">Site preview · Our full homepage and product collection are coming soon.</p>
      <div className="page-actions">
        <Link className="button" href="/products">Explore creations</Link>
        <Link className="button button-secondary" href={site.inquiry.href}>{site.inquiry.label}</Link>
      </div>
    </section>
  );
}
