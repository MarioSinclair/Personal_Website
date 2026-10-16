import { useEffect, useRef, useState } from 'react';
import { gsap, useGsap, scrollToId } from '../lib/motion';
import SplitFlap from '../lib/SplitFlap';
import { profile, statusBoard } from '../data/content';
import { GitHub, LinkedIn, Doc } from './Icons';
import fuji from '../assets/img/fuji-snowboard.webp';
import '../styles/hero.css';

const tampaTime = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' });

function useClock() {
  const [now, setNow] = useState(() => tampaTime.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(tampaTime.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Hero({ visitors }) {
  const root = useRef(null);
  const clock = useClock();

  useGsap(root, ({ reduced }) => {
    if (reduced) return;
    gsap.from('.hero-tag, .hero-ctas', { y: 22, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.8 });
    gsap.from('.board', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1 });
    gsap.from('.passport', { x: 40, rotate: 3, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.5 });
    gsap.timeline({ delay: 2.2 })
      .from('.pp-stamp', { scale: 2.6, opacity: 0, rotate: -40, duration: 0.32, ease: 'power4.in' })
      .to('.passport', { x: 3, y: 2, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, '>-0.02');
  });

  const count = visitors.count != null ? String(visitors.count).padStart(6, '0').slice(-6) : null;

  return (
    <section className="hero" id="top" ref={root}>
      <div className="wrap">
        <div className="strip">
          <span>TPA · Terminal MS · Gate 27</span>
          <span>Departures</span>
          <span>Local time <span className="clock">{clock}</span></span>
        </div>

        <div className="hero-grid">
          <div>
            <h1 className="hero-name">
              <span className="sr-only">Mario Sinclair</span>
              <SplitFlap text="MARIO" delay={200} steps={9} stagger={70} />
              <SplitFlap text="SINCLAIR" delay={580} steps={9} stagger={70} />
            </h1>
            <p className="hero-tag">
              <b>Computer science at USF, class of 2027.</b> Data engineering at Delta Air Lines, robotics at the RARE Lab,
              and a steady habit of hackathon builds.
            </p>
            <div className="hero-ctas">
              <a className="btn solid" href={profile.links.resume} target="_blank" rel="noreferrer"><Doc /> Résumé</a>
              <a className="btn" href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}>Check in · Contact</a>
              <span className="hero-social">
                <a className="icon-link" href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHub /></a>
                <a className="icon-link" href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedIn /></a>
              </span>
            </div>

            <div className="board" role="table" aria-label="Current status">
              <div className="board-head" role="row">
                <span role="columnheader">Flight</span><span role="columnheader">Destination</span>
                <span role="columnheader" className="g">Gate</span><span role="columnheader">Status</span>
              </div>
              {statusBoard.map((row, i) => (
                <div className="board-row" role="row" key={row.dest}>
                  <span role="cell"><SplitFlap text={row.flight} delay={1200 + i * 240} steps={6} stagger={35} /><span className="sr-only">{row.flight}</span></span>
                  <span role="cell" className="dest">{row.dest}<small>{row.sub}</small></span>
                  <span role="cell" className="gate">{row.gate}</span>
                  <span role="cell" className={`status${row.blink ? ' pulse' : ''}`}>
                    <SplitFlap text={row.status} tone={row.tone} delay={1300 + i * 240} steps={6} stagger={35} />
                    <span className="sr-only">{row.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside className="hero-side" aria-label="Passport">
            <div className="passport">
              <div className="pp-head"><span>Passport</span><span>No. MS-2027</span></div>
              <div className="pp-body">
                <img className="pp-photo" src={fuji} alt="Mario snowboarding with Mt. Fuji behind him" width="118" height="148" />
                <dl className="pp-fields">
                  <div><dt>Surname</dt><dd>{profile.last}</dd></div>
                  <div><dt>Given names</dt><dd>{profile.first}</dd></div>
                  <div><dt>Origin</dt><dd>Kingston, Jamaica</dd></div>
                  <div><dt>Home base</dt><dd>Tampa, FL · TPA</dd></div>
                  <div><dt>Languages</dt><dd>English · Japanese</dd></div>
                </dl>
              </div>
              <div className="pp-foot">
                <div className="pp-mrz" aria-hidden="true">P&lt;USF&lt;SINCLAIR&lt;&lt;MARIO&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />CS2027&lt;&lt;GPA3&lt;81&lt;&lt;KIN&lt;TPA&lt;&lt;&lt;&lt;&lt;&lt;</div>
                <div className="pp-stamp" aria-label="Dean's list three times">Dean's list<em>×3</em>USF</div>
              </div>
            </div>

            {visitors.status !== 'off' && (
              <div className="counter">
                <span className="lbl">
                  Passengers boarded
                  <small>{visitors.status === 'preview' ? 'Preview number · live once deployed' : 'Visitors to this site'}</small>
                </span>
                {count
                  ? <><SplitFlap text={count} digits delay={1700} steps={8} stagger={60} /><span className="sr-only">{Number(count)} visitors</span></>
                  : <SplitFlap text="------" play={false} />}
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
