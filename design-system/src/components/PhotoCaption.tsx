import React from 'react';

export interface PhotoCaptionProps {
  src?: string;
  alt?: string;
  /** Frame proportion: `32` (3:2, default), `45` (4:5 portrait), `11` (square), `169`, `219` (cinematic). */
  ratio?: '32' | '45' | '11' | '169' | '219';
  /** Caption band title (uppercase). Omit both title and sub for a bare photo. */
  title?: string;
  /** Caption band second line. */
  sub?: string;
  /** `band` (default): dark caption band with a red top rule. `plain`: caption on the page ground. */
  caption?: 'band' | 'plain';
  /** CSS object-position for the crop, e.g. "50% 30%". */
  focal?: string;
  /** Image loading hint (default `eager`; use `lazy` deep in a long page). */
  loading?: 'eager' | 'lazy';
  /** Constrain the whole unit (photo + caption together), e.g. "560px". Never constrain the frame's height. */
  maxWidth?: string;
  className?: string;
}

/**
 * A photograph and its caption band as ONE unit — the band is always exactly as wide as the photo, at every viewport.
 * Put any size constraint on this component (`maxWidth`), never on the frame's height.
 */
export function PhotoCaption({ src = 'https://www.t-shield.co/assets/photos/i02-about-application.jpg', alt = '', ratio = '32', title, sub, caption = 'band', focal, maxWidth, loading = 'eager', className }: PhotoCaptionProps) {
  return (
    <figure className={['tsd-photo', `tsd-photo--${ratio}`, caption === 'plain' && 'tsd-photo--plain', className].filter(Boolean).join(' ')} style={{ margin: 0, maxWidth }}>
      <div className="tsd-photo__frame"><img src={src} alt={alt} loading={loading} style={focal ? { objectPosition: focal } : undefined} /></div>
      {(title || sub) && (
        <figcaption className="tsd-photo__cap">
          {title && <div className="tsd-photo__title">{title}</div>}
          {sub && <div className="tsd-photo__sub">{sub}</div>}
        </figcaption>
      )}
    </figure>
  );
}
