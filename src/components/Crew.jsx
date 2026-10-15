import { useRef } from 'react';
import { gsap, useGsap, reveal } from '../lib/motion';
import { crew } from '../data/content';
import shpeLogo from '../assets/shpe_logo.avif';
import nsbeLogo from '../assets/nsbe_logo.svg';
import gdgLogo from '../assets/gdg_logo.webp';

const LOGOS = { gdg: gdgLogo, shpe: shpeLogo, nsbe: nsbeLogo };

export default function Crew() {
  const root = useRef(null);

  useGsap(root, ({ reduced }) => {
    reveal('.section-head');
    if (reduced) return;
    // badges drop in and swing on their lanyards
    gsap.from('.badge-card', {
      y: -70, rotate: (i) => [-14, 10, -8][i % 3], opacity: 0, duration: 1.8, ease: 'elastic.out(1, 0.4)', stagger: 0.15,
      scrollTrigger: { trigger: '.crew', start: 'top 80%', once: true },
    });
  });

  return (
    <section className="section" id="crew" ref={root}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Leadership · Flight crew</div>
          <h2 className="h2">The crews I’ve flown with</h2>
          <p className="lede">Student organizations where I’ve handled sponsorships, workshops, and event planning.</p>
        </div>
        <div className="crew">
          {crew.map((c) => (
            <article className="badge-card" key={c.id}>
              <span className="badge-clip" aria-hidden="true" />
              <div className="badge-head">
                <div>
                  <div className="crew-tag">Crew ID · {c.short}</div>
                  <div className="org">{c.short}</div>
                  <div className="badge-org-full">{c.org}</div>
                </div>
                {c.logo
                  ? <img className="badge-logo" src={LOGOS[c.logo]} alt="" />
                  : <span className="badge-mono" aria-hidden="true">{c.short}</span>}
              </div>
              <div className="badge-body">
                <h3>{c.role}</h3>
                <div className="when">{c.dates}</div>
                <ul>{c.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
