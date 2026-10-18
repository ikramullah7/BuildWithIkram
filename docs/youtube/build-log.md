# Build log — 18 October 2026

## Environment and architecture

Prompt brief: build a premium business/technology brand site using a static Next.js export, local MDX and Playwright MCP. Workspace contained only Git. Commands included `codex --version`, `codex mcp list`, `node --version`, `npm --version`, `git status --short` and npm version resolution. No remote mutation occurred.

Decision: use project-local skills and MCP config so global settings remain untouched. Sandbox protected `.agents`/`.codex` writes; scoped elevated execution created only the requested project files. No machine-wide install was needed.

## Design and implementation

Selected warm paper, blue and charcoal with a self-hosted Manrope font. Original workflow illustrations explain concepts rather than imply existing client products. Shared components support all required routes. Missing channels have honest pending states. Projects remain concepts; both sample articles are unpublished.

Commands: npm package installation, `npm run build`, `npm run check`. The first build caught a JSX brace error and then a font path error; both were fixed before browser QA. The empty published article collection exposed a Next.js static export requirement: a route parameter must exist. A content-free 404 sentinel plus verified post-build removal handles it without exporting a draft.

## Content and security

Replaced gray-matter with the maintained YAML parser to remove a vulnerable transitive parsing chain. `npm audit --omit=dev` reported zero production vulnerabilities. Five development-only audit findings remain in ESLint’s braces/micromatch/fast-glob chain; npm’s suggested fix downgrades the framework lint configuration and was not applied blindly.

## Browser review

A real MCP SDK client connected to Microsoft Playwright MCP using installed Chrome, opened localhost and captured four viewport widths. The first screenshots exposed invalid SVG ampersands. Automated axe checks found weak contrast in annotations and footer text. SVG escaping, text size and secondary colour fixes were implemented before repeating QA. Keep the before and after screenshots in ignored artifacts for recording.

## Results and deployment

Use docs/testing.md for the final observed test counts and scores. `out/` is the deployable static artifact after the final production build. No account connection, domain action, remote push or deployment took place.

## Lessons worth showing

Build static output early. A successful typecheck does not prove an image renders. Treat draft exclusion as a build invariant. Use browser screenshots and accessibility findings to guide real changes. Keep proposed projects and measured results clearly separate. A launch checklist is useful even when the implementation is local.

## Editorial QA fixes

Preview testing caught that a custom Next.js export directory left the standard `out/` stale; both modes now use the standard directory and verify the preview banner. Filter controls received explicit accessible labels. The highlighted code theme received darker red/orange tokens, and the copy button name now follows its visible status. Generated Playwright reports are excluded from linting, and route types are generated before a fresh-checkout typecheck. All 21 editorial tests then passed.
