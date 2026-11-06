import Link from "next/link";

type SiteLogoProps = {
  href: string;
};

export function SiteLogo({ href }: SiteLogoProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-lg font-semibold tracking-tight"
      aria-label="ZnPedia home"
    >
      <span
        className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-[13px] font-bold text-accent-foreground"
        aria-hidden
      >
        Zn
      </span>
      <span>
        <span className="text-foreground">Zn</span>
        <span className="text-accent">Pedia</span>
      </span>
    </Link>
  );
}
