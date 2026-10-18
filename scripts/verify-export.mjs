import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
// Next.js export requires a generated parameter even with no published articles.
// Remove the generated not-found sentinel; it never contains editorial content.
for (const suffix of [
  "_empty",
  "_empty.txt",
  "_empty.html",
  "_empty.meta",
  "_empty.segments",
])
  fs.rmSync(path.join("out/blog", suffix), { recursive: true, force: true });
if (
  process.env.CONTENT_PREVIEW === "true" &&
  !fs.readFileSync("out/index.html", "utf8").includes("Editorial preview")
)
  throw new Error("Editorial export is stale or missing its preview banner");
if (process.env.CONTENT_PREVIEW !== "true") {
  const sitemap = fs.readFileSync("out/sitemap.xml", "utf8");
  for (const file of fs
    .readdirSync("content/blog")
    .filter((f) => f.endsWith(".mdx"))) {
    const raw = fs.readFileSync(path.join("content/blog", file), "utf8");
    const meta = parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);
    const slug = file.replace(/\.mdx$/, "");
    if (
      meta.draft &&
      (fs.existsSync(`out/blog/${slug}`) ||
        fs.existsSync(`out/blog/${slug}.txt`) ||
        sitemap.includes(slug))
    )
      throw new Error(`Draft leaked into export: ${slug}`);
  }
}
for (const route of [
  "",
  "solutions",
  "projects",
  "blog",
  "videos",
  "about",
  "contact",
  "privacy",
])
  if (!fs.existsSync(path.join("out", route, "index.html")))
    throw new Error(`Missing export: ${route}`);
console.log(
  process.env.CONTENT_PREVIEW === "true"
    ? "Local editorial export verified; contains unpublished drafts."
    : "Static export verified; draft routes excluded.",
);
