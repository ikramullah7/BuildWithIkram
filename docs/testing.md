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

- Brand refinement: applied the owner-selected option 2: a blue-to-indigo AI core with connection pins and a white check mark; removed the wordmark’s trailing full stop in the header, footer and sharing image; updated the SVG favicon. Build, lint, strict TypeScript and all 30 production tests passed again. Desktop/mobile wordmark screenshots were visually reviewed; four-width layout checks recorded no overflow or browser errors.
- Opening-view refinement: the headline names AI, automation and Results as a Service; a direct RaaS link, AI chip icon and outcome target make the positioning visible immediately. The hero workflow is explicitly illustrative, and the separate rules-based demonstration remains accurately labelled.
- Business positioning now focuses on UK businesses, a paid workflow review, a scoped pilot and conditional Results as a Service delivery.
- ESLint, strict TypeScript and production export verification passed.
- Final production browser suite: 30 passed, three editorial-only tests skipped.
- Editorial preview suite: all 33 passed. Production was rebuilt afterwards and draft routes remain excluded.
- All 13 public routes are covered by metadata, link, image and axe checks, plus overflow checks at 375, 768, 1280 and 1440 pixels.
- Business journey tests cover the paid review, contact route, FAQs and outcome-pricing boundaries.
- Interactive demonstration tests cover held exceptions, exact duplicates, explicit approval, duplicate-approval prevention, reset, reload and mobile accessibility. They verify that the demonstration makes no external requests.
- Microsoft Playwright MCP captured the homepage, services, RaaS, examples, demonstration, About and contact pages at all four widths. Document widths matched viewports and no console errors or page exceptions were recorded. Screenshots were visually reviewed, including desktop and mobile approval states. Spacing collisions and an oversized About label found during review were corrected.
- Contact delivery tests remain mocked. No real email, external AI call, deployment, commit or push was made during this implementation.

Screenshots and reports are disposable and were removed after the final cleanup review. Regenerate them with `QA_BASE_URL=http://127.0.0.1:3002 npm run qa:mcp` when the test server is running, or use the default port 3000. No generated evidence files are required for deployment.

Final cleanup removed superseded hero styles and redundant icon visibility overrides. Lint, strict TypeScript, production export verification and all 30 production browser tests passed (three editorial-only tests skipped). Four-width MCP review recorded no horizontal overflow or browser errors; desktop and mobile screenshots were inspected before clearing the generated files.

## Measurement limits

The demonstration uses synthetic records, required-field and exact-duplicate rules, and a template draft. Its counters describe this sample session; they are not customer outcomes or performance benchmarks. No ongoing service, CRM integration or persistent prospect store is implemented by the marketing site.

Earlier local Lighthouse measurements were mobile 98/100/100/100 and desktop 100/100/100/100 using compressed static delivery and a production-origin simulation. These predate the current pages and are not live-site benchmarks. Re-run performance and dependency audits to establish current measurements.

Automated accessibility checks do not establish complete WCAG conformance. Physical-device and screen-reader testing remain manual checks. The owner reports local contact submission works; actual inbox receipt and delivery on the deployed origin still need explicit confirmation. Real delivery tests require permission.
