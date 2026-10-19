import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/ui";
import { Arrow } from "@/components/icons";
import { site } from "@/config/site";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Contact",
  "Discuss your business workflow with Ikram. Start with a paid review and practical plan for automation, AI, DevOps or MLOps, then consider a focused pilot.",
  "/contact/",
);
export default function Contact() {
  const channels = [
    {
      label: "Email",
      href: site.email ? `mailto:${site.email}` : "",
      description:
        "For paid projects, exploratory conversations and content questions.",
      address: site.email,
    },
    {
      label: "LinkedIn",
      href: site.socials.linkedin,
      description: "Connect with me and start a professional conversation.",
      address: "",
    },
    {
      label: "GitHub",
      href: site.socials.github,
      description: "Explore the source code for the BuildWithIkram website.",
      address: "",
    },
    {
      label: "YouTube",
      href: site.socials.youtube,
      description:
        "Follow the channel for practical builds and clear explanations.",
      address: "",
    },
  ].filter((channel) => channel.href);
  const primaryContact = site.email
    ? { href: `mailto:${site.email}`, label: "Email Ikram" }
    : site.socials.linkedin
      ? { href: site.socials.linkedin, label: "Message me on LinkedIn" }
      : undefined;
  return (
    <>
      <PageIntro
        label="Start a conversation"
        title="Which task is slowing your business down?"
      >
        <p>
          Tell me where time is lost, which tools you use and what you would
          like to improve. You don’t need to know which technology is right.
        </p>
        {primaryContact && (
          <div className="contact-intro-actions">
            <a className="button" href={primaryContact.href}>
              {primaryContact.label}
              <Arrow />
            </a>
            {site.email && <span className="contact-email">{site.email}</span>}
          </div>
        )}
      </PageIntro>
      <section
        className="container contact-layout section-bottom"
        aria-label="Ways to get in touch"
      >
        <ContactForm
          accessKey={site.contactForm.accessKey}
          endpoint={site.contactForm.endpoint}
          email={site.email}
        />
        <aside className="contact-details">
          <div className="contact-note">
            <h2>What happens next?</h2>
            <p>
              I’ll review your enquiry and reply to clarify the problem and
              whether I can help. If a workflow review makes sense, we’ll agree
              its scope, fee and deliverables before any paid work starts.
            </p>
            <p>
              Currently focused on UK businesses. Share a brief description
              rather than confidential documents or customer data. Content
              questions and exploratory conversations are welcome too.
            </p>
          </div>
          <nav
            className="contact-channels"
            aria-label="Contact and social links"
          >
            {channels.map(({ label, href, description, address }) => (
              <a href={href} className="contact-channel" key={label}>
                <div>
                  <h2>{label}</h2>
                  <p>{description}</p>
                  {address && (
                    <span className="contact-address">{address}</span>
                  )}
                </div>
                <Arrow />
              </a>
            ))}
          </nav>
        </aside>
      </section>
    </>
  );
}
