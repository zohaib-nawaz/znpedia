import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/landing/cta-band";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCatalogStats } from "@/lib/catalog";
import { getAllCourses } from "@/lib/courses";
import { getChapterHref, getCourseHref } from "@/lib/docs";
import { buildLanguageAlternates, localizePath } from "@/lib/i18n/paths";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/route";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

type AboutPageProps = {
  params: LocaleParams;
};

const LINK_CLASS = "font-medium text-accent underline underline-offset-2";

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale, dict } = await resolveLocale(params);

  return {
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
    alternates: {
      canonical: localizePath(locale, "/about"),
      languages: buildLanguageAlternates("/about"),
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale, dict } = await resolveLocale(params);
  const { about } = dict;
  const stats = getCatalogStats(getAllCourses(locale));
  const firstChapterHref = getChapterHref("javascript", "introduction", locale);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([{ name: dict.nav.about, path: localizePath(locale, "/about") }])}
      />
      <SiteHeader locale={locale} dict={dict} />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <Breadcrumbs
              items={[{ label: dict.nav.home, href: localizePath(locale, "/") }, { label: dict.nav.about }]}
            />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {about.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {about.intro(stats.courseCount, stats.chapterCount)}
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl space-y-14 px-4 py-14 sm:px-6">
          <section aria-labelledby="who-heading">
            <h2 id="who-heading" className="text-xl font-semibold text-foreground">
              {about.whoTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
              {about.who.map((entry) => (
                <li key={entry.lead}>
                  <strong className="text-foreground">{entry.lead}</strong> {entry.text}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="how-heading">
            <h2 id="how-heading" className="text-xl font-semibold text-foreground">
              {about.howTitle}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {about.principles.map((principle) => (
                <div key={principle.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground">{principle.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section aria-labelledby="language-heading">
            <h2 id="language-heading" className="text-xl font-semibold text-foreground">
              {about.languageTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {about.languageBody}
            </p>
          </section>
          <section aria-labelledby="start-heading">
            <h2 id="start-heading" className="text-xl font-semibold text-foreground">
              {about.startTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {about.startBody.before}{" "}
              <Link href={firstChapterHref} className={LINK_CLASS}>
                {about.startBody.javascript}
              </Link>
              {about.startBody.middle}{" "}
              <Link href={getCourseHref(locale, "best-practices")} className={LINK_CLASS}>
                {about.startBody.bestPractices}
              </Link>{" "}
              {about.startBody.after}{" "}
              <Link href={localizePath(locale, "/#learning-path")} className={LINK_CLASS}>
                {about.startBody.path}
              </Link>
              {about.startBody.end}
            </p>
          </section>
        </div>
        <CtaBand
          title={about.cta.title}
          body={about.cta.body}
          primary={{ label: about.cta.primary, href: firstChapterHref }}
          secondary={{ label: about.cta.secondary, href: localizePath(locale, "/courses") }}
        />
      </main>
      <SiteFooter locale={locale} dict={dict} chapterCount={stats.chapterCount} />
    </>
  );
}
