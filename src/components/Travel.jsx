import { useEffect, useRef, useState } from 'react';
import { useGsap, reveal, prefersReducedMotion } from '../lib/motion';
import { VIEWS, fitCanvas, forEachLand, gridStep, arcPoint } from '../lib/geo';
import SplitFlap from '../lib/SplitFlap';
import { ORIGIN, HOME, VISITED, UPCOMING, PHOTOS, countriesVisited } from '../data/travel';

const ease = (t) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t) => Math.max(0, Math.min(1, t));
const ROUTES = [
  { ...ORIGIN, from: 'origin' },
  ...VISITED.map((c) => ({ ...c, from: 'home' })),
  ...UPCOMING.map((c) => ({ ...c, from: 'home', soon: true })),
];
const INTL = new Set(['KIN', 'FCO', 'HND', 'AMS', 'YYZ', 'ICN']);
const ALL = [ORIGIN, HOME, ...VISITED, ...UPCOMING];

// Place code labels next to their points, skipping any that would overlap one already placed.
function placeLabels(ctx, labels, W, H) {
  const placed = [];
  ctx.font = '500 11px "DM Mono", monospace';
  labels.forEach((l) => {
    const w = ctx.measureText(l.code).width + 4, h = 12;
    const spots = [[7, -14], [7, 3], [-7 - w, -14], [-7 - w, 3]];
    for (const [dx, dy] of spots) {
      const r = { x: l.x + dx, y: l.y + dy, w, h };
      if (r.x < 0 || r.y < 0 || r.x + w > W || r.y + h > H) continue;
      if (placed.some((p) => r.x < p.x + p.w && r.x + r.w > p.x && r.y < p.y + p.h && r.y + r.h > p.y)) continue;
      placed.push(r);
      ctx.globalAlpha = l.dim ? 0.3 : 1;
      ctx.fillStyle = l.color;
      ctx.fillText(l.code, r.x + 2, r.y + 10);
      ctx.globalAlpha = 1;
      break;
    }
  });
}

