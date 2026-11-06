import fs from "fs";
import path from "path";

import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";

const CONTENT_DIR = path.join(process.cwd(), "content/courses");
const ALLOWED_COMPONENTS = new Set(["Callout", "CompareTable", "Flow", "Mistake"]);
const DESCRIPTION_RANGE = { min: 70, max: 170 };
const ROMAN_URDU_MARKERS = /\b(hai|hain|mein|aur|kya|kyun|nahi|karta|karte|kaise|wala|wali|liye|bhi|seekhein)\b/gi;
const MAX_ROMAN_URDU_MARKERS = 6;

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

function chapterPath(courseSlug, chapterSlug, locale) {
  if (locale === "ur") {
    return path.join(CONTENT_DIR, courseSlug, `${chapterSlug}.mdx`);
  }

  return path.join(CONTENT_DIR, courseSlug, `${chapterSlug}.${locale}.mdx`);
}

function countMatches(text, pattern) {
  return (text.match(pattern) ?? []).length;
}

function checkTranslation(source, translation, problems) {
  const pairs = [
    ["## headings", /^## /gm],
    ["code blocks", /^```/gm],
    ["Mistake components", /<Mistake/g],
  ];
  for (const [label, pattern] of pairs) {
    const expected = countMatches(source.content, pattern);
    const actual = countMatches(translation.content, pattern);
    if (expected !== actual) {
      problems.push(`en ${label}: ${actual}, Roman Urdu has ${expected}`);
    }
  }
  const markers = countMatches(stripCode(translation.content), ROMAN_URDU_MARKERS);
  if (markers > MAX_ROMAN_URDU_MARKERS) {
    problems.push(`en still has ${markers} Roman Urdu words`);
  }
  if (source.data.title !== translation.data.title) {
    problems.push(`en title "${translation.data.title}" differs from "${source.data.title}"`);
  }
}

async function checkFile(filePath, label, problems) {
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const local = [];
  checkFrontmatter(parsed.data, local);
  checkComponents(parsed.content, local);
  try {
    await compile(parsed.content, { remarkPlugins: [remarkGfm] });
  } catch (error) {
    local.push(`mdx compile: ${error.message.split("\n")[0]}`);
  }
  problems.push(...local.map((problem) => `${label}: ${problem}`));

  return parsed;
}

async function checkChapter(courseSlug, chapterSlug) {
  const sourcePath = chapterPath(courseSlug, chapterSlug, "ur");
  if (!fs.existsSync(sourcePath)) {
    return { problems: ["file missing"], translated: false };
  }

  const problems = [];
  const source = await checkFile(sourcePath, "ur", problems);
  const translationPath = chapterPath(courseSlug, chapterSlug, "en");
  if (!fs.existsSync(translationPath)) {
    return { problems, translated: false };
  }

  const translation = await checkFile(translationPath, "en", problems);
  checkTranslation(source, translation, problems);

  return { problems, translated: true };
}

async function main() {
  const filter = process.argv[2];
  let failures = 0;
  let checked = 0;
  let translated = 0;

  for (const courseSlug of listCourses()) {
    for (const chapterSlug of readMeta(courseSlug)) {
      const id = `${courseSlug}/${chapterSlug}`;
      if (filter && !id.startsWith(filter)) {
        continue;
      }
      checked += 1;
      const result = await checkChapter(courseSlug, chapterSlug);
      const problems = result.problems;
      if (result.translated) {
        translated += 1;
      }
      if (problems.length > 0) {
        failures += 1;
        console.log(`FAIL ${id}\n  - ${problems.join("\n  - ")}`);
      }
    }
  }

  console.log(`${checked - failures}/${checked} chapters ok`);
  console.log(`${translated}/${checked} chapters translated to English`);
  process.exitCode = failures > 0 ? 1 : 0;
}

main();
