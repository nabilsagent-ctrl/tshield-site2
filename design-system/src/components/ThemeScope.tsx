import React from 'react';

export type Temperature = 'graphite' | 'warm';

export interface ThemeScopeProps {
  /** Which of the two T-Shield temperatures this subtree renders in: `graphite` (Automotive, cool) or `warm` (Surface Protection / Franchise, warm light). */
  temperature?: Temperature;
  /** Render as a different root element (default `div`). */
  as?: 'div' | 'main' | 'section' | 'article' | 'body';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Root wrapper that scopes the design tokens. Every T-Shield component must sit inside a ThemeScope —
 * it sets the `--tsd-*` variables for the chosen temperature (`graphite` for Automotive, `warm` for
 * Surface Protection and Franchise). Wrap a whole page once; nest a second ThemeScope only to switch temperature.
 */
export function ThemeScope({ temperature = 'warm', as = 'div', className, style, children }: ThemeScopeProps) {
  const Tag = as as keyof JSX.IntrinsicElements;
  return React.createElement(Tag, { className: ['tsd', `tsd--${temperature}`, className].filter(Boolean).join(' '), style }, children);
}
