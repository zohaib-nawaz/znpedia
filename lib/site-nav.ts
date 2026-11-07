import type { Dictionary } from "@/lib/i18n/dictionaries/ur";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";

export type NavLink = {
  label: string;
  href: string;
};

export type FooterGroup = {
  title: string;
  links: NavLink[];
};

export function buildPrimaryNav(locale: Locale, nav: Dictionary["nav"]): NavLink[] {
  return [
    { label: nav.courses, href: localizePath(locale, "/courses") },
    { label: nav.learningPath, href: localizePath(locale, "/#learning-path") },
    { label: nav.about, href: localizePath(locale, "/about") },
  ];
}

export function buildFooterGroups(locale: Locale, dict: Dictionary): FooterGroup[] {
  const { footer, nav } = dict;
  const href = (path: string) => localizePath(locale, path);

  return [
    {
      title: footer.coursesGroup,
      links: [
        { label: "JavaScript", href: href("/courses/javascript") },
        { label: "React.js", href: href("/courses/react") },
        { label: "Next.js", href: href("/courses/nextjs") },
        { label: "Best Practices", href: href("/courses/best-practices") },
      ],
    },
    {
      title: footer.startGroup,
      links: [
        { label: footer.startLinks.javascript, href: href("/courses/javascript/introduction") },
        { label: footer.startLinks.react, href: href("/courses/react/introduction") },
        { label: footer.startLinks.bestPractices, href: href("/courses/best-practices/introduction") },
        {
          label: footer.startLinks.readiness,
          href: href("/courses/best-practices/production-readiness-checklist"),
        },
      ],
    },
    {
      title: footer.siteGroup,
      links: [
        { label: nav.about, href: href("/about") },
        { label: nav.allCourses, href: href("/courses") },
        { label: nav.privacy, href: href("/privacy") },
        { label: nav.terms, href: href("/terms") },
      ],
    },
  ];
}
