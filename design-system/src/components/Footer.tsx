import React from 'react';

export interface FooterColumn { heading: string; links: { label: string; href: string }[]; }
export interface FooterProps {
  brand?: string;
  logoSrc?: string;
  /** One or two sentences under the brand. Ends with "Developed by Topaz Detailing since 2009." on the live site. */
  description?: React.ReactNode;
  columns?: FooterColumn[];
  /** Legal line, e.g. "© 2026 T-Shield. All rights reserved. Part of the Topaz Group." Add the entity + company number once confirmed. */
  legal?: React.ReactNode;
  className?: string;
}
/** Page footer: brand + description, link columns with red-underlined headings, legal line and the "A Topaz brand" mark. Neutral graphite in the graphite family, warm surface in the warm family. */
export function Footer({ brand = 'T‑Shield', logoSrc = 'https://www.t-shield.co/assets/logo.png', description, columns = [], legal, className }: FooterProps) {
  return (
    <footer className={['tsd-footer', className].filter(Boolean).join(' ')}>
      <div className="tsd-footer__grid">
        <div>
          <div className="tsd-footer__brand"><img src={logoSrc} alt="" /><span>{brand}</span></div>
          {description && <p className="tsd-footer__desc">{description}</p>}
        </div>
        {columns.map((c) => (
          <div key={c.heading}><div className="tsd-footer__h">{c.heading}</div><ul className="tsd-footer__links">{c.links.map((l) => <li key={l.href + l.label}><a href={l.href}>{l.label}</a></li>)}</ul></div>
        ))}
      </div>
      <div className="tsd-footer__bottom"><span>{legal ?? `© ${new Date().getFullYear()} T-Shield. All rights reserved. Part of the Topaz Group.`}</span><span>A <b>Topaz</b> brand</span></div>
    </footer>
  );
}
