import Link from "next/link";

type PlaceholderPageProps = { title: string; description: string; children?: React.ReactNode };

export function PlaceholderPage({ title, description, children }: PlaceholderPageProps) {
  return (
    <section className="py-[clamp(3.5rem,9vw,8rem)] mx-auto w-[calc(100%_-_2.5rem)] max-w-[76rem]">
      <p className="mb-4 text-xs/[inherit] font-semibold tracking-[.15em] text-muted-foreground uppercase">Site preview</p>
      <h1>{title}</h1>
      <p className="mt-6 max-w-[40rem] text-lg/[inherit] text-muted-foreground">{description}</p>
      {children}
      <div className="mt-8 flex flex-wrap gap-3"><Link className="inline-flex min-h-11 items-center gap-2 underline underline-offset-[.3em]" href="/">Back to home <span aria-hidden="true">→</span></Link></div>
    </section>
  );
}
