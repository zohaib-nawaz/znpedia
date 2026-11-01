import type { MetadataRoute } from "next";

import { chapterExists, getAllCourses, getChapterLastModified } from "@/lib/courses";
import { getChapterHref } from "@/lib/docs";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const courses = getAllCourses();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/courses"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.4 },
  ];

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: absoluteUrl(`/courses/${course.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const chapterEntries: MetadataRoute.Sitemap = courses.flatMap((course) =>
    course.chapters
      .filter((chapter) => chapterExists(course.slug, chapter.slug))
      .map((chapter, index) => ({
        url: absoluteUrl(getChapterHref(course.slug, chapter.slug)),
        lastModified: getChapterLastModified(course.slug, chapter.slug),
        changeFrequency: "monthly" as const,
        priority: index === 0 ? 0.8 : 0.7,
      }))
  );

  return [...staticEntries, ...courseEntries, ...chapterEntries];
}
