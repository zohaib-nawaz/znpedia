import { notFound } from "next/navigation";

import { DocsHeader } from "@/components/docs-header";
import { DocsSidebar } from "@/components/docs-sidebar";
import { SiteFooter } from "@/components/site-footer";
import { getCatalogStats } from "@/lib/catalog";
import { getAllCourseSlugs, getAllCourses, getCourseMeta } from "@/lib/courses";
import { resolveLocale } from "@/lib/i18n/route";

type CourseLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string; course: string }>;
};

export function generateStaticParams() {
  return getAllCourseSlugs().map((course) => ({ course }));
}

export default async function CourseLayout({ children, params }: CourseLayoutProps) {
  const { course: courseSlug } = await params;
  const { locale, dict } = await resolveLocale(params);
  const course = getCourseMeta(courseSlug, locale);
  if (!course) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader course={course} locale={locale} dict={dict} />
      <div className="flex flex-1">
        <aside className="hidden w-60 shrink-0 border-r border-border lg:block">
          <div className="sticky top-12 max-h-[calc(100vh-3rem)] overflow-y-auto p-4">
            <DocsSidebar course={course} locale={locale} overviewLabel={dict.nav.courseOverview} />
          </div>
        </aside>
        <div id="main-content" className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1">{children}</main>
          <SiteFooter
            locale={locale}
            dict={dict}
            chapterCount={getCatalogStats(getAllCourses(locale)).chapterCount}
          />
        </div>
      </div>
    </div>
  );
}
