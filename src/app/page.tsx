import Link from "next/link";
import { homeContent as content } from "@/content/home";
import { site } from "@/content/site";
import { MediaPlaceholder, PreviewIcon } from "@/components/home/preview-art";

export default function Home() {
  return (
    <div>
      <p className="border-b border-border bg-surface-accent px-5 py-[.65rem] text-center text-sm/[inherit] text-foreground">{content.previewNotice}</p>

      <section className="py-[clamp(2.5rem,5vw,5rem)]" aria-labelledby="home-heading">
        <div className="mx-auto w-[calc(100%_-_2.5rem)] max-w-[76rem] grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-[38rem]">
            <p className="mb-4 text-xs/[inherit] font-semibold tracking-[.15em] text-muted-foreground uppercase">{content.hero.eyebrow}</p>
            <h1 className="text-[clamp(2.75rem,5.2vw,4.75rem)]" id="home-heading">{content.hero.title}</h1>
            <p className="mt-5 max-w-[38rem] text-lg/[inherit] text-muted-foreground">{content.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3 flex-col items-stretch sm:flex-row sm:items-center">
              <Link className="inline-flex min-h-12 items-center justify-center rounded-[.35rem] border border-primary bg-primary px-5 py-[.65rem] text-center font-semibold text-primary-foreground hover:underline hover:underline-offset-[.2em]" href="/products">{content.hero.exploreLabel}</Link>
              <Link className="inline-flex min-h-12 items-center justify-center rounded-[.35rem] border border-primary bg-transparent px-5 py-[.65rem] text-center font-semibold text-foreground hover:underline hover:underline-offset-[.2em]" href={site.inquiry.href}>{site.inquiry.label}</Link>
            </div>
            <p className="mt-5 text-sm/[inherit] text-muted-foreground">Local pickup only <span className="mx-1" aria-hidden="true">·</span> Final pricing confirmed personally</p>
          </div>
          <MediaPlaceholder label={content.hero.imageLabel} note={content.hero.imageNote} />
        </div>
      </section>

      <section className="mx-auto w-[calc(100%_-_2.5rem)] max-w-[76rem] py-[clamp(3rem,6vw,5rem)]" aria-labelledby="categories-heading">
        <div className="text-center">
          <p className="mb-3 text-xs/[inherit] font-semibold tracking-[.15em] text-muted-foreground uppercase">{content.categories.eyebrow}</p>
          <h2 className="font-heading text-[clamp(2rem,3vw,2.75rem)] leading-[1.2] font-normal text-balance" id="categories-heading">{content.categories.title}</h2>
          <p className="mt-3 text-muted-foreground">{content.categories.description}</p>
        </div>
        <ul className="mt-8 grid list-none grid-cols-2 gap-3.5 p-0 lg:grid-cols-4 lg:gap-6">
          {content.categories.items.map((category) => (
            <li className="group overflow-hidden rounded-lg border border-border bg-surface pb-5 text-center" key={category.id}>
              <div className="grid h-28 place-items-center bg-surface-accent group-even:bg-pink-soft lg:h-36"><PreviewIcon className="size-11" name={category.icon} /></div>
              <h3 className="mx-3 mt-4 mb-2 font-heading text-[1.375rem] leading-[1.3] font-normal">{category.name}</h3>
              <p className="mx-3 text-base/[inherit] text-muted-foreground">{category.description}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm/[inherit] text-muted-foreground">{content.categories.note}</p>
      </section>

      <section className="border-t border-border bg-surface py-[clamp(3rem,6vw,5rem)]" aria-labelledby="featured-heading">
        <div className="mx-auto w-[calc(100%_-_2.5rem)] max-w-[76rem]">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="text-center lg:text-left">
              <p className="mb-3 text-xs/[inherit] font-semibold tracking-[.15em] text-muted-foreground uppercase">{content.featured.eyebrow}</p>
              <h2 className="font-heading text-[clamp(2rem,3vw,2.75rem)] leading-[1.2] font-normal text-balance" id="featured-heading">{content.featured.title}</h2>
              <p className="mt-3 text-muted-foreground">{content.featured.description}</p>
            </div>
            <Link className="inline-flex min-h-11 items-center gap-2 underline underline-offset-[.3em] lg:shrink-0" href="/products">{content.featured.browseLabel} <span aria-hidden="true">→</span></Link>
          </div>
          <p id="featured-preview-note" className="mx-auto mt-6 max-w-3xl text-center text-sm/[inherit] text-muted-foreground">{content.featured.note}</p>
          <div className="-mx-1 mt-8 snap-x snap-proximity overflow-x-auto px-1 pt-1 pb-4 lg:overflow-visible" role="region" aria-label="Featured creation layout previews" aria-describedby="featured-preview-note" tabIndex={0}>
            <ul className="grid auto-cols-[82%] grid-flow-col list-none gap-4 p-0 sm:auto-cols-[45%] lg:grid-flow-row lg:grid-cols-3 lg:gap-6">
              {content.featured.items.map((item) => (
                <li className="group min-w-0 snap-start overflow-hidden rounded-lg border border-border bg-background" key={item.id}>
                  <div className="relative grid aspect-4/3 place-items-center bg-surface-accent group-[:nth-child(2)]:bg-pink-soft">
                    <span className="absolute top-3 left-3 rounded-[.2rem] bg-surface px-2 py-1 text-xs/[inherit] text-muted-foreground">Photo placeholder</span>
                    <PreviewIcon className="size-16 text-muted-foreground" name={item.icon} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-[1.375rem] leading-[1.3] font-normal">{item.name}</h3>
                    <p className="mt-2 text-sm/[inherit] text-muted-foreground">Product details coming soon</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-2 text-[.8125rem] text-muted-foreground lg:hidden">Swipe or use the arrow keys to explore the previews <span aria-hidden="true">→</span></p>
        </div>
      </section>

      <section className="py-[clamp(3rem,6vw,5rem)]" aria-labelledby="story-heading">
        <div className="mx-auto w-[calc(100%_-_2.5rem)] max-w-[76rem] grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <MediaPlaceholder variant="story" label={content.story.imageLabel} note={content.story.imageNote} />
          <div className="py-2">
            <p className="mb-4 text-xs/[inherit] font-semibold tracking-[.15em] text-muted-foreground uppercase">{content.story.eyebrow}</p>
            <h2 className="font-heading text-[clamp(2rem,3vw,2.75rem)] leading-[1.2] font-normal text-balance" id="story-heading">{content.story.title}</h2>
            <p className="mt-5 max-w-[38rem] text-lg/[inherit] text-muted-foreground">{content.story.description}</p>
            <p className="my-5 border-l-2 border-gold pl-4 text-sm/[inherit] text-muted-foreground">{content.story.note}</p>
            <Link className="inline-flex min-h-11 items-center gap-2 underline underline-offset-[.3em]" href="/about">{content.story.linkLabel} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {/* Testimonials are omitted until genuine, permissioned content exists. */}
      <section className="border-t border-border bg-pink-soft py-10" aria-labelledby="inquiry-heading">
        <div className="mx-auto w-[calc(100%_-_2.5rem)] max-w-[76rem] grid gap-6 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8">
          <div className="grid size-14 place-items-center rounded-full border border-foreground"><PreviewIcon className="size-7" name="heart" /></div>
          <div>
            <h2 className="mb-3 font-heading text-[clamp(2rem,3vw,2.75rem)] leading-[1.2] font-normal text-balance" id="inquiry-heading">{content.inquiry.title}</h2>
            <p>{content.inquiry.description}</p>
            <p className="mt-3 max-w-[65ch] text-sm/[inherit]">{site.quoteNotice}</p>
            <p className="mt-3 max-w-[65ch] text-sm/[inherit]">{content.inquiry.availability}</p>
          </div>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-[.35rem] border border-primary bg-primary px-5 py-[.65rem] text-center font-semibold text-primary-foreground hover:underline hover:underline-offset-[.2em] justify-self-start sm:col-start-2 lg:col-start-auto" href={site.inquiry.href}>{site.inquiry.label}</Link>
        </div>
      </section>
    </div>
  );
}
