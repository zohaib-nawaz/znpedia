"use client";

import { ShieldCheck, X } from "lucide-react";
import type { RefObject } from "react";

type Step = {
  title: string;
  body: string;
};

type HowItWorksLabels = {
  howItWorksClose: string;
  howItWorksTitle: string;
  howItWorksIntro: string;
  howItWorksSteps: Step[];
  howItWorksPrivacy: string;
};

type HowItWorksDialogProps = {
  labels: HowItWorksLabels;
  dialogRef: RefObject<HTMLDialogElement | null>;
};

export function HowItWorksDialog({ labels, dialogRef }: HowItWorksDialogProps) {
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="how-it-works-title"
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          dialogRef.current?.close();
        }
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-border bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="how-it-works-title" className="text-lg font-bold tracking-tight">
            {labels.howItWorksTitle}
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={labels.howItWorksClose}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {labels.howItWorksIntro}
        </p>
        <ol className="mt-5 space-y-4">
          {labels.howItWorksSteps.map((step) => (
            <li key={step.title} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 flex gap-2.5 rounded-xl bg-accent-soft p-4 text-sm leading-relaxed text-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          {labels.howItWorksPrivacy}
        </p>
      </div>
    </dialog>
  );
}
