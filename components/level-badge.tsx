import type { ChapterLevel } from "@/types/course";
import { cn } from "@/lib/utils";

const LEVEL_STYLES: Record<ChapterLevel, string> = {
  Beginner: "border-emerald-600/25 text-emerald-700 dark:text-emerald-400",
  Intermediate: "border-amber-600/25 text-amber-700 dark:text-amber-400",
  Advanced: "border-rose-600/25 text-rose-700 dark:text-rose-400",
};

type LevelBadgeProps = {
  level: ChapterLevel;
  count?: number;
};

export function LevelBadge({ level, count }: LevelBadgeProps) {
  const renderCount = () => {
    if (count === undefined) {
      return null;
    }

    return <span className="tabular-nums">{count}</span>;
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        LEVEL_STYLES[level]
      )}
    >
      {renderCount()}
      {level}
    </span>
  );
}
