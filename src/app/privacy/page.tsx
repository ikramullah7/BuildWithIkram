import { PageIntro } from "@/components/ui";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Privacy — owner review required",
  "An owner-review privacy policy template describing the planned static website, third-party video loading and contact links.",
  "/privacy/",
);
export default function Privacy() {
  return (
    <>
      <PageIntro label="Privacy" title="A straightforward approach to privacy.">
        <p className="notice">
          Template — owner review required before publication. This is not a
          final legal policy.
        </p>
      </PageIntro>
      <article className="container legal prose section-bottom">
        <h2>About this website</h2>
        <p>
          BuildWithIkram is planned as a static website about business and
          technology. The owner must add their legal identity, contact details
          and an effective date here before launch.
        </p>
        <h2>Information and hosting</h2>
        <p>
          The site currently has no accounts, contact form or analytics scripts.
          The intended host is Cloudflare Pages. Hosting providers may process
          technical request information, including IP addresses and access logs.
          The owner must confirm the actual hosting settings, purposes, legal
          basis, retention periods and international transfers.
        </p>
        <h2>Videos and external services</h2>
        <p>
          Video embeds connect to YouTube only when a visitor chooses to load
          them. They use YouTube’s privacy-enhanced embed domain. When published
          video metadata is added, thumbnails may load from YouTube’s image
          service before playback. External links take you to services with
          their own privacy practices.
        </p>
        <h2>Contact</h2>
        <p>
          If you choose to contact the owner using an email or social link, the
          relevant provider processes that communication. The owner must
          describe how messages are used, stored and deleted.
        </p>
        <h2>Your rights</h2>
        <p>
          Before publication, confirm the laws that apply and explain applicable
          access, correction, deletion, objection and complaint rights,
          including how to exercise them and the relevant supervisory authority.
        </p>
        <h2>Before launch</h2>
        <p>
          Replace this template with a reviewed policy that accurately reflects
          the live site, its providers, any storage or cookies, and the owner’s
          obligations. Update it when the site’s data practices change.
        </p>
      </article>
    </>
  );
}
