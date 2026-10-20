import { EnquiryDemo } from "@/components/enquiry-demo";
import { Breadcrumbs, ContactCTA, Eyebrow, PageIntro } from "@/components/ui";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Enquiry workflow demonstration",
  "Run four sample enquiries through duplicate and missing-information checks, then review a draft response and approve a simulated next step.",
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
        label="Interactive example · Sample data"
        title="Try the checks behind an enquiry workflow."
      >
        <p>
          Run the sample batch, see which enquiries are held back and review a
          draft response. This example uses rules and templates in your browser.
          It doesn’t call an AI service or send messages.
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
            <Eyebrow>What to look for</Eyebrow>
            <h2>Which enquiries can move forward?</h2>
          </div>
          <div className="prose">
            <p>
              There are four fictional records. Two have the details needed for
              review, one is missing an email address and one is an exact
              duplicate. You have to approve an eligible enquiry before its next
              step is marked as approved.
            </p>
            <p>
              The counters show what happened to this sample batch. They don’t
              measure speed, time saved or business performance.
            </p>
            <p>
              These checks can be handled with rules. AI could help interpret
              less structured messages in a real project, but that would need
              its own tests.
            </p>
          </div>
        </div>
      </section>
      <section className="section container proof-layout">
        <div>
          <Eyebrow>Taking it further</Eyebrow>
          <h2>What would change in your business?</h2>
        </div>
        <div className="prose">
          <ul>
            <li>
              Enquiries would come from your chosen inbox or form and be saved
              in your system.
            </li>
            <li>
              We’d define the checks, routing and approvals for your team.
            </li>
            <li>
              Messages and reminders would use integrations you’ve approved.
            </li>
            <li>
              Failures would need monitoring, a record of what happened and a
              way to recover.
            </li>
            <li>
              We’d compare accuracy, handling time, rework and costs with your
              current process.
            </li>
          </ul>
          <p>
            The demonstration keeps its state in this tab only. An inbox
            connection, CRM and permanent records would be part of a separately
            priced pilot.
          </p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
