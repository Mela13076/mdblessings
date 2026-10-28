import Link from "next/link";

type PlaceholderPageProps = { title: string; description: string; children?: React.ReactNode };

export function PlaceholderPage({ title, description, children }: PlaceholderPageProps) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">Site preview</p>
      <h1>{title}</h1>
      <p className="intro-copy">{description}</p>
      {children}
      <div className="page-actions"><Link className="text-link" href="/">Back to home <span aria-hidden="true">→</span></Link></div>
    </section>
  );
}
