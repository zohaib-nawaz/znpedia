import type { LevelShare } from "@/lib/catalog";
import type { ChapterLevel } from "@/types/course";

const SEGMENT_COLORS: Record<ChapterLevel, string> = {
  Beginner: "bg-emerald-500",
  Intermediate: "bg-amber-400",
  Advanced: "bg-rose-500",
};

type LevelBarProps = {
  shares: LevelShare[];
};

export function LevelBar({ shares }: LevelBarProps) {
  return (
    <div>
      <div className="flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full bg-muted" aria-hidden>
        {shares.map((share) => (
          <span
            key={share.level}
            className={SEGMENT_COLORS[share.level]}
            style={{ width: `${share.percent}%` }}
          />
        ))}
      </div>
      <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {shares.map((share) => (
          <li key={share.level} className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${SEGMENT_COLORS[share.level]}`} aria-hidden />
            <span className="font-semibold tabular-nums text-foreground">{share.count}</span>
            {share.level}
          </li>
        ))}
      </ul>
    </div>
  );
}
