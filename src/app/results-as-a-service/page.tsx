import Link from "next/link";
import { ContactCTA, Eyebrow, PageIntro } from "@/components/ui";
import { Arrow } from "@/components/icons";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Results as a Service",
  "Agree a business outcome, establish a baseline and test the improvement. Explore how measured automation can become an ongoing results-led service.",
  "/results-as-a-service/",
);
export default function Results() {
  return (
    <>
      <PageIntro
        label="Results as a Service · RaaS"
        title="Success starts with an agreed result."
      >
        <p>
          A useful automation should improve the work. My approach starts with
          the outcome you value, the current baseline and a clear way to check
          whether the change delivers.
        </p>
      </PageIntro>
      <section className="container section-bottom proof-layout">
        <div>
          <Eyebrow>From principle to practice</Eyebrow>
          <h2>
            Measure first.
            <br />
            Prove the workflow.
            <br />
            Then agree the service.
          </h2>
        </div>
        <div className="prose">
          <p>
            Results as a Service means taking responsibility for an agreed
            operational outcome over time. It needs a dependable workflow,
            visible quality checks and a shared definition of success.
          </p>
          <p>
            I start with a paid workflow review and a separately scoped pilot.
            An outcome-linked service is considered once the pilot establishes
            what can be delivered, measured and sustained.
          </p>
          <p>
            This is not a blanket promise of revenue growth or guaranteed
            savings. Some problems are better served by a fixed-scope project or
            a simpler process change.
          </p>
          <Link className="text-link" href="/solutions/#workflow-review">
            Start with the workflow review
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="results-section section">
        <div className="container">
          <Eyebrow>Examples of measurable outcomes</Eyebrow>
          <h2>Define what counts. Include the quality.</h2>
          <div className="outcome-grid">
            {[
              [
                "Enquiry administration",
                "An eligible enquiry is correctly recorded and routed within an agreed time.",
                "Missing information, duplicates and spam are treated separately.",
              ],
              [
                "Document processing",
                "An extracted record passes the agreed validation and acceptance checks.",
                "Rework and rejected records do not count as accepted outcomes.",
              ],
              [
                "Reliable operation",
                "An agreed workflow completes correctly, with failures visible and recoverable.",
                "Input availability, human review and supplier dependencies are part of the agreement.",
              ],
            ].map(([title, result, condition]) => (
              <article className="evidence-panel" key={title}>
                <h3>{title}</h3>
                <p>{result}</p>
                <p className="outcome-condition">{condition}</p>
              </article>
            ))}
          </div>
          <p className="section-footnote">
            Illustrative service definitions, not delivered client results.
            Final measures depend on the workflow.
          </p>
        </div>
      </section>
      <section className="section container proof-layout">
        <div>
          <Eyebrow>The commercial arrangement</Eyebrow>
          <h2>
            Clear scope.
            <br />
            Visible costs.
            <br />
            Shared expectations.
          </h2>
        </div>
        <div className="prose">
          <p>
            A suitable arrangement might combine a setup fee, an operating fee
            and a charge for verified outcomes. A fixed monthly fee with agreed
            volume and quality limits may fit another workflow better.
          </p>
          <p>
            Before an ongoing service starts, we agree the baseline, acceptance
            checks, measurement period, customer responsibilities, volume
            limits, supplier costs and how missed standards or rework are
            handled.
          </p>
          <p>
            Time released creates capacity; it is only a cash saving if
            expenditure actually falls. Reports should distinguish those
            effects.
          </p>
          <Link className="text-link" href="/demonstrations/enquiry-workflow/">
            See how a small workflow can be checked
            <Arrow />
          </Link>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
