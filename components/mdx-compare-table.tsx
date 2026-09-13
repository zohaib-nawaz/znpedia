import { Children, isValidElement } from "react";

type CompareTableProps = {
  leftTitle: string;
  rightTitle: string;
  children?: React.ReactNode;
};

function childrenToRowText(children: React.ReactNode): string {
  const lines: string[] = [];

  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      String(child)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .forEach((line) => lines.push(line));
      return;
    }

    if (!isValidElement<{ children?: React.ReactNode }>(child)) {
      return;
    }

    if (child.type === "p") {
      const text = Children.toArray(child.props.children)
        .map((inner) =>
          typeof inner === "string" || typeof inner === "number"
            ? String(inner)
            : ""
        )
        .join("")
        .trim();
      if (text) {
        lines.push(text);
      }
    }
  });

  return lines.join("\n");
}

function parseRows(text: string): [string, string][] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [left, ...rest] = line.split("|");
      const right = rest.join("|").trim();
      return [left.trim(), right.trim()] as [string, string];
    })
    .filter(([left, right]) => left && right);
}

export function CompareTable({
  leftTitle,
  rightTitle,
  children,
}: CompareTableProps) {
  const rows = parseRows(childrenToRowText(children));

  return (
    <div className="my-5 overflow-x-auto pl-3 text-[15px]">
      <table className="w-full min-w-[280px] border-collapse">
        <thead>
          <tr>
            <th className="w-[42%] pb-2.5 pr-5 text-left font-semibold leading-snug text-foreground">
              {leftTitle}
            </th>
            <th className="pb-2.5 pl-2 text-left font-semibold leading-snug text-foreground">
              {rightTitle}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([left, right], index) => (
            <tr key={`${left}-${index}`} className="align-top">
              <td className="py-2 pr-5 leading-relaxed text-foreground/90">
                {left}
              </td>
              <td className="py-2 pl-2 leading-relaxed text-foreground/90">
                {right}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
