# TODOS

## P1 — High Priority

### Resume Download CTA
**What:** Add a resume download button to the hero section and About page, linking to `/UmangResume.pdf`.

**Why:** Every PM portfolio needs a prominent resume link. The PDF already exists at `public/UmangResume.pdf` — this is a 15-minute change. Deferred only because it requires confirming the PDF is up-to-date before promoting it.

**How to apply:** Add an `<a href="/UmangResume.pdf" download>` button in:
- `components/home/Hero.tsx` — alongside the existing "View My Work" and "Get in Touch" CTAs
- `components/about/AboutMe.tsx` — in the Contact section

**Effort:** S
**Depends on:** Confirm `public/UmangResume.pdf` is current before shipping.

---

### Personal Headshot in Hero
**What:** Replace `sq.png` (geometric blob) in the hero with a personal headshot photo.

**Why:** A face builds trust and recall. PM portfolios that convert to interview calls typically have a professional photo above the fold.

**How to apply:**
1. Add headshot to `public/` (e.g., `public/umang.jpg`)
2. In `components/home/Hero.tsx`, replace or supplement the `<Image src="/sq.png" ...>` with the headshot using `next/image`
3. Consider a side-by-side hero layout (text left, photo right) rather than stacked

**Effort:** S
**Depends on:** A good headshot photo asset.

---

## P2 — Medium Priority

### Analytics Conversion Tracking
**What:** Add GA event tracking for: resume PDF downloads, "Let's connect" email clicks, and case study reads (scroll depth on `/projects/[slug]`).

**Why:** These are the conversion signals that tell you whether the portfolio is working. Without them, you're flying blind on what's driving recruiter interest.

**How to apply:** Use `gtag('event', ...)` calls in `components/home/Hero.tsx` (for CTA clicks) and `pages/projects/[slug].tsx` (scroll depth or time-on-page).

**Effort:** M
**Depends on:** Resume CTA being in place first.

---

### Japanese Translations for New Content
**What:** The MDX case study pages (`/projects/[slug]`) are English-only. The Japanese locale shows the same English content.

**Why:** The site has Japanese locale support and some visitors come via the Japanese nav. Case studies in English only is a gap if Japanese-speaking recruiters visit.

**How to apply:** Either (a) create `/content/projects/ja/[slug].mdx` variants and load by locale in `getStaticProps`, or (b) add a locale note on case study pages ("この記事は英語のみ提供されています").

**Effort:** L
**Depends on:** MDX case study content being finalized first.
