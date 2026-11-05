import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChapterMeta } from "@/components/chapter-meta";
import { DocsContent } from "@/components/docs-content";
import { JsonLd } from "@/components/json-ld";
import { Pagination } from "@/components/pagination";
import {
  chapterExists,
  findChapter,
  getAllCourses,
  getChapterLastModified,
  getCourseMeta,
} from "@/lib/courses";
import { getChapterPosition } from "@/lib/catalog";
import { getAdjacentChapters, getChapterHref } from "@/lib/docs";
import { getChapterMDX } from "@/lib/mdx";
import {
  buildBreadcrumbJsonLd,
  buildChapterArticleJsonLd,
  buildChapterKeywords,
  getChapterOgImagePath,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type ChapterPageProps = {
  params: Promise<{ course: string; slug: string[] }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCourses().flatMap((course) =>
    course.chapters
      .filter((chapter) => chapterExists(course.slug, chapter.slug))
      .map((chapter) => ({ course: course.slug, slug: [chapter.slug] }))
  );
}

async function loadChapter(courseSlug: string, slug: string[] | undefined) {
  if (!slug || slug.length !== 1) {
    return null;
  }
  const course = getCourseMeta(courseSlug);
  const chapter = course ? findChapter(course, slug[0]) : null;
  if (!course || !chapter) {
    return null;
  }
  const mdx = await getChapterMDX(course.slug, chapter.slug);
  return mdx ? { course, chapter, mdx } : null;
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { course: courseSlug, slug } = await params;
  const loaded = await loadChapter(courseSlug, slug);
  if (!loaded) {
    return { title: "Not found" };
  }

  const { course, chapter, mdx } = loaded;
  const title = `${mdx.frontmatter.title} | ${course.title}`;
  const description = mdx.frontmatter.description;
  const path = getChapterHref(course.slug, chapter.slug);
  const image = {
    url: getChapterOgImagePath(course.slug, chapter.slug),
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    title,
    description,
    keywords: buildChapterKeywords(course, chapter, mdx.frontmatter.keywords),
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      title,
      description,
      url: path,
      section: course.title,
      modifiedTime: getChapterLastModified(course.slug, chapter.slug)?.toISOString(),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { course: courseSlug, slug } = await params;
  const loaded = await loadChapter(courseSlug, slug);
  if (!loaded) {
    notFound();
  }

  const { course, chapter, mdx } = loaded;
  const { previous, next } = getAdjacentChapters(course, chapter.slug);
  const title = mdx.frontmatter.title;
  const description = mdx.frontmatter.description;

  return (
    <>
      <JsonLd
        data={[
          buildChapterArticleJsonLd({
            course,
            chapter,
            description,
            keywords: buildChapterKeywords(course, chapter, mdx.frontmatter.keywords),
            dateModified: getChapterLastModified(course.slug, chapter.slug),
          }),
          buildBreadcrumbJsonLd([
            { name: "Courses", path: "/courses" },
            { name: course.title, path: `/courses/${course.slug}` },
            { name: chapter.title, path: getChapterHref(course.slug, chapter.slug) },
          ]),
        ]}
      />
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
        description={description}
        toc={mdx.toc}
        meta={
          <ChapterMeta
            position={getChapterPosition(course, chapter.slug)}
            level={chapter.level}
            readingMinutes={mdx.readingMinutes}
          />
        }
      >
        {mdx.content}
      </DocsContent>
      <div className="mx-auto max-w-4xl px-3 pb-8 sm:px-5 lg:pl-8">
        <Pagination previous={previous} next={next} />
      </div>
    </>
  );
}
