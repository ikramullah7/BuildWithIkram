import type { Metadata } from "next";
import { absolute, site } from "@/config/site";
export function metadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absolute(path) },
    openGraph: {
      type: "website",
      title,
      description,
      url: absolute(path),
      siteName: site.name,
      locale: "en_GB",
      images: [
        {
          url: absolute("/images/social.png"),
          width: 1200,
          height: 630,
          alt: "BuildWithIkram — AI and automation for measurable business progress",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absolute("/images/social.png")],
    },
  };
}
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\u003c");
}
