import React from 'react';
import { ThemeScope, Section, SectionHeader, Heading, Body } from '@tshield/design-system';
export const Ground = () => <Section><SectionHeader eyebrow="A New Category" title={<>The Market Gap <Heading.Red>Nobody's Filling</Heading.Red></>} /><Body>Protective film for interior surfaces is a multi-billion-pound market opportunity that's still largely untapped.</Body></Section>;
export const Surface = () => <Section tone="surface"><SectionHeader eyebrow="What You Get" title={<>Why Topaz <Heading.Red>Stands Apart</Heading.Red></>} /><Body>Research and refinement since 2009. Millions of surfaces protected.</Body></Section>;
export const Dark = () => <ThemeScope temperature="graphite"><Section tone="dark"><SectionHeader eyebrow="Get in Touch" title={<>Speak With<br />Our <Heading.Red>Team</Heading.Red></>} light /><Body>We offer a consultation to assess your vehicle and recommend the most suitable level of coverage.</Body></Section></ThemeScope>;
