# Design system

## Direction

A founder-led AI and automation service for UK businesses: warm paper, quiet blue, charcoal type, measured whitespace and original workflow diagrams. Show a business question before implementation detail. Avoid testimonial placeholders, unsupported success figures, neon effects and decorative stock photography.

Manrope variable is bundled locally: its open forms, clear lowercase shapes and range of weights suit both business copy and technical navigation. The opening headline explicitly names AI, automation and Results as a Service. A direct RaaS link explains the approach. Use consistent SVG icons: a chip motif for AI, connected steps for automation and a target for agreed outcomes. Lead the commercial journey towards the paid workflow review, scoped pilot and measured operational improvement. A single family gives a consistent voice with little font overhead. Code uses the browser’s monospace family. Font licence is in `src/assets/fonts/OFL.txt`.

The wordmark is BuildWithIkram without a trailing full stop. Its brand mark uses the owner-selected AI core with a white check mark, blue-to-indigo centre and blue connection pins, with matching geometry in the header, footer, favicon and social image. Keep it distinct from the supporting AI chip icon.

## Tokens and components

Primary tokens in `src/app/globals.css`: paper `#fafaf7`, ink `#202c3b`, blue `#2656bb`, muted `#606b78`, line `#dfe3e5`, pale blue `#edf2fa`, default radius 14px. Components use a bounded 1248px container with responsive gutters. Headings use fluid sizes with tighter tracking; body copy has generous line height. The hero, editorial section rows and illustrated workbench create variety without repeated generic card grids.

Reusable UI includes buttons, navigation, footer, eyebrow labels, page introductions, section headings, project cards, breadcrumbs, contact CTA, article layout, article filter cards, copy code and opt-in videos. Prefer these components and named colour tokens when extending the site.

## Responsive and accessibility rules

Breakpoints at 1100, 800 and 600px adapt the composition. Below 800px, navigation becomes a disclosure with an expanded-state button, Escape-to-close and focus return. The mobile menu participates in the normal keyboard sequence; it is not a modal. The skip link targets the main landmark. Visible focus, semantic headings, explicit media dimensions and reduced motion are built in. Concept labels remain visible on every relevant page. Verify 375, 768, 1280 and 1440px.

Rendered review and regression checks are described in [testing](testing.md).
