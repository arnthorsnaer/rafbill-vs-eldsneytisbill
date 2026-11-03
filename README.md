# Rafbíll vs eldsneytisbíll

Public Icelandic static calculator comparing illustrative energy costs for electric and fuel vehicles.

## Status and provenance

This repository is a four-part scenario calculator for the fixed Škoda Enyaq iV 80 (2022) and Škoda Kodiaq 1.5 TSI ACT 150 (2021) reference pair. `data/defaults.json` records dated tariffs, vehicle ratings, and clearly labelled editable scenario assumptions; it is not a price feed or financial advice. See `data/assumptions.md` for sources, tariff conditions, and uncertainty. Any assumption update must include a source, retrieval/effective date, and review.

## Development

```bash
npm run check
```

This runs unit tests plus a local static-server smoke check. The smoke check serves the site on loopback, requests `/` and `data/defaults.json`, and verifies the four MVP sections.

The site is plain static files and deploys through GitHub Pages Actions. No secrets or runtime backend are required.

## Release boundary

A public push/deploy and the legacy redirect are deliberate public changes. Validate calculator tests and the deployed URL before changing the redirect. The legacy source remains rollback material until the redirect is accepted.
