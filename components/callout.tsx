type CalloutProps = {
  children?: React.ReactNode;
  variant?: "note" | "tip" | "important";
  title?: string;
};

export function Callout({ children, title }: CalloutProps) {
  const heading = title ?? "Note";

  return (
    <aside className="my-5 rounded-md bg-muted/35 py-3 pl-4 pr-4 text-[15px] leading-relaxed text-foreground/90">
      {heading ? (
        <p className="mb-2 text-[15px] font-semibold text-foreground">{heading}</p>
      ) : null}
      <div className="pl-3 [&>p]:my-0 [&>p+p]:mt-2">{children}</div>
    </aside>
  );
}
