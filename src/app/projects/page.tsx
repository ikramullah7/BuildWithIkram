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
        title="See the approach. Check the boundaries."
      >
        <p>
          A working browser demonstration and a collection of project concepts.
          Examples use synthetic data; none are presented as client case
          studies.
        </p>
      </PageIntro>
      <section className="container section-bottom">
        <article className="demo-feature">
          <span className="pill">
            Interactive demonstration · Synthetic data
          </span>
          <h2>From enquiry to a reviewed next step.</h2>
          <p>
            Check sample enquiries, catch duplicates and approve a prepared
            response. Rules and templates make the workflow visible without
            sending data to an AI service.
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
