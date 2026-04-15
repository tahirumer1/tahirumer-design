# tahirumer.design

Production-ready portfolio website for Tahir Umer — built with **Next.js 14**, **Sanity CMS**, and **Three.js**.

---

## Table of Contents

1. [What's Included](#whats-included)
2. [Quick Start (5 minutes)](#quick-start-5-minutes)
3. [Sanity CMS Setup](#sanity-cms-setup)
4. [Adding & Editing Content](#adding--editing-content)
5. [Project Structure](#project-structure)
6. [Customization Guide](#customization-guide)
7. [Deployment](#deployment)
8. [Connecting the Contact Form](#connecting-the-contact-form)
9. [Troubleshooting](#troubleshooting)
10. [Tech Stack & Why](#tech-stack--why)

---

## What's Included

- **Multi-page portfolio** — Home, Work archive, dynamic case studies, About, Services, Contact
- **Sanity CMS** — Edit projects, testimonials, FAQs, and site settings without touching code
- **Three.js 3D hero** — Interactive torus knot that responds to mouse movement
- **Custom cursor** with contextual labels
- **Loading screen** with animated counter
- **Scroll-triggered animations** throughout
- **Live clock** in your local timezone
- **Responsive** down to mobile
- **SEO-ready** with proper metadata
- **Fallback data** — Site works immediately, even before Sanity is configured

---

## Quick Start (5 minutes)

### Prerequisites

- **Node.js 18.17+** ([download here](https://nodejs.org))
- A code editor (VS Code recommended)
- Terminal/command line access

### Installation

```bash
# 1. Navigate to the project folder
cd tahirumer-design

# 2. Install dependencies
npm install

# 3. Copy the environment template
cp .env.example .env.local

# 4. Run the dev server
npm run dev
```

**Open** [http://localhost:3000](http://localhost:3000) — the site will load with placeholder content (the same projects you saw in the design preview).

> ✅ **The site works out of the box** without Sanity. Fallback data is built in. You only need to set up Sanity when you're ready to manage content yourself.

---

## Sanity CMS Setup

Sanity is the headless CMS that lets you add/edit projects without touching code.

### Step 1: Create a Sanity account

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and sign up (free)
2. Click **"Create new project"**
3. Name it **"Tahir Umer Portfolio"** (or whatever you prefer)
4. Choose dataset name: `production` (default is fine)
5. **Copy your Project ID** — you'll see it in the URL or project dashboard (looks like `abc123xy`)

### Step 2: Configure your environment

Open `.env.local` in your code editor and replace the placeholder values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy           # ← paste your project ID here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Step 3: Add CORS origin

Sanity needs to know your local dev URL is allowed:

1. Go to [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** tab
2. Scroll to **CORS Origins** → click **Add CORS Origin**
3. Add: `http://localhost:3000` — check **"Allow credentials"** → Save
4. Later, you'll add your production URL the same way (e.g., `https://tahirumer.design`)

### Step 4: Restart dev server & open Studio

```bash
# Stop the dev server (Ctrl+C) and restart
npm run dev
```

**Open** [http://localhost:3000/studio](http://localhost:3000/studio)

You'll see the Sanity Studio login. Sign in with the same account you created the project with.

🎉 **You now have a CMS!**

---

## Adding & Editing Content

Once inside the Studio at `/studio`, you'll see the content types in the left sidebar:

### Projects

This is where your case studies live.

**To add a new project:**

1. Click **Project** in the left sidebar → **Create new**
2. Fill in the fields:
   - **Title** — Project name (e.g., "Finova")
   - **Slug** — URL-friendly version, click "Generate" to auto-fill
   - **Category** — UI/UX, Graphic, or Development
   - **Year** — e.g., "2024"
   - **Featured on Home** — Toggle on if it should appear on the homepage
   - **Display Order** — Lower numbers appear first (1, 2, 3...)
   - **Accent Color** — Hex color for the project's accent (e.g., `#4D7CFF`)
   - **Thumbnail Image** — The card image (recommended: 1600×1000px)
   - **Hero Image** — Full-width image at the top of the case study (recommended: 2400×1000px)
   - **Brief** — One-paragraph summary
   - **Role / Timeline / Platform** — Project metadata
   - **The Challenge** — What problem you solved
   - **Context** — Background information
   - **Process Steps** — Click "Add item" for each step (Title + Description)
   - **Outcome** — Results and metrics
   - **Gallery Images** — Additional project screenshots
3. Click **Publish** (bottom right)

The new project appears on the live site within ~60 seconds (revalidation interval).

### Testimonials

1. Studio → **Testimonial** → Create new
2. Fill in **Quote**, **Author**, **Company / Role**, and **Display Order**
3. Publish

### FAQs

1. Studio → **FAQ** → Create new
2. Fill in **Question** and **Answer**
3. Publish

### Site Settings

This is the global content singleton (only one entry):

1. Studio → **Site Settings** → Create new (only do this once)
2. Fill in:
   - Hero Tagline
   - About Strip Text
   - Years of Experience, Successful Projects, Countries Served (powers the stat counters)
   - Email
   - Available for Projects toggle
   - Social Links (add Dribbble, LinkedIn, etc. with URLs)
3. Publish

> 💡 **Tip:** The site uses fallback data wherever a Sanity field is empty. So you can add content gradually.

---

## Project Structure

```
tahirumer-design/
├── app/                          # Next.js 14 App Router
│   ├── layout.jsx                # Root layout (Nav, Footer, AppShell)
│   ├── page.jsx                  # Home page
│   ├── globals.css               # All styles
│   ├── work/
│   │   ├── page.jsx              # Work archive
│   │   └── [slug]/page.jsx       # Dynamic case study pages
│   ├── about/page.jsx
│   ├── services/page.jsx
│   ├── contact/page.jsx
│   └── studio/                   # Sanity Studio (embedded)
│       ├── layout.jsx
│       └── [[...tool]]/page.jsx
│
├── components/
│   ├── AppShell.jsx              # Wraps Loader + Cursor
│   ├── Nav.jsx                   # Top navigation
│   ├── Footer.jsx                # Footer (server component, fetches settings)
│   ├── Loader.jsx                # Loading screen with counter
│   ├── Cursor.jsx                # Custom cursor
│   ├── Scene3D.jsx               # Three.js 3D hero scene
│   ├── LiveClock.jsx             # Real-time clock
│   ├── HomeHero.jsx              # Hero section
│   ├── FilterableWork.jsx        # Project grid with category filter
│   ├── ProjectCard.jsx           # Individual project card
│   ├── Testimonials.jsx          # Auto-rotating testimonials
│   ├── FAQ.jsx                   # FAQ accordion
│   ├── CTABlock.jsx              # "Have a project in mind?" block
│   └── Reveals.jsx               # Scroll-reveal helpers (R, LineReveal, Counter)
│
├── lib/
│   ├── sanity.js                 # Sanity client config
│   └── queries.js                # GROQ queries + fallback data
│
├── sanity/
│   └── schemas/
│       ├── index.js              # Schema registry
│       ├── project.js            # Project schema
│       ├── testimonial.js        # Testimonial schema
│       ├── faq.js                # FAQ schema
│       └── siteSettings.js       # Site settings singleton
│
├── public/                       # Static assets (favicon, images)
│
├── sanity.config.js              # Sanity Studio config
├── sanity.cli.js                 # Sanity CLI config
├── next.config.mjs               # Next.js config (image domains)
├── jsconfig.json                 # Path aliases (@/components, @/lib)
├── package.json                  # Dependencies
├── .env.example                  # Environment template
├── .env.local                    # Your actual env vars (gitignored)
└── README.md                     # This file
```

---

## Customization Guide

### Change colors

Open `app/globals.css` and edit the CSS variables at the top:

```css
:root {
  --bg: #0A0A0A;          /* Background */
  --text-1: #F5F5F5;      /* Primary text */
  --text-2: #A0A0A0;      /* Secondary text */
  --text-3: #555555;      /* Tertiary/labels */
  --accent: #D4FF00;      /* Accent color */
  --rule: #1F1F1F;        /* Borders */
}
```

If you change the accent color, also update `components/Scene3D.jsx`:

```js
const mat1 = new THREE.MeshStandardMaterial({
  color: 0xD4FF00,        // ← change to your accent (without #)
  emissive: 0xD4FF00,     // ← match
  ...
});
```

### Change fonts

Edit the Google Fonts import at the top of `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR+FONT&display=swap');
```

Then update the CSS variables:

```css
:root {
  --display: 'YourDisplayFont', sans-serif;
  --sans: 'YourBodyFont', sans-serif;
  --mono: 'YourMonoFont', monospace;
}
```

### Edit static text (story, philosophy, services)

These are still hardcoded in their page files (intentional — they don't change often):

- **About story & philosophy:** `app/about/page.jsx` — see `STORY` and `PHILOSOPHY` arrays
- **Services list:** `app/services/page.jsx` — see `SERVICES` array
- **Hero text:** `components/HomeHero.jsx`

For frequently-changing text, move it to Site Settings in Sanity and pull it in via `getSiteSettings()`.

### Change the 3D shape

In `components/Scene3D.jsx`, swap the geometry:

```js
// Default: torus knot
const geo1 = new THREE.TorusKnotGeometry(1.3, 0.08, 240, 16, 2, 3);

// Try: icosahedron (faceted sphere)
const geo1 = new THREE.IcosahedronGeometry(1.5, 0);

// Or: torus (donut)
const geo1 = new THREE.TorusGeometry(1.2, 0.4, 16, 100);

// Or: octahedron
const geo1 = new THREE.OctahedronGeometry(1.5, 0);
```

### Add your photo to About page

1. Drop your photo into `public/photo.jpg`
2. In `app/about/page.jsx`, replace the photo placeholder div with:

```jsx
import Image from "next/image";

<R d={0.2}>
  <div style={{ marginTop: "var(--space-lg)", aspectRatio: "2.2/1", borderRadius: 4, overflow: "hidden", position: "relative" }}>
    <Image src="/photo.jpg" alt="Tahir Umer" fill style={{ objectFit: "cover" }} />
  </div>
</R>
```

---

## Deployment

### Deploy to Vercel (recommended, free)

Vercel is built by the same team as Next.js — deployment is automatic.

1. **Push your code to GitHub** (create a new repo and push)
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Under **Environment Variables**, add (copy from your `.env.local`):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
5. Click **Deploy**

You'll get a URL like `tahirumer-design.vercel.app` immediately.

### Connect your custom domain (tahirumer.design)

1. In Vercel project → **Settings** → **Domains** → Add `tahirumer.design`
2. Vercel will show you DNS records to add at your domain registrar
3. Add the records → wait 5–30 minutes for DNS to propagate
4. SSL certificate is automatic

### Add production URL to Sanity CORS

Don't forget: go back to [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **CORS Origins** → Add `https://tahirumer.design` (with credentials enabled).

---

## Connecting the Contact Form

Currently the form is a working UI but doesn't actually send emails. To wire it up, choose one of these options:

### Option A: Resend (recommended — easiest)

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Verify your domain (or use their test domain initially)
3. Get an API key
4. Install: `npm install resend`
5. Add to `.env.local`: `RESEND_API_KEY=your_key_here`

Create `app/api/contact/route.js`:

```js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { name, email, type, budget, message } = await req.json();

  try {
    await resend.emails.send({
      from: "Portfolio <noreply@tahirumer.design>",
      to: "hello@tahirumer.design",
      subject: `New project inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nType: ${type}\nBudget: ${budget}\n\n${message}`,
      replyTo: email,
    });
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: e.message }, { status: 500 });
  }
}
```

Then in `app/contact/page.jsx`, update the `submit` function:

```js
const submit = async () => {
  setSubmitting(true);
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  setSubmitting(false);
  if (res.ok) setSent(true);
};
```

### Option B: Formspree

1. Go to [formspree.io](https://formspree.io) → create a new form → copy your form ID
2. In `app/contact/page.jsx`, replace the `submit` function:

```js
const submit = async () => {
  setSubmitting(true);
  await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(form),
  });
  setSubmitting(false);
  setSent(true);
};
```

---

## Troubleshooting

### "Module not found" errors after install

```bash
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### Sanity Studio shows "Not authorized"

You forgot to add `http://localhost:3000` (or your production URL) to CORS origins in your Sanity project. See [Sanity CMS Setup → Step 3](#step-3-add-cors-origin).

### Site shows projects you didn't create

Those are the **fallback projects** — they only show when Sanity is empty or unconfigured. Add a real project in Studio and publish it; the fallbacks will disappear.

### 3D hero is blank / blurry

WebGL might be disabled in your browser, or you're on a very old device. The site still works without it — the rest of the hero displays normally.

### Projects published in Sanity aren't showing up

- Check you clicked **Publish** (not just Save) in the Studio
- Wait up to 60 seconds — content revalidates on a 60s interval (set in each page's `export const revalidate = 60`)
- Hard refresh the browser (Cmd+Shift+R / Ctrl+Shift+R)
- Verify your `NEXT_PUBLIC_SANITY_PROJECT_ID` matches your actual project ID in `sanity.io/manage`

### Cursor hides on click

That's intentional — interactive elements show a labeled ring instead of the dot.

### Build fails on Vercel

The most common cause: missing environment variables. Check that all three `NEXT_PUBLIC_SANITY_*` vars are set in Vercel project settings.

---

## Tech Stack & Why

| Tool | Why it's here |
|---|---|
| **Next.js 14 (App Router)** | Best-in-class React framework. Server components reduce JS sent to browser. ISR (incremental static regeneration) means CMS updates appear without rebuilds. Excellent SEO. |
| **Sanity CMS** | Best CMS for structured content. Real-time collaboration. Custom schemas. Built-in image pipeline (cropping, transformations, CDN). Generous free tier. |
| **Three.js** | Industry-standard WebGL library for the 3D hero. |
| **Bricolage Grotesque** | Variable-width, modern display typeface. Distinctive without being trendy. |
| **Inter Tight** | Compact, technical body font that pairs well with the display. |
| **JetBrains Mono** | Mono for labels and meta — feels precise and intentional. |
| **Vercel** | Built by the Next.js team. Free tier covers personal portfolios easily. Automatic deploys on git push. |

---

## Useful Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Run production build locally
npm run lint         # Lint the codebase
```

---

## Need Help?

- **Next.js docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Sanity docs:** [sanity.io/docs](https://www.sanity.io/docs)
- **Three.js docs:** [threejs.org/docs](https://threejs.org/docs)

---

**Built for Tahir Umer · Designed to perform.**
