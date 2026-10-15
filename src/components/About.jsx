import { useRef } from 'react';
import { gsap, useGsap, reveal } from '../lib/motion';
import { profile } from '../data/content';
import { Plane } from './Icons';
import portrait from '../assets/img/portrait-illustrated.webp';

export default function About() {
  const root = useRef(null);

  useGsap(root, ({ reduced }) => {
    reveal('.section-head, .about-copy > p, .interest, .coursework', { stagger: 0.04 });
    if (reduced) return;
    gsap.timeline({ scrollTrigger: { trigger: '.origin-ticket', start: 'top 85%', once: true } })
      .from('.origin-ticket', { y: 50, rotate: -2, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo('.ot-route .path svg', { right: '100%' }, { right: '-6px', duration: 1.3, ease: 'power2.inOut' }, '-=0.3')
      .from('.polaroid', { y: -40, rotate: -14, opacity: 0, duration: 0.9, ease: 'back.out(1.8)' }, '-=0.6');
  });

  return (
    <section className="section" id="about" ref={root}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Passenger profile</div>
          <h2 className="h2">A little about me</h2>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            <p>
              I’m <b>Mario Sinclair</b>, a computer science student at the University of South Florida, graduating in May 2027.
              I’m originally from <b>Kingston, Jamaica</b>, and Tampa has been home base since I came here for school.
            </p>
            <p>
              Most of my work sits where software meets the physical world: projected AR and autonomout navigation across robots in the RARE Lab,
              data pipelines for the 900+ aircraft fleet at Delta Air Lines, and hackathon builds that have to work on the first demo.
            </p>
            <div className="interests">
              {profile.interests.map((it) => (
                <div className="interest" key={it.label}><b>{it.label}</b><span>{it.text}</span></div>
              ))}
            </div>
            <div className="coursework">
              <div className="eyebrow">Coursework · GPA {profile.gpa} · Dean’s List ×3</div>
              <ul>{profile.coursework.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>

          <div className="about-side">
            <div className="origin-ticket">
              <div className="ot-main">
                <div className="ot-top"><span>First flight · MS 001</span><span>Origin</span></div>
                <div className="ot-route" aria-label="Kingston to Tampa">
                  <span className="kin">KIN</span>
                  <span className="path"><Plane /></span>
                  <span>TPA</span>
                </div>
                <div className="ot-cities"><span>Kingston, Jamaica</span><span>Tampa, Florida</span></div>
                <div className="ot-fields">
                  <div><small>Passenger</small><b>Sinclair / Mario</b></div>
                  <div><small>Purpose</small><b>School</b></div>
                  <div><small>Status</small><b>Home base</b></div>
                </div>
              </div>
            </div>
            <figure className="polaroid">
              <img src={portrait} alt="Illustrated portrait of Mario taking a mirror selfie" width="640" height="640" loading="lazy" />
              <figcaption>Pre-flight mirror check</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
