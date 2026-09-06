import React from 'react';
import { Heading } from './Heading';

export interface FeatureCardProps {
  /** Optional two-digit index shown in red above the title ("01"). */
  index?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}
/** Hairline-bordered card with a condensed uppercase title and short copy. Three per row on desktop, one on phones. */
export function FeatureCard({ index, title, children, className }: FeatureCardProps) {
  return (
    <div className={['tsd-card', className].filter(Boolean).join(' ')}>
      {index && <div className="tsd-card__n">{index}</div>}
      <Heading level={3}>{title}</Heading>
      <p>{children}</p>
    </div>
  );
}
