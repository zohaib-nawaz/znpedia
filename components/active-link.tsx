"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type ActiveLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
};

export function ActiveLink({
  href,
  children,
  className,
  activeClassName,
  onClick,
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        className,
        isActive && (activeClassName ?? "bg-muted font-medium text-foreground")
      )}
    >
      {children}
    </Link>
  );
}
