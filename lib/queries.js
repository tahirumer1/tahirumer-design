import { sanityClient } from "./sanity";

/* ═══════════════════════════════════════════════════════════════
 * DATA SOURCES
 *  • If NEXT_PUBLIC_WP_API is set → read from headless WordPress.
 *  • Else if Sanity is configured → read from Sanity (legacy).
 *  • Else → built-in fallback data.
 * All three paths return the SAME shape, so components never change.
 * ═══════════════════════════════════════════════════════════════ */

/* ─── Fallback data (also used if a source errors/returns empty) ─── */
const FALLBACK_PROJECTS = [
  {
    _id: "fallback-1", slug: "finova", title: "Finova", category: "UI/UX", year: "2024",
    featured: true, order: 1, accentColor: "#4D7CFF",
    brief: "Reimagined a financial analytics platform — turning complex data into intuitive, actionable dashboards for modern CFOs.",
    role: "Lead Product Designer", timeline: "12 Weeks", platform: "Web Application",
    challenge: "Financial professionals were drowning in data spread across multiple legacy tools. The existing solutions were technically powerful but visually overwhelming.",
    context: "A fintech startup targeting mid-market CFOs needed to differentiate in a crowded market.",
    process: [
      { title: "Discovery", description: "12 stakeholder interviews. 8 user observation sessions." },
      { title: "Architecture", description: "Restructured the data hierarchy from tool-centric to task-centric." },
      { title: "Design System", description: "Dark-mode-first interface with a 120+ component library." },
    ],
    outcome: "42% reduction in time-to-insight. 3.2× increase in daily active usage.",
  },
  {
    _id: "fallback-2", slug: "meridian", title: "Meridian", category: "UI/UX", year: "2024",
    featured: true, order: 2, accentColor: "#00D4AA",
    brief: "Patient-first healthcare app — simplifying appointment booking, health tracking, and doctor communication into one seamless experience.",
    role: "UX/UI Designer", timeline: "16 Weeks", platform: "iOS & Android",
    challenge: "Patients used 3–4 separate apps to manage healthcare. Fragmentation caused missed appointments and frustration.",
    context: "A regional healthcare network serving 200K+ patients wanted to consolidate their digital touchpoints.",
    process: [
      { title: "Research", description: "Diary studies with 20 patients over 2 weeks." },
      { title: "Prototyping", description: "Tested 3 navigation paradigms across two rounds of usability tests." },
      { title: "Visual Language", description: "Calming, accessible design validated against WCAG AAA." },
    ],
    outcome: "4.8-star rating on launch. 67% patient consolidation within 3 months.",
  },
  {
    _id: "fallback-3", slug: "atlas", title: "Atlas", category: "UI/UX", year: "2023",
    featured: true, order: 3, accentColor: "#FF6B4D",
    brief: "Adaptive learning platform that personalizes content based on student behavior — turning passive consumption into active mastery.",
    role: "Product Designer", timeline: "20 Weeks", platform: "Web & Tablet",
    challenge: "Online education was treating every student identically — linear content, fixed pacing, no feedback loops.",
    context: "An ed-tech company building K-12 supplementary education for students and teachers.",
    process: [
      { title: "Behavioral Analysis", description: "Analyzed session data from 5,000+ students." },
      { title: "Adaptive Framework", description: "Designed dynamic difficulty adjustment with visual feedback." },
      { title: "Design", description: "Vibrant, illustration-driven system maintaining academic credibility." },
    ],
    outcome: "Completion rates: 15% → 41%. Session time grew 2.3×.",
  },
  {
    _id: "fallback-4", slug: "noir", title: "Noir Studio", category: "Development", year: "2023",
    featured: true, order: 4, accentColor: "#C4A882",
    brief: "Complete brand identity and website for a boutique architecture firm — translating spatial design philosophy into digital experience.",
    role: "Designer & Developer", timeline: "8 Weeks", platform: "WordPress",
    challenge: "The firm's template-based site failed to communicate the sophistication of their architectural work.",
    context: "A boutique architecture studio known for minimalist residential projects serving affluent homeowners.",
    process: [
      { title: "Brand Strategy", description: "Defined brand pillars: precision, restraint, materiality." },
      { title: "Identity System", description: "Custom-modified wordmark. Grid-based layout framework." },
      { title: "Development", description: "Custom WordPress theme. Performance-optimized for sub-2-second loads." },
    ],
    outcome: "Inbound inquiries increased 180% in 6 months. Featured in 2 design publications.",
  },
  {
    _id: "fallback-5", slug: "aurora", title: "Aurora Brand", category: "Graphic", year: "2024",
    featured: false, order: 5, accentColor: "#E8B88A",
    brief: "Complete brand identity for a luxury skincare startup — from logotype and packaging to digital touchpoints and retail experience.",
    role: "Brand Designer", timeline: "10 Weeks", platform: "Print & Digital",
    challenge: "A new skincare brand entering a saturated market needed a visual identity that felt clinically credible and emotionally aspirational.",
    context: "Founded by a dermatologist, the brand wanted to occupy space between scientific skincare and lifestyle luxury.",
    process: [
      { title: "Strategy", description: "Brand archetype workshops. Audit of 20 competitors." },
      { title: "Identity", description: "Custom serif wordmark with modified terminals." },
      { title: "System", description: "Packaging architecture across 8 SKUs. Digital brand guidelines." },
    ],
    outcome: "Launched with inclusion in 3 premium retailers. Sold out first production run in 6 weeks.",
  },
  {
    _id: "fallback-6", slug: "pulse", title: "Pulse", category: "UI/UX", year: "2024",
    featured: false, order: 6, accentColor: "#4DB5FF",
    brief: "Real-time team collaboration tool reimagined for remote-first organizations — blending async communication with live presence.",
    role: "Product Designer", timeline: "14 Weeks", platform: "Desktop & Web",
    challenge: "Remote teams were fragmenting across Slack, Zoom, Notion, and email. Context was lost between tools.",
    context: "A Y Combinator startup building the 'operating system for remote work.'",
    process: [
      { title: "Product Strategy", description: "Feature prioritization across 40+ possible modules." },
      { title: "System Design", description: "Designed a flexible workspace framework." },
      { title: "Polish", description: "Motion design for status changes. Keyboard-first interaction model." },
    ],
    outcome: "Shipped to 500 beta teams in month one. 72% daily active rate.",
  },
];

