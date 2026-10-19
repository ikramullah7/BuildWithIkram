// Owner settings: leave unconfirmed details empty. Never invent contact destinations.
export const site = {
  name: "BuildWithIkram",
  description:
    "Practical AI and automation for UK businesses, backed by DevOps and MLOps. Start with a paid workflow review, a clear plan and measurable success criteria.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://buildwithikram.pages.dev",
  email: "ikramullah@gmx.co.uk",
  // Web3Forms form keys are public identifiers designed for browser submissions.
  contactForm: {
    accessKey:
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      "eb2324c8-a57d-4400-822b-7758937ffa53",
    endpoint: "https://api.web3forms.com/submit",
  },
  socials: {
    github: "https://github.com/ikramullah7/BuildWithIkram",
    linkedin: "https://www.linkedin.com/in/ullahikram/",
    youtube: "https://www.youtube.com/@BuildWithIkram",
  },
};
export const preview = process.env.CONTENT_PREVIEW === "true";
export const configuredDomain = !new URL(site.url).hostname.match(
  /^(localhost|127\.0\.0\.1)$/,
);
export function absolute(path: string) {
  return new URL(path, site.url).toString();
}
