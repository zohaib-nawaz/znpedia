import fs from "fs";
import path from "path";

import GithubSlugger from "github-slugger";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { getChapterPath } from "@/lib/courses";
import { mdxComponents } from "@/components/mdx-components";
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

  for (const line of body.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].replace(/\{#.+?\}$/, "").trim();
    const id = normalizeHeadingId(slugger.slug(text));
    headings.push({ id, text, level });
  }

  return headings;
}

export async function getChapterMDX(courseSlug: string, chapterSlug: string) {
  const filePath = getChapterPath(courseSlug, chapterSlug);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const headings = extractHeadingsFromSource(source);

  const { content, frontmatter } = await compileMDX<ChapterFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          rehypeNormalizeHeadingIds,
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "github-dark",
                light: "github-light",
              },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });

  const title =
    frontmatter.title ?? slugToTitle(chapterSlug);
  const description =
    frontmatter.description ??
    `Placeholder chapter: ${title} in the ${courseSlug} course.`;

  return {
    content,
    frontmatter: { ...frontmatter, title, description },
    toc: filterTocHeadings(headings),
  };
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function getChapterCanonicalUrl(
  courseSlug: string,
  chapterSlug: string
): string {
  return `${getSiteUrl()}/courses/${courseSlug}/${chapterSlug}`;
}
