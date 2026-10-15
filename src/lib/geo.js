import grids from '../data/mapGrids.json';

// Land masks rasterized from Natural Earth 1:50m (see mapGrids.json): 1 bit per cell, row-major from the north.
function decode(g) {
  const bin = atob(g.b64);
  const bits = new Uint8Array(g.cols * g.rows);
  for (let i = 0; i < bits.length; i++) bits[i] = (bin.charCodeAt(i >> 3) >> (7 - (i & 7))) & 1;
  return { ...g, bits };
}
const GRIDS = { world: decode(grids.world), na: decode(grids.na) };

export const VIEWS = {
  world: { label: 'World', lon0: -180, lon1: 180, lat0: -50, lat1: 76, grid: 'world', k: 1 },
  na: { label: 'North America', lon0: -126, lon1: -60, lat0: 15, lat1: 52, grid: 'na', k: Math.cos((35 * Math.PI) / 180) },
};

const aspect = (v) => ((v.lon1 - v.lon0) * v.k) / (v.lat1 - v.lat0);

// Size a canvas for a view at the current CSS width; returns a projector from lon/lat to CSS pixels.
// Taller views are capped at the world map's height (but never below 280px) and centered, so switching views keeps the page still.
export function fitCanvas(canvas, view) {
  const W = canvas.clientWidth || canvas.parentElement.clientWidth;
  const H = Math.round(Math.min(W / aspect(view), Math.max(W / aspect(VIEWS.world), 280)));
  const mapW = H * aspect(view);
  const x0 = (W - mapW) / 2;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  canvas.style.height = `${H}px`;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const proj = (lon, lat) => [x0 + ((lon - view.lon0) / (view.lon1 - view.lon0)) * mapW, ((view.lat1 - lat) / (view.lat1 - view.lat0)) * H];
  return { W, H, mapW, dpr, ctx, proj };
}

export function forEachLand(view, fn) {
  const g = GRIDS[view.grid];
  for (let r = 0; r < g.rows; r++) {
    const lat = g.lat1 - (r + 0.5) * g.step;
    if (lat < view.lat0 || lat > view.lat1) continue;
    for (let c = 0; c < g.cols; c++) {
      if (!g.bits[r * g.cols + c]) continue;
      const lon = g.lon0 + (c + 0.5) * g.step;
      if (lon >= view.lon0 && lon <= view.lon1) fn(lon, lat, r, c);
    }
  }
}
export const gridStep = (view) => GRIDS[view.grid].step;

// Point t (0..1) along a curved route from a to b, bowed toward the north.
export function arcPoint(a, b, t, bend = 0.22) {
  const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1;
  const cx = (a[0] + b[0]) / 2 + (dy / d) * d * bend * (dx > 0 ? -1 : 1);
  const cy = (a[1] + b[1]) / 2 - Math.abs(dx / d) * d * bend;
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * cx + t * t * b[0], u * u * a[1] + 2 * u * t * cy + t * t * b[1]];
}
