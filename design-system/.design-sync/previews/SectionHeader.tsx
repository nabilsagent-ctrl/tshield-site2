import React from 'react';
import { ThemeScope, SectionHeader, Heading } from '@tshield/design-system';
export const Default = () => <div style={{ padding: 24 }}><SectionHeader eyebrow="Long-Term Confidence" title={<>Five-Year Warranty.<br /><Heading.Red>Total Peace of Mind.</Heading.Red></>} /></div>;
export const WithIntro = () => <div style={{ padding: 24, maxWidth: 640 }}><SectionHeader eyebrow="Precision and Fit" title={<>Every Installation.<br /><Heading.Red>Designed for</Heading.Red><br />Your Vehicle.</>} intro="Templates are created using digital patterning technology to ensure accuracy. No blades are used on the vehicle." /></div>;
export const OnDark = () => <ThemeScope temperature="graphite"><div style={{ padding: 24, background: '#0F1114' }}><SectionHeader eyebrow="Get in Touch" title={<>Speak With<br />Our <Heading.Red>Team</Heading.Red></>} light /></div></ThemeScope>;
