// api/lead.js — TOPAZ-967 (2026-09-05). Receives the three enquiry forms and emails each
// submission via Resend to LEADS_TO. No database, no third-party form service.
// Env: RESEND_API_KEY (secret), LEADS_FROM ("T-Shield <noreply@verified-domain>"), LEADS_TO.
'use strict';

const PAGES = { interior: 'Interior Surface Protection', automotive: 'Automotive Paint Protection Film', franchise: 'Franchise application' };
const ALLOWED_ORIGINS = ['https://www.t-shield.co', 'https://t-shield.co', 'https://tshield-site2.vercel.app'];
const MAX = 3000;

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function clean(v, max = MAX) { return (v == null ? '' : String(v)).replace(/\r/g, '').trim().slice(0, max); }
function line(v) { return clean(v, 200).replace(/[\n\t]/g, ' '); }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method' }); }

  const origin = req.headers.origin || '';
  if (origin && !ALLOWED_ORIGINS.includes(origin) && !/^https:\/\/tshield-site2-[a-z0-9-]+\.vercel\.app$/.test(origin)) {
    return res.status(403).json({ ok: false, error: 'origin' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = null; } }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, error: 'body' });

  // Honeypot: bots fill every field. Pretend success, send nothing.
  if (clean(body.website)) return res.status(200).json({ ok: true });

  const page = PAGES[clean(body.page, 20).toLowerCase()];
  const name = line(body.name) || [line(body.first_name), line(body.last_name)].filter(Boolean).join(' ');
  const email = line(body.email).toLowerCase();
  const phone = line(body.phone);
  if (!page) return res.status(400).json({ ok: false, error: 'page' });
  if (name.length < 2) return res.status(400).json({ ok: false, error: 'name' });
  if (!EMAIL_RE.test(email) || email.length > 200) return res.status(400).json({ ok: false, error: 'email' });

  const fields = [
    ['Name', name], ['Email', email], ['Phone', phone],
    ['Property type', line(body.property_type)], ['Vehicle', line(body.vehicle)], ['Coverage', line(body.coverage)],
    ['Preferred territory', line(body.location)], ['Message', clean(body.message)],
  ].filter(([, v]) => v);

  const meta = `Page: ${page}\nSubmitted: ${new Date().toISOString()}\nReferer: ${line(req.headers.referer || '')}`;
  const text = fields.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n---\n${meta}`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#2A2A2A;max-width:640px">
<p style="margin:0 0 14px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#EC1D24">New T-Shield enquiry — ${esc(page)}</p>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
${fields.map(([k, v]) => `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #eee;color:#888;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`).join('\n')}
</table>
<p style="margin:18px 0 0;font-size:12px;color:#888;white-space:pre-line">${esc(meta)}</p>
<p style="margin:10px 0 0;font-size:12px;color:#888">Reply to this email to answer the customer directly.</p></div>`;

  const key = process.env.RESEND_API_KEY, from = process.env.LEADS_FROM, to = process.env.LEADS_TO;
  if (!key || !from || !to) { console.error('lead: email env not configured'); return res.status(500).json({ ok: false, error: 'config' }); }

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: to.split(',').map(s => s.trim()).filter(Boolean), reply_to: email, subject: `T-Shield enquiry — ${page} — ${name}`, text, html }),
  });
  if (!r.ok) { console.error('lead: resend', r.status, (await r.text()).slice(0, 300)); return res.status(502).json({ ok: false, error: 'send' }); }
  return res.status(200).json({ ok: true });
};
