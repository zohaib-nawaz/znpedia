import { renderOgImage, ogImageSize } from "@/lib/og-image";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Free courses",
    title: "JavaScript, React & Next.js",
    subtitle: "Har topic ek chhota chapter, Roman Urdu mein.",
  });
}
