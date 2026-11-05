import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { getCatalogStats } from "@/lib/catalog";
import { getAllCourses } from "@/lib/courses";
import { LEGAL_UPDATED, termsSections } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "ZnPedia ka content kaise use kar sakte hain, accuracy ke baare mein note, aur site ke istemal ki aam shartein, Roman Urdu mein.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="ZnPedia ka content istemal karne ki aam shartein, saaf alfaaz mein."
      updated={LEGAL_UPDATED}
      sections={termsSections}
      chapterCount={getCatalogStats(getAllCourses()).chapterCount}
    />
  );
}
