import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { DocsContent } from "@/components/docs-content";
import { Pagination } from "@/components/pagination";
import {
  chapterExists,
  courseExists,
  getAllCourses,
  getCourseMeta,
} from "@/lib/courses";
import { getAdjacentChapters } from "@/lib/docs";
import {
  getChapterCanonicalUrl,
  getChapterMDX,
} from "@/lib/mdx";

type ChapterPageProps = {
  params: Promise<{ course: string; slug: string[] }>;
};

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.flatMap((course) =>
    course.chapters.map((chapter) => ({
      course: course.slug,
      slug: [chapter],
    }))
  );
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { course: courseSlug, slug } = await params;
  const chapterSlug = slug?.[0];

  if (!courseSlug || !chapterSlug || slug.length > 1) {
    return { title: "Not found" };
  }

  const mdx = await getChapterMDX(courseSlug, chapterSlug);
  if (!mdx) {
    return { title: "Not found" };
  }

  const title = mdx.frontmatter.title ?? chapterSlug;
  const description = mdx.frontmatter.description;

  return {
    title,
    description,
    alternates: {
      canonical: getChapterCanonicalUrl(courseSlug, chapterSlug),
    },
    openGraph: {
      title,
      description,
      url: getChapterCanonicalUrl(courseSlug, chapterSlug),
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { course: courseSlug, slug } = await params;

  if (!courseExists(courseSlug) || !slug?.length || slug.length > 1) {
    notFound();
  }

  const chapterSlug = slug[0];
  const course = getCourseMeta(courseSlug);

  if (!course || !chapterExists(courseSlug, chapterSlug)) {
    notFound();
  }

  if (!course.chapters.includes(chapterSlug)) {
    notFound();
  }

  const mdx = await getChapterMDX(courseSlug, chapterSlug);
  if (!mdx) {
    notFound();
  }

  const { previous, next } = getAdjacentChapters(course, chapterSlug);
  const title = mdx.frontmatter.title ?? chapterSlug;

  return (
    <>
      <div className="px-3 py-2 sm:px-5 lg:px-6">
        <Breadcrumbs
          items={[
            { label: "Courses", href: "/courses" },
            { label: course.title, href: `/courses/${course.slug}` },
            { label: title },
          ]}
        />
      </div>
      <DocsContent
        title={title}
        description={mdx.frontmatter.description}
        toc={mdx.toc}
      >
        {mdx.content}
      </DocsContent>
      <div className="mx-auto max-w-4xl px-3 pb-8 sm:px-5 lg:pl-8">
        <Pagination previous={previous} next={next} />
      </div>
    </>
  );
}
