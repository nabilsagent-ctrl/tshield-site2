import React from 'react';
import { ThemeScope, PhotoCaption } from '@tshield/design-system';
const P = 'https://www.t-shield.co/assets/photos/';
export const Landscape32 = () => <div style={{ padding: 24, maxWidth: 620 }}><PhotoCaption src={P + 'i03-story-restaurant.jpg'} alt="Protected marble table in a restaurant" title="Protecting Exceptional Interiors" sub="Homes · hotels · restaurants · commercial spaces" /></div>;
export const Portrait45 = () => <div style={{ padding: 24, maxWidth: 420 }}><PhotoCaption src={P + 'i02-about-application.jpg'} alt="Film applied to a marble worktop" ratio="45" title="Invisible by Design" sub="Zero visual impact — total surface protection" /></div>;
export const SquareGraphite = () => <ThemeScope temperature="graphite"><div style={{ padding: 24, maxWidth: 520 }}><PhotoCaption src={P + 'a04-film-bonnet.jpg'} alt="Film applied to a bonnet" ratio="11" title="Invisible by Design" sub="Zero visual impact — total surface protection" focal="50% 38%" /></div></ThemeScope>;
export const PlainCaption = () => <div style={{ padding: 24, maxWidth: 560 }}><PhotoCaption src={P + 'a10-process-precut.jpg'} alt="Technician lifting a plotter-cut panel from its liner" caption="plain" title="Pre-cut, ready to apply" sub="No blades are used on the vehicle" /></div>;
export const BarePhoto = () => <div style={{ padding: 24, maxWidth: 620 }}><PhotoCaption src={P + 'i04-surface-stone.jpg'} alt="Squeegee on marble" ratio="169" /></div>;
