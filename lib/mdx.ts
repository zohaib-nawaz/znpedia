import fs from "fs";

import GithubSlugger from "github-slugger";
import { compileMDX } from "next-mdx-remote/rsc";
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
        rehypePlugins: [rehypeSlug, rehypeNormalizeHeadingIds],
      },
    },
  });

  const title = frontmatter.title ?? slugToTitle(chapterSlug);
  const description = frontmatter.description ?? `${title} ko Roman Urdu mein seekhein.`;

  return {
    content,
    frontmatter: { ...frontmatter, title, description },
    toc: filterTocHeadings(headings),
  };
}
