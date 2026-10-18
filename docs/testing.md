# Testing

## Repeatable checks

```sh
npm ci
npm run check
npm run build
npm test
```

Playwright starts the actual static export with `scripts/serve.mjs`. Tests cover all public routes, project details, headings, metadata, internal navigation, image decoding, axe WCAG rules, four target widths, mobile keyboard interactions, contact/video empty states, unknown routes and draft exclusion. The local server supports gzip and immutable caching for hashed assets, reflecting normal CDN delivery rather than an uncompressed development server.

For drafts, build and test separately:

```sh
npm run build:preview
npm run test:preview
npm run build
npm test
```

Both modes write `out/`; **always finish with a production build**. The preview build verifier checks its banner so stale output is not silently tested. Cloudflare refuses a build with editorial preview enabled. No public preview route is provided.

The Mac setup uses the existing Google Chrome executable. On another platform, Playwright uses its installed Chromium by default; run `npx playwright install chromium` if needed. You can set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to an existing compatible executable. The GitHub Actions workflow prepares Chromium on its disposable runner. That workflow is committed as configuration; no remote workflow run has been performed.

## Microsoft Playwright MCP

The project `.codex/config.toml` uses installed Chrome with `npx --no-install @playwright/mcp --headless --isolated --browser chrome`. Reload/trust the project in Codex if the entry does not appear. No global configuration is required.

With the static server running:

```sh
npm run qa:mcp
# After a local editorial build, also capture the article:
CONTENT_PREVIEW=true npm run qa:mcp
```

The MCP SDK script connects to the real Microsoft server, discovers tools, navigates local pages, captures widths 375/768/1280/1440 and collects error-level console messages. Evidence is in ignored `artifacts/`. Inspect screenshots rather than inferring layout quality from a successful command.

## Lighthouse

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npx lighthouse http://127.0.0.1:3000/ --output=json --output=html --output-path=artifacts/lighthouse-mobile --chrome-flags='--headless --no-sandbox' --only-categories=performance,accessibility,best-practices,seo --quiet
```

Use `--preset=desktop` for the desktop run. Scores are local measurements, not guarantees for deployed devices or networks. A localhost configuration intentionally blocks indexing, which lowers SEO. A production-domain simulation may use the reserved `https://example.test` origin for audit only; it must be rebuilt with confirmed owner settings before any deployment.

## Observed results — 18 October 2026

The final validation table below records the completed checks.

The first production regression run exposed secondary-text contrast failures. The first screenshot review exposed invalid SVG ampersands. Both were fixed. The expanded WCAG tags caught accessible-name mismatches, which were corrected by aligning the menu label and allowing project images to supply the link name.

Initial mobile Lighthouse on the uncompressed local server: performance 84, accessibility 100, best practices 100, SEO 69. The no-index state accounts for the SEO shortfall; unused framework JavaScript and uncompressed delivery affected performance. Later runs use compressed static delivery.

`npm audit --omit=dev` found **0 vulnerabilities**. Full npm audit reports **5 high development-only findings** in `braces → micromatch → fast-glob → @next/eslint-plugin-next → eslint-config-next`. npm suggests a breaking downgrade to eslint-config-next 14.2.35; this was not applied to a Next.js 16 project. Avoid feeding untrusted glob patterns to development lint tooling and review upstream updates. These packages are not shipped in the static output.

The bundled Python skill validator could not run because PyYAML is not installed. Equivalent local YAML/name/description checks passed for all three instruction-only skills using the installed YAML parser. No machine-wide Python dependency was installed.

Manual limitations: automated axe checks do not establish complete WCAG conformance; no physical-device, screen-reader or cross-browser audit has been performed. Real YouTube playback and owner-specific contact destinations cannot be validated until confirmed records are supplied. Cloudflare routing, headers, domain and TLS remain deployment checks because no deployment was authorised.

## Final validation

| Check | Observed result |
| --- | --- |
| ESLint and strict TypeScript, including route type generation | Passed |
| Production static export and post-build verification | Passed; final `out/` contains no draft routes |
| Production Playwright suite | 18 passed; 3 editorial-only tests intentionally skipped |
| Editorial preview Playwright suite | All 21 passed |
| Responsive checks | 375, 768, 1280 and 1440px; all public pages, plus mobile articles |
| Microsoft Playwright MCP | Connected and navigated localhost; final console: 0 errors, 0 warnings |
| Production npm dependency audit | 0 vulnerabilities |
| Full npm audit | 5 high findings, all in the documented development lint chain |
| Reserved-origin sitemap/robots test | Correct HTTPS test origin, indexable robots and draft-free sitemap |
| Final restored export | Local origin, no editorial banner, no test domain or draft titles |

Final Lighthouse on the compressed local export, with production indexing configured using the reserved `https://example.test` origin:

| Device | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Mobile | 98 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

Mobile LCP was 2.3 seconds; desktop LCP was 0.6 seconds. CLS was 0 in both measurements. These two runs were collected on the same local host; they are not independent deployed-network benchmarks. The final `out/` was subsequently rebuilt with the default local origin and deliberate no-index protection. Its SEO score is therefore expected to remain below the production configuration until a real origin is supplied.

Reports: `artifacts/lighthouse-production-{mobile,desktop}.report.{html,json}`, `artifacts/audit-{production,all}.json`, `artifacts/mcp-qa.json`, `artifacts/mcp-preview.json`. Final screenshots: `artifacts/home-{375,768,1280,1440}.png`, `artifacts/project-desktop.png`, `artifacts/article-{desktop,mobile}.png`. Before screenshots are preserved with a `before-` prefix. These generated files are intentionally ignored by Git.

The sample Python code was executed locally and printed `True`. The articles remain demonstration drafts; this snippet check does not validate the proposed end-to-end systems.
