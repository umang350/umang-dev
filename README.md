# umang.dev

Personal site of Umang Chauhan, live at **[umang.dev](https://umang.dev)**. Built with Next.js (Pages Router), TypeScript and Tailwind CSS, and deployed on Vercel.

![umang.dev homepage](public/readme/home.jpg)

## What's on the site

| Route | What it is |
| --- | --- |
| `/` | Homepage: hero, things I've built, YouTube carousel, Substack posts strip, platform logos |
| `/about` | About me and experience |
| `/creations` | Projects and creations |
| `/stats` | Live stats from YouTube, GitHub, Twitter, Instagram and Google Analytics |
| `/link` | Link-in-bio page |
| `/yt/[slug]` | Individual YouTube video pages |
| `/anaplan` | Landing page for the Anaplan Toolkit browser extension, plus guides and privacy policy |

Other details: light/dark theme (`next-themes`), installable PWA (`next-pwa`), English and Japanese locales, and a Substack RSS reader (`lib/substack.ts`) that hides its sections if the feed is unreachable.

## Tech stack

- [Next.js 13](https://nextjs.org/) (Pages Router), React 18, TypeScript
- Tailwind CSS
- SWR for client-side data fetching
- Google Analytics Data API, YouTube Data API, Twitter API SDK

## Getting started

Requires Node.js 18+.

```bash
git clone https://github.com/umang350/umang-dev.git
cd umang-dev
npm install
```

Create a `.env.local` file (see below), then start the dev server:

```bash
npm run dev
```

The site runs at <http://localhost:3000>.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Environment variables

The stats pages and API routes need these. The site's static pages work without them, but `/stats` and the YouTube sections will be empty.

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | Google Analytics measurement ID |
| `PROPERTY_ID` | GA4 property queried by `/api/get_google_insights` |
| `GOOGLE_APPLICATION_CREDENTIALS_JSON` | Service account JSON for the GA Data API |
| `GOOGLE_API_KEY` | YouTube Data API |
| `YOUTUBE_CHANNEL_ID` | Channel whose stats and videos are shown |
| `TWITTER_BEARER_TOKEN` | Twitter stats |

Never commit secrets. `.env*` files and `umang-dev-secret.json` are git-ignored.

## Project structure

```
components/   UI grouped by area (home, about, stats, anaplan, global, linker)
data/         Site content and types (home, about, linker copy; global routes)
lib/          Helpers: Google Analytics client, Substack RSS reader
pages/        Routes; pages/api holds the stats endpoints
public/       Static assets, images, PWA manifest, sitemap
styles/       Global styles
utils/        Shared utilities
```

Most copy lives in `data/content/*.ts`, so text changes rarely need component edits.

## Deployment

Pushes to `main` deploy automatically on Vercel. Set the environment variables above in the Vercel project settings.

## License and contact

Source is shared for reference. Please don't reuse the personal content, images or branding. Questions or feedback: [feedback@umang.dev](mailto:feedback@umang.dev).
