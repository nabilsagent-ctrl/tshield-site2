#!/usr/bin/env node
// inject-jsonld.js — idempotent JSON-LD injector for the T-Shield site.
// Inserts a page-specific <script type="application/ld+json"> block into the
// <head> of each .html file, directly after the apple-touch-icon <link>.
//
// Run from repo root:  node inject-jsonld.js
// Re-running is safe — it skips any page that already has a JSON-LD block
// with id "tshield-jsonld".
//
// NAB-156 — SEO structured data layer (no brand-architecture decision required).

const fs = require('fs');
const path = require('path');

const SITE = 'https://www.t-shield.co';

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'T-Shield',
  alternateName: 'T-Shield by Topaz',
  url: `${SITE}/`,
  logo: `${SITE}/assets/logo.png`,
  description: 'Advanced protective film technology for automotive and interior surfaces.',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Topaz Detailing',
    url: 'https://www.topazdetailing.com/',
  },
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: `${SITE}/`,
  name: 'T-Shield',
  publisher: { '@id': `${SITE}/#organization` },
  inLanguage: 'en-GB',
};

const PAGE_NODES = {
  'index.html': [
    {
      '@type': 'WebPage',
      '@id': `${SITE}/index.html#webpage`,
      url: `${SITE}/index.html`,
      name: 'T-Shield — Choose Your Protection',
      description: 'Advanced protective film technology for automotive and interior surfaces.',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#organization` },
      primaryImageOfPage: `${SITE}/assets/home-hero.jpg`,
      inLanguage: 'en-GB',
    },
  ],
  'tshield-landing.html': [
    {
      '@type': 'WebPage',
      '@id': `${SITE}/tshield-landing.html#webpage`,
      url: `${SITE}/tshield-landing.html`,
      name: 'T-Shield — Choose Your Protection',
      description: 'Advanced protective film technology for automotive and interior surfaces.',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#organization` },
      primaryImageOfPage: `${SITE}/assets/home-hero.jpg`,
      inLanguage: 'en-GB',
    },
  ],
  'surface-protection.html': [
    {
      '@type': 'Service',
      '@id': `${SITE}/surface-protection.html#service`,
      name: 'Interior Surface Protection Film',
      alternateName: 'T-Shield Surface Protection',
      serviceType: 'Surface protection film installation',
      description:
        'Invisible protective film for marble, stone, wood, glass, worktops, walls and interior surfaces. Protects against scratches, spills, stains and wear in residential, hospitality and commercial environments.',
      provider: { '@id': `${SITE}/#organization` },
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
      audience: [
        { '@type': 'Audience', audienceType: 'Homeowners' },
        { '@type': 'Audience', audienceType: 'Hospitality operators' },
        { '@type': 'Audience', audienceType: 'Commercial fit-out contractors' },
      ],
      image: `${SITE}/assets/surface-marble-film.jpg`,
      url: `${SITE}/surface-protection.html`,
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE}/surface-protection.html#webpage`,
      url: `${SITE}/surface-protection.html`,
      name: 'T-Shield — Surface Protection',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/surface-protection.html#service` },
      primaryImageOfPage: `${SITE}/assets/surface-marble-film.jpg`,
      inLanguage: 'en-GB',
    },
  ],
  'tshield-automotive.html': [
    {
      '@type': 'Service',
      '@id': `${SITE}/tshield-automotive.html#service`,
      name: 'Automotive Paint Protection Film',
      alternateName: 'T-Shield Automotive PPF',
      serviceType: 'Paint protection film installation',
      description:
        'High-performance, self-healing paint protection film for premium and exotic vehicles. Fifteen years of world-class installation craft delivered by Topaz.',
      provider: { '@id': `${SITE}/#organization` },
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
      audience: [{ '@type': 'Audience', audienceType: 'Premium vehicle owners' }],
      image: `${SITE}/assets/automotive-hero.jpg`,
      url: `${SITE}/tshield-automotive.html`,
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE}/tshield-automotive.html#webpage`,
      url: `${SITE}/tshield-automotive.html`,
      name: 'T-Shield — Automotive Paint Protection Film',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/tshield-automotive.html#service` },
      primaryImageOfPage: `${SITE}/assets/automotive-hero.jpg`,
      inLanguage: 'en-GB',
    },
  ],
  'franchise.html': [
    {
      '@type': 'WebPage',
      '@id': `${SITE}/franchise.html#webpage`,
      url: `${SITE}/franchise.html`,
      name: 'T-Shield — Franchise Opportunities',
      description:
        'Franchise opportunities with T-Shield by Topaz: territory model, training programme, and ongoing support for surface protection film operators.',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#organization` },
      primaryImageOfPage: `${SITE}/assets/hospitality-table-film.jpg`,
      inLanguage: 'en-GB',
    },
  ],
};

const ANCHOR_RE = /([ \t]*)<link[^>]*rel="apple-touch-icon"[^>]*>/;
const MARKER = 'id="tshield-jsonld"';

function buildGraph(pageName) {
  const extra = PAGE_NODES[pageName] || [];
  return {
    '@context': 'https://schema.org',
    '@graph': [ORGANIZATION, WEBSITE, ...extra],
  };
}

function buildScriptBlock(indent, graph) {
  const json = JSON.stringify(graph, null, 2)
    .split('\n')
    .map((l) => indent + l)
    .join('\n');
  return `\n${indent}<script type="application/ld+json" ${MARKER}>\n${json}\n${indent}</script>`;
}

function processFile(file) {
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes(MARKER)) {
    console.log(`SKIP  ${file} (already has JSON-LD)`);
    return 'skip';
  }
  const m = html.match(ANCHOR_RE);
  if (!m) {
    console.log(`MISS  ${file} (anchor not found — no change)`);
    return 'miss';
  }
  const indent = m[1] || '  ';
  const block = buildScriptBlock(indent, buildGraph(path.basename(file)));
  const anchorLine = m[0];
  const updated = html.replace(anchorLine, anchorLine + block);
  fs.writeFileSync(file, updated, 'utf8');
  console.log(`OK    ${file}  (+${block.length} chars)`);
  return 'inject';
}

function main() {
  const root = process.cwd();
  const files = Object.keys(PAGE_NODES).map((n) => path.join(root, n));
  let injected = 0, skipped = 0, missed = 0;
  for (const f of files) {
    if (!fs.existsSync(f)) { console.log(`GONE  ${f}`); continue; }
    const r = processFile(f);
    if (r === 'inject') injected++;
    else if (r === 'skip') skipped++;
    else if (r === 'miss') missed++;
  }
  console.log(`---`);
  console.log(`injected=${injected} skipped=${skipped} missed=${missed}`);
}

main();
