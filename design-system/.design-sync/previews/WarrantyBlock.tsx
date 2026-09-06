import React from 'react';
import { ThemeScope, WarrantyBlock } from '@tshield/design-system';
export const Surface = () => <div style={{ padding: 24 }}><WarrantyBlock subject="surface" /></div>;
export const Vehicle = () => <ThemeScope temperature="graphite"><div style={{ padding: 24 }}><WarrantyBlock subject="vehicle" /></div></ThemeScope>;
