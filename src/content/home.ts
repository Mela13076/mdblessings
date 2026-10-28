/** Layout-review copy only; replace with owner-approved content before launch.
 * These examples are not catalog records and never publish the draft seed data.
 */
export const homeContent = {
  previewNotice: "Homepage design preview · Sample copy and image placeholders; final content is awaiting owner approval.",
  hero: {
    eyebrow: "Faith · Love · Creativity",
    title: "Custom creations, made with love.",
    description: "Personalized apparel, tumblers, gifts, and keepsakes for the moments that matter to you.",
    exploreLabel: "Explore creations",
    imageLabel: "A glimpse of our creations",
    imageNote: "Product photography coming soon",
  },
  categories: {
    eyebrow: "Something personal",
    title: "Browse by category",
    description: "A little inspiration for your next custom idea.",
    note: "Illustrative categories for this design preview. Our product collection is being prepared.",
    items: [
      { id: "apparel-preview", icon: "shirt", name: "Apparel", description: "A personal touch for what you wear." },
      { id: "tumblers-preview", icon: "cup", name: "Tumblers", description: "Everyday pieces with your personality." },
      { id: "gifts-preview", icon: "gift", name: "Custom gifts", description: "Ideas for the people you celebrate." },
      { id: "keepsakes-preview", icon: "heart", name: "Keepsakes", description: "A place for meaningful memories." },
    ],
  },
  featured: {
    eyebrow: "Made personal",
    title: "Featured creations",
    description: "A space for a few special pieces from our collection.",
    note: "Layout examples only · Approved products, photos, and starting prices are coming soon.",
    browseLabel: "View all products",
    items: [
      { id: "featured-apparel-preview", name: "Apparel preview", icon: "shirt" },
      { id: "featured-tumbler-preview", name: "Tumbler preview", icon: "cup" },
      { id: "featured-keepsake-preview", name: "Keepsake preview", icon: "heart" },
    ],
  },
  story: {
    eyebrow: "The heart behind the name",
    title: "Our Story",
    description: "Meet Mimi’s Divine Blessings, a family custom-merchandise business with a personal connection behind its name.",
    note: "Story preview · Our owner-approved family introduction and photograph will be shared here.",
    linkLabel: "Read our story",
    imageLabel: "A little behind the scenes",
    imageNote: "Family or workspace photograph coming soon",
  },
  inquiry: {
    title: "Have a custom idea?",
    description: "Something you don’t see pictured? Start with a request for a quote.",
    availability: "The online request form is coming soon. This preview does not submit inquiries.",
  },
} as const;
