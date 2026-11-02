# Rafbíll vs eldsneytisbíll

Public Icelandic static calculator comparing illustrative energy costs for electric and fuel vehicles.

## Status and provenance

This repository starts as a migration of the canonical legacy source from `arnthorsnaer.io/static/km-kostnadur/`. `data/defaults.json` records the prototype's illustrative inputs and is **not** a feed of current prices or financial advice. The four-part MVP covers 100 km, distance for ISK 1,000, five-year operating scenarios, and one-owner lifetime scenarios. See `data/assumptions.md` for the provenance gap and the research needed before changing public defaults. Any assumption update must include a source, retrieval/effective date, and review.

## Development

```bash
npm run check
```

This runs unit tests plus a local static-server smoke check. The smoke check serves the site on loopback, requests `/` and `data/defaults.json`, and verifies the four MVP sections.

The site is plain static files and deploys through GitHub Pages Actions. No secrets or runtime backend are required.

## Release boundary

A public push/deploy and the legacy redirect are deliberate public changes. Validate calculator tests and the deployed URL before changing the redirect. The legacy source remains rollback material until the redirect is accepted.
