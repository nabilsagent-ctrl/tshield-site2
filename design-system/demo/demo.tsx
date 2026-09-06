import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeScope, TopStrip, Header, Section, TwoColumn, ThreeColumn, SectionHeader, Heading, Lead, Body, Button, Actions, Hero, PhotoCaption, StatBar, FeatureCard, ProcessSteps, WarrantyBlock, Faq, EnquiryForm, Footer, Divider, BeforeAfter, Tag } from '../src/index';
const P = 'https://www.t-shield.co/assets/photos/';
const temp = (new URLSearchParams(location.search).get('t') as 'light' | 'graphite') || 'light';
const auto = temp === 'graphite';
function Page() {
  return (
    <ThemeScope temperature={temp}>
      <TopStrip backHref={auto ? '/' : undefined} />
      <Header suffix={auto ? '/ Paint Protection Film' : '/ Surface Protection'} links={[{ label: 'About', href: '#about' }, { label: auto ? 'The Film' : 'Surfaces', href: '#s', current: true }, { label: 'Process', href: '#p' }, { label: 'Warranty', href: '#w' }, { label: 'Contact', href: '#contact' }]} scrolled={false} />
      <Hero image={P + (auto ? 'a01-automotive-hero.jpg' : 'i01-interior-hero.jpg')} eyebrow={auto ? 'Paint Protection Film' : 'Interior Surface Protection'}
        title={auto ? <>Protecting<br /><Heading.Red>Vehicles</Heading.Red><br /><Heading.Outline>In the Real</Heading.Outline><br />World</> : <>Protecting<br /><Heading.Red>Exceptional</Heading.Red><br /><Heading.Outline>Interiors</Heading.Outline></>}
        lead={auto ? 'The cars we drive today are not used in perfect conditions. T-Shield makes Paint Protection Film accessible for every vehicle — not just a select few.' : 'The most beautiful interiors are defined by the materials that shape them. T-Shield places an invisible shield over those surfaces — allowing them to be used naturally while preserving their beauty for years to come.'}
        actions={<><Button href="#p">{auto ? 'Discover PPF' : 'Explore Protection'}</Button><Button variant="ghost" href="#contact">Contact Our Team</Button></>}
        pills={['Self-Healing Film', 'Invisible Protection', '5-Year Warranty', auto ? 'All Vehicle Types' : 'Replaceable Protection']} />
      <Section id="about">
        <TwoColumn>
          <div>
            <SectionHeader eyebrow="Built on Topaz Expertise" title={<>The Same<br /><Heading.Red>Standards.</Heading.Red><br />Every {auto ? 'Vehicle' : 'Surface'}.</>} intro="T-Shield is developed by Topaz Detailing. Since 2009, Topaz has worked with some of the world's most valuable vehicles, applying Paint Protection Film to the highest standards." />
            <StatBar items={[{ value: '2009', label: 'Founded' }, { value: '5', label: 'Year Warranty' }, { value: 'All', label: auto ? 'Vehicle Types' : 'Hard Surfaces' }]} />
            <Actions><Button href="#contact">Contact Our Team</Button><Button variant="ghost" href="#w">Our Warranty</Button></Actions>
          </div>
          <PhotoCaption src={P + (auto ? 'a11-process-complete.jpg' : 'i02-about-application.jpg')} alt="" title="Invisible by Design" sub="Zero visual impact — total surface protection" ratio={auto ? '32' : '45'} />
        </TwoColumn>
      </Section>
      <Divider />
      <Section tone="surface" id="s">
        <SectionHeader eyebrow="What You Get" title={<>Why Topaz <Heading.Red>Stands Apart</Heading.Red></>} />
        <ThreeColumn>
          <FeatureCard index="01" title="Proven Technology">Research and refinement since 2009. Millions of surfaces protected. Our film systems are tested, refined, and proven in the most demanding environments.</FeatureCard>
          <FeatureCard index="02" title="Complete Training">We train you and your team comprehensively on application, sales, customer service, and business operations.</FeatureCard>
          <FeatureCard index="03" title="Ongoing Support">Dedicated account management, marketing resources, technical support, and continuous improvements.</FeatureCard>
        </ThreeColumn>
      </Section>
      <Section id="p">
        <TwoColumn>
          <div><SectionHeader eyebrow="Precision and Fit" title={<>Every Installation.<br /><Heading.Red>Designed for</Heading.Red><br />Your {auto ? 'Vehicle' : 'Space'}.</>} />
            <ProcessSteps steps={[{ title: 'Digital Patterning', description: 'Templates are created using digital patterning technology to ensure accuracy.' }, { title: 'Precision Cut', description: 'Each panel is cut precisely before installation. No blades are used on the vehicle.' }, { title: 'Professional Installation', description: 'Applied by trained Topaz technicians using specialist methods developed since 2009.' }, { title: 'Seamless Finish', description: 'The film remains virtually invisible — protecting without altering.' }]} active={3} /></div>
          <PhotoCaption src={P + (auto ? 'a10-process-precut.jpg' : 'i04-surface-stone.jpg')} alt="" ratio="11" caption="plain" title="Pre-cut, ready to apply" sub="No blades are used on the vehicle" />
        </TwoColumn>
      </Section>
      <Section tone="surface" id="w"><WarrantyBlock subject={auto ? 'vehicle' : 'surface'} /></Section>
      <Section><SectionHeader eyebrow="Drag to Compare" title={<>The Same Surface —<br /><Heading.Red>Protected and Unprotected</Heading.Red></>} /><BeforeAfter before={P + (auto ? 'a05-before-paint.jpg' : 'i08-before.jpg')} after={P + (auto ? 'a06-after-paint.jpg' : 'i09-after.jpg')} /></Section>
      <Section tone="surface"><SectionHeader eyebrow="Common Questions" title={<>Frequently Asked <Heading.Red>Questions</Heading.Red></>} /><Faq defaultOpen={0} items={[{ question: 'How long does the film last?', answer: 'The film is supported by a five-year warranty covering its integrity and installation.' }, { question: 'Is the film visible?', answer: 'Once applied, the film is virtually invisible. There is no change to the appearance of the surface — only the protection it gains.' }]} /></Section>
      <Section tone="dark" id="contact">
        <TwoColumn>
          <div><SectionHeader eyebrow="Get in Touch" title={<>Speak With<br />Our <Heading.Red>Team</Heading.Red></>} intro="We offer a complimentary, no-obligation consultation." light /><Tag variant="red">Since 2009</Tag></div>
          <EnquiryForm page={auto ? 'automotive' : 'interior'} onSubmit={async () => {}} />
        </TwoColumn>
      </Section>
      <Footer description="Advanced film protection for interior stone, wood and glass surfaces. Developed by Topaz — the world standard in protective film technology since 2009." columns={[{ heading: 'Protection', links: [{ label: 'Stone & Marble', href: '#' }, { label: 'Wood & Timber', href: '#' }, { label: 'Glass & Mirrors', href: '#' }] }, { heading: 'Company', links: [{ label: 'About T-Shield', href: '#' }, { label: 'Contact', href: '#contact' }] }, { heading: 'Topaz Family', links: [{ label: 'Topaz Detailing', href: 'https://www.topazdetailing.com' }, { label: 'T-Shield Automotive', href: '#' }] }]} />
    </ThemeScope>
  );
}
createRoot(document.getElementById('root')!).render(<Page />);
