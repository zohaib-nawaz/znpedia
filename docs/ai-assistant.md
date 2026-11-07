# AI Assistant

`/ur/assistant` aur `/en/assistant` par ChatGPT jaisa full-screen chat. Learner kisi bhi course ke baare mein sawal poochta hai aur jawab ZnPedia ke 175 chapters se aata hai, sources ke links ke saath. Jawab Google Gemini likhta hai.

## Setup

`.env.local` mein:

```bash
GEMINI_API_KEY=your-key
GEMINI_MODEL=gemini-3.5-flash
```

`GEMINI_MODEL` optional hai. Key [Google AI Studio](https://aistudio.google.com/apikey) se milti hai. Key na ho to page khulta hai, lekin har sawal par "AI Assistant abhi setup nahi hua" dikhta hai (API `503 not_configured` deti hai).

Vercel par yehi dono variables project settings mein add karein.

## Kaise kaam karta hai

```
Browser (components/assistant)           Server (app/api/assistant/route.ts)
-------------------------------          ---------------------------------------------
sawal + scope + pichle messages  ──POST──▶ 1. request validate (lib/assistant/request.ts)
                                          2. rate limit per IP (lib/assistant/rate-limit.ts)
                                          3. content index (lib/assistant/content-index.ts)
                                          4. retrieval, BM25 (lib/assistant/retrieval.ts)
                                          5. prompt (lib/assistant/prompt.ts)
NDJSON events stream            ◀──────── 6. Gemini streaming (lib/assistant/answer.ts)
sources, text, done | error
chats localStorage mein
```

1. **Scope.** Learner chunta hai: saare courses, ek course, ya ek chapter. Chapter page ke "AI se poochein" card se `?course=javascript&chapter=closures` ke saath page khulta hai.
2. **Content index.** Pehli request par server har chapter ki MDX file parhta hai aur `##` headings par sections (chunks) banata hai: definition, examples, mistakes, revision. Har chunk ke saath chapter title, keywords aur heading ka link (`/ur/courses/javascript/closures#section-1-closures-kya-hain`) hota hai. Index memory mein cache rehta hai, har locale ka alag.
3. **Retrieval.** Learner ke aakhri do sawal BM25 se score hote hain. Chapter title aur keywords ka match zyada weight leta hai, "Pehle aur baad mein kya seekhein" jaise navigation sections ka kam. Sab se acche 4 chapters ke 2, 2 sections chune jate hain. Chapter scope ho to us chapter ka poora content bhi saath jata hai.
4. **Prompt.** System instruction mein assistant ka role, language rule (Roman Urdu ya English) aur poore course catalog ki list hoti hai, taake model sahi chapter ka link de sake. Chune hue sections learner ke sawal ke saath `<course_material>` mein jate hain.
5. **Gemini.** `@google/genai` se `generateContentStream`. Model chain `GEMINI_MODEL`, phir `gemini-3.5-flash`, `gemini-3-flash`, `gemini-2.5-flash`. Agar model 404, 429 ya 5xx de aur abhi tak koi text na aaya ho to agla model try hota hai.
6. **Stream.** Server newline-delimited JSON bhejta hai: pehle `sources`, phir `text` ke tukde, aakhir mein `done` ya `error`. Browser markdown render karta hai (code blocks wahi syntax highlighting ke saath jo chapters mein hai).

## Limits aur hifazat

| Cheez | Value | File |
| --- | --- | --- |
| Ek message | 4,000 characters | `lib/assistant/limits.ts` |
| Poori chat | 24 messages, 32,000 characters | `lib/assistant/limits.ts` |
| Requests | 20 har 10 minute, per IP | `lib/assistant/rate-limit.ts` |
| Jawab | 8,192 output tokens | `lib/assistant/limits.ts` |

Rate limit memory mein hai, is liye har server instance ka apna hota hai. Zyada traffic par isay Upstash Redis ya Vercel KV jaisi shared store par le jayein.

Chats sirf browser ke `localStorage` (`znpedia.assistant.<locale>.v1`) mein save hote hain, aakhri 30. Server kuch store nahi karta. Privacy aur Terms pages mein yeh baat likhi hai.

## Files

| File | Kaam |
| --- | --- |
| `app/[lang]/assistant/page.tsx` | Page, scope query params validate karta hai |
| `app/api/assistant/route.ts` | POST endpoint, NDJSON stream |
| `lib/assistant/*` | Index, retrieval, prompt, Gemini, validation, conversations store |
| `components/assistant/*` | Chat UI: sidebar, scope picker, messages, composer, "kaise kaam karta hai" dialog |
| `components/ask-assistant-card.tsx` | Chapter aur course pages par "AI se poochein" card |

## Aage

- Retrieval ko embeddings (Gemini `text-embedding`) par le jana, agar BM25 kaafi na lage.
- Shared rate limit store.
- Code playground ke saath "is code ko samjhao" button.
