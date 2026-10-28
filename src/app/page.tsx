import Link from "next/link";
import { homeContent as content } from "@/content/home";
import { site } from "@/content/site";
import { MediaPlaceholder, PreviewIcon } from "@/components/home/preview-art";
import styles from "@/components/home/home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <p className={styles.previewBanner}>{content.previewNotice}</p>

      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={`container ${styles.split}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1 id="home-heading">{content.hero.title}</h1>
            <p className={styles.description}>{content.hero.description}</p>
            <div className={`page-actions ${styles.heroActions}`}>
              <Link className="button" href="/products">{content.hero.exploreLabel}</Link>
              <Link className="button button-secondary" href={site.inquiry.href}>{site.inquiry.label}</Link>
            </div>
            <p className={styles.pickupNote}>Local pickup only <span aria-hidden="true">·</span> Final pricing confirmed personally</p>
          </div>
          <MediaPlaceholder label={content.hero.imageLabel} note={content.hero.imageNote} />
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="categories-heading">
        <div className={styles.sectionHeading}>
          <p className="eyebrow">{content.categories.eyebrow}</p>
          <h2 id="categories-heading">{content.categories.title}</h2>
          <p>{content.categories.description}</p>
        </div>
        <ul className={styles.categoryGrid}>
          {content.categories.items.map((category) => (
            <li className={styles.categoryCard} key={category.id}>
              <div className={styles.categoryIcon}><PreviewIcon name={category.icon} /></div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </li>
          ))}
        </ul>
        <p className={styles.sectionNote}>{content.categories.note}</p>
      </section>

      <section className={`${styles.featured} ${styles.section}`} aria-labelledby="featured-heading">
        <div className="container">
          <div className={styles.headingRow}>
            <div className={styles.sectionHeading}>
              <p className="eyebrow">{content.featured.eyebrow}</p>
              <h2 id="featured-heading">{content.featured.title}</h2>
              <p>{content.featured.description}</p>
            </div>
            <Link className="text-link" href="/products">{content.featured.browseLabel} <span aria-hidden="true">→</span></Link>
          </div>
          <p id="featured-preview-note" className={styles.sectionNote}>{content.featured.note}</p>
          <div className={styles.featuredScroll} role="region" aria-label="Featured creation layout previews" aria-describedby="featured-preview-note" tabIndex={0}>
            <ul className={styles.featuredGrid}>
              {content.featured.items.map((item) => (
                <li className={styles.featuredCard} key={item.id}>
                  <div className={styles.productPlaceholder}>
                    <span className={styles.previewBadge}>Photo placeholder</span>
                    <PreviewIcon name={item.icon} />
                  </div>
                  <div className={styles.featuredCaption}>
                    <h3>{item.name}</h3>
                    <p>Product details coming soon</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className={styles.scrollHint}>Swipe or use the arrow keys to explore the previews <span aria-hidden="true">→</span></p>
        </div>
      </section>

      <section className={styles.story} aria-labelledby="story-heading">
        <div className={`container ${styles.split}`}>
          <MediaPlaceholder label={content.story.imageLabel} note={content.story.imageNote} />
          <div className={styles.storyCopy}>
            <p className="eyebrow">{content.story.eyebrow}</p>
            <h2 id="story-heading">{content.story.title}</h2>
            <p className={styles.description}>{content.story.description}</p>
            <p className={styles.storyNote}>{content.story.note}</p>
            <Link className="text-link" href="/about">{content.story.linkLabel} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {/* Testimonials are omitted until genuine, permissioned content exists. */}
      <section className={styles.inquiry} aria-labelledby="inquiry-heading">
        <div className={`container ${styles.inquiryInner}`}>
          <div className={styles.inquiryIcon}><PreviewIcon name="heart" /></div>
          <div>
            <h2 id="inquiry-heading">{content.inquiry.title}</h2>
            <p>{content.inquiry.description}</p>
            <p className={styles.inquiryNotice}>{site.quoteNotice}</p>
            <p className={styles.inquiryNotice}>{content.inquiry.availability}</p>
          </div>
          <Link className="button" href={site.inquiry.href}>{site.inquiry.label}</Link>
        </div>
      </section>
    </div>
  );
}
