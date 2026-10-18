import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow, Mark } from "./icons";
import type { Project } from "@/lib/projects";
import { site } from "@/config/site";
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : ""}`}
    >
      {children}
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="page-intro container">
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <div className="intro-copy">{children}</div>
    </section>
  );
}
export function SectionHeading({
  label,
  title,
  href,
  link,
}: {
  label: string;
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link}
          <Arrow />
        </Link>
      )}
    </div>
  );
}
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}/`} className="project-art-link">
        <div className={`project-art art-${index % 3}`}>
          <img
            src={project.image}
            alt={`Illustration of the proposed ${project.name} workflow`}
            width="720"
            height="480"
            loading="lazy"
          />
          <span className="art-corner" aria-hidden="true">
            0{index + 1} / EXPLORATION
          </span>
        </div>
      </Link>
      <div className="project-meta">
        <span>{project.category}</span>
        <span className="status">
          <i />
          {project.status}
        </span>
      </div>
      <h3>
        <Link href={`/projects/${project.slug}/`}>
          {project.title}
          <Arrow />
        </Link>
      </h3>
      <p>{project.description}</p>
    </article>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { title: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((item, i) => (
        <span key={item.title}>
          <span aria-hidden="true">/</span>
          {item.href ? (
            <Link href={item.href}>{item.title}</Link>
          ) : (
            <span aria-current={i === items.length - 1 ? "page" : undefined}>
              {item.title}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function ContactCTA() {
  return (
    <section className="container cta-section">
      <div>
        <Eyebrow>Start with a problem</Eyebrow>
        <h2>
          What could work better
          <br />
          in your business?
        </h2>
        <p>Let’s explore where thoughtful technology could help.</p>
      </div>
      <Button href="/contact/">
        Start a conversation
        <Arrow />
      </Button>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <Link href="/" className="brand">
            <Mark />
            <span>
              BuildWithIkram<span className="brand-dot">.</span>
            </span>
          </Link>
          <p>
            Practical technology.
            <br />
            Real business problems.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            <Link href="/solutions/">Solutions</Link>
            <Link href="/projects/">Projects</Link>
            <Link href="/blog/">Articles</Link>
          </div>
          <div>
            <span>Get to know me</span>
            <Link href="/about/">About Ikram</Link>
            <Link href="/videos/">Videos</Link>
            <Link href="/contact/">Contact</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with purpose.
        </p>
        <Link href="/privacy/">Privacy</Link>
        <span>AI · Automation · Cloud</span>
      </div>
    </footer>
  );
}
