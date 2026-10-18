# Technical voiceover notes

“The business goal comes first: explain useful technology clearly, then let people explore how it could work. The site is a static Next.js application, so there is no application server or database to maintain.

Content lives in the repository. Projects are structured data; articles are MDX with validated YAML metadata. A draft is filtered before route generation, and the export verifier checks that it has not leaked into production. Local editorial preview lets me inspect the whole article experience without publishing it.

The design uses one self-hosted font, restrained blue and warm neutral backgrounds. Workflow diagrams give the project ideas a concrete shape without pretending they are completed products.

Codex skills provide focused project guidance. Microsoft’s Playwright MCP supplies real browser feedback. The first review found missing illustrations and contrast problems that compilation alone could not reveal. Automated tests cover routes, navigation, responsive overflow, metadata, accessibility and draft boundaries.

The final artifact is the out directory. Cloudflare Pages can serve it without a Next.js runtime. Before a public launch, the domain, contact details, privacy policy and publishing decisions still need owner review.”

Show actual command output and screenshots at each point. Read current audit scores from docs/testing.md. Never substitute an intended target for a measured result.
