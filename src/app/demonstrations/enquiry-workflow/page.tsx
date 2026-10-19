import { EnquiryDemo } from "@/components/enquiry-demo";
import { Breadcrumbs, ContactCTA, Eyebrow, PageIntro } from "@/components/ui";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Enquiry workflow demonstration",
  "Try a synthetic enquiry workflow: check missing information, detect duplicates and review a template response before approving a simulated next step.",
  "/demonstrations/enquiry-workflow/",
);
export default function EnquiryWorkflow() {
  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[
            { title: "Examples", href: "/projects/" },
            { title: "Enquiry workflow" },
          ]}
        />
      </div>
      <PageIntro
        label="Interactive demonstration · Synthetic data"
        title="An enquiry should have a clear next step."
      >
        <p>
          Explore how simple checks and human approval can make a small
          administrative workflow easier to follow. Run the sample checks, then
          review an eligible record.
        </p>
      </PageIntro>
      <section
        className="container section-bottom"
        aria-label="Interactive enquiry demonstration"
      >
        <EnquiryDemo />
      </section>
      <section className="results-section section">
        <div className="container proof-layout">
          <div>
            <Eyebrow>What the example demonstrates</Eyebrow>
            <h2>
              Visible checks.
              <br />A person in control.
            </h2>
          </div>
          <div className="prose">
            <p>
              The sample batch contains four records: two eligible enquiries,
              one with a missing email and one exact duplicate. Eligible records
              require an explicit approval before the demonstration marks the
              next step as approved.
            </p>
            <p>
              The counters report what happens in this example. They are not
              client outcomes, speed benchmarks or evidence of business savings.
            </p>
            <p>
              Rules are sufficient for these checks. AI could assist with
              unstructured messages in a separately tested implementation, but
              it is not needed to prove every step of a workflow.
            </p>
          </div>
        </div>
      </section>
      <section className="section container proof-layout">
        <div>
          <Eyebrow>From example to a business pilot</Eyebrow>
          <h2>What a real implementation needs.</h2>
        </div>
        <div className="prose">
          <ul>
            <li>
              Agreed input sources, permissions and a durable record of each
              enquiry.
            </li>
            <li>
              Rules for duplicates, missing information, routing and human
              approval.
            </li>
            <li>Approved integrations for records, messages and reminders.</li>
            <li>Monitoring, retries, audit history and a recovery process.</li>
            <li>
              A baseline and test set covering accuracy, handling time, rework
              and running costs.
            </li>
          </ul>
          <p>
            This static demonstration has no inbox, CRM, external AI call or
            persistent storage. A production workflow would be separately scoped
            after reviewing your systems and data requirements.
          </p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
