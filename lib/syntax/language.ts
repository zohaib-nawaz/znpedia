export type SyntaxLanguage =
  | "bash"
  | "css"
  | "glsl"
  | "html"
  | "javascript"
  | "json"
  | "jsx"
  | "markdown"
  | "shader-javascript"
  | "text"
  | "tsx"
  | "typescript";

const ALIASES: Record<string, SyntaxLanguage> = {
  bash: "bash",
  cjs: "javascript",
  css: "css",
  frag: "glsl",
  fs: "glsl",
  glsl: "glsl",
  htm: "html",
  html: "html",
  javascript: "javascript",
  js: "javascript",
  json: "json",
  jsx: "jsx",
  md: "markdown",
  mdx: "markdown",
  mjs: "javascript",
  scss: "css",
  sh: "bash",
  "shader-javascript": "shader-javascript",
  shell: "bash",
  ts: "typescript",
  tsx: "tsx",
  typescript: "typescript",
  vert: "glsl",
  vs: "glsl",
  zsh: "bash",
};

const EXT_TO_LANG: Record<string, SyntaxLanguage> = {
  ".bash": "bash",
  ".cjs": "javascript",
  ".css": "css",
  ".frag": "glsl",
  ".fs": "glsl",
  ".glsl": "glsl",
  ".htm": "html",
  ".html": "html",
  ".js": "javascript",
  ".json": "json",
  ".jsx": "jsx",
  ".md": "markdown",
  ".mdx": "markdown",
  ".mjs": "javascript",
  ".scss": "css",
  ".sh": "bash",
  ".ts": "typescript",
  ".tsx": "tsx",
  ".vert": "glsl",
  ".vs": "glsl",
  ".zsh": "bash",
};

export function normalizeSyntaxLanguage(language?: string | null): SyntaxLanguage {
  if (!language) return "text";
  const key = language.trim().toLowerCase().replace(/^\./, "");
  if (!key) return "text";
  return ALIASES[key] ?? "text";
}

export function languageFromPath(path?: string | null): SyntaxLanguage {
  if (!path) return "text";
  const base = path.split(/[\\/]/).pop() ?? path;
  const lower = base.toLowerCase();
  const dot = lower.lastIndexOf(".");
  if (dot === -1) return "text";
  return EXT_TO_LANG[lower.slice(dot)] ?? "text";
}

export function displayLanguageLabel(
  language?: string | null,
  fallback = "code",
): string {
  const raw = language?.trim();
  if (!raw) return fallback;
  return raw.toLowerCase();
}
