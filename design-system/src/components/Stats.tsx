import React from 'react';

export interface Stat { value: string; label: string; }
export interface StatBarProps {
  items?: Stat[];
  /** `light` (default) hairline tiles on the page; `dark` neutral graphite band with a red top rule. */
  tone?: 'light' | 'dark';
  className?: string;
}
/**
 * Row of statistic tiles ("2009 / Founded", "5 / Year Warranty", "All / Vehicle Types"). Numerals are charcoal or
 * white — never red. Stacks to one column on phones. Only publish figures that have been signed off.
 */
export function StatBar({ items = [], tone = 'light', className }: StatBarProps) {
  return (
    <div className={['tsd-stats', tone === 'dark' && 'tsd-stats--dark', className].filter(Boolean).join(' ')} style={{ ['--tsd-stat-cols' as string]: String(items.length) } as React.CSSProperties}>
      {items.map((s) => (
        <div className="tsd-stat" key={s.label}><div className="tsd-stat__n">{s.value}</div><div className="tsd-stat__l">{s.label}</div></div>
      ))}
    </div>
  );
}
