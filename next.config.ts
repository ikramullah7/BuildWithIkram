import type { NextConfig } from "next";
if (process.env.CF_PAGES && process.env.CONTENT_PREVIEW === "true")
  throw new Error(
    "Editorial draft preview must not be built on Cloudflare Pages.",
  );
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default config;
