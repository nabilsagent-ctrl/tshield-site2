import React from 'react';

export interface DividerProps {
  /** URL of the T-Shield shield mark (defaults to the live site asset). */
  markSrc?: string;
  className?: string;
}
/** Section divider: two fading hairlines with the faint shield mark between them. */
export function Divider({ markSrc = 'https://www.t-shield.co/assets/logo.png', className }: DividerProps) {
  return <div className={['tsd-divider', className].filter(Boolean).join(' ')} aria-hidden="true"><img src={markSrc} alt="" /></div>;
}
