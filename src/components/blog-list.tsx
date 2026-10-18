"use client";
import { useState } from "react";
import Link from "next/link";
import { Arrow } from "./icons";
type Summary = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: string;
  coverAlt: string;
  date: string;
  readingTime: number;
  draft: boolean;
};
export function BlogList({ articles }: { articles: Summary[] }) {
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState("All");
  const filtered = articles.filter(
    (a) =>
      (category === "All" || a.category === category) &&
      (tag === "All" || a.tags.includes(tag)),
  );
  return (
    <>
      <div className="filter-bar">
        <label>
          Category
          <select
            aria-label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            {[...new Set(articles.map((a) => a.category))].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Tag
          <select
            aria-label="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option>All</option>
            {[...new Set(articles.flatMap((a) => a.tags))].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <p role="status">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        </p>
      </div>
      {filtered.length ? (
        <div className="project-grid">
          {filtered.map((a) => (
            <article className="project-card" key={a.slug}>
              <Link href={`/blog/${a.slug}/`}>
                <img
                  className="article-cover"
                  src={a.coverImage}
                  alt={a.coverAlt}
                  width="720"
                  height="480"
                  loading="lazy"
                />
              </Link>
              <div className="project-meta">
                <span>{a.category}</span>
                <span>{a.readingTime} min read</span>
              </div>
              {a.draft && (
                <p className="draft-label">Editorial preview · Unpublished</p>
              )}
              <h2 className="card-heading">
                <Link href={`/blog/${a.slug}/`}>
                  {a.title}
                  <Arrow />
                </Link>
              </h2>
              <p>{a.description}</p>
              <p className="small">
                {new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(a.date))}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-glyph" aria-hidden="true">
            ↗
          </span>
          <h2>
            {articles.length
              ? "No articles match these filters."
              : "Good ideas deserve a proper write-up."}
          </h2>
          <p>
            {articles.length
              ? "Try another category or tag to explore more."
              : "Articles will share the thinking, implementation and limitations behind each project. The first drafts are being prepared for review."}
          </p>
          <Link className="text-link" href="/projects/">
            Explore the project concepts
            <Arrow />
          </Link>
        </div>
      )}
    </>
  );
}
