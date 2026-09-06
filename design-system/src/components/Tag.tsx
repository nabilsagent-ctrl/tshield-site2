import React from 'react';

export interface TagProps {
  children: React.ReactNode;
  /** `outline` (default) hairline tag; `red` solid red; `dot` adds a red dot before the label. */
  variant?: 'outline' | 'red' | 'dot';
  className?: string;
}
/** Small uppercase tag or pill for labels such as "Surface 01" or "Paint Protection Film". */
export function Tag({ children, variant = 'outline', className }: TagProps) {
  return <span className={['tsd-tag', variant === 'red' && 'tsd-tag--red', variant === 'dot' && 'tsd-tag--dot', className].filter(Boolean).join(' ')}>{children}</span>;
}

export interface PillsProps { items?: string[]; className?: string; }
/** Row of red-dot feature pills used under a hero paragraph ("Self-Healing Film · Invisible Protection · 5-Year Warranty"). */
export function Pills({ items = [], className }: PillsProps) {
  return <div className={['tsd-pills', className].filter(Boolean).join(' ')}>{items.map((t) => <span key={t} className="tsd-pill">{t}</span>)}</div>;
}
