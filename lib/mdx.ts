import fs from "fs";

import GithubSlugger from "github-slugger";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { estimateReadingMinutes } from "@/lib/catalog";
import { resolveChapterSource } from "@/lib/courses";
import { getMdxComponents, type MdxLabels } from "@/components/mdx-components";
import type { Locale } from "@/lib/i18n/config";
import { filterTocHeadings } from "@/lib/docs-config";
import {
  normalizeHeadingId,
  rehypeNormalizeHeadingIds,
} from "@/lib/rehype-normalize-heading-ids";
import type { ChapterFrontmatter, TocHeading } from "@/types/course";
import { slugToTitle } from "@/lib/utils";

function extractHeadingsFromSource(source: string): TocHeading[] {
  const body = source.replace(/^---[\s\S]*?---\n?/, "");
  const headings: TocHeading[] = [];
  const slugger = new GithubSlugger();

  let insideFence = false;

  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) {
      continue;
    }
    const match = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!match) {
      continue;
    }
    const level = match[1].length;
    const text = match[2].replace(/\{#.+?\}$/, "").trim();
    const id = normalizeHeadingId(slugger.slug(text));
    headings.push({ id, text, level });
  }

  return headings;
}

type ChapterMdxInput = {
  courseSlug: string;
  chapterSlug: string;
  locale: Locale;
  labels: MdxLabels;
};

export async function getChapterMDX({ courseSlug, chapterSlug, locale, labels }: ChapterMdxInput) {
  const { filePath, isFallback } = resolveChapterSource(courseSlug, chapterSlug, locale);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const headings = extractHeadingsFromSource(source);

  const { content, frontmatter } = await compileMDX<ChapterFrontmatter>({
    source,
    components: getMdxComponents(locale, labels),
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeNormalizeHeadingIds],
      },
    },
  });

  const title = frontmatter.title ?? slugToTitle(chapterSlug);
  const description = frontmatter.description ?? title;

  return {
    content,
    frontmatter: { ...frontmatter, title, description },
    toc: filterTocHeadings(headings),
    readingMinutes: estimateReadingMinutes(source),
    isFallback,
  };
}
