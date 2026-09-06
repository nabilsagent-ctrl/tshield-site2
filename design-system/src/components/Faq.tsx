import React, { useState } from 'react';

export interface FaqItem { question: string; answer: React.ReactNode; }
export interface FaqProps {
  items?: FaqItem[];
  /** Index open at first render (default none). */
  defaultOpen?: number;
  className?: string;
}
/** Accordion of questions. One open at a time; the red plus rotates to a cross when open; keyboard accessible. */
export function Faq({ items = [], defaultOpen, className }: FaqProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);
  return (
    <div className={['tsd-faq', className].filter(Boolean).join(' ')}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className="tsd-faq__item" key={it.question} data-open={isOpen ? 'true' : 'false'}>
            <button className="tsd-faq__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              <span>{it.question}</span>
              <svg className="tsd-faq__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M10 3v14M3 10h14" /></svg>
            </button>
            <div className="tsd-faq__a"><div><p>{it.answer}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}
