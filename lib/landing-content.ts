import type { Dictionary } from "@/lib/i18n/dictionaries/ur";
import type { Tone } from "@/lib/tones";

type ValuePropIcon = "languages" | "layers" | "code" | "shield" | "route" | "sparkles";

type AnatomyIcon = "book" | "help" | "map" | "workflow" | "code" | "alert" | "route" | "check";

export type ValueProp = {
  icon: ValuePropIcon;
  tone: Tone;
  title: string;
  body: string;
};

export type AnatomyStep = {
  icon: AnatomyIcon;
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

const VALUE_PROP_VISUALS: { icon: ValuePropIcon; tone: Tone }[] = [
  { icon: "languages", tone: "emerald" },
  { icon: "layers", tone: "sky" },
  { icon: "code", tone: "violet" },
  { icon: "shield", tone: "amber" },
  { icon: "route", tone: "indigo" },
  { icon: "sparkles", tone: "rose" },
];

const ANATOMY_VISUALS: { icon: AnatomyIcon; tone: Tone }[] = [
  { icon: "book", tone: "emerald" },
  { icon: "help", tone: "sky" },
  { icon: "map", tone: "violet" },
  { icon: "workflow", tone: "amber" },
  { icon: "code", tone: "indigo" },
  { icon: "alert", tone: "rose" },
  { icon: "route", tone: "teal" },
  { icon: "check", tone: "orange" },
];

const LEARNING_PATH: { courseSlug: string; title: string }[] = [
  { courseSlug: "javascript", title: "JavaScript" },
  { courseSlug: "react", title: "React.js" },
  { courseSlug: "nextjs", title: "Next.js" },
  { courseSlug: "best-practices", title: "Best Practices" },
];

export function buildValueProps(dict: Dictionary): ValueProp[] {
  return VALUE_PROP_VISUALS.map((visual, index) => ({ ...visual, ...dict.valueProps[index] }));
}

export function buildChapterAnatomy(dict: Dictionary): AnatomyStep[] {
  return ANATOMY_VISUALS.map((visual, index) => ({ ...visual, ...dict.anatomy[index] }));
}

export function buildLearningPath(dict: Dictionary): PathStep[] {
  return LEARNING_PATH.map((step) => ({ ...step, outcome: dict.path[step.courseSlug] }));
}
