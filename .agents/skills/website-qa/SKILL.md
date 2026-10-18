---
name: website-qa
description: Review BuildWithIkram static pages, navigation, accessibility, responsive layouts and editorial preview.
---

Read docs/testing.md. Build early and test the exported site, not just the development server. Check all public routes, unknown URLs, metadata, console errors and all four target widths. Use Microsoft Playwright MCP for observed visual review and repeatable Playwright tests for regression coverage. Test draft rendering in a separate CONTENT_PREVIEW build, then rebuild production and verify draft pages and titles are absent. Record actual audit scores and limitations; never infer passes from compilation.
