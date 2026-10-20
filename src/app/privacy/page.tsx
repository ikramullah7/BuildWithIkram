import { PageIntro } from "@/components/ui";
import { site } from "@/config/site";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Privacy information",
  "How BuildWithIkram handles website enquiries, hosting information and optional video loading, with a contact address for privacy questions.",
  "/privacy/",
);
export default function Privacy() {
  return (
    <>
      <PageIntro
        label="Privacy"
        title="How information is handled on this site"
      >
        <p>
          This page explains what happens when you browse the site or send me a
          message.
        </p>
      </PageIntro>
      <article className="container legal prose section-bottom">
        <p className="notice">
          This notice is under review. Retention periods, the legal basis for
          processing and the remaining provider details are still being
          confirmed.
        </p>
        <h2>Who to contact</h2>
        <p>
          I’m Ikram, the person behind BuildWithIkram. For questions about your
          information, email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <h2>Browsing the website</h2>
        <p>
          The site is hosted on Cloudflare Pages. It has no visitor accounts or
          analytics scripts. Cloudflare may process technical information, such
          as IP addresses and request logs, to serve and protect the site.
        </p>
        <p>
          You can read more in{" "}
          <a href="https://www.cloudflare.com/privacypolicy/">
            Cloudflare’s privacy policy
          </a>
          .
        </p>
        <h2>Sending an enquiry</h2>
        <p>
          The contact form sends your name, email address, enquiry type and
          message to Web3Forms. The service delivers your enquiry to my email
          inbox so I can reply. This website does not keep a separate database
          of submissions.
        </p>
        <p>
          Web3Forms may process technical information for delivery and spam
          prevention. Its handling and retention of submissions are described in
          the{" "}
          <a href="https://web3forms.com/privacy">Web3Forms privacy policy</a>.
          The retention settings for this form and my mailbox are still being
          confirmed.
        </p>
        <p>
          If you email me directly or contact me through a social link, that
          service handles the communication under its own privacy terms.
        </p>
        <h2>Videos and external links</h2>
        <p>
          A YouTube player loads only when you choose to play an embedded video.
          When videos are listed, their thumbnails may load from YouTube before
          playback. Links to other websites take you to services with their own
          privacy practices.
        </p>
        <h2>The enquiry demonstration</h2>
        <p>
          The interactive example uses fictional records. Its state is kept in
          your browser tab and clears when you reset or reload the page. The
          example does not send the records to an external service.
        </p>
        <h2>Questions about your information</h2>
        <p>
          You can email me to ask about information you have shared, including
          requests to access, correct or delete it. The{" "}
          <a href="https://ico.org.uk/for-the-public/">
            Information Commissioner’s Office
          </a>{" "}
          explains data protection rights and how to raise a concern.
        </p>
      </article>
    </>
  );
}