const FALLBACK_TESTIMONIALS = [
  { _id: "t1", quote: "Tahir doesn't just deliver designs — he delivers clarity. Working with him felt like having a strategic partner, not just a designer.", author: "Product Lead", company: "SaaS Startup" },
  { _id: "t2", quote: "The speed and quality combination is rare. Most designers give you one or the other. Tahir consistently delivered both across a year-long engagement.", author: "Founder & CEO", company: "Healthtech" },
  { _id: "t3", quote: "He understood our business before he sketched a single screen. That changed everything about the final outcome.", author: "Head of Product", company: "Fintech" },
  { _id: "t4", quote: "Obsessed with the details in the best way. Every handoff was production-ready — engineering loved working with his files.", author: "Engineering Lead", company: "B2B Platform" },
];

const FALLBACK_FAQS = [
  { _id: "f1", question: "How do you typically structure a project?", answer: "Most engagements start with a discovery phase — understanding business goals, users, and constraints. From there we move into strategy and architecture, then design, then iteration. I'll tailor the structure to your timeline and team, but the phases are consistent." },
  { _id: "f2", question: "Do you work solo or with a team?", answer: "Both. For smaller projects I often work solo end-to-end. For larger engagements I'll collaborate with your in-house team or assemble specialists as needed. I'm equally comfortable leading and contributing." },
  { _id: "f3", question: "What's your typical project timeline?", answer: "A focused UX/UI engagement usually runs 8–16 weeks. Brand projects 6–10 weeks. Full website builds 10–14 weeks. Complex products are scoped case-by-case." },
  { _id: "f4", question: "Do you handle development as well?", answer: "Yes, for WordPress-based websites. For complex web apps or native apps I partner with development teams I trust, or collaborate directly with your engineering team." },
  { _id: "f5", question: "What's your pricing model?", answer: "Fixed-scope pricing for most projects — you know what you're getting and what it costs upfront. Hourly for open-ended consulting or design-system maintenance." },
  { _id: "f6", question: "Can you work with clients internationally?", answer: "Absolutely. I've worked with clients across 6+ countries. I'm based in Lahore but work asynchronously with remote teams worldwide." },
];

