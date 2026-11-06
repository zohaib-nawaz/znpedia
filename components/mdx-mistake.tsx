export type MistakeLabels = {
  mistake: string;
  why: string;
  better: string;
};

type MistakeProps = {
  title: string;
  why: string;
  better: string;
  labels: MistakeLabels;
};

export function Mistake({ title, why, better, labels }: MistakeProps) {
  return (
    <div className="my-5 space-y-2.5 pl-4 text-[15px] leading-relaxed text-foreground/90">
      <p>
        <span className="font-semibold text-foreground">{labels.mistake}: </span>
        {title}
      </p>
      <p className="pl-3 text-muted-foreground">
        <span className="font-medium text-foreground/85">{labels.why} </span>
        {why}
      </p>
      <p className="pl-3">
        <span className="font-semibold text-foreground">{labels.better}: </span>
        {better}
      </p>
    </div>
  );
}
