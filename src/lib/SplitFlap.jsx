import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './motion';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const DIGITS = '0123456789';
const BLANK = ' ';

// A row of split-flap cells. Renders the final text right away, then scrambles each cell
// through random characters before settling, like a departures board updating.
export default function SplitFlap({ text, play = true, delay = 0, steps = 7, stagger = 45, digits = false, tone = '', className = '' }) {
  const ref = useRef(null);
  const chars = [...text];

  useEffect(() => {
    const node = ref.current;
    if (!play || !node) return undefined;
    const timers = [];
    const set = digits ? DIGITS : LETTERS;
    const reduced = prefersReducedMotion();
    [...node.children].forEach((cell, i) => {
      const target = chars[i] ?? ' ';
      const glyph = cell.firstChild.firstChild; // the text node React rendered
      if (target === ' ' || reduced || !glyph) return;
      let n = steps + Math.floor(Math.random() * 6);
      const tick = () => {
        cell.classList.remove('flip');
        void cell.offsetWidth; // restart the CSS flip animation
        cell.classList.add('flip');
        glyph.nodeValue = n > 0 ? set[Math.floor(Math.random() * set.length)] : target;
        if (n-- > 0) timers.push(setTimeout(tick, 52 + Math.random() * 18));
      };
      timers.push(setTimeout(tick, delay + i * stagger));
    });
    return () => {
      timers.forEach(clearTimeout);
      // land on the real text if we were interrupted mid-scramble
      [...node.children].forEach((cell, i) => {
        const g = cell.firstChild.firstChild;
        if (g) g.nodeValue = chars[i] === ' ' ? BLANK : chars[i];
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, play]);

  return (
    <span className={`flaps ${className}`} ref={ref} aria-hidden="true">
      {chars.map((ch, i) => (
        <span key={i} className={`flap${ch === ' ' ? ' sp' : ''}${tone ? ` ${tone}` : ''}`}>
          <i>{ch === ' ' ? BLANK : ch}</i>
        </span>
      ))}
    </span>
  );
}
