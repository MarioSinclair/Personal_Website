import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, useGsap, reveal, prefersReducedMotion, scrollToId } from '../lib/motion';
import { projects } from '../data/content';
import { barcodeStyle } from '../lib/barcode';
import { Arrow } from './Icons';
import nsbe from '../assets/img/nsbe-site.webp';
import '../styles/kiosk.css';

const SHOTS = { nsbe };

function Ticket({ project, index }) {
  return (
    <div className="ticket">
      <div className="t-top"><span>Ticket · MS-PRJ-{String(index + 1).padStart(2, '0')}</span><span>{project.context} · {project.when}</span></div>
      <div className="t-name"><h3>{project.name}</h3><span className={`t-badge ${project.kind}`}>{project.badge}</span></div>
      <p className="t-tagline">{project.tagline}</p>
      {project.image && <img className="t-shot" src={SHOTS[project.image]} alt={`Screenshot of ${project.name}`} loading="lazy" />}
      <ul className="t-points">{project.points.map((p) => <li key={p}>{p}</li>)}</ul>
      {project.note && <p className="t-note">{project.note}</p>}
      <ul className="chips" aria-label="Built with">{project.stack.map((s) => <li key={s}>{s}</li>)}</ul>
      {project.links.length > 0 && (
        <div className="t-links">
          {project.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} <Arrow /></a>)}
        </div>
      )}
      <div className="barcode" style={barcodeStyle(project.id)} aria-hidden="true" />
    </div>
  );
}

export default function Projects() {
  const root = useRef(null);
  const ticketWrap = useRef(null);
  const [active, setActive] = useState(projects[0].id);
  const [prints, setPrints] = useState(0);
  const index = projects.findIndex((p) => p.id === active);

  useGsap(root, () => {
    reveal('.section-head, .kiosk', { stagger: 0.08 });
  });

  // printer feed: the new ticket steps down out of the slot
  useLayoutEffect(() => {
    if (prints === 0 || prefersReducedMotion() || !ticketWrap.current) return undefined;
    const tween = gsap.fromTo(ticketWrap.current, { yPercent: -100 }, { yPercent: 0, duration: 0.95, ease: 'steps(14)' });
    return () => tween.kill();
  }, [prints]);

  const print = (id) => {
    if (id === active) return;
    setActive(id);
    setPrints((n) => n + 1);
    // on stacked layouts the ticket prints below the kiosk, so bring it into view
    if (window.matchMedia('(max-width: 980px)').matches) setTimeout(() => scrollToId('ticket-tray'), 60);
  };

  return (
    <section className="section" id="projects" ref={root}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Projects · Self-service kiosk</div>
          <h2 className="h2">Print a project</h2>
          <p className="lede">Pick a button and the kiosk prints its ticket: what it does, the numbers, and the stack.</p>
        </div>

        <div className="kiosk-grid">
          <div className="kiosk">
            <div className="kiosk-screen"><span>Select a project</span><span>{projects.length} available</span></div>
            <div className="kiosk-buttons">
              {projects.map((p) => (
                <button key={p.id} type="button" className="kbtn" aria-pressed={p.id === active} aria-controls="ticket-tray" onClick={() => print(p.id)}>
                  <span className="code">{p.code}</span>
                  <span className="name">{p.name}</span>
                  <span className="tag">{p.tagline}</span>
                  <span className={`badge ${p.kind}`}>{p.badge}</span>
                </button>
              ))}
            </div>
            <div className="kiosk-foot"><small>Ticket out</small><span className="kiosk-slot" /></div>
          </div>

          <div className="tray" id="ticket-tray">
            <div className="tray-slot" aria-hidden="true" />
            <div className="tray-window">
              <div ref={ticketWrap}><Ticket project={projects[index]} index={index} /></div>
            </div>
            <p className="sr-only" aria-live="polite">Showing {projects[index].name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
