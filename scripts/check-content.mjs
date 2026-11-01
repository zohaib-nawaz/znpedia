import fs from "fs";
import path from "path";

import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";

const CONTENT_DIR = path.join(process.cwd(), "content/courses");
const ALLOWED_COMPONENTS = new Set(["Callout", "CompareTable", "Flow", "Mistake"]);
const DESCRIPTION_RANGE = { min: 70, max: 170 };

function listCourses() {
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function readMeta(courseSlug) {
  const meta = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, courseSlug, "meta.json"), "utf8"));
  return meta.sections.flatMap((section) => section.chapters.map((chapter) => chapter.slug));
}

function stripCode(source) {
  return source.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
}

function checkFrontmatter(data, problems) {
  if (!data.title) {
    problems.push("missing frontmatter title");
  }
  const description = data.description ?? "";
  if (description.length < DESCRIPTION_RANGE.min || description.length > DESCRIPTION_RANGE.max) {
    problems.push(`description length ${description.length}, expected ${DESCRIPTION_RANGE.min}-${DESCRIPTION_RANGE.max}`);
  }
  if (!Array.isArray(data.keywords) || data.keywords.length === 0) {
    problems.push("missing frontmatter keywords array");
  }
}

function checkComponents(body, problems) {
  for (const match of stripCode(body).matchAll(/<([A-Z][A-Za-z]*)/g)) {
    if (!ALLOWED_COMPONENTS.has(match[1])) {
      problems.push(`unknown component <${match[1]}>`);
    }
  }
}

async function checkChapter(courseSlug, chapterSlug) {
  const filePath = path.join(CONTENT_DIR, courseSlug, `${chapterSlug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return ["file missing"];
  }
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const problems = [];
  checkFrontmatter(data, problems);
  checkComponents(content, problems);
  try {
    await compile(content, { remarkPlugins: [remarkGfm] });
  } catch (error) {
    problems.push(`mdx compile: ${error.message.split("\n")[0]}`);
  }
  return problems;
}

async function main() {
  const filter = process.argv[2];
  let failures = 0;
  let checked = 0;

  for (const courseSlug of listCourses()) {
    for (const chapterSlug of readMeta(courseSlug)) {
      const id = `${courseSlug}/${chapterSlug}`;
      if (filter && !id.startsWith(filter)) {
        continue;
      }
      checked += 1;
      const problems = await checkChapter(courseSlug, chapterSlug);
      if (problems.length > 0) {
        failures += 1;
        console.log(`FAIL ${id}\n  - ${problems.join("\n  - ")}`);
      }
    }
  }

  console.log(`${checked - failures}/${checked} chapters ok`);
  process.exitCode = failures > 0 ? 1 : 0;
}

main();
