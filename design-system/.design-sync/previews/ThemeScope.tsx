import React from 'react';
import { ThemeScope, Eyebrow, Heading, Body, Button } from '@tshield/design-system';
const Sample = () => (<div style={{ padding: 28 }}><Eyebrow>One brand, two temperatures</Eyebrow><Heading level={2}>The Same<br /><Heading.Red>Standards.</Heading.Red></Heading><Body>Every component reads the scoped tokens, so the same markup renders correctly in either temperature.</Body><Button>Contact Our Team</Button></div>);
export const WarmLight = () => <ThemeScope temperature="warm"><Sample /></ThemeScope>;
export const CoolGraphite = () => <ThemeScope temperature="graphite"><Sample /></ThemeScope>;
