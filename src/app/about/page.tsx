import { PageIntro, ContactCTA, Eyebrow } from "@/components/ui";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "About Ikram",
  "Meet the thinking behind BuildWithIkram: an interest in business problems, practical engineering, AI, automation and cloud.",
  "/about/",
);
export default function About() {
  return (
    <>
      <PageIntro
        label="A little about me"
        title="Curiosity, with a practical purpose."
      >
        <p>
          I’m Ikram, a technology professional interested in how AI, cloud
          engineering and automation can help solve real business problems.
        </p>
      </PageIntro>
      <section className="container about-layout section-bottom">
        <div className="about-manifesto">
          <span className="manifesto-mark" aria-hidden="true">
            ↗
          </span>
          <p>
            Understand the problem.
            <br />
            Build with care.
            <br />
            <span>Share what you learn.</span>
          </p>
          <small>THE BUILDWITHIKRAM APPROACH</small>
        </div>
        <div className="prose">
          <Eyebrow>Why this exists</Eyebrow>
          <h2>Make the connection between business and technology.</h2>
          <p>
            BuildWithIkram is a place to explore useful ideas through practical
            projects. The aim is to make the thinking clear enough for business
            owners and the implementation useful enough for technical readers.
          </p>
          <p>
            I’m interested in the whole process: understanding what needs to
            improve, choosing an appropriate approach, building a focused
            version and being honest about its limitations.
          </p>
          <h2>Learning in the open</h2>
          <p>
            The projects, articles and planned videos are different ways of
            sharing the same work. Concepts are labelled as concepts. Results
            will only be reported when they have actually been tested.
          </p>
          <h2>What you’ll find here</h2>
          <p>
            AI and automation explorations, cloud engineering decisions and
            application ideas grounded in everyday business questions. Clear
            explanations come first; technical detail is there when it helps.
          </p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
