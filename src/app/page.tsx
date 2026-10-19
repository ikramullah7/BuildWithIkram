import Link from "next/link";
import { Arrow, ServiceIcon } from "@/components/icons";
import { Button, Eyebrow, SectionHeading, ContactCTA } from "@/components/ui";
import { Workflow } from "@/components/workflow";
import { services, deliverySteps } from "@/lib/services";
import { site } from "@/config/site";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "AI & automation for UK businesses",
  site.description,
  "/",
);
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <Eyebrow>Practical AI & automation for UK businesses</Eyebrow>
          <h1>
            AI &amp; automation.
            <br />
            <span>Results as a Service.</span>
          </h1>
          <p>
            I’m Ikram. I help UK businesses turn everyday bottlenecks into
            practical AI and automation opportunities—with a clear plan, a
            focused pilot and an agreed way to measure what improves.
          </p>
          <div className="hero-actions">
            <Button href="/contact/">
              Discuss your business problem
              <Arrow />
            </Button>
            <Button href="/demonstrations/enquiry-workflow/" secondary>
              Try a working example
              <Arrow />
            </Button>
          </div>
          <Link className="hero-raas-link" href="/results-as-a-service/">
            <ServiceIcon kind="outcome" />
            <span>RaaS: agree the result. Measure the progress.</span>
            <Arrow />
          </Link>
        </div>
        <Workflow />
      </section>
      <div className="principles-strip">
        <div className="container">
          <span>Business context. Engineering depth.</span>
          <span>Automation & AI</span>
          <i />
          <span>DevOps & MLOps</span>
          <i />
          <span>Clear plans & practical delivery</span>
        </div>
      </div>
      <section className="section container">
        <SectionHeading
          label="Where I can help"
          title="Which part of the work slows you down?"
          href="/solutions/"
          link="Explore the services"
        />
        <div className="problems-grid">
          {services.map((service) => (
            <Link
              className="problem"
              href={`/solutions/#${service.id}`}
              key={service.id}
            >
              <span className="problem-number">
                <ServiceIcon kind={service.icon} />
                <Arrow />
              </span>
              <h3>{service.title}</h3>
              <p>{service.problem}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section proof-section">
        <div className="container proof-layout">
          <div>
            <Eyebrow>See the approach in action</Eyebrow>
            <h2>
              One enquiry.
              <br />
              Fewer loose ends.
            </h2>
            <p className="section-description">
              Try a small workflow that checks sample enquiries, catches
              duplicates and keeps approval with a person.
            </p>
            <Link
              className="text-link"
              href="/demonstrations/enquiry-workflow/"
            >
              Open the interactive demonstration
              <Arrow />
            </Link>
          </div>
          <div className="evidence-panel">
            <span className="pill">Working demonstration · Synthetic data</span>
            <h3>Check → prepare → review</h3>
            <ul>
              <li>Missing information goes to review.</li>
              <li>Duplicate records are held back.</li>
              <li>A person approves the next step.</li>
            </ul>
            <p>
              This browser-based example uses rules and templates. It does not
              send emails or claim client results.
            </p>
          </div>
        </div>
      </section>
      <section className="section container" id="process">
        <SectionHeading
          label="How I work"
          title="A clear plan before a bigger commitment."
        />
        <div className="delivery-grid">
          {deliverySteps.map(([title, copy], i) => (
            <article key={title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="offer-note">
          <strong>
            The first paid step: a workflow review and practical plan.
          </strong>
          <p>
            Understand the bottleneck, identify the best automation or AI
            candidates and agree whether a scoped pilot is worth pursuing. Scope
            and fees are agreed before work starts.
          </p>
          <Link className="text-link" href="/solutions/#workflow-review">
            What the review includes
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="section results-section">
        <div className="container proof-layout">
          <div>
            <Eyebrow>Results as a Service</Eyebrow>
            <h2>
              Agree the result.
              <br />
              Make it measurable.
            </h2>
          </div>
          <div>
            <p>
              I believe the useful measure of technology is what improves in
              your business. Start with a baseline, agree the quality standard
              and review the result against it.
            </p>
            <p>
              Where a workflow is proven and outcomes can be verified, an
              ongoing service can include fees linked to agreed results. The
              measurement, responsibilities and costs are defined together.
            </p>
            <Link className="text-link" href="/results-as-a-service/">
              How results-led delivery works
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container about-home">
        <div>
          <Eyebrow>Your delivery partner</Eyebrow>
          <h2>
            Business conversations.
            <br />
            <span className="muted-heading">Practical engineering.</span>
          </h2>
        </div>
        <div>
          <p>
            My strengths are DevOps, MLOps, automation and AI. I start by
            talking to you about how the business works, then identify useful
            opportunities and share a plan you can act on.
          </p>
          <p>
            Currently focused on UK businesses, with clear scope, human
            oversight and a practical next step.
          </p>
          <Link className="text-link" href="/about/">
            Meet Ikram
            <Arrow />
          </Link>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
