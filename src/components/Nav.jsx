import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, scrollToId } from '../lib/motion';
import SplitFlap from '../lib/SplitFlap';
import { Plane } from './Icons';

const LINKS = [
  ['about', 'Profile'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['crew', 'Crew'],
  ['travel', 'Travel'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const line = useRef(null);
  const plane = useRef(null);

  // flight-progress bar: the plane crosses the top of the page as you scroll
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        if (line.current) line.current.style.transform = `scaleX(${self.progress})`;
        if (plane.current) plane.current.style.left = `${self.progress * 100}%`;
      },
    });
    return () => st.kill();
  }, []);

  // highlight the section currently under the nav
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    LINKS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const go = (id) => (e) => { e.preventDefault(); setOpen(false); scrollToId(id); };

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="nav-logo" href="#top" onClick={go('top')} aria-label="Mario Sinclair, back to top">
          <SplitFlap text="MS" tone="y" steps={10} stagger={120} />
          <span>Mario Sinclair</span>
        </a>
        <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Gates'}
        </button>
        <ul className={`nav-links${open ? ' open' : ''}`} id="nav-links">
          {LINKS.map(([id, label], i) => (
            <li key={id}>
              <a href={`#${id}`} onClick={go(id)} className={active === id ? 'on' : ''} aria-current={active === id ? 'location' : undefined}>
                <b aria-hidden="true">{String.fromCharCode(65 + i)}</b>{label}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn solid check" href="#contact" onClick={go('contact')}>Check in</a>
      </div>
      <div className="nav-progress" aria-hidden="true">
        <div className="nav-progress-line" ref={line} />
        <Plane className="nav-progress-plane" ref={plane} />
      </div>
    </header>
  );
}
