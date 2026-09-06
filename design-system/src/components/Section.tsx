import React from 'react';

export interface SectionProps {
  /** `ground` (default) page colour; `surface` the family's off-white; `dark` neutral graphite with white type. */
  tone?: 'ground' | 'surface' | 'dark';
  /** Remove vertical padding (for full-bleed content). */
  flush?: boolean;
  id?: string;
  children: React.ReactNode;
  className?: string;
}
/** Page section with the brand's vertical rhythm and a centred 1320px container. */
export function Section({ tone = 'ground', flush, id, children, className }: SectionProps) {
  return (
    <section id={id} className={['tsd-section', tone === 'surface' && 'tsd-section--surface', tone === 'dark' && 'tsd-section--dark', flush && 'tsd-section--flush', className].filter(Boolean).join(' ')}>
      <div className="tsd-container">{children}</div>
    </section>
  );
}

export interface TwoColumnProps { children: React.ReactNode; center?: boolean; className?: string; }
/** Two equal columns (80px gap) that stack under 1060px — the site's standard text + photo layout. */
export function TwoColumn({ children, center, className }: TwoColumnProps) { return <div className={['tsd-two', center && 'tsd-two--center', className].filter(Boolean).join(' ')}>{children}</div>; }
export interface ThreeColumnProps { children: React.ReactNode; className?: string; }
/** Three equal columns that stack under 768px — for cards. */
export function ThreeColumn({ children, className }: ThreeColumnProps) { return <div className={['tsd-three', className].filter(Boolean).join(' ')}>{children}</div>; }
