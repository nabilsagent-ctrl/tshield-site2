import React from 'react';

export interface ButtonProps {
  /** `filled` = the red primary action (one per screen area). `ghost` = outlined secondary. */
  variant?: 'filled' | 'ghost';
  /** `sm` is the header CTA size. */
  size?: 'md' | 'sm';
  /** Renders an `<a>` when set, otherwise a `<button>`. */
  href?: string;
  /** For ghost buttons placed on a dark photo/ground outside Hero or a dark section. */
  onDark?: boolean;
  /** Full-width (form submit). */
  block?: boolean;
  /** Header CTA: wraps the label so "Contact Our Team" shortens to "Contact" under 420px. */
  cta?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

/**
 * The T-Shield button. Filled red for the single primary action, ghost for the secondary one; both are the same
 * height. The site-wide call to action reads "Contact Our Team" — use that wording for any link into a contact form.
 */
export function Button({ variant = 'filled', size = 'md', href, onDark, block, cta, type = 'button', disabled, onClick, children, className, target, rel }: ButtonProps) {
  const cls = ['tsd-btn', `tsd-btn--${variant}`, size === 'sm' && 'tsd-btn--sm', onDark && 'tsd-btn--on-dark', block && 'tsd-btn--block', cta && 'tsd-btn--cta', className].filter(Boolean).join(' ');
  const label = cta && typeof children === 'string' && children.startsWith('Contact ')
    ? (<span>Contact<span className="tsd-btn__x">{children.slice('Contact'.length)}</span></span>)
    : children;
  if (href) return <a className={cls} href={href} onClick={onClick} target={target} rel={rel}>{label}</a>;
  return <button className={cls} type={type} disabled={disabled} onClick={onClick}>{label}</button>;
}

export interface ActionsProps { children: React.ReactNode; className?: string; }
/** Horizontal row for a filled + ghost button pair. */
export function Actions({ children, className }: ActionsProps) { return <div className={['tsd-actions', className].filter(Boolean).join(' ')}>{children}</div>; }
