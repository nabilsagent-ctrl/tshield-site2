import React, { useState } from 'react';

export interface BeforeAfterProps {
  before?: string;
  after?: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Initial handle position, 0–100 (default 50). */
  initial?: number;
  className?: string;
}
/** Before/after comparison slider (drag or use arrow keys). Labels sit in opposite corners so they never collide on phones. */
export function BeforeAfter({ before = 'https://www.t-shield.co/assets/photos/i08-before.jpg', after = 'https://www.t-shield.co/assets/photos/i09-after.jpg', beforeLabel = 'Before — Unprotected', afterLabel = 'After — T-Shield Protected', initial = 50, className }: BeforeAfterProps) {
  const [pos, setPos] = useState(Math.min(98, Math.max(2, initial)));
  return (
    <div className={['tsd-ba', className].filter(Boolean).join(' ')}>
      <img src={after} alt={afterLabel} />
      <div className="tsd-ba__before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}><img src={before} alt={beforeLabel} /></div>
      <div className="tsd-ba__handle" style={{ left: `${pos}%` }}><div className="tsd-ba__knob" aria-hidden="true">◂▸</div></div>
      <span className="tsd-ba__lbl tsd-ba__lbl--before">{beforeLabel}</span>
      <span className="tsd-ba__lbl tsd-ba__lbl--after">{afterLabel}</span>
      <input className="tsd-ba__range" type="range" min={2} max={98} value={pos} aria-label="Compare before and after" onChange={(e) => setPos(Number(e.target.value))} />
    </div>
  );
}
