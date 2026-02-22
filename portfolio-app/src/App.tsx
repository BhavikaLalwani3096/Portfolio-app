import { useState, useEffect } from 'react'
import profilePhoto from './assets/image.jpeg'
import './App.css'
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

type ProjectTab = 'ongoing' | 'completed' | 'planned';

function App() {
  const [overlay, setOverlay] = useState<{
    title: string;
    items: { label: string; image: string }[];
    activeIndex: number;
  } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState<ProjectTab>('ongoing');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  const formRef = useRef<HTMLFormElement>(null);
const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!formRef.current) return;

  setFormStatus('sending');

  emailjs.sendForm(
    'service_yz0loki',    
    'template_l6gz1sw',  
    formRef.current,
    'HuSx4Klqxsq8QXvDL'     
  )
  .then(() => {
    setFormStatus('success');
    formRef.current?.reset();
    setTimeout(() => setFormStatus('idle'), 4000);
  })
  .catch(() => {
    setFormStatus('error');
    setTimeout(() => setFormStatus('idle'), 4000);
  });
};
const openOverlay = (title: string, items: { label: string; image: string }[], activeIndex = 0) => {
  setOverlay({ title, items, activeIndex });
};

const closeOverlay = () => setOverlay(null);

  return (
    <>
      {/* ── NAVBAR ── */}
      <div className="navbar">
        <a className="profile-pic-nav">
          <img src={profilePhoto} alt="NavProfile" />
        </a>
        <h3 className="name">Bhavika Lalwani</h3>

        {/* Desktop nav links */}
        <div className="nav-links-desktop">
          <a className="nav-link" href="#profile">Profile</a>
          <a className="nav-link" href="#aboutme">About</a>
          <a className="nav-link" href="#skills">Skills</a>
          <a className="nav-link" href="#education">Education</a>
          <a className="nav-link" href="#experience">Experience</a>
          <a className="nav-link" href="#projects">Projects</a>
          <a className="nav-link" href="#certifications">Certifications</a>
          <a className="nav-link" href="#achievements">Achievements</a>
          <a className="nav-link" href="#resume">Resume</a>
          <a className="nav-link" href="#contact">Contact</a>
        </div>

        <button className="displayToggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Hamburger button — only visible on mobile */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        </button>
        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {['profile','aboutme','skills','education','experience','projects','certifications','achievements','resume','contact'].map(id => (
              <a                             
                key={id}
                className="mobile-nav-link"
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* ── PROFILE ── */}
      <section id="profile" className="profile-section">
        <div className="profile-content">
          <div className="profile-pic">
            <img src={profilePhoto} alt="Profile" />
          </div>
          <h1 className="title">Bhavika Lalwani</h1>
          <p className="tag">Aspiring Computer Science Engineer</p>
          <p className="tag">AI / ML Enthusiast</p>
          <p className="tag">Full-Stack Developer</p>
        </div>
      </section>

      {/* ── ABOUT ME ── */}
      <section id="aboutme" className="aboutme-section">
        <h2 className="section-title">About Me</h2>
        <p className="section-content">
          I'm a Computer Science student who genuinely loves what I study. My main passion right now is AI and Machine Learning,
          but I'm the kind of person who gets curious about everything — which means I'm always diving into something new,
          whether it's a project, a field, or a problem I've never solved before.
        </p>
        <p className="section-content" style={{ marginTop: '1em' }}>
          I'm at a stage in my journey where I want to explore, experiment, and build. I believe the best way to learn is
          by doing, and this portfolio is a reflection of exactly that — everything I've worked on, everything I'm working
          on, and everything I'm planning next.
        </p>

        <h2 className="section-title" style={{ marginTop: '2em' }}>Interests</h2>
        <p className="section-content">
          AI and Machine Learning are my main passions, but I'm also deeply interested in software development, data science,
          and cybersecurity. I love exploring new technologies and frameworks, and I'm always on the lookout for exciting
          projects to work on.
        </p>
        <p className="section-content" style={{ marginTop: '1em' }}>
          I also have a strong interest in data structures and algorithms and enjoy working on challenging problems.
          Beyond tech, I enjoy reading and kickboxing — activities that keep me creative, focused, and balanced.
        </p>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="skills-section">
        <h2 className="section-title">Skills</h2>

        <div className="skills-category">
          <h3 className="skills-category-title">Languages</h3>
          <div className="skills-grid">
            {['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL'].map(s => (
              <span key={s} className="skill-block">{s}</span>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <h3 className="skills-category-title">Frameworks & Tools</h3>
          <div className="skills-grid">
            {['React', 'Node.js', 'Django', 'Flutter', 'Git', 'Android Studio'].map(s => (
              <span key={s} className="skill-block">{s}</span>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <h3 className="skills-category-title">AI / ML & Data</h3>
          <div className="skills-grid">
            {['Machine Learning', 'Deep Learning', 'Computer Vision', 'Data Visualization', 'Statistics', 'Database Management'].map(s => (
              <span key={s} className="skill-block">{s}</span>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <h3 className="skills-category-title">Concepts</h3>
          <div className="skills-grid">
            {['Data Structures', 'Algorithms', 'OOP', 'Web Development', 'Problem Solving', 'Teamwork'].map(s => (
              <span key={s} className="skill-block">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="section-wrapper">
        <h2 className="section-title">Education</h2>
        <div className="cards-container">
          <div className="card">
            <span className="status-badge completed">Completed</span>
            <h3 className="card-title">10th Grade</h3>
            <p className="card-content">Centre Point School, Katol Road, Nagpur</p>
            <p className="card-content">Year: 2022</p>
            <p className="card-content">Percentage: <strong>92%</strong></p>
            <a className="card-button">View Certificate</a>
          </div>
          <div className="card">
            <span className="status-badge completed">Completed</span>
            <h3 className="card-title">Diploma in Computer Science & Engineering</h3>
            <p className="card-content">Maharashtra Institute of Technology, Pune</p>
            <p className="card-content">2022 – 2025</p>
            <p className="card-content">CGPA: <strong>8.75</strong></p>
            <a className="card-button">View Certificate</a>
          </div>
          <div className="card">
            <span className="status-badge pursuing">Pursuing</span>
            <h3 className="card-title">B.Tech in Computer Science & Engineering</h3>
            <p className="card-content">Maharashtra Institute of Technology, Pune</p>
            <p className="card-content">2025 – 2028</p>
            <p className="card-content">CGPA: <strong>8.75</strong> (until Sem 1, Year 2)</p>
            <a className="card-button">View Transcript</a>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section-wrapper">
        <h2 className="section-title">Experience</h2>
        <div className="cards-container">
          <div className="card card-wide">
            <span className="status-badge completed">Completed</span>
            <h3 className="card-title">Software Engineering Intern — Team Lead</h3>
            <p className="card-content card-company">Salahkaar Consultants</p>
            <p className="card-content">2025</p>
            <p className="card-content" style={{ marginTop: '0.5em' }}>
              Led a team in developing a full-stack HRM web application for a client.
              Designed the frontend using React and integrated it with a Django backend.
              This internship was part of my 3rd year of the Diploma program.
            </p>
            <div className="tech-tags">
              {['React', 'Django', 'Python', 'SQL', 'Team Lead'].map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
            <a className="card-button">View Certificate</a>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-wrapper">
        <h2 className="section-title">Projects</h2>
        <div className="project-tabs">
          {(['ongoing', 'completed', 'planned'] as ProjectTab[]).map(tab => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="cards-container">
          {activeTab === 'ongoing' && (
            <>
              <div className="card">
                <span className="status-badge ongoing">Ongoing</span>
                <h3 className="card-title">Portfolio App</h3>
                <p className="card-content">A personal portfolio website built with React and Vite, showcasing my projects, skills, and experience. Supports dark and light themes.</p>
                <div className="tech-tags">
                  {['React', 'TypeScript', 'Vite', 'CSS'].map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <a className="card-button" href="https://github.com/BhavikaLalwani3096" target="_blank" rel="noopener noreferrer">View on GitHub</a>
              </div>
            </>
          )}

          {activeTab === 'completed' && (
            <>
              <div className="card card-wide">
                <span className="status-badge completed">Completed</span>
                <h3 className="card-title">HRM Web Application</h3>
                <p className="card-content">A Human Resource Management web application developed during my internship at Salahkaar Consultants. I served as Team Lead and was responsible for the React frontend and Django backend integration.</p>
                <div className="tech-tags">
                  {['React', 'Django', 'Python', 'SQL'].map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <a className="card-button">View Details</a>
              </div>
            </>
          )}

          {activeTab === 'planned' && (
            <>
              <div className="card">
                <span className="status-badge planned">Planned</span>
                <h3 className="card-title">Blockchain Project</h3>
                <p className="card-content">Exploring decentralized application development. Planning to build a certificate verification system using smart contracts on Ethereum testnet.</p>
                <div className="tech-tags">
                  {['Solidity', 'Ethereum', 'Web3.js', 'React'].map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
              <div className="card">
                <span className="status-badge planned">Planned</span>
                <h3 className="card-title">Computer Graphics Project</h3>
                <p className="card-content">Planning to explore computer graphics as a new field — project details to be decided after initial exploration.</p>
                <div className="tech-tags">
                  {['OpenGL', 'C++', 'GLSL'].map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
              <div className="card">
                <span className="status-badge planned">Planned</span>
                <h3 className="card-title">Emotion Detection</h3>
                <p className="card-content">A computer vision project that detects human emotions in real-time using a webcam feed. Built using deep learning and OpenCV.</p>
                <div className="tech-tags">
                  {['Python', 'OpenCV', 'Deep Learning', 'TensorFlow'].map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                {/* <a className="card-button">View on GitHub</a> */}
              </div>
              <div className="card">
                <span className="status-badge planned">Planned</span>
                <h3 className="card-title">Photo Booth App</h3>
                <p className="card-content">A fun cross-platform photo booth app built with Flutter to learn and explore single-codebase mobile development.</p>
                <div className="tech-tags">
                  {['Flutter', 'Dart', 'Android', 'iOS'].map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                {/* <a className="card-button">View on GitHub</a> */}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" className="section-wrapper">
        <h2 className="section-title">Certifications</h2>
        <div className="cards-container">
          <div className="card">
            <h3 className="card-title">Add your certifications here</h3>
            <p className="card-content">Platform / Issuer</p>
            <p className="card-content">Month Year</p>
            <a className="card-button">Verify Certificate</a>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="section-wrapper">
        <h2 className="section-title">Achievements</h2>
        <div className="achievements-list">
          <div className="achievement-item">
            <span className="achievement-icon">🏅</span>
            <div>
              <h3 className="achievement-title">CGPA 8.75 — Diploma in CSE</h3>
              <p className="achievement-sub">Maharashtra Institute of Technology, Pune · 2022–2025</p>
            </div>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">🏅</span>
            <div>
              <h3 className="achievement-title">CGPA 8.75 — B.Tech CSE (Sem 1, Year 2)</h3>
              <p className="achievement-sub">Maharashtra Institute of Technology, Pune · 2025–present</p>
            </div>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">💼</span>
            <div>
              <h3 className="achievement-title">Team Lead — Internship Project</h3>
              <p className="achievement-sub">Led development of an HRM web app at Salahkaar Consultants · 2025</p>
            </div>
          </div>
          <div className="achievement-item">
            <span className="achievement-icon">🎓</span>
            <div>
              <h3 className="achievement-title">92% — 10th Grade</h3>
              <p className="achievement-sub">Centre Point School, Nagpur · 2022</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESUME ── */}
      <section id="resume" className="section-wrapper">
        <h2 className="section-title">Resume</h2>
        <p className="section-content" style={{ marginBottom: '1.5em' }}>
          Download or view my latest resume below.
        </p>
        <div className="resume-section">
          <a className="card-button" href="#" target="_blank" rel="noopener noreferrer">📄 View Resume</a>
          <a className="card-button" href="#" download>⬇️ Download Resume</a>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Contact</h2>
        <div className="contact-wrapper">

          {/* LEFT — Form */}
          <div className="contact-form-card">
            <h3 className="contact-card-title">Send a Message</h3>
            <form ref={formRef} onSubmit={handleFormSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label" htmlFor="from_email">Your Email</label>
                <input
                  id="from_email"
                  name="from_email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Purpose</label>
                <select id="subject" name="subject" className="form-input" required>
                  <option value="">Select a reason...</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Project Inquiry">Project Inquiry</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input form-textarea"
                  placeholder="Write your message here..."
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className="form-submit" disabled={formStatus === 'sending'}>
                {formStatus === 'idle' && 'Send Message'}
                {formStatus === 'sending' && 'Sending...'}
                {formStatus === 'success' && '✅ Sent!'}
                {formStatus === 'error' && '❌ Failed — Try Again'}
              </button>
            </form>
          </div>

          {/* RIGHT — Contact Info */}
          <div className="contact-info-card">
            <h3 className="contact-card-title">Get in Touch</h3>
            <p className="contact-description">
              Feel free to reach out for opportunities, collaborations, or just to say hi!
            </p>
            <div className="contact-links">
              <a href="mailto:lalwanibhavi06@gmail.com" className="contact-link-item">
                <span className="contact-icon">📧</span>
                <div>
                  <p className="contact-link-label">Email</p>
                  <p className="contact-link-value">lalwanibhavi06@gmail.com</p>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/bhavika-lalwani-47850a2a9"
                className="contact-link-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-icon">💼</span>
                <div>
                  <p className="contact-link-label">LinkedIn</p>
                  <p className="contact-link-value">bhavika-lalwani</p>
                </div>
              </a>
              <a
                href="https://github.com/BhavikaLalwani3096"
                className="contact-link-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-icon">🐙</span>
                <div>
                  <p className="contact-link-label">GitHub</p>
                  <p className="contact-link-value">BhavikaLalwani3096</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </section>
      {/* ── CERTIFICATE / RESUME OVERLAY ── */}
      {overlay && (
        <div className="overlay-backdrop" onClick={closeOverlay}>
          <div className="overlay-panel" onClick={e => e.stopPropagation()}>

            {/* Sidebar */}
            <div className="overlay-sidebar">
              <h3 className="overlay-sidebar-title">{overlay.title}</h3>
              {overlay.items.map((item, i) => (
                <button
                  key={i}
                  className={`overlay-sidebar-item ${overlay.activeIndex === i ? 'active' : ''}`}
                  onClick={() => setOverlay(prev => prev ? { ...prev, activeIndex: i } : null)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Main viewer */}
            <div className="overlay-main">
              <button className="overlay-close" onClick={closeOverlay}>✕</button>
              <img
                className="overlay-image"
                src={overlay.items[overlay.activeIndex].image}
                alt={overlay.items[overlay.activeIndex].label}
              />
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default App;



