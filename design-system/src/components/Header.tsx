import React, { useEffect, useState } from 'react';
import { Button } from './Button';

export interface NavLink { label: string; href: string; current?: boolean; }
export interface HeaderProps {
  /** Brand name shown next to the shield (default "T-Shield"). */
  brand?: string;
  /** Muted suffix after the brand, e.g. "/ Surface Protection". Hidden on phones. */
  suffix?: string;
  logoSrc?: string;
  homeHref?: string;
  links?: NavLink[];
  /** The single header call to action (default "Contact Our Team" → #contact). */
  ctaLabel?: string;
  ctaHref?: string;
  /** Adds the scrolled shadow (normally driven by scroll position; set true in static previews). */
  scrolled?: boolean;
  className?: string;
}

/**
 * Sticky page header: shield + brand, the nav links, and ONE red call to action ("Contact Our Team").
 * Collapses to a burger with a working mobile menu under 1060px; the CTA shortens to "Contact" under 420px.
 */
export function Header({ brand = 'T‑Shield', suffix, logoSrc = 'https://www.t-shield.co/assets/logo.png', homeHref = '/', links = [], ctaLabel = 'Contact Our Team', ctaHref = '#contact', scrolled, className }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(!!scrolled);
  useEffect(() => {
    if (scrolled !== undefined || typeof window === 'undefined') return;
    const on = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [scrolled]);
  return (
    <header className={['tsd-header', isScrolled && 'tsd-header--scrolled', className].filter(Boolean).join(' ')}>
      <a className="tsd-brand" href={homeHref}>
        <img className="tsd-brand__logo" src={logoSrc} alt="T-Shield" />
        <span className="tsd-brand__name">{brand}{suffix && <span> {suffix}</span>}</span>
      </a>
      <nav aria-label="Primary">
        <ul className="tsd-nav">{links.map((l) => <li key={l.href}><a href={l.href} aria-current={l.current ? 'true' : undefined}>{l.label}</a></li>)}</ul>
      </nav>
      <div className="tsd-header__right">
        <Button size="sm" href={ctaHref} cta>{ctaLabel}</Button>
        <button className="tsd-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}><span /><span /><span /></button>
      </div>
      {open && (
        <div className="tsd-mobile-menu"><ul>{links.map((l) => <li key={l.href}><a href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>)}</ul></div>
      )}
    </header>
  );
}
