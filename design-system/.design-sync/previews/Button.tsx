import React from 'react';
import { ThemeScope, Button, Actions } from '@tshield/design-system';
export const FilledAndGhost = () => <div style={{ padding: 24 }}><Actions><Button href="#contact">Contact Our Team</Button><Button variant="ghost" href="#warranty">Our Warranty</Button></Actions></div>;
export const OnDark = () => <ThemeScope temperature="graphite"><div style={{ padding: 24, background: '#0F1114' }}><Actions><Button href="#ppf">Discover PPF</Button><Button variant="ghost" onDark href="#contact">Contact Our Team</Button></Actions></div></ThemeScope>;
export const HeaderSize = () => <div style={{ padding: 24 }}><Button size="sm" href="#contact" cta>Contact Our Team</Button></div>;
export const FullWidthSubmit = () => <div style={{ padding: 24, maxWidth: 420 }}><Button type="submit" block>Send Enquiry</Button></div>;
export const Disabled = () => <div style={{ padding: 24 }}><Button disabled>Sending…</Button></div>;
