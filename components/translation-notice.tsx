import { Languages } from "lucide-react";

type TranslationNoticeProps = {
  title: string;
  body: string;
};

export function TranslationNotice({ title, body }: TranslationNoticeProps) {
  return (
    <aside
      role="note"
      className="mb-8 flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm"
    >
      <Languages className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-muted-foreground">{body}</p>
      </div>
    </aside>
  );
}
