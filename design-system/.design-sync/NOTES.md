# design-sync notes — @tshield/design-system

- The package lives in `design-system/` inside the static-site repo `nabilsagent-ctrl/tshield-site2`; run every sync command from this directory. Node 22 at `~/.local/node/bin` (no Homebrew on the MacBook Pro).
- Build: `npm run build` = esbuild (dist/index.js ESM + dist/styles.css with fonts copied to dist/fonts/) then `tsc --emitDeclarationOnly` for the `.d.ts` tree.
- Render check: no playwright browser cache on this machine — use the installed Google Chrome via `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` (both validate and capture honour it). Playwright installed with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`.
- Every component reads `--tsd-*` tokens scoped by `ThemeScope` (`.tsd.tsd--warm` / `.tsd.tsd--graphite`). `cfg.provider` wraps previews in the warm temperature; graphite cells nest their own `<ThemeScope temperature="graphite">` inside the authored preview.
- Photos in previews are the live site's own assets (`https://www.t-shield.co/assets/photos/*.jpg`) — network is required when rendering previews.
- Two temperatures, one rule: large dark surfaces are always neutral graphite (`--tsd-dark`), never the warm charcoal (reads brown at size — Nabil, 2026-09-06).

## Known render warns
- none at the 2026-09-06 first sync (validate exits clean; the two earlier `[GRID_OVERFLOW]` warns on FeatureCard/Heading were resolved with `cardMode: column`).

## Re-sync risks
- Previews load photographs from the LIVE site (`https://www.t-shield.co/assets/photos/*.jpg`). If a photo is renamed or the site moves, those cells render empty frames — re-point the URLs in `.design-sync/previews/*.tsx`.
- `DS_CHROMIUM_PATH` must point at an installed Google Chrome; no playwright browser is cached on this machine.
- The converter drops ALL-CAPS export names (PascalCase rule) — that is why the accordion is `Faq`, not `FAQ`. Keep new exports PascalCase.
- Temperature-specific surfaces are tokens (`--tsd-strip-bg`, `--tsd-card-bg`, `--tsd-footer-*`), never `.tsd--warm .x` descendant rules — a graphite block nested inside a warm page would otherwise inherit the warm override (found and fixed 2026-09-06 on Footer/TopStrip).
- `cfg.overrides.*.viewport` values were tuned for the 1280-wide desktop cards; changing them re-stamps grade keys (full `package-build.mjs`, then re-grade the affected sheets).
- Fonts are self-hosted copies of Barlow / Barlow Condensed (Google Fonts, OFL) in `fonts/`; re-download only if weights change.
