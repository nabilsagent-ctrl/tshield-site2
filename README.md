# T-Shield — Website Project

**Interior Surface Protection by Topaz**

---

## Project Structure

```
tshield-site/
├── index.html        ← Main HTML (clean, semantic, well-commented)
├── styles.css        ← All CSS styles and animations
├── script.js         ← All JavaScript (burger menu, scroll reveal, counters, etc.)
├── README.md         ← This file
└── assets/
    ├── logo.png
    ├── home-hero.jpg
    ├── residential-kitchen.jpg
    ├── hospitality-table-film.jpg
    ├── installer-film-application.jpg
    ├── surface-wood-film.jpg
    ├── technology-film-closeup.jpg
    ├── surface-marble-film.jpg
    ├── office-table-film.jpg
    └── technology-film-layer.jpg
```

---

## Running Locally

No build tools needed. Just open `index.html` in a browser.

For best results (to avoid CORS issues with assets), use a local server:

```bash
# Python
python3 -m http.server 3000

# Node.js (npx)
npx serve .

# VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

Then visit: `http://localhost:3000`

---

## Brand Colours

| Variable         | Hex       | Usage                          |
|-----------------|-----------|--------------------------------|
| `--white`       | `#FFFFFF` | Primary backgrounds            |
| `--off-white`   | `#F7F7F7` | Alternate section backgrounds  |
| `--light-gray`  | `#EEEEEE` | Borders, dividers              |
| `--mid-gray`    | `#CCCCCC` | Placeholders, muted text       |
| `--gray`        | `#888888` | Body text, descriptions        |
| `--dark-gray`   | `#444444` | Secondary text                 |
| `--charcoal`    | `#2A2A2A` | Headers, nav, footer, dark sections |
| `--red`         | `#EC1D24` | Primary brand accent           |
| `--red-h`       | `#FF2230` | Red hover state                |

---

## Fonts

**Barlow Condensed** — Headings, nav, labels (700/800 weight)  
**Barlow** — Body text, buttons (300/400/600 weight)

Loaded via Google Fonts in `index.html`.

---

## Key Sections

| Section       | ID               | Notes                                 |
|---------------|-----------------|---------------------------------------|
| Hero          | —               | Full viewport, animated entry         |
| Stats Bar     | —               | Dark charcoal, animated counters      |
| About         | `#about`        | Split layout with image hover reveal  |
| Surfaces      | `#surfaces`     | 3-col image grid with hover effects   |
| Technology    | `#technology`   | Layer breakdown + film photo          |
| Process       | —               | Interactive 4-step accordion          |
| Applications  | `#applications` | Card grid with lift animation         |
| FAQ           | —               | Accordion, opens/closes               |
| Franchise     | `#franchise`    | Dark banner CTA                       |
| Contact       | `#contact`      | Split form + franchise info           |
| Footer        | —               | 4-col with Topaz brand family links   |

---

## JavaScript Features (`script.js`)

- **Burger menu** — Full-screen slide-in overlay with staggered link animations
- **Nav scroll** — Shadow appears on scroll
- **Hero zoom** — Subtle scale animation on load
- **Scroll reveal** — Directional fade-in (up / left / right / scale) on scroll
- **Process steps** — Click to activate with animated red bar
- **FAQ accordion** — Click to expand/collapse
- **Smooth scroll** — All anchor links
- **Active nav** — Highlights current section in nav
- **Stat counters** — Numbers count up when scrolled into view

---

## Deployment

Drop the entire `tshield-site/` folder onto:
- **Netlify Drop** → [drop.netlify.com](https://drop.netlify.com)
- **Vercel** → `vercel deploy`
- **GitHub Pages** → push repo, enable Pages in settings

---

## Continuing Development with Claude Code

```bash
# Install Claude Code (requires Node.js)
npm install -g @anthropic-ai/claude-code

# Open project
cd tshield-site
claude
```

---

*Part of the Topaz brand family — thetopazshop.com*
