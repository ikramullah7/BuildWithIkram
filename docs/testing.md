# Testing

## Required checks

```sh
npm ci
npm run check
npm run build
npm test
```

Playwright serves the actual `out/` export on port 3002. Tests cover public routes, metadata, internal links, image decoding, axe accessibility rules, responsive widths (375, 768, 1280 and 1440), mobile keyboard navigation, contact destinations, unknown routes and draft exclusion.

Contact tests intercept Web3Forms requests, including validation, payload, duplicate protection, success, rejection, explicit retry, network failure, timeout, honeypot and submission without JavaScript. Automated tests do not send email.

The Mac configuration uses installed Google Chrome. Elsewhere, run `npx playwright install chromium`; `PLAYWRIGHT_CHROMIUM_EXECUTABLE` optionally selects another compatible executable. GitHub Actions installs Chromium on its runner.

## Editorial preview

```sh
npm run build:preview
npm run test:preview
npm run build
npm test
```

Both modes write `out/`. Always finish with a production build to remove drafts. Preview is local only and must never be enabled in Cloudflare.

## Visual review

With the static server running, `npm run qa:mcp` connects to the project-configured Microsoft Playwright MCP server and records screenshots and console errors in ignored `artifacts/`. Use `CONTENT_PREVIEW=true npm run qa:mcp` for a local article review. Inspect the images at all four target widths. Generated reports, screenshots and MCP logs are disposable and must not be committed.

## Latest observed results — 19 October 2026

- ESLint, strict TypeScript and production export verification passed.
- Production browser suite: 26 passed, three editorial-only tests skipped.
- Editorial preview suite: all 29 passed; production rebuilt afterwards.
- Contact screenshots reviewed at all four widths, plus validation, mocked rejection and mocked success states; no horizontal overflow or page exceptions observed.
- Owner reports local form submission works. Actual inbox receipt and the published form still require confirmation.

Earlier local Lighthouse measurements were mobile 98/100/100/100 and desktop 100/100/100/100 using compressed static delivery and a production-origin simulation. These predate the current contact form and are not live-site benchmarks. The earlier production dependency audit found zero vulnerabilities; five high findings were confined to the development lint dependency chain. Re-run audits to establish current status.

Automated accessibility checks do not establish complete WCAG conformance. Physical-device and screen-reader testing remain manual checks. Real delivery tests require explicit permission and owner confirmation of receipt.

After documentation cleanup, lint, strict TypeScript, production export verification and all 26 production browser tests passed again (three editorial-only tests skipped). Remaining documentation links were checked. The duplicate public icon was removed; the App Router icon still exports at `/icon.svg`.
