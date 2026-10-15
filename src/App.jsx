import { useEffect } from 'react';
import { startSmoothScroll } from './lib/motion';
import useVisitorCount from './lib/useVisitorCount';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Crew from './components/Crew';
import Baggage from './components/Baggage';
import Travel from './components/Travel';
import Contact, { Footer } from './components/Contact';

export default function App() {
  const visitors = useVisitorCount();
  useEffect(() => { startSmoothScroll(); }, []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero visitors={visitors} />
        <About />
        <Experience />
        <Projects />
        <Crew />
        <Baggage />
        <Travel />
        <Contact />
      </main>
      <Footer visitors={visitors} />
    </>
  );
}
