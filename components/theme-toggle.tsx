"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

type ThemeToggleProps = {
  labels: {
    toLight: string;
    toDark: string;
  };
};

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return (
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const renderIcon = () => {
    if (isDark) {
      return <Sun className="h-4 w-4" aria-hidden />;
    }

    return <Moon className="h-4 w-4" aria-hidden />;
  };

  const describe = () => {
    if (isDark) {
      return labels.toLight;
    }

    return labels.toDark;
  };

  const toggle = () => {
    if (isDark) {
      setTheme("light");
      return;
    }

    setTheme("dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
      aria-label={describe()}
    >
      {renderIcon()}
    </button>
  );
}
