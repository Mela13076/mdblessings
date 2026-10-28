import styles from "./home.module.css";

export type PreviewIconName = "shirt" | "cup" | "gift" | "heart" | "photo";

/** Decorative line drawings for explicitly labeled layout placeholders. */
export function PreviewIcon({ name }: { name: PreviewIconName }) {
  return (
    <svg aria-hidden="true" focusable="false" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {name === "shirt" && <path d="m16 8-10 7 6 9 5-3v19h14V21l5 3 6-9-10-7c-1 5-15 5-16 0Z" />}
      {name === "cup" && <><path d="M13 10h22l-3 30H16l-3-30ZM10 10h28M19 5h10M29 5l2 5" /><path d="m17 18 1 15M35 15h3c7 0 5 15-5 15" /></>}
      {name === "gift" && <><path d="M7 21h34V13H7v8ZM11 21v20h26V21M24 13v28" /><path d="M24 13c-17 0-12-15-5-8 3 3 5 8 5 8Zm0 0c17 0 12-15 5-8-3 3-5 8-5 8Z" /></>}
      {name === "heart" && <path d="M24 40 8 24C-3 12 14 0 24 13 34 0 51 12 40 24L24 40Z" />}
      {name === "photo" && <><rect x="5" y="8" width="38" height="32" rx="3" /><circle cx="17" cy="18" r="3" /><path d="m6 34 10-10 8 8 8-12 11 15" /></>}
    </svg>
  );
}

export function MediaPlaceholder({ label, note }: { label: string; note: string }) {
  return (
    <figure className={styles.mediaPlaceholder}>
      <div className={styles.mediaFrame}>
        <span className={styles.mediaIcon}><PreviewIcon name="photo" /></span>
        <span className={styles.mediaLabel}>{label}</span>
      </div>
      <figcaption>{note}</figcaption>
    </figure>
  );
}
