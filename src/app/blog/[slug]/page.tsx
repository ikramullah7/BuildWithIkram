import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { codeTheme } from "@/lib/code-theme";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getArticles, formatDate } from "@/lib/blog";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
import { CodeBlock, VideoEmbed } from "@/components/article-tools";
import { projects } from "@/lib/projects";
import { metadata as meta, jsonLd } from "@/lib/seo";
import { site, absolute } from "@/config/site";
export const dynamicParams = false;
export const dynamic = "force-static";
export function generateStaticParams() {
  const params = getArticles().map((a) => ({ slug: a.slug }));
  return params.length ? params : [{ slug: "_empty" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticles().find((a) => a.slug === slug);
  if (!a) return {};
  const base = meta(a.title, a.description, `/blog/${slug}/`);
  return {
    ...base,
    robots: a.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: a.date,
      modifiedTime: a.updated || a.date,
      images: [absolute(a.coverImage)],
    },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = getArticles();
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const related = articles.filter(
    (x) =>
      x.slug !== a.slug &&
      (x.category === a.category || x.tags.some((t) => a.tags.includes(t))),
  );
  const project = projects.find((p) => p.slug === a.relatedProject);
  return (
    <>
      <header className="container article-header">
        <Breadcrumbs
          items={[{ title: "Articles", href: "/blog/" }, { title: a.title }]}
        />
        {a.draft && (
          <p className="notice">
            Unpublished demonstration · Owner review required
          </p>
        )}
        <Eyebrow>{a.category}</Eyebrow>
        <h1>{a.title}</h1>
        <p className="detail-lead">{a.description}</p>
        <div className="article-meta">
          <span>By Ikram</span>
          <time dateTime={a.date}>
            {a.draft ? "Draft dated " : ""}
            {formatDate(a.date)}
          </time>
          <span>{a.readingTime} min read</span>
          {a.updated && (
            <span>
              Updated <time dateTime={a.updated}>{formatDate(a.updated)}</time>
            </span>
          )}
        </div>
        <div className="article-tags" aria-label="Article tags">
          {a.tags.map((tag) => (
            <span className="pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <img
          src={a.coverImage}
          alt={a.coverAlt}
          width="1200"
          height="650"
          className="detail-cover"
        />
      </header>
      <div className="container article-layout">
        <aside className="toc">
          <h2>In this article</h2>
          <nav aria-label="Table of contents">
            {a.headings.map((h) => (
              <a href={`#${h.id}`} key={h.id}>
                {h.title}
              </a>
            ))}
          </nav>
          {project && (
            <Link className="text-link" href={`/projects/${project.slug}/`}>
              Related project →
            </Link>
          )}
        </aside>
        <article className="prose">
          <MDXRemote
            source={a.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypePrettyCode,
                    { theme: codeTheme, keepBackground: false },
                  ],
                ],
              },
            }}
            components={{ pre: CodeBlock, VideoEmbed }}
          />
          {a.youtubeUrl && (
            <VideoEmbed
              id={new URL(a.youtubeUrl).searchParams.get("v") || ""}
              title={a.title}
            />
          )}
          <div className="share-links">
            <span>Share this article</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absolute(`/blog/${slug}/`))}`}
            >
              LinkedIn
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(a.title)}&body=${encodeURIComponent(absolute(`/blog/${slug}/`))}`}
            >
              Email
            </a>
          </div>
          {related.length > 0 && (
            <section>
              <h2>Keep exploring</h2>
              {related.map((x) => (
                <p key={x.slug}>
                  <Link href={`/blog/${x.slug}/`}>{x.title}</Link>
                </p>
              ))}
            </section>
          )}
          <Link href="/blog/">← All articles</Link>
        </article>
      </div>
      {!a.draft && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: a.title,
              description: a.description,
              datePublished: a.date,
              dateModified: a.updated || a.date,
              image: absolute(a.coverImage),
              author: { "@type": "Person", name: "Ikram" },
              publisher: { "@type": "Organization", name: site.name },
              mainEntityOfPage: absolute(`/blog/${slug}/`),
            }),
          }}
        />
      )}
    </>
  );
}
