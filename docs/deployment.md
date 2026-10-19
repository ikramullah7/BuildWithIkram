# Deployment

The site uses Cloudflare Pages at https://buildwithikram.pages.dev. It is a static Next.js export; no Worker, runtime adapter, database or backend is needed.

## Cloudflare Pages settings

| Field | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | Repository root |
| Deploy command | None; Pages publishes the build output |
| `NODE_VERSION` | `24` |
| `NEXT_PUBLIC_SITE_URL` | `https://buildwithikram.pages.dev` until a custom domain is configured |
| `CONTENT_PREVIEW` | Absent or `false` |

The optional `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` replaces the public key already configured in `src/config/site.ts`. Public environment variables are embedded at build time, so changes require a rebuild.

Before publishing, run `npm ci`, `npm run check`, `npm run build` and `npm test`. Review the diff and owner-approved content. Commit and push only with explicit authorisation; Cloudflare automatically rebuilds a connected production branch after a push.

## Contact delivery

The browser posts directly to Web3Forms. The recipient is determined by the key’s registration, expected to be ikramullah@gmx.co.uk. No mail password is required. The form has validation, a honeypot, duplicate-submit protection and a timeout. Errors preserve the message; uncertain requests are never retried automatically.

Automated tests mock delivery. With explicit permission, send one labelled enquiry from the published site, check the success message and confirm actual inbox receipt, including spam. API acceptance alone does not prove delivery. The owner reports local submission works; inbox receipt has not yet been explicitly confirmed. Review the privacy page and mailbox retention policy before launch.

## Verify after publishing

- Public routes return 200; unknown URLs and unpublished article slugs return 404.
- Canonicals and sitemap use the current public origin; production robots permits indexing.
- Mobile navigation, links and contact delivery work.
- Cloudflare applies `public/_headers`; assets and HTTPS load correctly.
- Run Lighthouse on the deployed site if performance measurements are needed.

For a custom domain, add it in Pages → Custom domains, follow the DNS instructions, update `NEXT_PUBLIC_SITE_URL`, rebuild and verify HTTPS and canonical URLs.

## Troubleshooting

**`npm ci` says the lockfile is out of sync:** regenerate it with `npm install` using the deployment npm version, review the changes and verify a clean install. Keep `package.json` and `package-lock.json` together. Do not delete the lockfile to bypass the error.

**Wrangler looks for `.next/standalone`:** this is a server/Worker deployment path. Use Cloudflare Pages and the `out` directory; preserve `output: 'export'`.

References: [Cloudflare static Next.js deployment](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), [Web3Forms integration](https://docs.web3forms.com/getting-started/examples/ajax-contact-form-using-javascript), [Web3Forms troubleshooting](https://docs.web3forms.com/getting-started/troubleshooting).
