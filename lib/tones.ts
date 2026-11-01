export type Tone = "emerald" | "sky" | "violet" | "amber" | "rose" | "teal" | "indigo" | "orange";

export type ToneClasses = {
  tile: string;
  hoverBorder: string;
};

export const TONES: Record<Tone, ToneClasses> = {
  emerald: {
    tile: "bg-emerald-500/15 text-emerald-600 ring-emerald-500/25 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-500/50",
  },
  sky: {
    tile: "bg-sky-500/15 text-sky-600 ring-sky-500/25 dark:text-sky-400",
    hoverBorder: "hover:border-sky-500/50",
  },
  violet: {
    tile: "bg-violet-500/15 text-violet-600 ring-violet-500/25 dark:text-violet-400",
    hoverBorder: "hover:border-violet-500/50",
  },
  amber: {
    tile: "bg-amber-500/15 text-amber-600 ring-amber-500/25 dark:text-amber-400",
    hoverBorder: "hover:border-amber-500/50",
  },
  rose: {
    tile: "bg-rose-500/15 text-rose-600 ring-rose-500/25 dark:text-rose-400",
    hoverBorder: "hover:border-rose-500/50",
  },
  teal: {
    tile: "bg-teal-500/15 text-teal-600 ring-teal-500/25 dark:text-teal-400",
    hoverBorder: "hover:border-teal-500/50",
  },
  indigo: {
    tile: "bg-indigo-500/15 text-indigo-600 ring-indigo-500/25 dark:text-indigo-400",
    hoverBorder: "hover:border-indigo-500/50",
  },
  orange: {
    tile: "bg-orange-500/15 text-orange-600 ring-orange-500/25 dark:text-orange-400",
    hoverBorder: "hover:border-orange-500/50",
  },
};
