# Rafbíll vs eldsneytisbíll

Public Icelandic static calculator comparing illustrative energy costs for electric and fuel vehicles.

## Status and provenance

This repository starts as a migration of the canonical legacy source from `arnthorsnaer.io/static/km-kostnadur/`. `data/defaults.json` records the prototype's illustrative inputs and is **not** a feed of current prices or financial advice. Any assumption update must include a source, retrieval/effective date, and review.

## Development

```bash
npm test
```

The site is plain static files and deploys through GitHub Pages Actions. No secrets or runtime backend are required.

## Release boundary

A public push/deploy and the legacy redirect are deliberate public changes. Validate calculator tests and the deployed URL before changing the redirect. The legacy source remains rollback material until the redirect is accepted.
