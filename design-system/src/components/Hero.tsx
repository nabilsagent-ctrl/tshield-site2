import React from 'react';
import { Eyebrow } from './Eyebrow';
import { Heading, Lead } from './Heading';
import { Actions } from './Button';
import { Pills } from './Tag';

export interface HeroProps {
  /** Background photograph URL (the family's grade is applied automatically). */
  image?: string;
  /** Red pill label above the headline, e.g. "Paint Protection Film". */
  eyebrow?: string;
  /** Headline — three short lines with `<br/>`, one `<Heading.Red>` phrase, optionally one `<Heading.Outline>` line. */
  title: React.ReactNode;
  /** One paragraph. */
  lead?: React.ReactNode;
  /** Buttons (a filled + a ghost `Button`). */
  actions?: React.ReactNode;
  /** Feature pills under the buttons, e.g. ["Self-Healing Film", "Invisible Protection", "5-Year Warranty"]. */
  pills?: string[];
  /** Minimum height (default 640px; pass e.g. "92vh" to fill the viewport). */
  minHeight?: string;
  className?: string;
}

/**
 * Full-width page hero: photograph with the family's graphite/amber veil, red pill eyebrow, condensed headline,
 * one paragraph, the button pair and feature pills. Type is white; the ghost button switches to its on-dark style.
 */
export function Hero({ image = 'https://www.t-shield.co/assets/photos/i01-interior-hero.jpg', eyebrow, title, lead, actions, pills, minHeight, className }: HeroProps) {
  return (
    <section className={['tsd-hero', className].filter(Boolean).join(' ')} style={minHeight ? { minHeight } : undefined}>
      <div className="tsd-hero__bg" style={{ backgroundImage: `url(${image})` }} role="img" aria-label="" />
      <div className="tsd-hero__veil" />
      <div className="tsd-hero__content">
        {eyebrow && <Eyebrow variant="pill">{eyebrow}</Eyebrow>}
        <Heading level={1} light>{title}</Heading>
        {lead && <Lead>{lead}</Lead>}
        {actions && <Actions>{actions}</Actions>}
        {pills && pills.length > 0 && <Pills items={pills} />}
      </div>
    </section>
  );
}
