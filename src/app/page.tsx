import Link from "next/link";
import { Arrow, Play } from "@/components/icons";
import {
  Button,
  Eyebrow,
  SectionHeading,
  ProjectCard,
  ContactCTA,
} from "@/components/ui";
import { Workflow } from "@/components/workflow";
import { projects } from "@/lib/projects";
import { getArticles } from "@/lib/blog";
import { site } from "@/config/site";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Practical AI & technology for real business problems",
  site.description,
  "/",
);
export default function Home() {
  const articles = getArticles();
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <Eyebrow>Practical AI, automation & technology</Eyebrow>
          <h1>
            Real problems.
            <br />
            Practical technology.
            <br />
            <span>Better possibilities.</span>
          </h1>
          <p>
            I’m Ikram. I explore how AI, automation and modern software can
            solve everyday business challenges — and share the process, one
            practical project at a time.
          </p>
          <div className="hero-actions">
            <Button href="/projects/">
              Explore projects
              <Arrow />
            </Button>
            <Button href={site.socials.youtube || "/videos/"} secondary>
              <Play />
              {site.socials.youtube ? "Watch on YouTube" : "Explore the videos"}
            </Button>
          </div>
          <div className="hero-note">
            <span />
            Built to be useful. Shared to be understood.
          </div>
        </div>
        <Workflow />
      </section>
      <div className="principles-strip">
        <div className="container">
          <span>Thoughtful ideas. Practical implementation.</span>
          <span>AI & automation</span>
          <i />
          <span>Cloud engineering</span>
          <i />
          <span>Business applications</span>
        </div>
      </div>
      <section className="section container">
        <SectionHeading
          label="Where technology can help"
          title="Start with the problem."
          href="/solutions/"
          link="Explore the solutions"
        />
        <div className="problems-grid">
          {[
            [
              "01",
              "Too much manual work",
              "Repetitive tasks shouldn’t take up your best thinking time. Explore workflows that reduce the busywork.",
              "/solutions/#automation",
            ],
            [
              "02",
              "Information, everywhere",
              "Make scattered documents and data easier to search, understand and put to work.",
              "/solutions/#document-search",
            ],
            [
              "03",
              "Tools that don’t quite fit",
              "Explore practical applications built around the way a business actually works.",
              "/solutions/#applications",
            ],
          ].map(([n, title, copy, href]) => (
            <Link href={href} className="problem" key={n}>
              <span className="problem-number">
                {n}
                <Arrow />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section projects-section">
        <div className="container">
          <SectionHeading
            label="From idea to implementation"
            title="A closer look at the work."
            href="/projects/"
            link="View all projects"
          />
          <p className="section-description">
            Practical explorations of what technology could make possible.
            <br />
            Every project starts with a real-world question.
          </p>
          <div className="project-grid">
            {projects.slice(0, 2).map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <p className="section-footnote">
            The projects above are clearly labelled concepts. Follow along as
            the ideas develop.
          </p>
        </div>
      </section>
      <section className="section container learning-section">
        <div className="learning-art" aria-hidden="true">
          <div className="video-window">
            <div className="video-window-top">
              <span />
              <span />
              <span />
              <small>BUILD / EXPLAIN / SHARE</small>
            </div>
            <div className="video-window-body">
              <span className="video-play">▷</span>
              <strong>Behind the build.</strong>
              <p>The decisions. The details. The lessons.</p>
              <div className="video-timeline">
                <span />
              </div>
            </div>
          </div>
          <span className="learning-caption">
            A place for clear explanations.
          </span>
        </div>
        <div className="learning-copy">
          <Eyebrow>Learn alongside the build</Eyebrow>
          <h2>
            The process is
            <br />
            part of the story.
          </h2>
          <p>
            Not just what gets built, but why. The YouTube channel will take you
            through the thinking, the trade-offs and the implementation behind
            each project.
          </p>
          <Link className="text-link" href="/videos/">
            Explore upcoming video topics
            <Arrow />
          </Link>
          <span className="small quiet">
            First recordings are being planned.
          </span>
        </div>
      </section>
      <section className="section writing-section">
        <div className="container">
          <SectionHeading
            label="Notes from the workbench"
            title="Ideas worth unpacking."
            href="/blog/"
            link="Browse articles"
          />
          {articles.length ? (
            <div className="article-rows">
              {articles.slice(0, 3).map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}/`}>
                  <span>{a.category}</span>
                  <h3>{a.title}</h3>
                  <Arrow />
                </Link>
              ))}
            </div>
          ) : (
            <div className="writing-empty">
              <span className="writing-symbol" aria-hidden="true">
                Aa<span>↗</span>
              </span>
              <div>
                <h3>Clear thinking, put into words.</h3>
                <p>
                  Practical guides and project notes are on the way. Each
                  article will connect the business problem with the technical
                  detail.
                </p>
              </div>
              <span className="pill">In the works</span>
            </div>
          )}
        </div>
      </section>
      <section className="section container about-home">
        <div>
          <Eyebrow>The person behind the projects</Eyebrow>
          <h2>
            Hi, I’m Ikram.
            <br />
            <span className="muted-heading">Let’s make technology useful.</span>
          </h2>
        </div>
        <div>
          <p>
            I’m a technology professional interested in the space where business
            problems meet thoughtful engineering.
          </p>
          <p>
            BuildWithIkram is where I explore AI, cloud and automation through
            practical projects — sharing what I’m building, what I’m learning
            and what needs another look.
          </p>
          <Link className="text-link" href="/about/">
            A little more about me
            <Arrow />
          </Link>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
