import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;

// Smooth scrolling on mouse/trackpad devices only; touch keeps native scrolling.
export function startSmoothScroll() {
  if (lenis || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -64 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

// Runs GSAP code scoped to a ref and reverts it on unmount. Selector strings resolve inside the ref.
export function useGsap(scope, setup, deps = []) {
  useLayoutEffect(() => {
    if (!scope.current) return undefined;
    const ctx = gsap.context(() => setup({ reduced: prefersReducedMotion() }), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Fade/slide elements in as they scroll into view. Call inside useGsap.
export function reveal(targets, { stagger = 0, ...vars } = {}) {
  if (prefersReducedMotion()) return;
  gsap.utils.toArray(targets).forEach((el, i) => {
    gsap.from(el, {
      y: 36, opacity: 0, duration: 0.8, ease: 'power3.out', ...vars, delay: (vars.delay || 0) + stagger * i,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}
