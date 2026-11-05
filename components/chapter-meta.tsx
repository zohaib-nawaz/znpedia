import { Clock } from "lucide-react";

import { LevelBadge } from "@/components/level-badge";
import type { ChapterLevel, ChapterPosition } from "@/types/course";

type ChapterMetaProps = {
  position: ChapterPosition | null;
  level?: ChapterLevel;
  readingMinutes: number;
};

export function ChapterMeta({ position, level, readingMinutes }: ChapterMetaProps) {
  const renderPosition = () => {
    if (!position) {
      return null;
    }

    return (
      <>
        <span className="font-semibold uppercase tracking-[0.12em] text-accent">
          {position.sectionTitle}
        </span>
        <span aria-hidden>·</span>
        <span className="tabular-nums">
          Chapter {position.number} / {position.total}
        </span>
      </>
    );
  };

  const renderLevel = () => {
    if (!level) {
      return null;
    }

    return <LevelBadge level={level} />;
  };

  return (
    <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-muted-foreground">
      {renderPosition()}
      {renderLevel()}
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" aria-hidden />
        {readingMinutes} min read
      </span>
    </div>
  );
}
