import { PageIntro, ContactCTA, Eyebrow } from "@/components/ui";
import { Arrow, ServiceIcon } from "@/components/icons";
import Link from "next/link";
import { services, deliverySteps } from "@/lib/services";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "AI & automation services for UK businesses",
  "Find out which tasks are worth automating. Ikram reviews your workflow, recommends a first project and helps test AI, automation, DevOps and MLOps solutions.",
  "/solutions/",
);
export default function Solutions() {
  return (
    <>
      <PageIntro
        label="Services for UK businesses"
        title="Find out what’s worth automating."
      >
        <p>
          Tell me which task takes too long, keeps going wrong or needs the same
          information entered twice. We can work out whether automation or AI
          would help.
        </p>
      </PageIntro>
      <section className="container section-bottom" id="workflow-review">
        <div className="review-panel">
          <div>
            <Eyebrow>Workflow review</Eyebrow>
            <h2>A plan for your first automation project.</h2>
            <p>
              I’ll ask you to show me how the task works today. We’ll look at
              the tools you use, who handles each step and where things get
              stuck.
            </p>
            <Link className="text-link" href="/contact/">
              Discuss a workflow review
              <Arrow />
            </Link>
          </div>
          <div>
            <h3>What you receive</h3>
            <ul>
              <li>A map showing the steps, tools and people involved.</li>
              <li>
                A ranked list of tasks worth automating, with the reasons for
                each.
              </li>
              <li>
                A recommendation on which tools or AI services could help,
                including when a process change would be enough.
              </li>
              <li>
                A proposal for one pilot, covering what to build, how to test it
                and the costs we need to check.
              </li>
            </ul>
            <p>
              Before I start, we’ll agree the fee, what you’ll receive and the
              access I need. You can then decide whether to go ahead with a
              pilot.
            </p>
          </div>
        </div>
      </section>
      <section className="container solution-list" aria-label="Service areas">
        {services.map((service) => (
          <article className="solution-row" id={service.id} key={service.id}>
            <span className="problem-number">
              <ServiceIcon kind={service.icon} />
            </span>
            <div>
              <h2>{service.title}</h2>
              <p className="service-problem">{service.problem}</p>
            </div>
            <div>
              <p>{service.example}</p>
              <dl className="service-details">
                <dt>What I would build</dt>
                <dd>{service.deliverable}</dd>
                <dt>How we would check it</dt>
                <dd>{service.measure}</dd>
              </dl>
              <Link className="text-link" href="/contact/">
                Discuss this problem
                <Arrow />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section className="section container" id="process">
        <Eyebrow>After the review</Eyebrow>
        <h2>Test one task before rolling it out.</h2>
        <div className="delivery-grid">
          {deliverySteps.map(([title, copy], i) => (
            <article key={title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <p className="section-description">
          If the pilot does the job, we can discuss rollout, maintenance and
          support. Results-based pricing is an option when we can define and
          verify what you’re paying for.
        </p>
        <Link className="text-link" href="/results-as-a-service/">
          Explore Results as a Service
          <Arrow />
        </Link>
      </section>
      <section className="container section-bottom">
        <Eyebrow>Before we start</Eyebrow>
        <h2>Questions about working together</h2>
        <div className="faq-list">
          {[
            [
              "Do I need to know which AI tool I want?",
              "No. We start with the business process. A simpler workflow or a straightforward integration may be more useful than AI.",
            ],
            [
              "Can you work with our existing tools?",
              "I’ll check how your tools connect, what access is available and what needs to stay as it is. We’ll confirm those details before choosing a pilot.",
            ],
            [
              "What happens to sensitive information?",
              "We agree what data is needed, who can access it and which suppliers would process it. Use sample or redacted information for the initial conversation; don’t send confidential records through the contact form.",
            ],
            [
              "Will AI make decisions without a person?",
              "We decide which steps need someone to check or approve them. The pilot tests the normal cases and the ones that need extra attention.",
            ],
            [
              "How much does it cost?",
              "The review has a fee that we agree before work starts. If you choose to go ahead with a pilot, I’ll price that separately and explain any software or support costs.",
            ],
            [
              "Do you guarantee a particular saving?",
              "I won’t promise a saving before we’ve tested the task. We’ll measure how it works today, decide what improvement would matter and check the pilot against that.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
