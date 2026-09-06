import React from 'react';
import { ThemeScope, Heading } from '@tshield/design-system';
export const SectionHeadline = () => <div style={{ padding: 24 }}><Heading level={2}>Five-Year Warranty.<br /><Heading.Red>Total Peace of Mind.</Heading.Red></Heading></div>;
export const HeroHeadlineOnDark = () => <ThemeScope temperature="graphite"><div style={{ padding: 32, background: '#0F1114' }}><Heading level={1} light>Protecting<br /><Heading.Red>Vehicles</Heading.Red><br /><Heading.Outline>In the Real</Heading.Outline><br />World</Heading></div></ThemeScope>;
export const OutlinedLine = () => <div style={{ padding: 24 }}><Heading level={2}>Protecting<br /><Heading.Red>Exceptional</Heading.Red><br /><Heading.Outline>Interiors</Heading.Outline></Heading></div>;
export const CardTitle = () => <div style={{ padding: 24 }}><Heading level={3}>Proven Technology</Heading></div>;
