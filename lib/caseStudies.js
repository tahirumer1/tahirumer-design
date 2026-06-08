// Hand-authored UI/UX case studies — designed in Figma, exported as a tall
// case-study image, sliced into stackable segments under /public/work/<slug>/.
// Defined here (not WordPress) so they ship with the code and survive CMS resets.
// Spread into DEMO_ALL in queries.js → getProjectBySlug resolves them first,
// so they render at /work/<slug> and appear as cards in the Work archive.
export const CASE_STUDIES = [
  {
    _id: "cs-meterly",
    slug: "meterly",
    title: "Meterly — Product Analytics",
    category: "UI/UX",
    year: "2026",
    featured: true,
    order: 1,
    accentColor: "#1B3CD6",
    brief:
      "Product analytics, *reimagined* — calm, legible, and built to feel human, not another dark dashboard.",
    role: "UI/UX & Product Design",
    roleTags: ["Product Design", "UI/UX", "Data Visualization", "Design System"],
    platform: "Web App",
    timeline: "Concept",
    niche: "Product Analytics SaaS",
    description:
      "A product-analytics workspace that turns raw events into the metrics teams actually trust — calm, legible, and built to feel human. Four surfaces in one editorial system: an overview that surfaces what changed, a sortable cohort table, a single-metric report with discussion built in, and an integrations hub. Cool porcelain palette, mono numerals, hand-built charts (no stock kits), and a three-voice type system — Instrument Serif, IBM Plex Mono and Inter.",
    challenge: "",
    context: "",
    outcome: "",
    process: [],
    thumbnailUrl: "/work/meterly/cover.jpg",
    detailImageUrls: [
      "/work/meterly/01.webp",
      "/work/meterly/02.webp",
      "/work/meterly/03.webp",
      "/work/meterly/04.webp",
      "/work/meterly/05.webp",
      "/work/meterly/06.webp",
    ],
  },
];
