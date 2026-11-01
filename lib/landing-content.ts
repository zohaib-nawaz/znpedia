import type { Tone } from "@/lib/tones";

export type ValueProp = {
  icon: "languages" | "layers" | "code" | "shield" | "route" | "sparkles";
  tone: Tone;
  title: string;
  body: string;
};

export type AnatomyStep = {
  icon: "book" | "help" | "map" | "workflow" | "code" | "alert" | "route" | "check";
  tone: Tone;
  title: string;
  body: string;
};

export type PathStep = {
  courseSlug: string;
  title: string;
  outcome: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const valueProps: ValueProp[] = [
  {
    icon: "languages",
    tone: "emerald",
    title: "Roman Urdu mein, seedhi baat",
    body: "Concept apni zabaan mein, technical terms English mein. Wahi words jo job aur docs mein milenge.",
  },
  {
    icon: "layers",
    tone: "sky",
    title: "Ek topic, ek chhota chapter",
    body: "Har chapter sirf ek cheez samjhata hai, 5 se 10 minute mein. Lambi videos ya bikhre notes nahi.",
  },
  {
    icon: "code",
    tone: "violet",
    title: "Modern aur current",
    body: "React 19.2, Next.js 16 App Router, Cache Components aur aaj ka JavaScript. Purana tareeqa sirf comparison ke liye.",
  },
  {
    icon: "shield",
    tone: "amber",
    title: "Production-grade habits",
    body: "Best Practices course batata hai team mein code kaise likha, review aur ship kiya jata hai, aur kyun.",
  },
  {
    icon: "route",
    tone: "indigo",
    title: "Saaf learning path",
    body: "JavaScript se Next.js tak ek tarteeb. Har chapter batata hai pehle kya parhna hai aur baad mein kya.",
  },
  {
    icon: "sparkles",
    tone: "rose",
    title: "Free, bina signup",
    body: "Koi account, paywall ya ads nahi. Page kholo aur parhna shuru karo.",
  },
];

export const chapterAnatomy: AnatomyStep[] = [
  { icon: "book", tone: "emerald", title: "Kya hai?", body: "Ek line ki definition, phir simple explanation." },
  { icon: "help", tone: "sky", title: "Kyun zaroori hai?", body: "Kaunsa asli problem solve hota hai, before aur after." },
  { icon: "map", tone: "violet", title: "Kahan use hota hai?", body: "Real projects ke examples." },
  { icon: "workflow", tone: "amber", title: "Kaise kaam karta hai?", body: "Mental model, step by step flow." },
  { icon: "code", tone: "indigo", title: "Code example", body: "Chhota, runnable code aur har line ka matlab." },
  { icon: "alert", tone: "rose", title: "Common mistakes", body: "Galati, kyun, aur behtar tareeqa." },
  { icon: "route", tone: "teal", title: "Aage kya?", body: "Pehle aur baad ke chapters ke links." },
  { icon: "check", tone: "orange", title: "Quick revision", body: "Key points ek nazar mein." },
];

export const learningPath: PathStep[] = [
  {
    courseSlug: "javascript",
    title: "JavaScript",
    outcome: "Variables se async/await aur DOM tak, language ki mazboot buniyaad.",
  },
  {
    courseSlug: "react",
    title: "React.js",
    outcome: "Components, state aur hooks se interactive UI banana.",
  },
  {
    courseSlug: "nextjs",
    title: "Next.js",
    outcome: "Routing, server components, data aur deployment ke saath full app.",
  },
  {
    courseSlug: "best-practices",
    title: "Best Practices",
    outcome: "Clean code, security, testing aur team workflow, production ke liye.",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Kya ZnPedia bilkul free hai?",
    answer: "Haan. Saare courses aur chapters free hain. Koi signup, subscription ya ads nahi.",
  },
  {
    question: "Mujhe kahan se shuru karna chahiye?",
    answer: "Agar programming nayi hai to JavaScript Introduction se. React ya Next.js aata hai to seedha Best Practices course parhein.",
  },
  {
    question: "Content Roman Urdu mein kyun hai?",
    answer: "Concept apni zabaan mein jaldi samajh aata hai. Technical terms English mein rakhe gaye hain taake official docs aur job interviews mein wahi words pehchaan sakein.",
  },
  {
    question: "Kya content up to date hai?",
    answer: "Chapters React 19.2 aur Next.js 16 ke current APIs par likhe gaye hain. Purane tareeqe sirf comparison ke liye bataye gaye hain.",
  },
  {
    question: "Ek chapter mein kitna waqt lagta hai?",
    answer: "Zyada tar chapters 4 se 10 minute mein parhe ja sakte hain, code khud chala kar dekhne ka waqt alag. Har page ke upar reading time likha hota hai.",
  },
  {
    question: "Best Practices course kis ke liye hai?",
    answer: "Un developers ke liye jo basics jaante hain aur ab production-grade code likhna, review karna aur ship karna seekhna chahte hain.",
  },
];
