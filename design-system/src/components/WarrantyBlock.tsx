import React from 'react';
import { Eyebrow } from './Eyebrow';
import { Heading, Body } from './Heading';

export interface WarrantyBlockProps {
  /** Years covered (default 5 — the T-Shield warranty is five years for both lines). */
  years?: number;
  /** What the warranty is for: `vehicle` or `surface` wording. */
  subject?: 'vehicle' | 'surface';
  /** Override the covers list. */
  covers?: string[];
  className?: string;
}
/**
 * The Five-Year Warranty section: eyebrow + headline + two paragraphs + the "T-Shield Warranty Covers" box on the left,
 * the graphite "5 / Year Warranty" panel on the right. Same component on both lines; the wording flips with `subject`.
 */
export function WarrantyBlock({ years = 5, subject = 'surface', covers, className }: WarrantyBlockProps) {
  const thing = subject === 'vehicle' ? 'vehicle' : 'surface';
  const paint = subject === 'vehicle' ? 'paint' : 'surface';
  const list = covers ?? ['Film integrity guaranteed', 'Installation quality covered', 'Film can be replaced if required', `Original ${paint} remains protected`];
  return (
    <div className={['tsd-wty', className].filter(Boolean).join(' ')}>
      <div>
        <Eyebrow>Long-Term Confidence</Eyebrow>
        <Heading level={2}>{years === 5 ? 'Five-Year' : `${years}-Year`} Warranty.<br /><Heading.Red>Total Peace of Mind.</Heading.Red></Heading>
        <Body>{subject === 'vehicle' ? 'Paint Protection Film' : 'Surface Protection Film'} is not simply about immediate results. It is about long-term preservation.</Body>
        <Body>T-Shield is supported by a {years === 5 ? 'five' : years}-year warranty covering the integrity of the film and its installation. Over time, the film absorbs the wear that would otherwise affect the {thing} beneath. If required, it can be replaced. The {paint} remains protected.</Body>
        <div className="tsd-wty__box">
          <div className="tsd-wty__ttl">T-Shield Warranty Covers</div>
          <ul className="tsd-wty__list">{list.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </div>
      <div className="tsd-wty__panel">
        <div className="tsd-wty__big">{years}</div>
        <div className="tsd-wty__label">Year Warranty</div>
        <div className="tsd-wty__rule" />
        <div className="tsd-wty__sub">Covering the integrity of the film and its installation</div>
      </div>
    </div>
  );
}
