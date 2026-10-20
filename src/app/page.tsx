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
          <Eyebrow>For UK businesses</Eyebrow>
          <h1>
            AI &amp; automation.
            <br />
            <span>Results as a Service.</span>
          </h1>
          <p>
            I’m Ikram. I work with UK businesses to find tasks worth automating.
            We look at how the work happens today, decide where AI could help,
            and start with one problem we can measure.
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
            <span>What Results as a Service means for your business</span>
            <Arrow />
          </Link>
        </div>
        <Workflow />
      </section>
      <div className="principles-strip">
        <div className="container">
          <span>From reviewing the task to running the solution</span>
          <span>Automation & AI</span>
          <i />
          <span>DevOps & MLOps</span>
          <i />
          <span>Workflow reviews & implementation</span>
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
            <Eyebrow>Try the demonstration</Eyebrow>
            <h2>See what happens to an enquiry.</h2>
            <p className="section-description">
              Run four sample enquiries through the checks. You’ll see which
              ones need attention and review a draft response.
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
              Runs in your browser using sample data, rules and templates. No
              messages are sent.
            </p>
          </div>
        </div>
      </section>
      <section className="section container" id="process">
        <SectionHeading
          label="How I work"
          title="How we get from a problem to a working solution"
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
          <strong>Start with a paid workflow review.</strong>
          <p>
            I’ll look at the steps, tools and people involved, then recommend
            what to automate and what to leave alone. You’ll get a plan for the
            first project. We agree the fee and what’s included before I start.
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
            <h2>Pay attention to what actually improves.</h2>
          </div>
          <div>
            <p>
              For me, Results as a Service starts with a simple question: how
              will we know this has helped? We agree what counts as a successful
              result and compare it with how the work happens today.
            </p>
            <p>
              Once the pilot works reliably, we can discuss an ongoing service
              and how it should be priced. Fees linked to results only make
              sense when we can both check those results.
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
          <Eyebrow>About me</Eyebrow>
          <h2>Work directly with Ikram.</h2>
        </div>
        <div>
          <p>
            My strengths are DevOps, MLOps, automation and AI. I’ll ask you to
            walk me through the task, including the parts that go wrong. That
            helps me work out where technology could make a difference.
          </p>
          <p>
            I’m starting with UK businesses. The first conversation is about
            your work and whether I can help.
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
