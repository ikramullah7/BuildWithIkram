import Link from "next/link";
import { Arrow } from "@/components/icons";
import { PageIntro, ProjectCard, ContactCTA } from "@/components/ui";
import { projects } from "@/lib/projects";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Working examples & project concepts",
  "Try an interactive enquiry-workflow demonstration and explore clearly labelled concepts in document search, inventory management and AI matching.",
  "/projects/",
);
export default function Projects() {
  return (
    <>
      <PageIntro
        label="The workbench"
        title="Examples of how the work could run"
      >
        <p>
          Try the enquiry demonstration below or read through the project
          concepts. These use sample data and are not client case studies.
        </p>
      </PageIntro>
      <section className="container section-bottom">
        <article className="demo-feature">
          <span className="pill">
            Interactive demonstration · Synthetic data
          </span>
          <h2>Check and review a sample enquiry.</h2>
          <p>
            Run the checks, see what gets held back and approve a draft
            response. The example uses rules and templates in your browser.
          </p>
          <Link className="text-link" href="/demonstrations/enquiry-workflow/">
            Try the enquiry workflow
            <Arrow />
          </Link>
        </article>
        <h2 className="concept-heading">Project concepts</h2>
        <div className="project-grid">
          {[...projects]
            .sort(
              (a, b) =>
                Number(a.slug === "ai-job-matching") -
                Number(b.slug === "ai-job-matching"),
            )
            .map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
