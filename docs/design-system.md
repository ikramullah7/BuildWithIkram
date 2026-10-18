# Design system

## Direction

An approachable engineering publication: warm paper, quiet blue, charcoal type, measured whitespace and original workflow diagrams. Show a business question before implementation detail. Avoid testimonial placeholders, unsupported success figures, neon effects and decorative stock photography.

Manrope variable is bundled locally: its open forms, clear lowercase shapes and range of weights suit both business copy and technical navigation. A single family gives a consistent voice with little font overhead. Code uses the browser’s monospace family. Font licence is in `src/assets/fonts/OFL.txt`.

## Tokens and components

Primary tokens in `src/app/globals.css`: paper `#fafaf7`, ink `#202c3b`, blue `#2656bb`, muted `#606b78`, line `#dfe3e5`, pale blue `#edf2fa`, default radius 14px. Components use a bounded 1248px container with responsive gutters. Headings use fluid sizes with tighter tracking; body copy has generous line height. The hero, editorial section rows and illustrated workbench create variety without repeated generic card grids.

Reusable UI includes buttons, navigation, footer, eyebrow labels, page introductions, section headings, project cards, breadcrumbs, contact CTA, article layout, article filter cards, copy code and opt-in videos. Prefer these components and named colour tokens when extending the site.

## Responsive and accessibility rules

Breakpoints at 1100, 800 and 600px adapt the composition. Below 800px, navigation becomes a disclosure with an expanded-state button, Escape-to-close and focus return. The mobile menu participates in the normal keyboard sequence; it is not a modal. The skip link targets the main landmark. Visible focus, semantic headings, explicit media dimensions and reduced motion are built in. Concept labels remain visible on every relevant page. Verify 375, 768, 1280 and 1440px.

## Formal rendered review

Screenshots were taken through Microsoft Playwright MCP at all four widths. The initial review found and corrected these concrete issues:

1. Project diagrams did not render because ampersands were unescaped in SVG text. Escaped them and added image decode checks to regression coverage.
2. Workflow annotations were too small. Increased annotation and description sizes for desktop and mobile.
3. Concept statuses were visually weak. Increased their size and contrast so readers can distinguish proposals from completed systems.
4. Footer labels, metadata and secondary text failed contrast checks. Darkened the affected colours across the design.
5. Footer copyright and privacy navigation were too small. Increased their text sizes.
6. Syntax-highlighted code exposed a low-contrast orange token and a clipboard status/name mismatch. Darkened the light theme tokens and let the button’s visible status supply its accessible name.
7. The headline was broad about technology. Made practical AI and automation explicit in the hero eyebrow without adding jargon.

Final screenshots and regression evidence are recorded in docs/testing.md. This review is evidence of the inspected layouts, not a claim of universal accessibility compliance.
