import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/ui";
import { Arrow } from "@/components/icons";
import { site } from "@/config/site";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Contact",
  "Contact Ikram about a paid project, explore a business problem or ask a question about the AI, automation and technology shared on BuildWithIkram.",
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
        title="What would you like to build?"
      >
        <p>
          Planning a paid project, exploring a business problem or curious about
          something I’m building? I’d be glad to hear from you.
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
        className="container contact-layout contact-with-form section-bottom"
        aria-label="Ways to get in touch"
      >
        <ContactForm
          accessKey={site.contactForm.accessKey}
          endpoint={site.contactForm.endpoint}
          email={site.email}
        />
        <aside className="contact-details">
          <div className="contact-note">
            <h2>A useful starting point</h2>
            <p>
              Share the problem, who it affects and what a useful outcome would
              look like. For a project enquiry, include any timing or budget you
              have in mind.
            </p>
            <p>
              If it’s a content question, a link to the relevant article or
              video helps me understand the context.
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
