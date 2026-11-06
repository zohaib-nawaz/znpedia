import type { Dictionary } from "@/lib/i18n/dictionaries/ur";

const en: Dictionary = {
  meta: {
    siteTitle: "ZnPedia: Learn JavaScript, React and Next.js",
    siteDescription:
      "Learn JavaScript, React, Next.js and production-grade best practices. Every topic is one short, structured chapter: definition, examples, mistakes and revision.",
    keywords: [
      "learn JavaScript",
      "React tutorial",
      "Next.js tutorial",
      "web development course",
      "coding best practices",
      "free programming course",
    ],
    coursesTitle: "Courses: JavaScript, React, Next.js and Best Practices",
    coursesDescription:
      "All free ZnPedia courses: JavaScript, React, Next.js and Best Practices, split into short, structured chapters.",
    courseTitle: (title: string) => `${title} Course`,
    aboutTitle: "About ZnPedia",
    aboutDescription:
      "What ZnPedia is, who it is for and how the content is written. Free web development courses in short, structured chapters.",
    privacyTitle: "Privacy Policy",
    privacyDescription:
      "ZnPedia collects no accounts, tracking or personal data. Only your theme and language are saved in your browser. Full details here.",
    termsTitle: "Terms of Use",
    termsDescription:
      "How you may use ZnPedia content, a note on accuracy, and the general terms for using the site.",
    ogTagline: "Web development, explained simply",
    ogChapterSubtitle: "Definition, examples, common mistakes and quick revision.",
  },
  nav: {
    courses: "Courses",
    learningPath: "Learning path",
    about: "About",
    startLearning: "Start learning",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    courseOverview: "Course overview",
    skipToContent: "Skip to content",
    home: "Home",
    allCourses: "All courses",
    privacy: "Privacy",
    terms: "Terms",
    language: "Language",
  },
  theme: {
    toLight: "Light mode",
    toDark: "Dark mode",
  },
  footer: {
    tagline: (count: number) =>
      `JavaScript, React, Next.js and best practices. ${count} short chapters, completely free.`,
    rights: "Free learning for every developer.",
    motto: "Web development, explained simply",
    coursesGroup: "Courses",
    startGroup: "Start here",
    siteGroup: "ZnPedia",
    startLinks: {
      javascript: "JavaScript Introduction",
      react: "React Introduction",
      bestPractices: "Best Practices Introduction",
      readiness: "Production Readiness",
    },
  },
  hero: {
    badge: (chapters: number, courses: number) =>
      `${chapters} chapters, ${courses} courses, free`,
    titleStart: "Learn web development,",
    titleAccent: "one clear chapter",
    titleEnd: "at a time",
    body: "From JavaScript to Next.js and production-grade best practices. Every topic is one short, focused chapter: definition, code example, common mistakes and quick revision.",
    primary: "Read the first chapter",
    secondary: "Browse all courses",
    highlights: ["Completely free", "No sign-up", "React 19.2 and Next.js 16"],
    stats: {
      courses: "Courses",
      chapters: "Chapters",
      freeValue: "Free",
      freeLabel: "Always",
      signupValue: "0",
      signupLabel: "Sign-ups needed",
    },
    preview: {
      section: "Functions",
      position: "Chapter 16 / 47",
      readTime: "5 min read",
      definitionLabel: "Short definition",
      definition: "A closure is a function that remembers the variables of the scope it was created in.",
      mistakeLabel: "Mistake:",
      mistake: "closures with var inside a loop",
      betterLabel: "Better:",
      better: "use let, so every iteration gets its own scope.",
    },
  },
  home: {
    coursesEyebrow: "Courses",
    coursesTitle: "Pick your course",
    coursesDescription: "Every course is split into sections, and every chapter shows its level.",
    anatomyEyebrow: "Chapter structure",
    anatomyTitle: "Every chapter follows the same order",
    anatomyDescription:
      "You always know what comes next, so your focus stays on the concept, not the layout.",
    pathEyebrow: "Learning path",
    pathTitle: "The order to read in",
    pathDescription:
      "Each course builds on the one before it. Skip what you know and start where you need to.",
    whyEyebrow: "Why ZnPedia",
    whyTitle: "Easy to learn, useful to keep",
    whyDescription: "One clear path instead of scattered tutorials, built on today's tools.",
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
    faqDescription: "Have another question? The About page explains everything about ZnPedia.",
    cta: {
      title: "One chapter today, another tomorrow",
      body: "Fifteen minutes a day is enough. Open the first chapter and see how the structure helps.",
      primary: "Start with JavaScript",
      secondary: "See Best Practices",
    },
  },
  valueProps: [
    {
      title: "Two languages, same depth",
      body: "Read every chapter in Roman Urdu or English. Technical terms stay in English, the words you will see in docs and at work.",
    },
    {
      title: "One topic, one short chapter",
      body: "Each chapter explains exactly one thing in 5 to 10 minutes. No long videos or scattered notes.",
    },
    {
      title: "Modern and current",
      body: "React 19.2, the Next.js 16 App Router, Cache Components and today's JavaScript. Old approaches appear only for comparison.",
    },
    {
      title: "Production-grade habits",
      body: "The Best Practices course shows how teams write, review and ship code, and why.",
    },
    {
      title: "A clear learning path",
      body: "One order from JavaScript to Next.js. Every chapter tells you what to read before and after.",
    },
    {
      title: "Free, no sign-up",
      body: "No accounts, paywalls or ads. Open a page and start reading.",
    },
  ],
  anatomy: [
    { title: "What is it?", body: "A one-line definition, then a simple explanation." },
    { title: "Why does it matter?", body: "The real problem it solves, before and after." },
    { title: "Where is it used?", body: "Examples from real projects." },
    { title: "How does it work?", body: "A mental model and a step-by-step flow." },
    { title: "Code example", body: "Short, runnable code and what each line does." },
    { title: "Common mistakes", body: "The mistake, why it happens and the better way." },
    { title: "What next?", body: "Links to the chapters before and after." },
    { title: "Quick revision", body: "Key points at a glance." },
  ],
  path: {
    javascript: "From variables to async/await and the DOM, a solid foundation in the language.",
    react: "Build interactive UI with components, state and hooks.",
    nextjs: "A full app with routing, server components, data and deployment.",
    "best-practices": "Clean code, security, testing and team workflow, ready for production.",
  },
  faq: [
    {
      question: "Is ZnPedia really free?",
      answer: "Yes. Every course and chapter is free. No sign-up, subscription or ads.",
    },
    {
      question: "Where should I start?",
      answer:
        "If programming is new to you, start with the JavaScript Introduction. If you already know React or Next.js, go straight to the Best Practices course.",
    },
    {
      question: "Why is there a Roman Urdu version?",
      answer:
        "New concepts click faster in your own language. ZnPedia started in Roman Urdu, and every chapter is now available in English too.",
    },
    {
      question: "Can I switch languages?",
      answer:
        "Yes. Use the language switcher in the header. Every chapter exists in both languages, each with its own URL.",
    },
    {
      question: "How long does a chapter take?",
      answer:
        "Most chapters take 4 to 10 minutes to read, plus time to run the code yourself. Every page shows its reading time at the top.",
    },
    {
      question: "Who is the Best Practices course for?",
      answer:
        "Developers who know the basics and now want to write, review and ship production-grade code.",
    },
  ],
  courses: {
    title: "All courses",
    body: (courses: number, chapters: number) =>
      `${courses} courses, ${chapters} chapters. Every course is split into sections and every chapter shows its level, so you can start in the right place.`,
    listLabel: "Course list",
    cta: {
      title: "Not sure where to start?",
      body: "New to programming? Read the JavaScript Introduction. Already know React? The Best Practices course is for you.",
      primary: "JavaScript Introduction",
      secondary: "Best Practices",
    },
  },
  card: {
    chapters: (count: number) => `${count} chapters`,
    sections: (count: number) => `${count} sections`,
    hours: (hours: number) => `~${hours} hours`,
    start: "Start",
  },
  overview: {
    eyebrow: "Course",
    start: "Start the course",
    chaptersLabel: "Chapters",
    sectionsLabel: "Sections",
    readingLabel: "Reading",
    hours: (hours: number) => `~${hours} hours`,
    chapterCount: (count: number) => `${count} chapters`,
  },
  chapter: {
    minRead: (minutes: number) => `${minutes} min read`,
    position: (current: number, total: number) => `Chapter ${current} / ${total}`,
    onThisPage: "On this page",
    previous: "Previous",
    next: "Next",
    pagination: "Chapter navigation",
    linkToSection: "Link to this section",
    fallbackTitle: "English translation coming soon",
    fallbackBody: "This chapter is not translated yet, so the Roman Urdu version is shown below.",
    copyCode: "Copy code",
    copied: "Copied",
  },
  mdx: {
    mistake: "Mistake",
    why: "Why?",
    better: "Better",
    note: "Note",
  },
  search: {
    trigger: "Search chapters...",
    triggerLabel: "Search chapters",
    placeholder: "Type a chapter, topic or keyword...",
    tryLabel: "Try searching",
    loading: "Loading...",
    error: "Search could not load. Refresh the page and try again.",
    empty: "No chapter found for \"{query}\".",
    close: "Close search",
    results: "Search results",
    hintSelect: "↑↓ select",
    hintOpen: "Enter open",
    hintClose: "Esc close",
  },
  about: {
    title: "About ZnPedia",
    intro: (courses: number, chapters: number) =>
      `ZnPedia is a free learning site that teaches web development in short, structured chapters, in English and Roman Urdu. There are ${courses} courses and ${chapters} chapters so far.`,
    whoTitle: "Who is it for?",
    who: [
      { lead: "New developers", text: "who want programming explained clearly, one idea at a time." },
      { lead: "Students", text: "who need modern tools like React and Next.js beyond their coursework." },
      { lead: "Junior developers", text: "who want to write, review and ship production-grade code." },
    ],
    howTitle: "How the content is written",
    principles: [
      { title: "One chapter, one idea", body: "Each chapter covers exactly one topic. Two ideas means two chapters." },
      { title: "Why first, then how", body: "Before syntax, each chapter explains the problem the idea solves. That is what makes it stick." },
      { title: "Current, not outdated", body: "Examples use React 19.2, Next.js 16 and today's JavaScript. Old approaches appear only to show the difference." },
      { title: "Mistakes teach too", body: "Every chapter lists common mistakes: what goes wrong, why, and the better way." },
    ],
    languageTitle: "Why two languages?",
    languageBody:
      "ZnPedia started in Roman Urdu, because new concepts click faster in your own language. Every chapter is also in English, so you learn the language of official docs and interviews at the same time. Technical terms stay in English in both.",
    startTitle: "Where should I start?",
    startBody: {
      before: "New to programming? Start with the",
      javascript: "JavaScript Introduction",
      middle: ". Already know React? The",
      bestPractices: "Best Practices",
      after: "course is for you. The full order is in the",
      path: "learning path",
      end: ".",
    },
    cta: {
      title: "Start reading",
      body: "No sign-up. Open the first chapter and learn a new concept in 15 minutes.",
      primary: "First chapter",
      secondary: "All courses",
    },
  },
  legal: {
    updatedLabel: "Last updated",
    updated: "6 November 2026",
    privacyIntro: "The short version: ZnPedia does not collect your personal data.",
    termsIntro: "The general terms for using ZnPedia content, in plain words.",
    privacy: [
      {
        title: "What we collect",
        body: [
          "ZnPedia has no accounts, logins or forms. We do not ask for or store your name, email or any personal information.",
          "The site runs no analytics, advertising or tracking scripts.",
        ],
      },
      {
        title: "What your browser saves",
        body: [
          "Two things: your chosen theme (light or dark) in localStorage, and your chosen language in a small cookie (NEXT_LOCALE), so the site opens the same way next time.",
          "You can clear both at any time from your browser settings.",
        ],
      },
      {
        title: "Server logs",
        body: [
          "The hosting provider may keep standard security and performance logs, such as IP address and request time. We do not use these logs for anything else.",
        ],
      },
      {
        title: "Changes",
        body: [
          "If a future feature collects any data, this page will be updated first and the date above will change.",
        ],
      },
    ],
    terms: [
      {
        title: "Using the content",
        body: [
          "ZnPedia content is free to learn from. You can read the chapters, use the code examples in your own projects and share links.",
          "Copying whole chapters and publishing them elsewhere under your own name is not allowed.",
        ],
      },
      {
        title: "Accuracy",
        body: [
          "We try hard to keep the content current and correct, but libraries and frameworks keep changing. Always check the official documentation before putting code in production.",
        ],
      },
      {
        title: "No warranty",
        body: [
          "The content is provided as is. ZnPedia is not responsible for any loss caused by using it.",
        ],
      },
      {
        title: "Changes",
        body: [
          "These terms may be updated over time. The date above shows the last change.",
        ],
      },
    ],
  },
};

export default en;
