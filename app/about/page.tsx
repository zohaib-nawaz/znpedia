import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { CtaBand } from "@/components/landing/cta-band";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCatalogStats } from "@/lib/catalog";
import { getAllCourses } from "@/lib/courses";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About ZnPedia",
  description:
    "ZnPedia kya hai, kis ke liye hai aur content kaise likha jata hai. Roman Urdu mein free web development courses, chhote structured chapters ke saath.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Ek chapter, ek idea",
    body: "Har chapter sirf ek topic samjhata hai. Agar do cheezein hain to do chapters hain.",
  },
  {
    title: "Pehle kyun, phir kaise",
    body: "Syntax se pehle yeh samjhana ke cheez kis problem ke liye bani hai. Is se yaad bhi rehta hai.",
  },
  {
    title: "Current, purana nahi",
    body: "Examples React 19.2, Next.js 16 aur aaj ke JavaScript par hain. Purana tareeqa sirf farq dikhane ke liye.",
  },
  {
    title: "Galtiyan bhi sikhati hain",
    body: "Har chapter mein common mistakes hain: kya galti hoti hai, kyun, aur behtar tareeqa kya hai.",
  },
];

export default function AboutPage() {
  const courses = getAllCourses();
  const stats = getCatalogStats(courses);

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              ZnPedia ke baare mein
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              ZnPedia ek free learning site hai jahan web development Roman Urdu mein, chhote aur
              structured chapters mein sikhaya jata hai. Abhi {stats.courseCount} courses aur{" "}
              {stats.chapterCount} chapters hain.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-3xl space-y-14 px-4 py-14 sm:px-6">
          <section aria-labelledby="who-heading">
            <h2 id="who-heading" className="text-xl font-semibold text-foreground">
              Kis ke liye hai?
            </h2>
            <ul className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
              <li>
                <strong className="text-foreground">Naye developers</strong> jo programming apni
                zabaan mein samajhna chahte hain.
              </li>
              <li>
                <strong className="text-foreground">Students</strong> jinhein university ke baad
                React aur Next.js jaise modern tools seekhne hain.
              </li>
              <li>
                <strong className="text-foreground">Junior developers</strong> jo production-grade
                code likhna, review karna aur ship karna seekhna chahte hain.
              </li>
            </ul>
          </section>
          <section aria-labelledby="how-heading">
            <h2 id="how-heading" className="text-xl font-semibold text-foreground">
              Content kaise likha jata hai
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {principles.map((principle) => (
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
              Roman Urdu kyun?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Naya concept apni zabaan mein jaldi samajh aata hai. Lekin technical terms jaise{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
                state
              </code>
              ,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
                closure
              </code>{" "}
              aur{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground">
                server component
              </code>{" "}
              English mein hi rakhe gaye hain, taake official docs, Stack Overflow aur job
              interviews mein wahi words pehchaan sakein.
            </p>
          </section>
          <section aria-labelledby="start-heading">
            <h2 id="start-heading" className="text-xl font-semibold text-foreground">
              Kahan se shuru karein?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Programming nayi hai to{" "}
              <Link href="/courses/javascript/introduction" className="font-medium text-accent underline underline-offset-2">
                JavaScript Introduction
              </Link>{" "}
              se. React aata hai to{" "}
              <Link href="/courses/best-practices" className="font-medium text-accent underline underline-offset-2">
                Best Practices
              </Link>{" "}
              course aapke liye hai. Poori tarteeb{" "}
              <Link href="/#learning-path" className="font-medium text-accent underline underline-offset-2">
                learning path
              </Link>{" "}
              mein hai.
            </p>
          </section>
        </div>
        <CtaBand
          title="Parhna shuru karein"
          body="Koi signup nahi. Pehla chapter kholein aur 15 minute mein ek naya concept seekhein."
          primary={{ label: "Pehla chapter", href: "/courses/javascript/introduction" }}
          secondary={{ label: "Saare courses", href: "/courses" }}
        />
      </main>
      <SiteFooter chapterCount={stats.chapterCount} />
    </>
  );
}
