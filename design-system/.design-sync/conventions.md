# Building with the T-Shield design system

**One brand, two temperatures.** T-Shield (by Topaz Detailing, since 2009) has a cool line — Automotive Paint Protection Film — and a light line — Surface Protection for interiors, plus Franchise. Every page is wrapped once in `ThemeScope` and that wrapper decides the temperature: `<ThemeScope temperature="graphite">` for Automotive, `<ThemeScope temperature="light">` for Surface Protection and Franchise. Without a ThemeScope nothing is styled — the components read only the `--tsd-*` variables it sets. Nest a second ThemeScope only to switch temperature inside a page.

**Styling idiom: tokens and components, never utility classes.** There are no utility classes. Colour, type and spacing come from CSS variables scoped by ThemeScope; use them in any layout glue you write: `var(--tsd-red)` (the ONLY accent), `var(--tsd-ground)`, `var(--tsd-surface)`, `var(--tsd-surface-2)`, `var(--tsd-hairline)`, `var(--tsd-mid)`, `var(--tsd-muted)`, `var(--tsd-ink-2)`, `var(--tsd-ink)`, `var(--tsd-dark)` / `var(--tsd-dark-2)` (neutral graphite — every large dark surface in BOTH temperatures), `var(--tsd-on-dark)`, `var(--tsd-on-dark-muted)`, `var(--tsd-font-display)` (Barlow Condensed, uppercase headlines), `var(--tsd-font-body)` (Barlow), `var(--tsd-gutter)`, `var(--tsd-section)`, `var(--tsd-ease)`, `var(--tsd-dur)`. Compose pages from `Section` (tone `ground` | `surface` | `dark`), `TwoColumn`, `ThreeColumn` and `Actions`; do not reinvent those with your own grids.

**Brand rules the components already encode — keep them in your copy and layout.**
- Red is rationed: the filled `Button`, one `<Heading.Red>` phrase per headline, the `Eyebrow` dash. Numerals, rules and icons are never red.
- Headlines are three short lines: `<Heading level={1}>Protecting<br/><Heading.Red>Vehicles</Heading.Red><br/><Heading.Outline>In the Real</Heading.Outline><br/>World</Heading>`.
- Heritage is always "since 2009" — never a year-count. The single call to action is **"Contact Our Team"** (`Button` with `cta` in the header). Both lines carry a **five-year warranty** (`WarrantyBlock`). Every form ends with "We aim to reply to all enquiries within one working day." (`EnquiryForm` does this).
- A photo and its caption are one unit: use `PhotoCaption`, and constrain it with `maxWidth` — never set a height on a photo frame.
- **No brown, anywhere** (Nabil, 2026-09-07): no beige, tan, taupe, sepia or warm charcoal — not as a surface, not as text, not as a photo tint. The light temperature is a soft NEUTRAL off-white (`--tsd-ground` #F8F7F4) with graphite ink; take every colour from the tokens and never invent a "warm" one.
- Dark surfaces at size (heroes, footers, dark sections) are neutral graphite; `Section tone="dark"` and `Footer` handle this in both temperatures.
- Tone is measured: no exclamation marks, no hype. Photographs are the live site's own (`https://www.t-shield.co/assets/photos/…`).

**Where the truth lives.** `styles.css` → `_ds_bundle.css` holds every component style and the token definitions (`.tsd--graphite`, `.tsd--light`); read it before writing custom CSS. Each component's props are in `components/general/<Name>/<Name>.d.ts` and its usage in `<Name>.prompt.md`.

**A page in the idiom:**
```tsx
<ThemeScope temperature="light">
  <TopStrip />
  <Header suffix="/ Surface Protection" links={[{label:'Surfaces',href:'#surfaces',current:true},{label:'Warranty',href:'#warranty'},{label:'Contact',href:'#contact'}]} />
  <Hero image="https://www.t-shield.co/assets/photos/i01-interior-hero.jpg" eyebrow="Interior Surface Protection"
        title={<>Protecting<br/><Heading.Red>Exceptional</Heading.Red><br/><Heading.Outline>Interiors</Heading.Outline></>}
        lead="The most beautiful interiors are defined by the materials that shape them."
        actions={<><Button href="#surfaces">Explore Protection</Button><Button variant="ghost" href="#contact">Contact Our Team</Button></>}
        pills={['Invisible Shield','Self-Healing Film','Five-Year Warranty']} />
  <Section id="surfaces"><TwoColumn>
    <SectionHeader eyebrow="Built on Topaz Expertise" title={<>The Same<br/><Heading.Red>Standards.</Heading.Red><br/>Every Surface.</>} intro="Developed by Topaz Detailing since 2009." />
    <PhotoCaption src="https://www.t-shield.co/assets/photos/i02-about-application.jpg" alt="Film applied to marble" ratio="45" title="Invisible by Design" sub="Zero visual impact — total surface protection" />
  </TwoColumn></Section>
  <Section tone="surface" id="warranty"><WarrantyBlock subject="surface" /></Section>
  <Section tone="dark" id="contact"><TwoColumn><SectionHeader eyebrow="Get in Touch" title={<>Speak With<br/>Our <Heading.Red>Team</Heading.Red></>} light /><EnquiryForm page="interior" /></TwoColumn></Section>
  <Footer description="Developed by Topaz — the world standard in protective film technology since 2009." columns={[{heading:'Company',links:[{label:'Contact',href:'#contact'}]}]} />
</ThemeScope>
```
