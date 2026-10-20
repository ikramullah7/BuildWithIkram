import { PageIntro, ContactCTA, Eyebrow } from "@/components/ui";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "About Ikram",
  "Meet Ikram and learn how he reviews business tasks, plans AI and automation projects, and brings DevOps and MLOps skills to implementation.",
  "/about/",
);
export default function About() {
  return (
    <>
      <PageIntro
        label="About Ikram"
        title="I start by asking how the work gets done."
      >
        <p>
          I work in DevOps, MLOps, automation and AI. I talk to businesses about
          the tasks they want to improve, work out where technology could help
          and put a plan together.
        </p>
      </PageIntro>
      <section className="container about-layout section-bottom">
        <div className="about-manifesto">
          <Eyebrow>Why BuildWithIkram</Eyebrow>
          <p>
            I want to build things that{" "}
            <span>solve a problem you actually have.</span>
          </p>
          <small>AI & AUTOMATION FOR UK BUSINESSES</small>
        </div>
        <div className="prose">
          <h2>Show me the task you want to change.</h2>
          <p>
            I’ll ask you to walk me through it. Which steps take the most time?
            Where do you enter the same information twice? What happens when
            something is missing or goes wrong?
          </p>
          <p>
            Those questions help me identify the best candidates for automation
            or AI. I’ll explain the options and share a plan, including the
            parts that still need a person.
          </p>
          <h2>My technical strengths</h2>
          <p>
            My strengths are DevOps, MLOps, automation and AI. That includes the
            work behind a system: how it gets deployed, how failures are spotted
            and how the people running it know what to do next.
          </p>
          <p>
            A business project may need a new integration, a release pipeline or
            an AI tool. The workflow review helps us decide which of those is
            worth building.
          </p>
          <h2>Why I believe in Results as a Service</h2>
          <p>
            I want us to be able to point to what improved. That means deciding
            what success looks like before building, then checking the result
            together.
          </p>
          <p>
            The first offer is a paid workflow review, followed by a separately
            priced pilot if you want to go ahead. Once it works reliably, we can
            discuss an ongoing service and whether results-based pricing fits.
          </p>
          <p>
            I’m starting with UK businesses. I also use this site to share
            demonstrations, project ideas and technical write-ups.
          </p>
          <Link className="text-link" href="/solutions/">
            See what the workflow review covers
            <Arrow />
          </Link>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
