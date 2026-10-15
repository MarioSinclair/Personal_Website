import { useRef, useState } from 'react';
import { useGsap, reveal } from '../lib/motion';
import { baggage } from '../data/content';

const TILTS = ['-1.5deg', '1deg', '-0.5deg', '1.8deg', '-1deg', '0.6deg'];

function Tag({ bag, i, hidden }) {
  return (
    <article className="bag-tag" style={{ '--tilt': TILTS[i % TILTS.length] }} aria-hidden={hidden || undefined}>
      <div className="code">{bag.tag}</div>
      <div className="label">{bag.label}</div>
      <ul>{bag.items.map((s) => <li key={s}>{s}</li>)}</ul>
      <span className="stripe" />
    </article>
  );
}

export default function Baggage() {
  const root = useRef(null);
  const [paused, setPaused] = useState(false);
  useGsap(root, () => reveal('.carousel-head, .belt'));

  return (
    <section className="section" id="baggage" ref={root}>
      <div className="wrap">
        <div className="carousel-head">
          <div className="section-head">
            <div className="eyebrow">Skills · Baggage claim</div>
            <h2 className="h2">What I carry on</h2>
            <p className="lede">Six bags, one per toolkit. Hover to stop the belt.</p>
          </div>
          <button type="button" className="belt-toggle" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
            {paused ? 'Start belt' : 'Stop belt'}
          </button>
        </div>
      </div>
      <div className={`belt${paused ? ' paused' : ''}`}>
        <div className="belt-track">
          {baggage.map((b, i) => <Tag bag={b} i={i} key={b.tag} />)}
          {baggage.map((b, i) => <Tag bag={b} i={i + 2} key={`${b.tag}-copy`} hidden />)}
        </div>
      </div>
    </section>
  );
}
