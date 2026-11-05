export type NavLink = {
  label: string;
  href: string;
};

export type FooterGroup = {
  title: string;
  links: NavLink[];
};

export const primaryNav: NavLink[] = [
  { label: "Courses", href: "/courses" },
  { label: "Learning path", href: "/#learning-path" },
  { label: "About", href: "/about" },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Courses",
    links: [
      { label: "JavaScript", href: "/courses/javascript" },
      { label: "React.js", href: "/courses/react" },
      { label: "Next.js", href: "/courses/nextjs" },
      { label: "Best Practices", href: "/courses/best-practices" },
    ],
  },
  {
    title: "Start here",
    links: [
      { label: "JavaScript Introduction", href: "/courses/javascript/introduction" },
      { label: "React Introduction", href: "/courses/react/introduction" },
      { label: "Best Practices Introduction", href: "/courses/best-practices/introduction" },
      { label: "Production Readiness", href: "/courses/best-practices/production-readiness-checklist" },
    ],
  },
  {
    title: "ZnPedia",
    links: [
      { label: "About", href: "/about" },
      { label: "All courses", href: "/courses" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
