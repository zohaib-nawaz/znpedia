const FENCE = /^\s*(```|~~~)/;

function stripInlineMarkup(line: string): string {
  return line
    .replace(/<\/?[A-Z][A-Za-z]*[^>]*>/g, "")
    .replace(/\s(?:title|leftTitle|rightTitle|variant)="([^"]*)"/g, " $1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export function mdxToPlainText(source: string): string {
  const lines: string[] = [];
  let insideFence = false;

  for (const line of source.split("\n")) {
    if (FENCE.test(line)) {
      insideFence = !insideFence;
      lines.push(line.trim());
      continue;
    }

    if (insideFence) {
      lines.push(line);
      continue;
    }

    lines.push(stripInlineMarkup(line));
  }

  return lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export type MdxSection = {
  heading: string;
  level: number;
  body: string;
};

export function splitIntoSections(body: string): MdxSection[] {
  const sections: MdxSection[] = [];
  let current: MdxSection = { heading: "", level: 1, body: "" };
  let insideFence = false;

  for (const line of body.split("\n")) {
    if (FENCE.test(line)) {
      insideFence = !insideFence;
    }

    const match = insideFence ? null : line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!match) {
      current.body += `${line}\n`;
      continue;
    }

    sections.push(current);
    current = {
      heading: match[2].replace(/\{#.+?\}$/, "").trim(),
      level: match[1].length,
      body: "",
    };
  }

  sections.push(current);
  return sections;
}
