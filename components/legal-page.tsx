import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/ur";
import { localizePath } from "@/lib/i18n/paths";

export type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  locale: Locale;
  dict: Dictionary;
  title: string;
  intro: string;
  sections: LegalSection[];
  chapterCount: number;
};

export function LegalPage({ locale, dict, title, intro, sections, chapterCount }: LegalPageProps) {
  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
            <Breadcrumbs
              items={[{ label: dict.nav.home, href: localizePath(locale, "/") }, { label: title }]}
            />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">{title}</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{intro}</p>
            <p className="mt-4 text-xs text-muted-foreground">
              {dict.legal.updatedLabel}: {dict.legal.updated}
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl space-y-10 px-4 py-12 sm:px-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter locale={locale} dict={dict} chapterCount={chapterCount} />
    </>
  );
}
