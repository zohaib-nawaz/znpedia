type MistakeProps = {
  title: string;
  why: string;
  better: string;
};

export function Mistake({ title, why, better }: MistakeProps) {
  return (
    <div className="my-5 space-y-2.5 pl-4 text-[15px] leading-relaxed text-foreground/90">
      <p>
        <span className="font-semibold text-foreground">Galati: </span>
        {title}
      </p>
      <p className="pl-3 text-muted-foreground">
        <span className="font-medium text-foreground/85">Why? </span>
        {why}
      </p>
      <p className="pl-3">
        <span className="font-semibold text-foreground">Behtar: </span>
        {better}
      </p>
    </div>
  );
}
