import React, { useState } from 'react';
import { Button } from './Button';

export interface EnquiryFormProps {
  /** Which page's form: decides the extra field(s) and the `page` value sent to the API. */
  page: 'interior' | 'automotive' | 'franchise';
  /** Endpoint (default `/api/lead`, the site's Resend-backed function). */
  action?: string;
  /** Submit button label (default "Send Enquiry"; Franchise uses "Submit Application"). */
  submitLabel?: string;
  /** Override the reply promise shown under the button. */
  note?: string;
  /** Called instead of posting when provided (previews, custom handling). */
  onSubmit?: (data: Record<string, string>) => Promise<void> | void;
  className?: string;
}

const SUCCESS = 'Thank you — your enquiry has been sent. We aim to reply within one working day.';
const FAIL = 'Sorry, that didn’t send. Please email enquiries@t-shield.co and we’ll come straight back to you.';

/**
 * The enquiry form used on all three pages: named fields, browser validation, a hidden honeypot, the reply promise
 * ("We aim to reply to all enquiries within one working day.") and an inline status line. Posts JSON to `/api/lead`.
 */
export function EnquiryForm({ page, action = '/api/lead', submitLabel, note = 'We aim to reply to all enquiries within one working day.', onSubmit, className }: EnquiryFormProps) {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const label = submitLabel ?? (page === 'franchise' ? 'Submit Application' : 'Send Enquiry');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data: Record<string, string> = {};
    new FormData(form).forEach((v, k) => { data[k] = String(v); });
    data.page = page;
    setState('sending');
    try {
      if (onSubmit) await onSubmit(data);
      else { const r = await fetch(action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); const j = await r.json().catch(() => ({ ok: false })); if (!j.ok) throw new Error('send'); }
      form.reset(); setState('ok');
    } catch { setState('err'); }
  }
  return (
    <form className={['tsd-form', className].filter(Boolean).join(' ')} onSubmit={submit} noValidate>
      {page === 'franchise' ? (
        <input className="tsd-inp" name="name" placeholder="Full Name" aria-label="Full name" required autoComplete="name" />
      ) : (
        <div className="tsd-form__row2">
          <input className="tsd-inp" name="first_name" placeholder="First Name" aria-label="First name" required autoComplete="given-name" />
          <input className="tsd-inp" name="last_name" placeholder="Last Name" aria-label="Last name" autoComplete="family-name" />
        </div>
      )}
      <input className="tsd-inp" type="email" name="email" placeholder="Email Address" aria-label="Email address" required autoComplete="email" />
      <input className="tsd-inp" type="tel" name="phone" placeholder="Phone Number" aria-label="Phone number" autoComplete="tel" />
      {page === 'interior' && (
        <select className="tsd-inp" name="property_type" aria-label="Property type" defaultValue="">
          <option value="" disabled>Property Type</option><option>Residential Home</option><option>Luxury Hotel</option><option>Restaurant / Bar</option><option>Commercial Office</option><option>Property Development</option><option>Other</option>
        </select>
      )}
      {page === 'automotive' && (<>
        <input className="tsd-inp" name="vehicle" placeholder="Vehicle Make & Model" aria-label="Vehicle make and model" />
        <select className="tsd-inp" name="coverage" aria-label="Coverage required" defaultValue="">
          <option value="" disabled>Coverage Required</option><option>Full Vehicle Coverage</option><option>Front End Package</option><option>Targeted High-Wear Areas</option><option>Not Sure — Need Advice</option>
        </select>
      </>)}
      {page === 'franchise' && <input className="tsd-inp" name="location" placeholder="Preferred Territory (e.g. London, Manchester)" aria-label="Preferred territory" />}
      <textarea className="tsd-inp" name="message" rows={4} placeholder={page === 'franchise' ? 'Tell us about your background and why T-Shield interests you' : `Tell us about your ${page === 'automotive' ? 'vehicle' : 'surfaces'} and what you’d like to protect…`} aria-label="Message" />
      <input className="tsd-form__hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <Button type="submit" block disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : state === 'ok' ? 'Sent' : label}</Button>
      <p className="tsd-form__note">{note}</p>
      <p className={['tsd-form__msg', state === 'ok' && 'tsd-form__msg--ok', state === 'err' && 'tsd-form__msg--err'].filter(Boolean).join(' ')} role="status" aria-live="polite">{state === 'ok' ? SUCCESS : state === 'err' ? FAIL : ''}</p>
    </form>
  );
}
