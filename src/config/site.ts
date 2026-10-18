// Owner settings: leave unconfirmed details empty. Never invent contact destinations.
export const site = {
  name: "BuildWithIkram",
  description:
    "Solving real business problems with AI, automation and technology. Practical projects, clear explanations and thoughtful engineering.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "",
  socials: { github: "", linkedin: "", youtube: "" },
};
export const preview = process.env.CONTENT_PREVIEW === "true";
export const configuredDomain = !new URL(site.url).hostname.match(
  /^(localhost|127\.0\.0\.1)$/,
);
export function absolute(path: string) {
  return new URL(path, site.url).toString();
}
