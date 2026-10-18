import { PageIntro } from "@/components/ui";
import { Arrow } from "@/components/icons";
import { site } from "@/config/site";
import { metadata as meta } from "@/lib/seo";
export const metadata = meta(
  "Contact",
  "Start a conversation about a business problem, a project idea or something you would like to see explored on BuildWithIkram.",
  "/contact/",
);
export default function Contact() {
  const channels = [
    [
      "Email",
      site.email ? `mailto:${site.email}` : "",
      "For a project idea or business conversation.",
    ],
    ["GitHub", site.socials.github, "Explore the code behind the projects."],
    [
      "LinkedIn",
      site.socials.linkedin,
      "Connect around technology and business.",
    ],
    ["YouTube", site.socials.youtube, "Follow the builds and explanations."],
  ];
  return (
    <>
      <PageIntro
        label="Start a conversation"
        title="What would you like to build?"
      >
        <p>
          A business process that could work better. A project idea worth
          exploring. A question about the work. It all starts with a
          conversation.
        </p>
      </PageIntro>
      <section className="container contact-layout section-bottom">
        <div className="contact-note">
          <h2>A useful starting point</h2>
          <p>
            Think about the problem, who it affects and what a better outcome
            would look like. You don’t need a technical specification to
            describe what matters.
          </p>
          {channels.some(([, url]) => !url) && (
            <p className="notice">
              Contact channels are being prepared. Confirmed details will appear
              here before launch.
            </p>
          )}
        </div>
        <div className="contact-channels">
          {channels.map(([label, url, description]) =>
            url ? (
              <a href={url} className="contact-channel" key={label}>
                <div>
                  <h2>{label}</h2>
                  <p>{description}</p>
                </div>
                <Arrow />
              </a>
            ) : (
              <div className="contact-channel" key={label}>
                <div>
                  <h2>{label}</h2>
                  <p>{description}</p>
                </div>
                <span className="pill">Coming soon</span>
              </div>
            ),
          )}
        </div>
      </section>
    </>
  );
}
