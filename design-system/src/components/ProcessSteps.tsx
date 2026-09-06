import React, { useState } from 'react';

export interface ProcessStep { title: string; description: string; }
export interface ProcessStepsProps {
  steps?: ProcessStep[];
  /** Index of the initially active step (default 0). */
  active?: number;
  /** Let readers click to activate a step (default true). */
  interactive?: boolean;
  className?: string;
}
/**
 * Numbered process list ("01 Digital Patterning … 04 Seamless Finish"). The active step carries the red left rule
 * and full-contrast type; the others sit quietly on the surface tone.
 */
export function ProcessSteps({ steps = [], active = 0, interactive = true, className }: ProcessStepsProps) {
  const [cur, setCur] = useState(active);
  return (
    <ol className={['tsd-steps', className].filter(Boolean).join(' ')}>
      {steps.map((s, i) => (
        <li key={s.title} className={['tsd-step', i === cur && 'tsd-step--active'].filter(Boolean).join(' ')} onClick={interactive ? () => setCur(i) : undefined} style={interactive ? { cursor: 'pointer' } : undefined}>
          <div className="tsd-step__n">{String(i + 1).padStart(2, '0')}</div>
          <div><div className="tsd-step__t">{s.title}</div><div className="tsd-step__d">{s.description}</div></div>
        </li>
      ))}
    </ol>
  );
}
