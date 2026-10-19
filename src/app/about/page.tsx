import { PageIntro, ContactCTA, Eyebrow } from "@/components/ui";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "About Ikram",
  "Work directly with Ikram on business automation and AI, backed by strengths in DevOps and MLOps. Start with a business conversation and a practical plan.",
  "/about/",
);
export default function About() {
  return (
    <>
      <PageIntro
        label="The person behind BuildWithIkram"
        title="Understand the business. Build what helps."
      >
        <p>
          I’m Ikram. My strengths are DevOps, MLOps, automation and AI. I help
          businesses identify useful opportunities and turn them into a
          practical plan for delivery.
        </p>
      </PageIntro>
      <section className="container about-layout section-bottom">
        <div className="about-manifesto">
          <Eyebrow>A personal approach</Eyebrow>
          <p>
            Listen to the problem.
            <br />
            Make a clear plan.
            <br />
            <span>Measure what improves.</span>
          </p>
          <small>BUILDWITHIKRAM · UK BUSINESS FOCUS</small>
        </div>
        <div className="prose">
          <h2>A conversation before a tool choice.</h2>
          <p>
            I start by talking to you about the business: where time is lost,
            where information gets stuck and which tasks depend on repeated
            manual effort. Then I identify the strongest automation or AI
            candidates and share a plan.
          </p>
          <h2>Engineering that supports the result.</h2>
          <p>
            DevOps helps connect implementation with dependable delivery and
            operation. MLOps brings that discipline to machine-learning and AI
            workflows. Alongside automation, these are the foundations I bring
            to the work.
          </p>
          <p>
            The first engagement is a paid workflow review. A focused pilot can
            follow where the scope, technical fit and success criteria are
            clear.
          </p>
          <h2>Accountability through measurement.</h2>
          <p>
            I believe in Results as a Service: define the improvement, test the
            workflow and agree how performance will be checked. Outcome-linked
            arrangements need evidence and clear responsibilities before they
            become a commercial commitment.
          </p>
          <p>
            BuildWithIkram is currently focused on UK businesses. Projects and
            technical writing also provide a place to share the approach openly,
            with concepts distinguished from tested work.
          </p>
          <Link className="text-link" href="/solutions/">
            Explore how we could work together
            <Arrow />
          </Link>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
