import { PageIntro, ContactCTA } from "@/components/ui";
import { Arrow } from "@/components/icons";
import Link from "next/link";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Business solutions",
  "Explore practical approaches to manual work, document search, decision-making, cloud engineering and custom business applications.",
  "/solutions/",
);
const solutions = [
  [
    "automation",
    "01",
    "Less repetition. More room to think.",
    "AI-powered business automation",
    "When routine tasks take over the working day, start by mapping the process. Identify the repeatable steps, keep a person involved where judgement matters and measure whether the change actually helps.",
    "ai-job-matching",
  ],
  [
    "document-search",
    "02",
    "Put useful information within reach.",
    "Intelligent document search",
    "When answers are spread across policies and folders, a search workflow could surface relevant passages and their sources. Permissions, accuracy and document freshness come before generated answers.",
    "enterprise-document-search",
  ],
  [
    "workflows",
    "03",
    "Connect the steps that slow you down.",
    "Workflow optimisation",
    "Disconnected tools can create duplicate entry and avoidable handovers. Explore simpler processes first, then connect the systems where an integration has a clear purpose.",
    "inventory-management",
  ],
  [
    "decisions",
    "04",
    "Make the evidence easier to understand.",
    "AI-assisted decision-making",
    "AI can help organise information and highlight patterns for review. Show the underlying evidence, surface uncertainty and keep decisions with the people responsible.",
    "ai-job-matching",
  ],
  [
    "cloud",
    "05",
    "Give your applications a sound foundation.",
    "Cloud and infrastructure solutions",
    "Hosting choices should fit the workload. Explore maintainable infrastructure, sensible access controls and predictable costs without introducing unnecessary complexity.",
    "enterprise-document-search",
  ],
  [
    "applications",
    "06",
    "Build around the way the business works.",
    "Custom business applications",
    "Where general-purpose tools leave important gaps, a focused application could help. Begin with a narrow workflow, clear data ownership and a small set of useful features.",
    "inventory-management",
  ],
];
export default function Solutions() {
  return (
    <>
      <PageIntro
        label="Business solutions"
        title="Better starts with a useful question."
      >
        <p>
          Where is time being lost? What is hard to find? What could work more
          simply? These are the problems worth exploring.
        </p>
      </PageIntro>
      <section className="container solution-list">
        {solutions.map(([id, n, title, category, copy, slug]) => (
          <article id={id} key={id} className="solution-row">
            <span className="problem-number">{n}</span>
            <div>
              <p className="eyebrow">{category}</p>
              <h2>{title}</h2>
            </div>
            <div>
              <p>{copy}</p>
              <Link className="text-link" href={`/projects/${slug}/`}>
                Explore a related concept
                <Arrow />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <ContactCTA />
    </>
  );
}
