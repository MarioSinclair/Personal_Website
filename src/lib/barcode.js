// Deterministic fake barcode: the same seed always draws the same bars.
export function barcodeStyle(seed) {
  let s = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
  const stops = [];
  for (let x = 0; x < 100;) {
    const bar = 0.6 + rnd() * 2.4, gap = 0.5 + rnd() * 1.6;
    stops.push(`#111 ${x.toFixed(2)}% ${(x + bar).toFixed(2)}%`, `transparent ${(x + bar).toFixed(2)}% ${(x + bar + gap).toFixed(2)}%`);
    x += bar + gap;
  }
  return { background: `linear-gradient(90deg, ${stops.join(',')})` };
}
