# BuildWithIkram

A static business and technology website built with Next.js App Router, strict TypeScript, Tailwind CSS and repository-authored MDX. No database, backend or CMS. Not deployed.

## Run locally

Requires Node.js 24 (the version verified for this project) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. `npm run preview` starts a **local editorial preview** including unpublished drafts. Never enable `CONTENT_PREVIEW` in production.

```sh
npm run check
npm run build
node scripts/serve.mjs
npm test
npm run qa:mcp
```

The build writes `out/` and verifies required pages and draft exclusion. The static server serves the actual export and returns the custom 404 page with a 404 status. Tests default to installed macOS Chrome; see [testing](docs/testing.md) for portable browser configuration.

Verified: production build, 18 production browser tests and 21 editorial preview tests passed. Microsoft Playwright MCP captured responsive screenshots. Production-configuration Lighthouse scored 98/100/100/100 on mobile and 100 in every desktop category; see the testing report for audit conditions and the remaining development dependency findings.

## Owner settings before launch

Edit `src/config/site.ts` with your confirmed email, GitHub, LinkedIn and YouTube URLs. Empty channels display an honest pending state. Set `NEXT_PUBLIC_SITE_URL` to the confirmed production origin; the local fallback deliberately blocks indexing. Review the privacy template, confirm your biography and approve content. Two meaningful sample articles remain draft. The three sample projects are explicitly labelled concepts. Video metadata starts empty because no real videos were supplied.

## Content and documentation

- [Architecture and environment](docs/architecture.md)
- [Design system](docs/design-system.md)
- [MDX publishing workflow](docs/blog-publishing.md)
- [Testing and actual results](docs/testing.md)
- [Cloudflare deployment preparation](docs/deployment.md)
- [Implementation status](docs/implementation-plan.md)
- [YouTube outline](docs/youtube/video-outline.md) and [build log](docs/youtube/build-log.md)

Focused Codex skills live in `.agents/skills/`. Microsoft Playwright MCP is configured only in `.codex/config.toml`; no global Codex configuration was changed. See architecture for verified tool setup and sources.
