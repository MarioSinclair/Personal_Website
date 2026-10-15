import { useEffect, useRef, useState } from 'react';
import { useGsap, reveal } from '../lib/motion';
import SplitFlap from '../lib/SplitFlap';
import { profile } from '../data/content';
import { GitHub, LinkedIn, Doc } from './Icons';

export default function Contact() {
  const root = useRef(null);
  const [seen, setSeen] = useState(false);
  const [copied, setCopied] = useState(false);

  useGsap(root, () => reveal('.final-copy, .contact-row', { stagger: 0.1 }));
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: '0px 0px -25% 0px' });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.getSelection()?.selectAllChildren(document.getElementById('email-text')); }
  };

  return (
    <section className="final" id="contact" ref={root}>
      <div className="wrap">
        <div className="eyebrow">Contact · Gate 27</div>
        <h2 className="final-title">
          <span className="sr-only">Final boarding call</span>
          <SplitFlap text="FINAL CALL" tone="y" play={seen} steps={9} stagger={60} />
        </h2>
        <p className="final-copy">Want to talk about data engineering, robotics, or something you’re building? Send me a note.</p>
        <div className="contact-row">
          <span className="email-pill">
            <a id="email-text" href={`mailto:${profile.email}`}>{profile.email}</a>
            <button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
          </span>
          <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn</a>
          <a className="btn" href={profile.links.github} target="_blank" rel="noreferrer"><GitHub /> GitHub</a>
          <a className="btn solid" href={profile.links.resume} target="_blank" rel="noreferrer"><Doc /> Résumé</a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ visitors }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© {new Date().getFullYear()} Mario Sinclair · Tampa, FL</span>
        {visitors.count != null && <span>Passengers boarded: {visitors.count.toLocaleString('en-US')}</span>}
        <span>Built with React and GSAP</span>
      </div>
    </footer>
  );
}
