import { PageIntro, ContactCTA, Eyebrow } from "@/components/ui";
import { Arrow, ServiceIcon } from "@/components/icons";
import Link from "next/link";
import { services, deliverySteps } from "@/lib/services";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "AI & automation services for UK businesses",
  "Start with a paid workflow review and practical plan. Explore automation, AI, DevOps and MLOps services, then test a focused pilot against agreed measures.",
  "/solutions/",
);
export default function Solutions() {
  return (
    <>
      <PageIntro
        label="Services for UK businesses"
        title="Find the bottleneck. Plan the useful change."
      >
        <p>
          You don’t need to arrive with an AI tool in mind. Bring the task, the
          frustration or the process that takes more effort than it should.
        </p>
      </PageIntro>
      <section className="container section-bottom" id="workflow-review">
        <div className="review-panel">
          <div>
            <Eyebrow>The first paid step</Eyebrow>
            <h2>
              A workflow review.
              <br />A practical plan.
            </h2>
            <p>
              I talk to you about the business, examine the workflow and
              identify the strongest candidates for automation or AI.
            </p>
            <Link className="text-link" href="/contact/">
              Discuss a workflow review
              <Arrow />
            </Link>
          </div>
          <div>
            <h3>What you receive</h3>
            <ul>
              <li>
                A map of the agreed workflow, including tools, people and
                handovers.
              </li>
              <li>
                Prioritised opportunities, with assumptions and constraints made
                clear.
              </li>
              <li>
                A recommendation: simplify the process, integrate tools, use AI
                or leave it unchanged.
              </li>
              <li>
                A proposed pilot scope, baseline, success measures and
                operating-cost considerations.
              </li>
            </ul>
            <p>
              Scope, access requirements, fee and deliverables are agreed before
              work starts. Implementation is a separately scoped next step.
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
                <dt>What I can deliver</dt>
                <dd>{service.deliverable}</dd>
                <dt>What we can measure</dt>
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
        <Eyebrow>From assessment to operation</Eyebrow>
        <h2>A focused pilot before scaling.</h2>
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
          Ongoing operation and support are agreed separately. Where results are
          verifiable and delivery is proven, we can discuss an outcome-linked
          arrangement.
        </p>
        <Link className="text-link" href="/results-as-a-service/">
          Explore Results as a Service
          <Arrow />
        </Link>
      </section>
      <section className="container section-bottom">
        <Eyebrow>Before we start</Eyebrow>
        <h2>Your questions, answered.</h2>
        <div className="faq-list">
          {[
            [
              "Do I need to know which AI tool I want?",
              "No. We start with the business process. A simpler workflow or a straightforward integration may be more useful than AI.",
            ],
            [
              "Can you work with our existing tools?",
              "The review identifies your systems, available integrations and constraints. Access and technical feasibility are checked before a pilot is agreed.",
            ],
            [
              "What happens to sensitive information?",
              "We agree what data is needed, who can access it and which suppliers would process it. Use sample or redacted information for the initial conversation; don’t send confidential records through the contact form.",
            ],
            [
              "Will AI make decisions without a person?",
              "Human review and exception handling are agreed as part of the workflow. The level of automation depends on the task, its consequences and the evidence from testing.",
            ],
            [
              "How much does it cost?",
              "The workflow review is paid. Its scope and fee are agreed in advance. A pilot has a separate scope covering implementation, supplier costs and any ongoing support.",
            ],
            [
              "Do you guarantee a particular saving?",
              "No untested saving is promised. We agree a baseline, measurement method and acceptance criteria, then use the pilot to establish what is achievable.",
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
