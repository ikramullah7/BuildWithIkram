import type { MetadataRoute } from "next";
import { absolute, configuredDomain, preview } from "@/config/site";
import { getArticles } from "@/lib/blog";
import { projects } from "@/lib/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (preview || !configuredDomain) return [];
  return [
    "",
    "solutions/",
    "projects/",
    "blog/",
    "videos/",
    "about/",
    "contact/",
    "privacy/",
    ...projects.map((p) => `projects/${p.slug}/`),
    ...getArticles(false).map((a) => `blog/${a.slug}/`),
  ].map((p) => ({ url: absolute(`/${p}`) }));
}
