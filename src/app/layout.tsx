import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/ui";
import { configuredDomain, preview, site } from "@/config/site";
import { jsonLd } from "@/lib/seo";
import localFont from "next/font/local";
import "./globals.css";
const manrope = localFont({
  src: "../assets/fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BuildWithIkram — AI & automation for UK businesses",
    template: "%s | BuildWithIkram",
  },
  description: site.description,
  robots: {
    index: configuredDomain && !preview,
    follow: configuredDomain && !preview,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body className={manrope.variable}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {preview && (
          <div className="preview-banner">
            Editorial preview · Draft content · Not for publication
          </div>
        )}
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: site.name,
              url: site.url,
              description: site.description,
            }),
          }}
        />
      </body>
    </html>
  );
}
