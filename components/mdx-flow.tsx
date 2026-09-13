import { Children, isValidElement } from "react";

type FlowProps = {
  title?: string;
  content?: string;
  children?: React.ReactNode;
};

function childrenToLines(children: React.ReactNode): string[] {
  const lines: string[] = [];

  const pushRaw = (raw: string) => {
    for (const part of raw.split("\n")) {
      const line = part.replace(/\s+$/, "");
      if (line.trim()) {
        lines.push(line.trim());
      }
    }
  };

  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      pushRaw(String(child));
      return;
    }

    if (!isValidElement<{ children?: React.ReactNode }>(child)) {
      return;
    }

    if (child.type === "p" || child.type === "div") {
      const text = Children.toArray(child.props.children)
        .map((inner) => {
          if (typeof inner === "string" || typeof inner === "number") {
            return String(inner);
          }
          if (isValidElement<{ children?: React.ReactNode }>(inner)) {
            return Children.toArray(inner.props.children).join("");
          }
          return "";
        })
        .join("");

      const line = text.replace(/\s+$/, "").trim();
      if (line) {
        lines.push(line);
      }
      return;
    }

    pushRaw(
      Children.toArray(child.props.children)
        .map((inner) => (typeof inner === "string" ? inner : ""))
        .join("")
    );
  });

  return lines;
}

function isConnector(line: string): boolean {
  return line === "+" || line === "↓";
}

export function Flow({ title, content, children }: FlowProps) {
  const lines = (
    content
      ? content
          .split("\n")
          .map((line) => line.replace(/\s+$/, "").trim())
          .filter(Boolean)
      : childrenToLines(children)
  );

  const useStepBoxes = lines.some((line) => isConnector(line));

  return (
    <figure className="my-5 pl-3 text-[15px] text-foreground/90">
      {title ? (
        <figcaption className="mb-2.5 font-semibold leading-snug text-foreground">
          {title}
        </figcaption>
      ) : null}

      {useStepBoxes ? (
        <div className="flex max-w-xs flex-col items-start gap-1">
          {lines.map((line, index) => {
            if (isConnector(line)) {
              return (
                <span
                  key={`${line}-${index}`}
                  className="w-full py-0.5 pl-3 font-mono text-[14px] text-muted-foreground"
                  aria-hidden
                >
                  {line}
                </span>
              );
            }

            return (
              <div
                key={`${line}-${index}`}
                className="w-full rounded-md bg-muted/45 px-3.5 py-2 text-[15px] font-medium leading-snug text-foreground"
              >
                {line}
              </div>
            );
          })}
        </div>
      ) : (
        <pre className="overflow-x-auto whitespace-pre font-mono text-[14px] leading-relaxed text-muted-foreground">
          {lines.join("\n")}
        </pre>
      )}
    </figure>
  );
}
