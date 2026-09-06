import React from 'react';

export interface TopStripProps {
  /** Strip text. Defaults to the brand endorsement line. Use `<b>` for the red word. */
  children?: React.ReactNode;
  /** Optional back link shown before the text (e.g. to the homepage). */
  backHref?: string;
  backLabel?: string;
  className?: string;
}

/**
 * The thin endorsement strip above the header: "By Topaz — World-Class Protective Film Expertise Since 2009".
 * Always says "since 2009" — never a year-count. Truncates to one line on phones.
 */
export function TopStrip({ children, backHref, backLabel = '← T-Shield Home', className }: TopStripProps) {
  return (
    <div className={['tsd-topstrip', className].filter(Boolean).join(' ')}>
      {backHref && (<><a href={backHref}>{backLabel}</a>&nbsp;·&nbsp;</>)}
      {children ?? (<>By <b>Topaz</b> — World-Class Protective Film Expertise Since 2009</>)}
    </div>
  );
}
