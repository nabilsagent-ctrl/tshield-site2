#!/usr/bin/env node
// build-hubspot-config.js — writes config.js at build time from the
// HUBSPOT_PORTAL_ID env var. Vercel runs `npm run build` on every deploy,
// which runs this script, which produces config.js.
//
// Zero-commit activation: set HUBSPOT_PORTAL_ID in Vercel → redeploy →
// tracking live. Unset to disable. No repo edit, no PR.
//
// NAB-215 — HubSpot UTM capture verification, Snippet 1 (static-site variant).

const fs = require('fs');
const path = require('path');

const portalId = (process.env.HUBSPOT_PORTAL_ID || '').trim();
const header = '// Auto-generated at build time by scripts/build-hubspot-config.js.\n// Do not edit by hand. Override via the HUBSPOT_PORTAL_ID env var.\n';
const body = portalId
  ? `window.TOPAZ_HS_PORTAL_ID = ${JSON.stringify(portalId)};\n`
  : 'window.TOPAZ_HS_PORTAL_ID = null;\n';

const outPath = path.join(__dirname, '..', 'config.js');
fs.writeFileSync(outPath, header + body);
console.log('[build-hubspot-config] wrote config.js with portal ID:', portalId ? '[set]' : '[unset]');
