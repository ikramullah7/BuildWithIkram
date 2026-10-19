import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/ui";
import { Arrow } from "@/components/icons";
import { site } from "@/config/site";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Contact",
  "Tell Ikram which business task you want to improve. Ask about a paid workflow review, an automation or AI project, or help with DevOps and MLOps.",
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
      description: "Message me on LinkedIn.",
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
      description: "Watch the builds and explanations on my channel.",
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
              I’ll read your message and reply with any questions. If a paid
              review is the right next step, I’ll explain what it covers and the
              fee before you decide.
            </p>
            <p>
              I’m currently working with UK businesses. A short description is
              enough to start. Please leave out confidential documents and
              customer data. You can also ask about something I’ve shared.
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
