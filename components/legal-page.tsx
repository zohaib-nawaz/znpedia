import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  chapterCount: number;
};

export function LegalPage({ title, intro, updated, sections, chapterCount }: LegalPageProps) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">{title}</h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{intro}</p>
            <p className="mt-4 text-xs text-muted-foreground">Last updated: {updated}</p>
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
      <SiteFooter chapterCount={chapterCount} />
    </>
  );
}
