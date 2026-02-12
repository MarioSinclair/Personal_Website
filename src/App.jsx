import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import './App.css';
import profile from './assets/Headshot.JPEG';
import profile2 from './assets/picture.PNG';
import lab_logo from './assets/lab_logo.png';
import nsbe_logo from './assets/nsbe_logo.svg';
import shpe_logo from './assets/shpe_logo.avif';
import resume from './assets/Mario_Sinclair_Resume.pdf';
import nsbe_website from './assets/nsbe_website.png';
import option_scope from './assets/black_scholes_website.png';
import rare_lab from './assets/rare_lab.jpg';

function App() {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Hey, I'm <span class='highlight'>Mario</span>",
      ],
      typeSpeed: 50,
      showCursor: true,
      cursorChar: '|',
      html: true
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">ms.dev</span>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#home" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="#leadership" className="nav-link">Leadership</a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link">Projects</a>
            </li>
            <li className="nav-item">
              <a href="#skills" className="nav-link">Skills</a>
            </li>
            <li className="nav-item">
              <a href="#personality" className="nav-link">Beyond the Code</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              <span ref={typedRef} className="typed-text"></span>
            </h1>
            <h2 className="hero-subtitle">Computer Science Student</h2>
            <p className="hero-description">
              I am a Junior pursuing a Bachelor of Science in Computer Science at the University of South Florida. 
              Passionate about autonomous robotics and AI.
            </p>
            <div className="hero-buttons">
              <motion.a 
                href={resume} 
                className="btn btn-primary"
                download="Mario_Sinclair_Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                My Resume
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/mario-sinclair/" 
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect!
              </motion.a>
            </div>
          </motion.div>
          <div className="hero-image">
            <div className="profile-placeholder">
              <img className="profile-icon" src={profile} alt="Profile" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm passionate about full-stack development, robotics, and financial technology. My interests span from 
                building end-to-end web applications with React and Node.js to developing autonomous navigation systems 
                using SLAM and sensor fusion. I also enjoy creating financial tools like options pricing models and 
                exploring the intersection of technology, robotics, and quantitative finance.
              </p>
            </div>
            <div className="about-image">
              <div className="about-placeholder">
                <img src={profile2} alt="Profile" className="about-placeholder" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="leadership">
        <div className="container">
          <h2 className="section-title">Leadership Experience</h2>
          <div className="leadership-grid">
          <motion.div 
              className="leadership-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="leadership-icon">
                <img src={lab_logo} alt="Profile" className="leadership-icon-img" />
              </div>
              <div className="leadership-content">
                <h3>Undergraduate Researcher - RARE Lab</h3>
                <p className="leadership-period">Sep 2025 - Present</p>
                <p className="leadership-description">
                  Contribute to cutting-edge research in Human-Robot Interaction and spatial augmented reality. 
                  Develop projectable visualization systems that enhance real-world communication between humans 
                  and machines, focusing on innovative solutions for autonomous navigation and perception systems.
                </p>
                <div className="leadership-skills">
                  <span className="skill-tag">Research</span>
                  <span className="skill-tag">HRI Systems</span>
                  <span className="skill-tag">AR Development</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="leadership-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            > 
              <div className="">
                <img src={shpe_logo} alt="Profile" className="leadership-icon-img" />
              </div>
              <div className="leadership-content">
                <h3>Tech Director - SHPE USF</h3>
                <p className="leadership-period">Sep 2025 - Present</p>
                <p className="leadership-description">
                  Lead hackathon development and technical initiatives for the Society of Hispanic Professional Engineers. 
                  Organize coding competitions, mentor participants, and coordinate with industry partners to create 
                  impactful technical experiences for students.
                </p>
                <div className="leadership-skills">
                  <span className="skill-tag">Hackathon Development</span>
                  <span className="skill-tag">Technical Mentoring</span>
                  <span className="skill-tag">Industry Relations</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="leadership-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="leadership-icon-img">
                <img src={nsbe_logo} alt="Profile" className="leadership-icon-img" />
              </div>
              <div className="leadership-content">
                <h3>Conference Planning Chair - NSBE USF</h3>
                <p className="leadership-period">Jan 2025 - Present</p>
                <p className="leadership-description">
                  Oversee event logistics, corporate engagement, and large-scale professional conferences for the 
                  USF National Society of Black Engineers. Manage company relationships, coordinate speaker sessions, 
                  and ensure seamless execution of networking events.
                </p>
                <div className="leadership-skills">
                  <span className="skill-tag">Event Logistics</span>
                  <span className="skill-tag">Corporate Engagement</span>
                  <span className="skill-tag">Conference Management</span>
                </div>
              </div>
            </motion.div>

            
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <motion.div 
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="project-image">
                <div className="project-placeholder">
                  <img src={nsbe_website} alt="NSBE Website" className="project-image" />
                </div>
              </div>
              <div className="project-content">
                <h3>USF NSBE Website</h3>
                <p>Lead Developer for the USF National Society of Black Engineers website serving 400+ students. Implemented SEO optimization, CI/CD pipeline, and performance enhancements that improved Google ranking from 20+ to average of 4.</p>
                <div className="project-tech">
                  <span className="tech-tag">HTML5</span>
                  <span className="tech-tag">CSS3</span>
                  <span className="tech-tag">JavaScript</span>
                  <span className="tech-tag">Vercel</span>
                  <span className="tech-tag">Git</span>
                </div>
                <div className="project-links">
                  <a href="https://www.usfnsbe.com/" className="project-link" target="_blank" rel="noopener noreferrer">Website</a>
                  <a href="https://github.com/MarioSinclair/NSBE-LandingPage" className="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="project-image">
                <div className="project-placeholder">
                  <img src={option_scope} alt="OptionScope" className="project-image" />
                </div>
              </div>
              <div className="project-content">
                <h3>OptionScope - Black-Scholes Pricing Tool</h3>
                <p>A full-stack options pricing and visualization tool that translates complex financial mathematics into an intuitive interface. Features interactive charts for the Greeks (Delta, Gamma, Vega, Theta) using Chart.js.</p>
                <div className="project-tech">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">FastAPI</span>
                  <span className="tech-tag">NumPy</span>
                  <span className="tech-tag">Chart.js</span>
                  <span className="tech-tag">Git</span>
                </div>
                <div className="project-links">
                  <a href="https://black-scholes-pricing-ruddy.vercel.app" className="project-link" target="_blank" rel="noopener noreferrer">Website</a>
                  <a href="https://github.com/MarioSinclair/Black-Scholes-Model" className="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="project-image">
                <div className="project-placeholder">
                  <img src={rare_lab} alt="RARE Lab" className="project-image" />
                </div>
              </div>
              <div className="project-content">
                <h3>RARE Lab Research</h3>
                <p>Contributing to research in Human-Robot Interaction and spatial augmented reality. Primarily working on the navigation portion, developing systems for enhanced robot mobility and spatial awareness.</p>
                <div className="project-tech">
                  <span className="tech-tag">C++</span>
                  <span className="tech-tag">ROS2</span>
                  <span className="tech-tag">SLAM</span>
                  <span className="tech-tag">AR/VR</span>
                  <span className="tech-tag">Git</span>
                </div>
                <div className="project-links">
                  <a href="https://therarelab.com/people/mario-sinclair/" className="project-link" target="_blank" rel="noopener noreferrer">Lab Website</a>
                </div>
              </div>
            </motion.div>
          </div>
      </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <div className="skill-items">
                <span className="skill-item">Python</span>
                <span className="skill-item">C++</span>
                <span className="skill-item">JavaScript</span>
                <span className="skill-item">TypeScript</span>
                <span className="skill-item">HTML5</span>
                <span className="skill-item">CSS3</span>
                <span className="skill-item">SQL</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Web Development</h3>
              <div className="skill-items">
                <span className="skill-item">React</span>
                <span className="skill-item">Node.js</span>
                <span className="skill-item">Express.js</span>
                <span className="skill-item">MongoDB</span>
                <span className="skill-item">GCP (Firebase)</span>
                <span className="skill-item">Flask</span>
                <span className="skill-item">REST APIs</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Technologies</h3>
              <div className="skill-items">
                <span className="skill-item">Git</span>
                <span className="skill-item">ROS2</span>
                <span className="skill-item">Pytorch</span>
                <span className="skill-item">NumPy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personality Section */}
      <section id="personality" className="personality">
        <div className="container">
          <h2 className="section-title">Beyond the Code</h2>
          <div className="personality-content">
            <motion.div 
              className="personality-intro"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p>
                When I'm not debugging code or researching robotics, you'll find me exploring the world, 
                hitting the slopes, or discovering the next great restaurant. I believe the best ideas come 
                from diverse experiences and continuous learning.
              </p>
            </motion.div>
            
            <div className="interests-grid">
              <motion.div 
                className="interest-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="interest-icon">✈️</div>
                <h3>Travel & Adventure</h3>
                <p>Love exploring new cities, cultures, and cuisines. Always planning the next adventure and collecting experiences from around the world.</p>
              </motion.div>

              <motion.div 
                className="interest-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="interest-icon">🏂</div>
                <h3>Snowboarding</h3>
                <p>Hit the slopes whenever I can. There's something magical about carving through fresh powder and the mountain views.</p>
              </motion.div>

              <motion.div 
                className="interest-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="interest-icon">📈</div>
                <h3>Finance & Investing</h3>
                <p>Passionate about researching stocks, personal finance, and building wealth. Love analyzing market trends and investment strategies.</p>
              </motion.div>
            </div>

            
          </div>
          <div className="thank-you-simple">Thanks for stopping by!</div>
          <div className="thank-you-simple">I'd love to <a href="https://www.linkedin.com/in/mario-sinclair/" className="linkedin-link" target="_blank" rel="noopener noreferrer">connect</a>!</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Mario Sinclair. All rights reserved.</p>
        </div>
      </footer>
      </div>
  );
}

export default App;