import React from 'react';
import { Eyebrow } from './Eyebrow';
import { Heading, Lead } from './Heading';

export interface SectionHeaderProps {
  /** The small red label above the headline. */
  eyebrow: string;
  /** Headline content — use `<Heading.Red>` for the red phrase and `<br/>` for line breaks. */
  title: React.ReactNode;
  /** Optional intro paragraph. */
  intro?: React.ReactNode;
  /** Heading level (default 2). */
  level?: 1 | 2 | 3;
  light?: boolean;
  className?: string;
}
/** Eyebrow + headline (+ optional intro) that opens every section of a T-Shield page. */
export function SectionHeader({ eyebrow, title, intro, level = 2, light, className }: SectionHeaderProps) {
  return (
    <div className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading level={level} light={light}>{title}</Heading>
      {intro && <Lead>{intro}</Lead>}
    </div>
  );
}
