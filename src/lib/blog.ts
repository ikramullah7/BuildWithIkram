import "server-only";
import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import { preview } from "@/config/site";
const schema = z
  .object({
    title: z.string().min(8),
    description: z.string().min(30),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .refine((v) => !Number.isNaN(Date.parse(v))),
    updated: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    category: z.string().min(1),
    tags: z.array(z.string().min(1)).min(1),
    coverImage: z.string().startsWith("/images/"),
    coverAlt: z.string().min(5),
    youtubeUrl: z
      .union([
        z.literal(""),
        z
          .string()
          .url()
          .refine((v) =>
            /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/.test(v),
          ),
      ])
      .default(""),
    draft: z.boolean(),
    relatedProject: z.string().optional(),
  })
  .refine((v) => !v.updated || v.updated >= v.date, {
    message: "Updated date must not precede publication date",
  });
function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
export function getArticles(includeDrafts = preview) {
  const dir = path.join(process.cwd(), "content/blog");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      if (!/^[a-z0-9-]+$/.test(slug))
        throw new Error(`Invalid article filename: ${file}`);
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      if (!match) throw new Error(`Missing frontmatter: ${file}`);
      const data: unknown = parseYaml(match[1]);
      const content = match[2];
      const meta = schema.parse(data);
      const words = content.trim().split(/\s+/).length;
      const headings = [...content.matchAll(/^## (.+)$/gm)].map((m) => ({
        title: m[1],
        id: slugify(m[1]),
      }));
      return {
        ...meta,
        slug,
        content,
        readingTime: Math.max(1, Math.ceil(words / 200)),
        headings,
      };
    })
    .filter((a) => includeDrafts || !a.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