function RouteMap({ view, hot, play }) {
  const canvasRef = useRef(null);
  const hotRef = useRef(hot);
  const redraw = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const v = VIEWS[view];
    let geo, base, raf = 0, start = 0;

    const build = () => {
      geo = fitCanvas(canvas, v);
      base = document.createElement('canvas');
      base.width = canvas.width; base.height = canvas.height;
      const b = base.getContext('2d');
      b.setTransform(geo.dpr, 0, 0, geo.dpr, 0, 0);
      const cellPx = geo.mapW / ((v.lon1 - v.lon0) / gridStep(v));
      const skip = cellPx < 2.4 ? 2 : 1;
      const rad = Math.max(0.7, Math.min(2.4, cellPx * skip * 0.32));
      b.fillStyle = '#2b3446';
      forEachLand(v, (lon, lat, r, c) => {
        if (r % skip || c % skip) return;
        const [x, y] = geo.proj(lon, lat);
        b.beginPath(); b.arc(x, y, rad, 0, Math.PI * 2); b.fill();
      });
    };

    // returns true while routes are still animating in
    const draw = (now) => {
      const ctx = geo.ctx;
      const t = !start || prefersReducedMotion() ? 1e9 : now - start;
      const home = geo.proj(HOME.lon, HOME.lat);
      const hotCode = hotRef.current;
      const labels = [];
      ctx.clearRect(0, 0, geo.W, geo.H);
      ctx.drawImage(base, 0, 0, geo.W, geo.H);
      ROUTES.forEach((c, i) => {
        const p = ease(clamp01((t - i * 110) / 1000));
        if (p <= 0) return;
        const city = geo.proj(c.lon, c.lat);
        const [a, b] = c.from === 'origin' ? [city, home] : [home, city];
        const isHot = hotCode === c.code;
        const dim = !!hotCode && !isHot;
        const color = c.from === 'origin' ? '#52d68a' : c.soon ? 'rgba(207,214,228,0.75)' : isHot ? '#ffffff' : 'rgba(255,210,0,0.85)';
        ctx.globalAlpha = dim ? 0.16 : 1;
        ctx.strokeStyle = color; ctx.fillStyle = color;
        ctx.lineWidth = isHot ? 2.6 : c.from === 'origin' ? 2.2 : 1.6;
        ctx.setLineDash(c.soon ? [4, 5] : []);
        ctx.beginPath();
        for (let k = 0; k <= 48; k++) { const [x, y] = arcPoint(a, b, (k / 48) * p); if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
        ctx.stroke(); ctx.setLineDash([]);
        const [hx, hy] = arcPoint(a, b, p);
        ctx.beginPath(); ctx.arc(hx, hy, isHot ? 4 : 3, 0, Math.PI * 2); ctx.fill();
        if (c.from === 'origin') { ctx.beginPath(); ctx.arc(city[0], city[1], 4.5, 0, Math.PI * 2); ctx.fill(); }
        ctx.globalAlpha = 1;
        if (p >= 1 && (isHot || view === 'na' || INTL.has(c.code))) {
          const [lx, ly] = c.from === 'origin' ? city : b;
          labels.push({ code: c.code, x: lx, y: ly, color: c.from === 'origin' ? '#52d68a' : c.soon ? '#cfd6e4' : '#ffffff', dim, hot: isHot });
        }
      });
      ctx.strokeStyle = '#ffd200'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(home[0], home[1], 6, 0, Math.PI * 2); ctx.stroke();
      labels.sort((x, y) => (y.hot ? 1 : 0) - (x.hot ? 1 : 0));
      placeLabels(ctx, [{ code: 'TPA', x: home[0], y: home[1], color: '#ffd200' }, ...labels], geo.W, geo.H);
      return t < ROUTES.length * 110 + 1100;
    };

    const loop = (now) => { if (draw(now)) raf = requestAnimationFrame(loop); };
    redraw.current = (animate) => {
      cancelAnimationFrame(raf);
      if (animate) start = performance.now();
      raf = requestAnimationFrame(loop);
    };

    build();
    draw(performance.now());
    if (play) redraw.current(true);
    const onResize = () => { build(); draw(performance.now()); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [view, play]);

  useEffect(() => { hotRef.current = hot; redraw.current(false); }, [hot]);

  return <canvas ref={canvasRef} role="img" aria-label="Map of routes: Kingston to Tampa, then from Tampa to every city visited and three upcoming trips" />;
}

function FidsRow({ c, status, tone, play, delay, onHot }) {
  return (
    <li className={`fids-row`} tabIndex={0} onMouseEnter={() => onHot(c.code)} onMouseLeave={() => onHot(null)} onFocus={() => onHot(c.code)} onBlur={() => onHot(null)}>
      <SplitFlap text={c.code} play={play} delay={delay} steps={6} stagger={40} />
      <span className="city">{c.city}<span className="sr-only"> ({c.code})</span></span>
      <span className={`st ${tone}`}>{status}</span>
    </li>
  );
}

export default function Travel() {
  const root = useRef(null);
  const [view, setView] = useState('world');
  const [hot, setHot] = useState(null);
  const [inView, setInView] = useState(false);

  useGsap(root, () => {
    reveal('.section-head, .travel-stats');
    reveal('.photo-card', { stagger: 0.06, y: 30, rotate: 4 });
  });
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: '0px 0px -20% 0px' });
    const target = root.current?.querySelector('.travel-grid');
    if (target) io.observe(target);
    return () => io.disconnect();
  }, []);

  const nameFor = (code) => ALL.find((c) => c.code === code)?.city ?? code;

  return (
    <section className="section" id="travel" ref={root}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Travel · Arrivals</div>
          <h2 className="h2">Places I’ve been</h2>
          <p className="lede">I’m from Kingston, Jamaica, and Tampa is home base now. These are the cities I’ve visited and the trips I have booked next. Hover over a city on the board to see its route on the map.</p>
        </div>
        <div className="travel-stats">
          <div><SplitFlap text={String(VISITED.length)} digits play={inView} steps={8} /><small>Cities</small></div>
          <div><SplitFlap text={String(countriesVisited)} digits play={inView} delay={150} steps={8} /><small>Countries</small></div>
          <div><SplitFlap text={String(UPCOMING.length)} digits tone="y" play={inView} delay={300} steps={8} /><small>Booked next</small></div>
        </div>

        <div className="travel-grid">
          <div className="mapbox">
            <div className="map-tools">
              <span>Routes · KIN → TPA → world</span>
              <span className="seg" role="group" aria-label="Map view">
                {Object.entries(VIEWS).map(([key, v]) => (
                  <button key={key} type="button" aria-pressed={view === key} onClick={() => setView(key)}>{v.label}</button>
                ))}
              </span>
            </div>
            <RouteMap view={view} hot={hot} play={inView} />
            <div className="map-legend">
              <span><i style={{ background: '#52d68a' }} />Origin</span>
              <span><i style={{ background: '#ffd200' }} />Visited</span>
              <span><i style={{ background: 'repeating-linear-gradient(90deg,#cfd6e4 0 4px,transparent 4px 8px)' }} />Booked</span>
            </div>
          </div>

          <div className="boards">
            <div className="fids">
              <h3>Arrivals <span>{VISITED.length} cities</span></h3>
              <ul className="fids-list">
                <FidsRow c={ORIGIN} status="Origin" tone="origin" play={inView} delay={0} onHot={setHot} />
                <FidsRow c={HOME} status="Home" tone="soon" play={inView} delay={60} onHot={setHot} />
                {VISITED.map((c, i) => <FidsRow key={c.code} c={c} status="Arrived" tone="" play={inView} delay={120 + i * 70} onHot={setHot} />)}
              </ul>
            </div>
            <div className="fids">
              <h3>Departures <span>Booked</span></h3>
              <ul className="fids-list single">
                {UPCOMING.map((c, i) => <FidsRow key={c.code} c={c} status={c.when} tone="soon" play={inView} delay={300 + i * 90} onHot={setHot} />)}
              </ul>
            </div>
          </div>
        </div>

        {PHOTOS.length > 0 && (
          <div className="photos">
            <div className="eyebrow">Trip photos</div>
            <div className="photo-grid">
              {PHOTOS.map((p, i) => (
                <figure className="photo-card" key={`${p.code}-${i}`} style={{ '--tilt': `${[-2, 1.5, -1, 2][i % 4]}deg` }}>
                  <img src={p.src} alt={p.caption || `Trip photo from ${nameFor(p.code)}`} loading="lazy" />
                  <figcaption>{p.caption || nameFor(p.code)}<span>{p.code}</span></figcaption>
                </figure>
              ))}
            </div>
            {PHOTOS.length < 4 && <p className="photos-note">More photos are on the way.</p>}
          </div>
        )}
      </div>
    </section>
  );
}
