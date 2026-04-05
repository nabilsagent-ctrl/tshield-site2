# T-Shield Site 2 – Status

_Last updated: 2026-04-05_

## 1. Purpose

`tshield-site2` is a static HTML/CSS/JS prototype for the T‑Shield marketing experience:

- `index.html` – dark split landing to route between automotive PPF and interior surface protection.
- `tshield-automotive.html` – long‑form PPF page for vehicles.
- `surface-protection.html` – long‑form interior surface protection page.
- `tshield-landing.html` – alternate split chooser variant.

This project is **static** (no real build step) and is used as a design and UX sandbox alongside the main Next.js site in `tshield-site`.

## 2. Build / Health

- `npm run build` → no-op shell script (`echo 'Static site – no build step required.'`).
- No frameworks, bundlers, or external deps beyond Google Fonts.
- Current health:
  - Pages load independently when served via a simple static server.
  - Navigation and mobile menus function on all pages.
  - Basic accessibility hooks are in place (skip links, focus styles, ARIA on nav/FAQ/collapsibles).

## 3. Recent Work

- Improved accessibility on the hero split shield icon in `index.html`:
  - Marked decorative SVG as `aria-hidden="true"` and `focusable="false"` so it is ignored by screen readers and keyboard focus.
- Added this `PROJECT_STATUS.md` to document scope and health for cron runs.

## 4. Known / Future Improvements (for cron runs)

These are **small, self‑contained improvements** suitable for future cron passes:

1. Tighten mobile spacing on `index.html` split layout (panels sometimes feel tall on small devices).
2. Standardise brand red values across `index.html` and `surface-protection.html` (currently using slightly different reds).
3. Add basic 404 / fallback messaging pattern for when individual HTML files are deployed behind a single entrypoint.
4. Light optimisation pass on image assets (file sizes) once the design stabilises.

Larger structural work (e.g. merging this prototype into the Next.js app) should happen in the `tshield-site` project, not here.