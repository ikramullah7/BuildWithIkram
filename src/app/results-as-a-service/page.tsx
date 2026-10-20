import Link from "next/link";
import { ContactCTA, Eyebrow, PageIntro } from "@/components/ui";
import { Arrow } from "@/components/icons";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Results as a Service",
  "Decide what counts as a successful result, test it in a pilot and discuss how an ongoing AI or automation service should be measured and priced.",
  "/results-as-a-service/",
);
export default function Results() {
  return (
    <>
      <PageIntro
        label="Results as a Service · RaaS"
        title="What result would make this worth doing?"
      >
        <p>
          That’s where I start. We agree what needs to improve, measure how the
          task works today and decide how we’ll check the result.
        </p>
      </PageIntro>
      <section className="container section-bottom proof-layout">
        <div>
          <Eyebrow>How it works</Eyebrow>
          <h2>Test the result before committing to a service.</h2>
        </div>
        <div className="prose">
          <p>
            For me, Results as a Service means looking after a task and being
            accountable for how well it gets done over time.
          </p>
          <p>
            We start with a paid workflow review. If you want to go ahead, I’ll
            price a pilot separately so we can test whether the proposed
            approach works.
          </p>
          <p>
            Once the pilot works reliably, we can discuss an ongoing service and
            how it should be priced. Fees linked to results only make sense when
            we can both check those results. The pilot may also show that a
            one-off project is a better fit.
          </p>
          <Link className="text-link" href="/solutions/#workflow-review">
            What the workflow review includes
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="results-section section">
        <div className="container">
          <Eyebrow>Choosing the measure</Eyebrow>
          <h2>What would count as a successful result?</h2>
          <div className="outcome-grid">
            {[
              [
                "An enquiry reaches the right person",
                "The record has the required details and is routed within the time we agreed.",
                "We decide how to handle duplicates, spam and missing details before counting completed enquiries.",
              ],
              [
                "A document record passes its checks",
                "The extracted details match the source document and pass the checks for that task.",
                "A record that needs correcting is rework, not a completed result.",
              ],
              [
                "A task runs correctly",
                "The task finishes, its output passes the checks and someone can investigate any failure.",
                "We include the input data, supplier dependencies and any human review in the agreement.",
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
            These are examples to discuss, not client results. The measure needs
            to match your task.
          </p>
        </div>
      </section>
      <section className="section container proof-layout">
        <div>
          <Eyebrow>Costs and responsibilities</Eyebrow>
          <h2>Know what you’re paying for.</h2>
        </div>
        <div className="prose">
          <p>
            A service could have a setup fee, a monthly fee to keep it running
            and a charge for completed results. In other cases, a fixed monthly
            fee with a volume limit could be easier to manage.
          </p>
          <p>
            Before you sign up, we’ll agree what counts, how it’s checked, the
            software costs and what each of us needs to provide. We’ll also
            decide how to handle errors, rework and missed targets.
          </p>
          <p>
            Saving time gives your team more capacity. It only saves cash if
            your spending falls, so we’ll report those separately.
          </p>
          <Link className="text-link" href="/demonstrations/enquiry-workflow/">
            Try the enquiry checks
            <Arrow />
          </Link>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
