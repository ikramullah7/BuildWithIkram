# Architecture and environment

## Decisions

Next.js 16.4.2 App Router with React 19.3.1, TypeScript 6 strict mode and Tailwind 4.3.3. Versions were resolved from npm during this session and locked in package-lock.json. Node 24.11.1 / npm 11.6.2 are installed. Use `npm ci` to reproduce this checkout. Build with webpack, avoiding an unnecessary alternative build path.

`output: 'export'`, trailing slashes and unoptimised images produce a Cloudflare Pages-compatible `out/`. Components render at build time; client JavaScript is limited to navigation, filters, clipboard controls and opt-in video loading. Local SVG diagrams are code-native assets; images have explicit dimensions. Manrope Latin is self-hosted with its OFL licence. No analytics scripts, server actions, database, API routes, middleware or authentication.

## Repository layout

- `src/app`: public routes, metadata, sitemap, robots and error page.
- `src/components`: navigation, reusable UI, diagrams, filters and article controls.
- `src/config/site.ts`: canonical origin and owner-confirmed channel settings.
- `src/lib`: schema-validated MDX loading, metadata helpers and typed local metadata.
- `content/blog`: trusted repository MDX with YAML frontmatter.
- `content/projects/projects.json`, `content/videos/videos.json`: local content records.
- `public/images`: original project illustrations and social image.
- `tests`, `scripts`: browser tests, static export validation and MCP QA.
- `.agents/skills`: frontend design, content authoring and website QA instructions.

## Blog and draft boundary

YAML frontmatter is parsed with `yaml`, then validated with Zod. Draft filtering is centralised in `getArticles`. MDX compilation runs only for trusted repository content using next-mdx-remote RSC; do not accept remote/user-submitted MDX. Remark GFM, rehype-slug and Shiki-backed rehype-pretty-code provide rendering, anchors and syntax colouring. Article routes use `generateStaticParams` and disable unknown dynamic parameters.

Both initial articles are unpublished. Next.js 16 export rejects an empty `generateStaticParams` result. The route therefore generates a content-free `_empty` not-found sentinel only when there are no articles; the post-build verifier removes its files from `out/`. No draft slug is generated to satisfy the framework. The verifier rejects draft routes and draft sitemap entries. The sitemap always uses published articles only, and editorial preview disallows indexing. Rebuild production after using preview because both modes export to `out/`.

No confirmed origin means local canonical URLs, a disallow-all robots file and an empty sitemap. Set the single origin setting before launch; a production build then generates canonical URLs, social URLs and a sitemap from that value.

## Environment inspection — 18 October 2026

Workspace initially contained only `.git`, with no commits or project instructions. Git already had a configured remote; it was not modified or pushed. Codex CLI: `0.162.0-alpha.17.2`. The only pre-existing listed MCP server was `node_repl`. Available bundled skills included skill-creator, OpenAI Docs, Sites and browser control, but no focused frontend-design skill. Three small project skills were created instead of downloading an unverified skill.

Microsoft Playwright MCP `0.0.83` is a project dev dependency. `.codex/config.toml` uses `npx --no-install` so it resolves the lockfile-installed package. `codex mcp list` recognises the project entry; fresh Codex sessions may need trust/reload to expose it. `scripts/mcp-qa.mjs` independently establishes a real MCP SDK stdio connection, navigates localhost, captures screenshots and collects console errors. It uses installed macOS Chrome, so no machine-wide browser installation was needed. This is a tested MCP connection, not merely a configuration check.

## Official references consulted

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Next.js MDX](https://nextjs.org/docs/app/guides/mdx)
- [Codex skills and repository discovery](https://developers.openai.com/codex/skills/)
- [Codex project-scoped MCP](https://developers.openai.com/codex/mcp/)
- [Microsoft Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Cloudflare static Next.js deployment](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)

No global machine settings, external accounts or deployments were changed.
