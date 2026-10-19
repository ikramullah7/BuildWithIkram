# Blog publishing

1. Obtain a transcript you have permission to use. Keep sensitive material out of the repository and recording.
2. Invoke `$content-authoring` using `.agents/skills/content-authoring/SKILL.md` and supply the transcript, project context and verified sources.
3. Create `content/blog/descriptive-slug.mdx` with `draft: true`. State whether examples are proposals or tested implementations.
4. Verify factual claims, sources and code. Explain the problem and business value before technical implementation; include limitations.
5. Preview with `npm run preview` or `CONTENT_PREVIEW=true npm run build` followed by the static server. Editorial preview must remain local.
6. Review copy, cover, code, TOC anchors, project links, accessibility and optional video playback. Ask the owner to approve publication.
7. Only after approval, set `draft: false` and use the actual publication date. Run `npm run check`, `npm run build`, `npm test`.
8. Review the Git diff. Commit and push only when explicitly authorised. A connected Cloudflare Pages repository rebuilds automatically after an authorised push.

## Required frontmatter

```yaml
title: "A clear, useful article title"
description: "A factual summary of the problem and what this article explains."
date: "2026-10-18"
updated: "2026-10-18"
category: "Artificial intelligence"
tags: ["AI", "Automation"]
coverImage: "/images/job-matching.svg"
coverAlt: "Describe the information conveyed by the illustration"
youtubeUrl: ""
relatedProject: "ai-job-matching"
draft: true
```

Dates must be quoted strings. `updated`, `relatedProject` and `youtubeUrl` are optional. When supplied, a YouTube URL must be a confirmed HTTPS `youtube.com/watch?v=` URL. Files need lowercase hyphenated slugs. Metadata validation errors fail the build. Keep headings descriptive; `##` headings populate the table of contents. Avoid duplicate headings to keep anchors unambiguous.

Code fences support language names (for example `python` and `typescript`) and get highlighting plus a copy button. A confirmed video can use frontmatter or `<VideoEmbed id="CONFIRMED_ID" title="Confirmed title" />`; supply a valid 11-character ID, never a fabricated example in published content. Playback loads only after the visitor chooses it.

The list supports category and tag filters. Articles have date, optional updated date, reading time, excerpts, tags, cover, related articles, project links and sharing links. Drafts are absent from production listings, home previews, project article links, sitemap and exported article routes. There is intentionally no public preview route. The two sample articles are meaningful demonstrations awaiting approval, not published posts.

Video metadata belongs in `content/videos/videos.json`; each item needs `id`, `title`, `description`, `date`, `category` and optional `relatedArticle`/`relatedProject` slugs. Only add real recordings. The page derives real thumbnails and links from the confirmed ID and filters related draft article links in production.
