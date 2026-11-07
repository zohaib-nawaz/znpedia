# ZnPedia

JavaScript, React, Next.js aur Best Practices ke documentation-style courses, Roman Urdu aur English mein. Next.js 16 App Router + MDX.

## Run

```bash
npm install
npm run dev
```

## Content

| Path | Kya hai |
| --- | --- |
| `content/courses/<course>/meta.json` | Course title, description aur sections ke andar chapters (sidebar order) |
| `content/courses/<course>/<slug>.mdx` | Ek chapter (Roman Urdu) |
| `content/courses/<course>/<slug>.en.mdx` | Wahi chapter English mein |
| `docs/i18n.md` | Do languages ka setup, URLs aur nayi language add karne ka tareeqa |
| `docs/topics.csv` | Tamam topics, level aur primary SEO keyword |
| `docs/content-plan.md` | Wahi list readable form mein |
| `docs/best-practices.csv` | Best Practices course ki har practice: rule, kyun, kab (learning, production, senior) |
| `docs/content-style-guide.md` | Chapter likhne ke rules |
| `docs/feature-ideas.md` | Aage ke features ki list |

Naya chapter: `meta.json` ke section mein `{ "slug", "title" }` add karein, phir `<slug>.mdx` banayein aur check chalayein:

```bash
npm run check:content
```

## AI Assistant

`.env.local` mein `GEMINI_API_KEY` set karein, phir `/ur/assistant` kholein. Tafseel: [docs/ai-assistant.md](docs/ai-assistant.md).

## SEO

- `NEXT_PUBLIC_SITE_URL` set karein (jaise `https://znpedia.com`). Vercel par `VERCEL_PROJECT_PRODUCTION_URL` fallback hai.
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, chapter OG images `/og/<course>/<chapter>`.
- Har chapter par canonical URL, Open Graph, Twitter card, keywords, `TechArticle` aur `BreadcrumbList` JSON-LD.
