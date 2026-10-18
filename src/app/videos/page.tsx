import Link from "next/link";
import { PageIntro, Eyebrow } from "@/components/ui";
import { Arrow } from "@/components/icons";
import { VideoEmbed } from "@/components/article-tools";
import { videos } from "@/lib/videos";
import { getArticles, formatDate } from "@/lib/blog";
import { projects } from "@/lib/projects";
import { site } from "@/config/site";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Videos — Behind the build",
  "Follow the thinking and implementation behind BuildWithIkram projects. Explore upcoming video topics and companion resources.",
  "/videos/",
);
export default function Videos() {
  const articles = getArticles();
  return (
    <>
      <PageIntro
        label="Behind the build"
        title="See the thinking. Follow the process."
      >
        <p>
          Clear explanations of business problems, practical builds and the
          decisions along the way. This is where the YouTube projects will come
          together.
        </p>
      </PageIntro>
      <section className="container section-bottom">
        {site.socials.youtube && (
          <p>
            <a className="button" href={site.socials.youtube}>
              Watch on YouTube
              <Arrow />
            </a>
          </p>
        )}
        {videos.length ? (
          <div className="project-grid">
            {videos.map((v) => (
              <article className="project-card" key={v.id}>
                <a href={`https://www.youtube.com/watch?v=${v.id}`}>
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt={`Video thumbnail: ${v.title}`}
                    width="480"
                    height="360"
                    loading="lazy"
                  />
                </a>
                <p className="eyebrow">{v.category}</p>
                <h2 className="card-heading">{v.title}</h2>
                <p>{v.description}</p>
                <p className="small">{formatDate(v.date)}</p>
                <VideoEmbed id={v.id} title={v.title} />
                <a
                  className="text-link"
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                >
                  Watch on YouTube
                  <Arrow />
                </a>
                {v.relatedProject &&
                  projects.some((p) => p.slug === v.relatedProject) && (
                    <p>
                      <Link href={`/projects/${v.relatedProject}/`}>
                        Related project
                      </Link>
                    </p>
                  )}
                {v.relatedArticle &&
                  articles.some((a) => a.slug === v.relatedArticle) && (
                    <p>
                      <Link href={`/blog/${v.relatedArticle}/`}>
                        Companion article
                      </Link>
                    </p>
                  )}
              </article>
            ))}
          </div>
        ) : (
          <>
            <div className="video-coming">
              <span className="video-play" aria-hidden="true">
                ▷
              </span>
              <Eyebrow>First recordings in preparation</Eyebrow>
              <h2>Every useful build has a story.</h2>
              <p>
                No videos have been published here yet. Planned topics include
                building this website, exploring document search and designing
                an AI job matching workflow.
              </p>
            </div>
            <div className="upcoming">
              <h2>On the drawing board</h2>
              {[
                "Building BuildWithIkram with Codex, skills and MCP",
                "Designing a clearer AI job matching workflow",
                "Exploring document search with sources",
              ].map((t, i) => (
                <div key={t}>
                  <span>0{i + 1}</span>
                  <h3>{t}</h3>
                  <span className="pill">Planned topic</span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