const FALLBACK_SETTINGS = {
  heroTagline: "Helping businesses turn complex ideas into high‑performing digital experiences for over a decade.",
  aboutIntro: "I'm Tahir Umer, a product designer based in Lahore. I've spent 10+ years building digital products across fintech, healthcare, education, and architecture — working with startups and international clients. I think in systems, flows, and outcomes.",
  yearsExperience: 10,
  projectsCount: 100,
  countriesCount: 6,
  email: "iamtahirumer@gmail.com",
  available: true,
  socialLinks: [
    { platform: "Dribbble", url: "https://dribbble.com/iamtahirumer" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/iamtahirumer/" },
    { platform: "Behance", url: "https://www.behance.net/tahirumer2" },
    { platform: "Facebook", url: "https://www.facebook.com/tahirumer.ui.ux" },
  ],
};

/* ═══════════════════════════════════════════════════════════════
 * WORDPRESS (headless) — active when NEXT_PUBLIC_WP_API is set
 * e.g. NEXT_PUBLIC_WP_API=https://cms.tahirumer.site/wp-json
 * ═══════════════════════════════════════════════════════════════ */
const WP_API = process.env.NEXT_PUBLIC_WP_API;
const isWpConfigured = () => !!WP_API;

function decodeEntities(str = "") {
  return String(str)
    .replace(/&amp;/g, "&").replace(/&#0?38;/g, "&")
    .replace(/&#8211;/g, "–").replace(/&#8212;/g, "—")
    .replace(/&#8216;/g, "‘").replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“").replace(/&#8221;/g, "”")
    .replace(/&#8230;/g, "…").replace(/&hellip;/g, "…")
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

async function wpJson(path) {
  const res = await fetch(`${WP_API}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`WP ${res.status} on ${path}`);
  return res.json();
}

// ACF image fields come back as attachment IDs — resolve them all in one batched call.
async function resolveMedia(ids) {
  const uniq = [...new Set(ids.filter((x) => Number.isInteger(x)))];
  if (!uniq.length) return new Map();
  const media = await wpJson(`/wp/v2/media?include=${uniq.join(",")}&per_page=100&_fields=id,source_url`);
  return new Map(media.map((m) => [m.id, m.source_url]));
}

function collectImageIds(posts) {
  const ids = [];
  for (const p of posts) {
    const a = p.acf || {};
    if (a.thumbnail) ids.push(a.thumbnail);
    for (let i = 1; i <= 6; i++) if (a[`detail_image_${i}`]) ids.push(a[`detail_image_${i}`]);
  }
  return ids;
}

function mapWpProject(post, mediaMap) {
  const a = post.acf || {};
  const process = [];
  for (let i = 1; i <= 4; i++) {
    if (a[`step${i}_title`]) process.push({ title: a[`step${i}_title`], description: a[`step${i}_desc`] || "" });
  }
  const detailImageUrls = [];
  for (let i = 1; i <= 6; i++) {
    const url = a[`detail_image_${i}`] && mediaMap.get(a[`detail_image_${i}`]);
    if (url) detailImageUrls.push(url);
  }
  return {
    _id: String(post.id),
    slug: post.slug,
    title: decodeEntities(post.title?.rendered || ""),
    category: a.category || "UI/UX",
    year: a.year || "",
    featured: !!a.featured,
    order: typeof a.display_order === "number" ? a.display_order : 99,
    accentColor: a.accent_color || "",
    brief: decodeEntities(a.brief || ""),
    role: a.role || "",
    timeline: a.timeline || "",
    platform: a.platform || "",
    challenge: decodeEntities(a.challenge || ""),
    context: decodeEntities(a.context || ""),
    process,
    outcome: decodeEntities(a.outcome || ""),
    thumbnailUrl: (a.thumbnail && mediaMap.get(a.thumbnail)) || null,
    detailImageUrls,
  };
}

async function wpAllProjects() {
  const posts = await wpJson(`/wp/v2/project?per_page=100&_fields=id,slug,title,acf`);
  const mediaMap = await resolveMedia(collectImageIds(posts));
  return posts.map((p) => mapWpProject(p, mediaMap)).sort((x, y) => x.order - y.order);
}

async function wpProjectBySlug(slug) {
  const posts = await wpJson(`/wp/v2/project?slug=${encodeURIComponent(slug)}&_fields=id,slug,title,acf`);
  if (!posts.length) return null;
  const mediaMap = await resolveMedia(collectImageIds(posts));
  return mapWpProject(posts[0], mediaMap);
}

async function wpTestimonials() {
  const posts = await wpJson(`/wp/v2/testimonial?per_page=100&_fields=id,acf`);
  if (!posts.length) return FALLBACK_TESTIMONIALS;
  return posts
    .map((p) => ({ _id: String(p.id), quote: decodeEntities(p.acf?.quote || ""), author: p.acf?.author || "", company: p.acf?.company || "", _order: p.acf?.display_order ?? 99 }))
    .sort((a, b) => a._order - b._order);
}

async function wpFaqs() {
  const posts = await wpJson(`/wp/v2/faq?per_page=100&_fields=id,title,acf`);
  if (!posts.length) return FALLBACK_FAQS;
  return posts
    .map((p) => ({ _id: String(p.id), question: decodeEntities(p.title?.rendered || ""), answer: decodeEntities(p.acf?.answer || ""), _order: p.acf?.display_order ?? 99 }))
    .sort((a, b) => a._order - b._order);
}

/* ═══════════════════════════════════════════════════════════════
 * SANITY (legacy) — used only if WP isn't configured but Sanity is
 * ═══════════════════════════════════════════════════════════════ */
const PROJECT_FIELDS = `
  _id, title, "slug": slug.current, category, year, featured, order, accentColor,
  brief, role, timeline, platform, challenge, context, process, outcome,
  "thumbnailUrl": thumbnail.asset->url, "detailImageUrls": detailImages[].asset->url
`;
const allProjectsQuery = `*[_type == "project"] | order(order asc) { ${PROJECT_FIELDS} }`;
const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }`;
const projectSlugsQuery = `*[_type == "project" && defined(slug.current)][].slug.current`;
const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) { _id, quote, author, company }`;
const faqsQuery = `*[_type == "faq"] | order(order asc) { _id, question, answer }`;
const siteSettingsQuery = `*[_type == "siteSettings"][0] { heroTagline, aboutIntro, yearsExperience, projectsCount, countriesCount, email, available, socialLinks }`;

const isSanityConfigured = () =>
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id_here";

async function fetchWithFallback(query, fallback, params = {}) {
  if (!isSanityConfigured()) return fallback;
  try {
    const result = await sanityClient.fetch(query, params);
    if (!result || (Array.isArray(result) && result.length === 0)) return fallback;
    return result;
  } catch (e) {
    console.warn("Sanity fetch failed, using fallback:", e.message);
    return fallback;
  }
}

/* ═══════════════════════════════════════════════════════════════
 * PUBLIC API — same signatures the whole app already uses
 * ═══════════════════════════════════════════════════════════════ */
export async function getAllProjects() {
  if (isWpConfigured()) {
    try {
      const projects = await wpAllProjects();
      if (projects.length) return projects;
    } catch (e) {
      console.warn("WordPress projects failed, using fallback:", e.message);
    }
    return FALLBACK_PROJECTS;
  }
  return fetchWithFallback(allProjectsQuery, FALLBACK_PROJECTS);
}

export async function getFeaturedProjects() {
  const all = await getAllProjects();
  return all.filter((p) => p.featured).slice(0, 4);
}

export async function getProjectBySlug(slug) {
  if (isWpConfigured()) {
    try {
      const p = await wpProjectBySlug(slug);
      if (p) return p;
    } catch (e) {
      console.warn("WordPress project failed, using fallback:", e.message);
    }
    return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
  }
  return fetchWithFallback(projectBySlugQuery, FALLBACK_PROJECTS.find((p) => p.slug === slug) || null, { slug });
}

export async function getProjectSlugs() {
  if (isWpConfigured()) {
    try {
      const posts = await wpJson(`/wp/v2/project?per_page=100&_fields=slug`);
      if (posts.length) return posts.map((p) => p.slug);
    } catch (e) {
      console.warn("WordPress slugs failed, using fallback:", e.message);
    }
    return FALLBACK_PROJECTS.map((p) => p.slug);
  }
  if (!isSanityConfigured()) return FALLBACK_PROJECTS.map((p) => p.slug);
  try {
    const slugs = await sanityClient.fetch(projectSlugsQuery);
    return slugs?.length ? slugs : FALLBACK_PROJECTS.map((p) => p.slug);
  } catch {
    return FALLBACK_PROJECTS.map((p) => p.slug);
  }
}

export async function getTestimonials() {
  if (isWpConfigured()) {
    try { return await wpTestimonials(); }
    catch (e) { console.warn("WordPress testimonials failed, using fallback:", e.message); return FALLBACK_TESTIMONIALS; }
  }
  return fetchWithFallback(testimonialsQuery, FALLBACK_TESTIMONIALS);
}

export async function getFaqs() {
  if (isWpConfigured()) {
    try { return await wpFaqs(); }
    catch (e) { console.warn("WordPress FAQs failed, using fallback:", e.message); return FALLBACK_FAQS; }
  }
  return fetchWithFallback(faqsQuery, FALLBACK_FAQS);
}

export async function getSiteSettings() {
  // Settings live in code (no ACF-free options page; Sanity has no settings doc either).
  if (isWpConfigured()) return FALLBACK_SETTINGS;
  return fetchWithFallback(siteSettingsQuery, FALLBACK_SETTINGS);
}

// Build a gradient from a hex color — used when a project has no thumbnail.
export function colorToGradient(hex) {
  if (!hex) return "linear-gradient(135deg, #1a1a1a, #0f0f0f)";
  return `linear-gradient(135deg, ${hex}20, ${hex}35, #0a0a0a)`;
}
