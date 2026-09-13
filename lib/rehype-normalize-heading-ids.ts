import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";

/** IDs starting with a digit break `#` fragment navigation in many browsers. */
export function normalizeHeadingId(id: string): string {
  return /^[0-9]/.test(id) ? `section-${id}` : id;
}

export function rehypeNormalizeHeadingIds() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (!node.tagName?.match(/^h[1-6]$/)) {
        return;
      }
      const id = node.properties?.id;
      if (typeof id !== "string" || !id) {
        return;
      }
      node.properties.id = normalizeHeadingId(id);
    });
  };
}
