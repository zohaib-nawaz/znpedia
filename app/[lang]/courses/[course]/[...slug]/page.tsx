import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChapterMeta } from "@/components/chapter-meta";
import { DocsContent } from "@/components/docs-content";
import { JsonLd } from "@/components/json-ld";
import { Pagination } from "@/components/pagination";
import { TranslationNotice } from "@/components/translation-notice";
import {
  chapterExists,
  findChapter,
  getAllCourses,
  getChapterLastModified,
  getCourseMeta,
  isChapterTranslated,
} from "@/lib/courses";
import { getChapterPosition } from "@/lib/catalog";
import { getAdjacentChapters, getChapterHref, getChapterPath, getCourseHref } from "@/lib/docs";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/ur";
import { buildLanguageAlternates, localizePath } from "@/lib/i18n/paths";
import { resolveLocale } from "@/lib/i18n/route";
import { getChapterMDX } from "@/lib/mdx";
import {
  buildBreadcrumbJsonLd,
  buildChapterArticleJsonLd,
  buildChapterKeywords,
  getChapterOgImagePath,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type ChapterPageProps = {
  params: Promise<{ lang: string; course: string; slug: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCourses().flatMap((course) =>
    course.chapters
      .filter((chapter) => chapterExists(course.slug, chapter.slug))
      .map((chapter) => ({ course: course.slug, slug: [chapter.slug] }))
  );
}

async function loadChapter(
  courseSlug: string,
  slug: string[] | undefined,
  locale: Locale,
  dict: Dictionary
) {
  if (!slug || slug.length !== 1) {
    return null;
  }

  const course = getCourseMeta(courseSlug, locale);
  if (!course) {
    return null;
  }

  const chapter = findChapter(course, slug[0]);
  if (!chapter) {
    return null;
  }

  const mdx = await getChapterMDX({
    courseSlug: course.slug,
    chapterSlug: chapter.slug,
    locale,
    labels: {
      ...dict.mdx,
      linkToSection: dict.chapter.linkToSection,
      copyCode: dict.chapter.copyCode,
      copied: dict.chapter.copied,
    },
  });
  if (!mdx) {
    return null;
  }

  return { course, chapter, mdx };
}

function availableLocales(courseSlug: string, chapterSlug: string): Locale[] {
  return locales.filter(
    (locale) => locale === defaultLocale || isChapterTranslated(courseSlug, chapterSlug, locale)
  );
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { course: courseSlug, slug } = await params;
  const { locale, dict } = await resolveLocale(params);
  const loaded = await loadChapter(courseSlug, slug, locale, dict);
  if (!loaded) {
    return {};
  }

  const { course, chapter, mdx } = loaded;
  const title = `${mdx.frontmatter.title} | ${course.title}`;
  const description = mdx.frontmatter.description;
  const path = getChapterPath(course.slug, chapter.slug);
  const href = getChapterHref(course.slug, chapter.slug, locale);
  const image = {
    url: getChapterOgImagePath(course.slug, chapter.slug, locale),
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    title,
    description,
    keywords: buildChapterKeywords(course, chapter, locale, mdx.frontmatter.keywords),
    alternates: {
      canonical: mdx.isFallback ? localizePath(defaultLocale, path) : href,
      languages: buildLanguageAlternates(path, availableLocales(course.slug, chapter.slug)),
    },
    robots: mdx.isFallback ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      title,
      description,
      url: href,
      section: course.title,
      modifiedTime: getChapterLastModified(course.slug, chapter.slug, locale)?.toISOString(),
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

function renderNotice(isFallback: boolean, dict: Dictionary) {
  if (!isFallback) {
    return null;
  }

  return <TranslationNotice title={dict.chapter.fallbackTitle} body={dict.chapter.fallbackBody} />;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { course: courseSlug, slug } = await params;
  const { locale, dict } = await resolveLocale(params);
  const loaded = await loadChapter(courseSlug, slug, locale, dict);
  if (!loaded) {
    notFound();
  }

  const { course, chapter, mdx } = loaded;
  const { previous, next } = getAdjacentChapters(course, chapter.slug, locale);
  const title = mdx.frontmatter.title;
  const description = mdx.frontmatter.description;
  const coursesHref = localizePath(locale, "/courses");
  const courseHref = getCourseHref(locale, course.slug);

  return (
    <>
      <JsonLd
        data={[
          buildChapterArticleJsonLd({
            course,
            chapter,
            description,
            locale,
            keywords: buildChapterKeywords(course, chapter, locale, mdx.frontmatter.keywords),
            dateModified: getChapterLastModified(course.slug, chapter.slug, locale),
          }),
          buildBreadcrumbJsonLd([
            { name: dict.nav.courses, path: coursesHref },
            { name: course.title, path: courseHref },
            { name: chapter.title, path: getChapterHref(course.slug, chapter.slug, locale) },
          ]),
        ]}
      />
      <div className="px-3 py-2 sm:px-5 lg:px-6">
        <Breadcrumbs
          items={[
            { label: dict.nav.courses, href: coursesHref },
            { label: course.title, href: courseHref },
            { label: title },
          ]}
        />
      </div>
      <DocsContent
        title={title}
        description={description}
        toc={mdx.toc}
        tocLabel={dict.chapter.onThisPage}
        meta={
          <ChapterMeta
            position={getChapterPosition(course, chapter.slug)}
            level={chapter.level}
            readingMinutes={mdx.readingMinutes}
            labels={{ position: dict.chapter.position, minRead: dict.chapter.minRead }}
          />
        }
      >
        {renderNotice(mdx.isFallback, dict)}
        {mdx.content}
      </DocsContent>
      <div className="mx-auto max-w-4xl px-3 pb-8 sm:px-5 lg:pl-8">
        <Pagination
          previous={previous}
          next={next}
          labels={{
            previous: dict.chapter.previous,
            next: dict.chapter.next,
            navigation: dict.chapter.pagination,
          }}
        />
      </div>
    </>
  );
}
