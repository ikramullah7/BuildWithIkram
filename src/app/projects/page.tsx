import { PageIntro, ProjectCard, ContactCTA } from "@/components/ui";
import { projects } from "@/lib/projects";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Practical projects",
  "Explore project concepts in AI job matching, enterprise document search and business stock management.",
  "/projects/",
);
export default function Projects() {
  return (
    <>
      <PageIntro
        label="The workbench"
        title="Real questions. Practical explorations."
      >
        <p>
          Ideas for using AI, automation and software to make everyday work
          better. These are project concepts, with the proposed approach and
          limitations shared openly.
        </p>
      </PageIntro>
      <section className="container section-bottom">
        <div className="project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
