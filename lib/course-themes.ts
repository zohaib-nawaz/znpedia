export type CourseTheme = {
  tile: string;
  text: string;
  wash: string;
  hoverBorder: string;
  glow: string;
};

const DEFAULT_THEME: CourseTheme = {
  tile: "bg-accent text-accent-foreground shadow-accent/30",
  text: "text-accent",
  wash: "from-accent/15",
  hoverBorder: "hover:border-accent/50",
  glow: "bg-accent/20",
};

const COURSE_THEMES: Record<string, CourseTheme> = {
  javascript: {
    tile: "bg-amber-400 text-zinc-950 shadow-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
    wash: "from-amber-400/20",
    hoverBorder: "hover:border-amber-400/60",
    glow: "bg-amber-400/25",
  },
  react: {
    tile: "bg-sky-400 text-zinc-950 shadow-sky-500/30",
    text: "text-sky-600 dark:text-sky-400",
    wash: "from-sky-400/20",
    hoverBorder: "hover:border-sky-400/60",
    glow: "bg-sky-400/25",
  },
  nextjs: {
    tile: "bg-violet-600 text-white shadow-violet-600/30",
    text: "text-violet-600 dark:text-violet-400",
    wash: "from-violet-500/20",
    hoverBorder: "hover:border-violet-500/60",
    glow: "bg-violet-500/25",
  },
  "best-practices": {
    tile: "bg-emerald-600 text-white shadow-emerald-600/30",
    text: "text-emerald-700 dark:text-emerald-400",
    wash: "from-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/60",
    glow: "bg-emerald-500/25",
  },
};

export function getCourseTheme(courseSlug: string): CourseTheme {
  if (!(courseSlug in COURSE_THEMES)) {
    return DEFAULT_THEME;
  }

  return COURSE_THEMES[courseSlug];
}
