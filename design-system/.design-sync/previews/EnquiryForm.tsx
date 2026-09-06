import React from 'react';
import { ThemeScope, EnquiryForm } from '@tshield/design-system';
const noop = async () => {};
export const Interior = () => <div style={{ padding: 24, maxWidth: 560 }}><EnquiryForm page="interior" onSubmit={noop} /></div>;
export const Automotive = () => <ThemeScope temperature="graphite"><div style={{ padding: 24, maxWidth: 560 }}><EnquiryForm page="automotive" onSubmit={noop} /></div></ThemeScope>;
export const Franchise = () => <div style={{ padding: 24, maxWidth: 560 }}><EnquiryForm page="franchise" onSubmit={noop} /></div>;
