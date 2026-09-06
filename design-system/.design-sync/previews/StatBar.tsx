import React from 'react';
import { ThemeScope, StatBar } from '@tshield/design-system';
export const Light = () => <div style={{ padding: 24 }}><StatBar items={[{ value: '2009', label: 'Founded' }, { value: '5', label: 'Year Warranty' }, { value: 'All', label: 'Vehicle Types' }]} /></div>;
export const DarkBand = () => <ThemeScope temperature="graphite"><div style={{ padding: 24 }}><StatBar tone="dark" items={[{ value: '27M', label: 'UK Resident Homes' }, { value: '170K', label: 'UK Hospitality Businesses' }, { value: '11', label: 'Studios Worldwide' }, { value: '2009', label: 'Protecting Surfaces Since' }]} /></div></ThemeScope>;
