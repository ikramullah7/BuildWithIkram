# Cloudflare Pages deployment preparation

No deployment, account connection, domain purchase or remote push has been performed. The output is static; no Next.js runtime adapter is needed.

## Before connecting an account

- Confirm the production domain; set `NEXT_PUBLIC_SITE_URL` to that HTTPS origin.
- Fill owner-approved email and social links in `src/config/site.ts`.
- Review biography and privacy policy; replace legal placeholders.
- Approve any articles to be published. Keep other articles draft.
- Ensure `CONTENT_PREVIEW` is absent or `false` in the production environment.
- Run `npm ci`, `npm run check`, `npm run build`, `npm test`.
- Inspect `out/`, sitemap, robots, OG image and custom 404 status locally.
- Review npm audit results, including the documented development-only ESLint dependency issue.

## GitHub-based setup — requires owner authorisation

After approval, connect the intended GitHub repository to Cloudflare Pages. Select the production branch. Use build command `npm run build`, output directory `out`, root directory `/` and Node version 24 (`NODE_VERSION=24`). There is no `next start` process and no server-side environment required. Supply `NEXT_PUBLIC_SITE_URL` as a build-time variable. Do not enable editorial preview.

Cloudflare rebuilds after pushes to the connected branch. Preview deployments should use a separate preview origin and disallow indexing; do not publish editorial drafts to account preview URLs without explicit owner approval.

## Domain and HTTPS

In Pages → Custom domains, add the domain you own and follow Cloudflare’s DNS instructions for that domain. Do not change nameservers or purchase anything without approval. Wait for domain validation and the managed TLS certificate, then verify HTTPS and a single canonical host. Configure any desired www-to-apex redirect explicitly through Cloudflare after confirming the owner’s preference.

## Verification checklist

- All public pages and deep project links return 200.
- A nonexistent route returns the custom page with HTTP 404, not an SPA fallback.
- Both draft article slugs return 404; sitemap contains published URLs only.
- Canonicals, Open Graph URLs and sharing links use the confirmed origin.
- Robots allows indexing on the production origin.
- `_headers` is applied, including immutable caching for hashed Next static assets.
- No image optimisation endpoint, runtime API, server action or `next start` is required.
- Check mobile navigation, keyboard focus, YouTube links and contact destinations.
- Run live Lighthouse after deployment; local scores do not establish CDN performance.

[Official Cloudflare static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
