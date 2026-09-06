import React from 'react';
import { Faq } from '@tshield/design-system';
const items = [{ question: "What's the total investment required?", answer: 'Initial franchise investment ranges from £50,000 to £150,000, depending on your territory and business model. We’ll provide a detailed breakdown during your consultation.' }, { question: 'Do I need prior experience with protective film?', answer: 'No. We train you from the ground up. What we need is your commitment to excellence, sales ability, and willingness to learn.' }, { question: 'Is the film visible once applied?', answer: 'Once applied, the film is virtually invisible. There is no change to the appearance of the surface — only the protection it gains.' }];
export const FirstOpen = () => <div style={{ padding: 24, maxWidth: 720 }}><Faq items={items} defaultOpen={0} /></div>;
export const AllClosed = () => <div style={{ padding: 24, maxWidth: 720 }}><Faq items={items} /></div>;
