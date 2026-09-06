import React from 'react';
import { ThemeScope, BeforeAfter } from '@tshield/design-system';
const P = 'https://www.t-shield.co/assets/photos/';
export const Surface = () => <div style={{ padding: 24 }}><BeforeAfter before={P + 'i08-before.jpg'} after={P + 'i09-after.jpg'} /></div>;
export const Paintwork = () => <ThemeScope temperature="graphite"><div style={{ padding: 24 }}><BeforeAfter before={P + 'a05-before-paint.jpg'} after={P + 'a06-after-paint.jpg'} beforeLabel="Before — Unprotected Paint" afterLabel="After — T-Shield Protected" initial={40} /></div></ThemeScope>;
