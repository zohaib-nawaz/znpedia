import { notFound } from "next/navigation";

import { DocsHeader } from "@/components/docs-header";
import { DocsSidebar } from "@/components/docs-sidebar";
import { courseExists, getAllCourseSlugs, getCourseMeta } from "@/lib/courses";

type CourseLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ course: string }>;
};

export function generateStaticParams() {
  return getAllCourseSlugs().map((course) => ({ course }));
}

export default async function CourseLayout({
  children,
  params,
}: CourseLayoutProps) {
  const { course: courseSlug } = await params;

  if (!courseExists(courseSlug)) {
    notFound();
  }

  const course = getCourseMeta(courseSlug);
  if (!course) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader course={course} />
      <div className="flex flex-1">
        <aside className="hidden w-52 shrink-0 border-r border-border lg:block">
          <div className="sticky top-12 max-h-[calc(100vh-3rem)] overflow-y-auto p-4">
            <DocsSidebar course={course} />
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
