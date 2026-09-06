# @tshield/design-system

The T-Shield website's components as React, in two temperatures (cool graphite for Automotive, warm light for Surface Protection / Franchise). Built 2026-09-06 (TOPAZ-970) so Claude Design can design with real T-Shield parts; the source of truth for the look is the live site.

- `npm install && npm run build` → `dist/index.js` (ESM), `dist/index.d.ts`, `dist/styles.css` (+ `dist/fonts/`).
- Wrap a page in `<ThemeScope temperature="graphite" | "warm">`; every component reads only the `--tsd-*` tokens it sets.
- `demo/` renders a full page in either temperature (`?t=graphite`).
- `.design-sync/` holds the Claude Design sync config, previews, notes and conventions — run `/design-sync` from this directory.
