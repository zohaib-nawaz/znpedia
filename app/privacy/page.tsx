import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { getCatalogStats } from "@/lib/catalog";
import { getAllCourses } from "@/lib/courses";
import { LEGAL_UPDATED, privacySections } from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ZnPedia koi account, tracking ya personal data collect nahi karta. Sirf aapka theme browser mein save hota hai. Poori tafseel yahan.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Seedhi baat: ZnPedia aapka personal data collect nahi karta."
      updated={LEGAL_UPDATED}
      sections={privacySections}
      chapterCount={getCatalogStats(getAllCourses()).chapterCount}
    />
  );
}
