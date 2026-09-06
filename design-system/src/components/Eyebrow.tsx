import React from 'react';

export interface EyebrowProps {
  children: React.ReactNode;
  /** `dash` (default): red dash + red label. `pill`: solid red pill with white text (hero use). */
  variant?: 'dash' | 'pill';
  className?: string;
}

/** Small uppercase red label that introduces every section ("Long-Term Confidence", "What You Get"). */
export function Eyebrow({ children, variant = 'dash', className }: EyebrowProps) {
  return <div className={['tsd-eyebrow', variant === 'pill' && 'tsd-eyebrow--pill', className].filter(Boolean).join(' ')}>{children}</div>;
}
