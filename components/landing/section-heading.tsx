export type SectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  const renderDescription = () => {
    if (!description) {
      return null;
    }

    return (
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
    );
  };

  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {renderDescription()}
    </div>
  );
}
