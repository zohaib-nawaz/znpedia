import type { AssistantScope } from "@/lib/assistant/types";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";

export function getAssistantHref(locale: Locale, scope: AssistantScope = {}): string {
  const params = new URLSearchParams();
  if (scope.course) {
    params.set("course", scope.course);
  }

  if (scope.course && scope.chapter) {
    params.set("chapter", scope.chapter);
  }

  const query = params.toString();
  const path = localizePath(locale, "/assistant");
  if (!query) {
    return path;
  }

  return `${path}?${query}`;
}
