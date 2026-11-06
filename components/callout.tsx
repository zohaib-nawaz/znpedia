type CalloutProps = {
  children?: React.ReactNode;
  variant?: "note" | "tip" | "important";
  title?: string;
  fallbackTitle: string;
};

export function Callout({ children, title, fallbackTitle }: CalloutProps) {
  return (
    <aside className="my-5 rounded-md bg-muted/35 py-3 pl-4 pr-4 text-[15px] leading-relaxed text-foreground/90">
      <p className="mb-2 text-[15px] font-semibold text-foreground">{title ?? fallbackTitle}</p>
      <div className="pl-3 [&>p]:my-0 [&>p+p]:mt-2">{children}</div>
    </aside>
  );
}
