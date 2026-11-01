# ZnPedia Content Style Guide

Har chapter ek MDX file hai: `content/courses/<course>/<slug>.mdx`. Slug aur title `meta.json` se aate hain. Topic list: `docs/topics.csv`.

## Language

- Roman Urdu prose, technical terms English mein (`state`, `closure`, `server component`).
- Chhote paragraphs (2 se 4 lines), simple words, beginner-friendly tone, phir depth.
- Em dash aur en dash use na karein. Comma, period ya simple hyphen use karein.

## Frontmatter

```yaml
---
title: Closures
description: JavaScript closures kya hain, kaise kaam karte hain aur real projects mein kahan use hote hain. Roman Urdu mein examples ke saath.
keywords:
  - javascript closures
  - closure in javascript urdu
  - lexical scope
---
```

- `title`: `meta.json` wala chapter title.
- `description`: 70 se 170 characters, primary keyword shuru ke qareeb, unique per page.
- `keywords`: 3 se 6 English search phrases, pehla `docs/topics.csv` ka `primary_keyword`.

## Structure

Body `#` (h1) se shuru na karein, page title khud render hota hai. Har chapter yeh sections isi order mein:

1. `## 1. <Topic> kya hai?` definition, `<Callout title="Short definition">` mein ek line.
2. `## 2. Kyun zaroori hai?` problem jo yeh solve karta hai, `<CompareTable>` before/after.
3. `## 3. Kahan use hota hai?` real use cases table.
4. `## 4. Kaise kaam karta hai?` mental model, `<Flow>` diagram.
5. `## 5. Code example` 1 se 3 chhote, runnable, modern examples aur ek "Code kaise kaam kar raha hai?" table.
6. `## 6. Common mistakes` 2 se 4 `<Mistake />`.
7. `## 7. Pehle aur baad mein kya seekhein?` related chapters ke links, jaise `[Promises](/courses/javascript/promises)`.
8. `## Final quick revision` key points table aur ek `<Callout title="Yaad rakhein">`.

Length: 120 se 260 lines. Interview angle wala ek `### Interview tip` jahan munasib ho.

## Best Practices course structure

`content/courses/best-practices/` ke chapters practice samjhate hain, language feature nahi. Inka structure:

1. `## 1. Yeh practice kya hai?` rule ek line mein, `<Callout title="Rule">` mein.
2. `## 2. Kyun zaroori hai?` kaunsa asli problem rokta hai, `<CompareTable>` bina rule vs rule ke saath.
3. `## 3. Kab follow karein?` table: Learning project, Production code, Senior level. Har level par kitna zaroori aur kyun.
4. `## 4. Bura vs acha code` pehle bad example, phir good example, phir "Farq kya hai?" table.
5. `## 5. Kaise apply karein?` steps `<Flow>` ya checklist.
6. `## 6. Exceptions aur common mistakes` kab rule nahi lagta, aur 2 se 4 `<Mistake />`.
7. `## 7. Pehle aur baad mein kya seekhein?` related chapters ke links.
8. `## Final quick revision` checklist table aur `<Callout title="Yaad rakhein">`.

Jitna zaroori hai utna hi likhein. Example clarity ke liye ho, filler na ho. Kisi company, product, insaan, server ya internal tool ka naam na likhein.

## Components

| Component | Usage |
| --- | --- |
| `<Callout title="...">` | Markdown children, upar aur neeche blank line |
| `<Flow title="...">` | Har line ek step, steps ke beech sirf `↓` ya `+` |
| `<CompareTable leftTitle="..." rightTitle="...">` | Har row `left | right`, plain text |
| `<Mistake title="..." why="..." better="..." />` | Plain string attributes, andar double quotes nahi |

Koi aur JSX component use na karein.

## MDX safety

- Prose mein `{`, `}`, `<`, `>` ko backticks ke andar likhein, warna MDX compile fail hota hai.
- Code fences par language zaroor: `js`, `jsx`, `ts`, `tsx`, `bash`, `json`, `css`, `html`.
- Tables mein `|` character backticks ke andar bhi escape karein: `\|`.

## Accuracy

- React 19.2 aur Next.js 16 (App Router) ke current APIs. Deprecated cheezein sirf "purana tareeqa" bata kar.
- Next.js 16: `proxy.ts` (middleware ki jagah), async `params` / `searchParams` / `cookies()` / `headers()`, `cacheComponents` + `"use cache"`, `cacheLife`, `cacheTag`, `updateTag`, `refresh`, Turbopack default.

## Check

```bash
npm run check:content
```
