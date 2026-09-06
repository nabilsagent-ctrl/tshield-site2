import React from 'react';

/** `graphite` = Automotive (cool, white ground, dark hero). `light` = Surface Protection / Franchise (soft neutral off-white ground, graphite ink).
 *  `warm` is a deprecated alias of `light` — it renders the identical neutral palette. There is no brown temperature. */
export type Temperature = 'graphite' | 'light' | 'warm';

export interface ThemeScopeProps {
  /** Which of the two T-Shield temperatures this subtree renders in: `graphite` (Automotive) or `light` (Surface Protection / Franchise). */
  temperature?: Temperature;
  /** Render as a different root element (default `div`). */
  as?: 'div' | 'main' | 'section' | 'article' | 'body';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Root wrapper that scopes the design tokens. Every T-Shield component must sit inside a ThemeScope —
 * it sets the `--tsd-*` variables for the chosen temperature (`graphite` for Automotive, `light` for
 * Surface Protection and Franchise). Wrap a whole page once; nest a second ThemeScope only to switch temperature.
 * Both temperatures are neutral: cool greys on white, or soft neutral off-white — never beige or brown.
 */
export function ThemeScope({ temperature = 'light', as = 'div', className, style, children }: ThemeScopeProps) {
  const Tag = as as keyof JSX.IntrinsicElements;
  const t = temperature === 'warm' ? 'light' : temperature;
  return React.createElement(Tag, { className: ['tsd', `tsd--${t}`, className].filter(Boolean).join(' '), style }, children);
}
