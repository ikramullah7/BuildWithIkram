import githubLight from "shiki/themes/github-light.mjs";
// Darken the light theme’s orange/red tokens for AA contrast at small code sizes.
const foregrounds: Record<string, string> = {
  "#E36209": "#9C4F08",
  "#D73A49": "#B82D3F",
};
export const codeTheme = {
  ...githubLight,
  name: "buildwithikram-light",
  tokenColors: githubLight.tokenColors?.map((token) => ({
    ...token,
    settings: {
      ...token.settings,
      foreground:
        foregrounds[token.settings.foreground?.toUpperCase() || ""] ||
        token.settings.foreground,
    },
  })),
};
