import { useRef } from 'react';
import { gsap, useGsap, reveal } from '../lib/motion';
import { experience } from '../data/content';
import { barcodeStyle } from '../lib/barcode';
import { Plane } from './Icons';

const STAMP = { landed: 'Landed', inflight: 'In flight', boarding: 'Boarding' };
const PLANE_AT = { landed: 100, inflight: 62, boarding: 10 };

function BoardingPass({ job }) {
  return (
    <article className="pass" data-plane={PLANE_AT[job.state]}>
      <div className="pass-main">
        <div className="pass-top"><span>Boarding pass · {job.flight}</span><span>{job.org}</span></div>
        <div className="pass-route" aria-label={job.dates}>
          <span>{job.from}</span>
          <span className="path"><Plane style={{ left: `${PLANE_AT[job.state]}%` }} /></span>
          <span>{job.to}</span>
        </div>
        <h3 className="pass-role">{job.role} <span>· {job.team}</span></h3>
        <div className="pass-fields">
          <div><small>Passenger</small><b>Sinclair / Mario</b></div>
          <div><small>Gate</small><b>{job.gate}</b></div>
          <div><small>Seat</small><b>{job.seat}</b></div>
          <div><small>{job.extra[0]}</small><b>{job.extra[1]}</b></div>
        </div>
        <ul>{job.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        {job.more.length > 0 && (
          <details className="pass-more">
            <summary>Full itinerary · {job.more.length} more</summary>
            <ul>{job.more.map((h) => <li key={h}>{h}</li>)}</ul>
          </details>
        )}
        <ul className="chips" aria-label="Tools">{job.stack.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
      <div className="pass-stub">
        <div><small className="eyebrow" style={{ color: '#6b7586' }}>Flight</small><div className="big">{job.flight}</div></div>
        <div><small className="eyebrow" style={{ color: '#6b7586' }}>Group</small><div className="big">{job.group}</div></div>
        <span className="barcode" style={barcodeStyle(job.id)} aria-hidden="true" />
        <div className={`pass-stamp ${job.state}`}>{STAMP[job.state]}</div>
      </div>
    </article>
  );
}

export default function Experience() {
  const root = useRef(null);

  useGsap(root, ({ reduced }) => {
    reveal('.section-head');
    if (reduced) return;
    gsap.utils.toArray('.pass').forEach((pass) => {
      const to = pass.dataset.plane;
      gsap.timeline({ scrollTrigger: { trigger: pass, start: 'top 85%', once: true } })
        .from(pass, { x: 90, rotate: 1.6, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(pass.querySelector('.path svg'), { left: '0%' }, { left: `${to}%`, duration: 1.4, ease: 'power2.inOut' }, '-=0.3')
        .from(pass.querySelector('.pass-stamp'), { scale: 2.4, opacity: 0, rotate: -40, duration: 0.3, ease: 'power4.in' }, '-=0.2');
    });
  });

  return (
    <section className="section" id="experience" ref={root}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Experience · Boarding passes</div>
          <h2 className="h2">Where I’ve been working</h2>
          <p className="lede">Each role is a boarding pass, stamped with where it stands: landed, in flight, or still boarding.</p>
        </div>
        <div className="passes">
          {experience.map((job) => <BoardingPass job={job} key={job.id} />)}
        </div>
      </div>
    </section>
  );
}
