import fs from "fs";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";

import { mdxToPlainText, splitIntoSections, type MdxSection } from "@/lib/assistant/mdx-text";
import type { CatalogCourse, ContentChunk } from "@/lib/assistant/types";
import { getAllCourses, resolveChapterSource } from "@/lib/courses";
import { getChapterHref } from "@/lib/docs";
import type { Locale } from "@/lib/i18n/config";
import { normalizeHeadingId } from "@/lib/rehype-normalize-heading-ids";
import type { ChapterFrontmatter, CourseMeta } from "@/types/course";

type ChapterContext = {
  course: CourseMeta;
  chapterSlug: string;
  chapterTitle: string;
  sectionTitle: string;
  keywords: string[];
  href: string;
};

type DraftChunk = {
  heading: string;
  anchor: string;
  lines: string[];
};

const chunkCache = new Map<Locale, ContentChunk[]>();
const catalogCache = new Map<Locale, CatalogCourse[]>();

function groupByH2(sections: MdxSection[], fallbackHeading: string): DraftChunk[] {
  const slugger = new GithubSlugger();
  const drafts: DraftChunk[] = [{ heading: fallbackHeading, anchor: "", lines: [] }];

  for (const section of sections) {
    if (!section.heading) {
      drafts[0].lines.push(section.body);
      continue;
    }

    const anchor = normalizeHeadingId(slugger.slug(section.heading));
    if (section.level === 2) {
      drafts.push({ heading: section.heading, anchor, lines: [section.body] });
      continue;
    }

    drafts[drafts.length - 1].lines.push(`### ${section.heading}\n${section.body}`);
  }

  return drafts;
}

function toChunks(context: ChapterContext, drafts: DraftChunk[]): ContentChunk[] {
  return drafts
    .map((draft, index) => ({
      id: `${context.course.slug}/${context.chapterSlug}#${index}`,
      courseSlug: context.course.slug,
      courseTitle: context.course.title,
      chapterSlug: context.chapterSlug,
      chapterTitle: context.chapterTitle,
      sectionTitle: context.sectionTitle,
      heading: draft.heading,
      href: draft.anchor ? `${context.href}#${draft.anchor}` : context.href,
      keywords: context.keywords,
      text: mdxToPlainText(draft.lines.join("\n")),
    }))
    .filter((chunk) => chunk.text.length > 0);
}

function readChapterChunks(context: ChapterContext, locale: Locale): ContentChunk[] {
  const { filePath } = resolveChapterSource(context.course.slug, context.chapterSlug, locale);
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const { content, data } = matter(fs.readFileSync(filePath, "utf8"));
  const frontmatter = data as ChapterFrontmatter;
  const title = frontmatter.title ?? context.chapterTitle;
  const drafts = groupByH2(splitIntoSections(content), title);

  return toChunks({ ...context, chapterTitle: title, keywords: readKeywords(frontmatter) }, drafts);
}

function readKeywords(frontmatter: ChapterFrontmatter): string[] {
  if (!Array.isArray(frontmatter.keywords)) {
    return [];
  }

  return frontmatter.keywords;
}

function buildChunks(locale: Locale): ContentChunk[] {
  return getAllCourses(locale).flatMap((course) =>
    course.sections.flatMap((section) =>
      section.chapters.flatMap((chapter) =>
        readChapterChunks(
          {
            course,
            chapterSlug: chapter.slug,
            chapterTitle: chapter.title,
            sectionTitle: section.title,
            keywords: [],
            href: getChapterHref(course.slug, chapter.slug, locale),
          },
          locale
        )
      )
    )
  );
}

function buildCatalog(locale: Locale): CatalogCourse[] {
  return getAllCourses(locale).map((course) => ({
    slug: course.slug,
    title: course.title,
    description: course.description,
    sections: course.sections.map((section) => ({
      title: section.title,
      chapters: section.chapters.map((chapter) => ({ slug: chapter.slug, title: chapter.title })),
    })),
  }));
}

export function getContentChunks(locale: Locale): ContentChunk[] {
  const cached = chunkCache.get(locale);
  if (cached) {
    return cached;
  }

  const chunks = buildChunks(locale);
  chunkCache.set(locale, chunks);
  return chunks;
}

export function getCatalog(locale: Locale): CatalogCourse[] {
  const cached = catalogCache.get(locale);
  if (cached) {
    return cached;
  }

  const catalog = buildCatalog(locale);
  catalogCache.set(locale, catalog);
  return catalog;
}
