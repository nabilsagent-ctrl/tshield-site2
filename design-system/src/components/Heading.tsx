import React from 'react';

export interface HeadingProps {
  /** Semantic level and size: 1 = hero headline, 2 = section headline, 3 = card/sub headline. */
  level?: 1 | 2 | 3;
  /** Force light (white) type, e.g. on a photo or dark ground. Inside Hero and dark sections this happens automatically. */
  light?: boolean;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Condensed uppercase headline. Compose the brand's editorial treatment with the sub-elements:
 * `<Heading.Red>` for the one red phrase and `<Heading.Outline>` for the one outlined line, with `<br />` between lines.
 * Example: `<Heading level={2}>Five-Year<br/><Heading.Red>Warranty.</Heading.Red><br/><Heading.Outline>Total Peace</Heading.Outline><br/>of Mind.</Heading>`
 */
export function Heading({ level = 2, light, children, className, id }: HeadingProps) {
  const Tag = (`h${level}`) as 'h1' | 'h2' | 'h3';
  return <Tag id={id} className={['tsd-h', `tsd-h--${level}`, light && 'tsd-h--light', className].filter(Boolean).join(' ')}>{children}</Tag>;
}
/** The single red phrase inside a Heading. */
function Red({ children }: { children: React.ReactNode }) { return <span className="tsd-red">{children}</span>; }
/** The single outlined (stroked, transparent) line inside a Heading. */
function Outline({ children }: { children: React.ReactNode }) { return <span className="tsd-outline">{children}</span>; }
Heading.Red = Red;
Heading.Outline = Outline;

export interface LeadProps { children: React.ReactNode; className?: string; }
/** Intro paragraph under a headline (slightly larger body copy). */
export function Lead({ children, className }: LeadProps) { return <p className={['tsd-lead', className].filter(Boolean).join(' ')}>{children}</p>; }
/** Standard body paragraph. */
export function Body({ children, className }: LeadProps) { return <p className={['tsd-body', className].filter(Boolean).join(' ')}>{children}</p>; }
