# HUMAN_RUNBOOK — tshield-site2

The plain path to view, change, and ship this site with **no AI assistance**. If a human contractor can follow this, so can any AI. This is the **LIVE public T-Shield website** (www.t-shield.co) — ship carefully.

## 0. Accounts you need (logins, not AI)
- **GitHub:** collaborator on `nabilsagent-ctrl/tshield-site2`.
- **Vercel:** the project that auto-deploys this repo's `main` branch to `tshield-site2.vercel.app` / `www.t-shield.co`.
- **HubSpot** (only if touching form tracking): the portal ID, set as the `HUBSPOT_PORTAL_ID` env var in Vercel — never committed.
- **Secrets / env values:** `🧠 Claude/🔐 secrets/` in Drive + your machine keychain. **Never commit them.**

## 1. One-time setup
1. Install **Node** (only needed for the tiny build script and a local server) + git.
2. Authenticate git to GitHub via `gh auth login` or a one-time keychain prompt — **never a token in a file** (committed tokens are auto-revoked).
3. Clone: `git clone https://github.com/nabilsagent-ctrl/tshield-site2.git ~/dev/tshield-site2`
4. `cd ~/dev/tshield-site2`. There are no runtime npm dependencies to install.

## 2. View it locally
No build tools needed to look at the site.
```
python3 -m http.server 3000      # then open http://localhost:3000
# or
npx serve .
```
Open each page and click through: `index.html`, `tshield-automotive.html`, `surface-protection.html`, `tshield-landing.html`, `franchise.html`, `404.html`. Check nav, burger menu, FAQ accordion, scroll animations, and any contact form.

## 3. The build step (what Vercel runs)
```
npm run build      # = node scripts/build-hubspot-config.js
```
This regenerates `config.js` from the `HUBSPOT_PORTAL_ID` env var. With the var unset it writes `window.TOPAZ_HS_PORTAL_ID = null;` (tracking off) — safe to run anytime. **Do not hand-edit `config.js`** — your edit will be overwritten on the next deploy. There is **no test suite and no CI** — verification is manual (section 2).

## 4. Ship a change
```
git checkout -b fix/<slug>
# edit HTML/CSS/JS, then view locally (section 2) and click through the changed pages
git -C . add <specific files>          # never -A
git -C . commit -m "<message>"
git -C . push origin fix/<slug>
# open a PR on GitHub → eyeball-verify → merge to main
```
Vercel auto-deploys `main` in ~1 min. **Then open www.t-shield.co and confirm the live page** — there is no CI to catch a mistake.

## 5. Turn HubSpot form tracking on/off (no code change)
- **On:** set `HUBSPOT_PORTAL_ID` to the portal ID in the Vercel project → redeploy.
- **Off:** unset `HUBSPOT_PORTAL_ID` in Vercel → redeploy.
No repo edit and no PR required — the build regenerates `config.js` from the env var.

## 6. Update SEO structured data
If you change page copy or structure, regenerate the JSON-LD blocks:
```
node scripts/inject-jsonld.js      # run from repo root; idempotent, skips pages already done
```
Commit the changed `.html` files on your branch as in section 4.

## 7. If a deploy breaks
- **Vercel dashboard → Deployments → roll back** to the last good one (one click, instant).
- Then fix forward on a branch.

## Where the knowledge is
- **Page map, brand colours, fonts, JS features:** `README.md` in this repo.
- **Scope, health, improvement backlog:** `PROJECT_STATUS.md` in this repo.
- **Architecture + conventions:** `AGENTS.md` in this repo.
- **Project status + brand assets:** the shared Drive "🛡️ T-Shield" folder.

*Part of the AI-portability failsafe — see `🧠 Claude/🆘 If Claude Fails/` in Drive.*
