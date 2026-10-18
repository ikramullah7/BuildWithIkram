import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { getArticles } from "@/lib/blog";
import { videos } from "@/lib/videos";
import { Breadcrumbs, ContactCTA, Eyebrow } from "@/components/ui";
import { Arrow } from "@/components/icons";
import { metadata as meta } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p ? meta(p.name, p.description, `/projects/${slug}/`) : {};
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const articles = getArticles().filter((a) =>
    p.relatedArticles.includes(a.slug),
  );
  const relatedVideos = videos.filter((v) =>
    p.relatedVideos.some((id) => id === v.id),
  );
  return (
    <>
      <div className="container detail-top">
        <Breadcrumbs
          items={[{ title: "Projects", href: "/projects/" }, { title: p.name }]}
        />
        <Eyebrow>
          {p.category} · {p.status}
        </Eyebrow>
        <h1>{p.title}</h1>
        <p className="detail-lead">{p.description}</p>
        <img
          className="detail-cover"
          src={p.image}
          alt={`Proposed workflow for ${p.name}`}
          width="1200"
          height="650"
        />
      </div>
      <section className="container detail-body">
        <aside>
          <h2 className="aside-title">At a glance</h2>
          <dl>
            <dt>Status</dt>
            <dd>{p.status}</dd>
            <dt>Working title</dt>
            <dd>{p.name}</dd>
            <dt>Proposed technologies</dt>
            <dd>{p.technologies.join(" · ")}</dd>
          </dl>
          <p className="notice">
            An exploration of a possible approach. This is not a completed
            production system.
          </p>
        </aside>
        <div className="prose">
          <h2>The business problem</h2>
          <p>{p.problem}</p>
          <h2>A proposed approach</h2>
          <p>{p.solution}</p>
          <h2>How it could work</h2>
          <ol>
            {p.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <h2>Limitations and next steps</h2>
          <p>{p.limitations}</p>
          <p>
            The next step is to define a small prototype and evaluation criteria
            before making any claims about results.
          </p>
          <h2>Read and watch</h2>
          {articles.length ? (
            articles.map((a) => (
              <p key={a.slug}>
                <Link href={`/blog/${a.slug}/`}>
                  {a.title}
                  <Arrow />
                </Link>
              </p>
            ))
          ) : (
            <p>
              Accompanying articles are awaiting editorial review. Videos will
              be linked here when recordings are available.
            </p>
          )}
          {relatedVideos.map((v) => (
            <p key={v.id}>
              <a href={`https://www.youtube.com/watch?v=${v.id}`}>{v.title}</a>
            </p>
          ))}
          <Link href="/projects/">← Back to all projects</Link>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
