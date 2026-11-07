"use client";

import { ChevronDown } from "lucide-react";

import type { AssistantScope, ScopeCourse } from "@/lib/assistant/types";
import { resolveScope } from "@/lib/assistant/scope";

type ScopePickerLabels = {
  scopeLabel: string;
  scopeAll: string;
  scopeWholeCourse: string;
  scopeChapterHint: string;
};

type ScopePickerProps = {
  courses: ScopeCourse[];
  scope: AssistantScope;
  disabled: boolean;
  labels: ScopePickerLabels;
  onChange: (scope: AssistantScope) => void;
};

const SELECT_CLASS =
  "h-9 w-full cursor-pointer appearance-none truncate rounded-lg border border-border bg-background pl-3 pr-8 text-sm font-medium text-foreground transition-colors hover:border-accent/50 focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-60";

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-w-0 flex-1 sm:max-w-56">
      {children}
      <ChevronDown
        className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  );
}

function renderChapterSelect(course: ScopeCourse | null, props: ScopePickerProps) {
  if (!course) {
    return null;
  }

  return (
    <SelectShell>
      <select
        aria-label={props.labels.scopeChapterHint}
        className={SELECT_CLASS}
        value={props.scope.chapter ?? ""}
        disabled={props.disabled}
        onChange={(event) =>
          props.onChange({ course: course.slug, chapter: event.target.value || undefined })
        }
      >
        <option value="">{props.labels.scopeWholeCourse}</option>
        {course.sections.map((section) => (
          <optgroup key={section.title} label={section.title}>
            {section.chapters.map((chapter) => (
              <option key={chapter.slug} value={chapter.slug}>
                {chapter.title}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </SelectShell>
  );
}

export function ScopePicker(props: ScopePickerProps) {
  const { courses, scope, disabled, labels, onChange } = props;
  const { course } = resolveScope(courses, scope);

  return (
    <div
      className="flex min-w-0 flex-1 items-center gap-2"
      role="group"
      aria-label={labels.scopeLabel}
    >
      <SelectShell>
        <select
          aria-label={labels.scopeLabel}
          className={SELECT_CLASS}
          value={scope.course ?? ""}
          disabled={disabled}
          onChange={(event) => onChange({ course: event.target.value || undefined })}
        >
          <option value="">{labels.scopeAll}</option>
          {courses.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.title}
            </option>
          ))}
        </select>
      </SelectShell>
      {renderChapterSelect(course, props)}
    </div>
  );
}
