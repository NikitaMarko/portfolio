import { useEffect, useRef } from 'react';
import photo from '../assets/foto.jpg';
import { useLang } from '../i18n/LangContext';
import './home.css';

export default function Home() {
  const { tr } = useLang();
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-hero-enter]');
    setTimeout(() => {
      els.forEach((el, i) => {
        el.style.transition = `opacity 0.72s cubic-bezier(.22,1,.36,1) ${i * 0.11}s, transform 0.72s cubic-bezier(.22,1,.36,1) ${i * 0.11}s`;
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }, 60);
  }, []);

  useEffect(() => {
    const frame = photoRef.current;
    if (!frame) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      frame.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg) scale(1.015)`;
    };
    const onLeave = () => {
      frame.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  };

  return (
    <div className="home-section">
      <div className="container home-inner">
        <div className="hero-text">
          <p data-hero-enter className="hero-greeting">{tr.greeting}</p>
          <h1 data-hero-enter className="hero-name">Nikita<br />Markovskii</h1>
          <p data-hero-enter className="hero-role">{tr.role}</p>
          <div data-hero-enter className="hero-company-badge">
            <span className="badge-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M3 21h18M3 7l9-4 9 4v14H3V7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 21v-6h6v6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="badge-label">{tr.currentlyAt}</span>
            <span className="badge-value">Optisor LTD</span>
          </div>
          <p data-hero-enter className="hero-stack">React · Node.js · TypeScript · PostgreSQL · AWS</p>
          <div data-hero-enter className="hero-cta">
            <a href={tr.cvHref} download className="btn-primary">{tr.downloadCV}</a>
            <button className="btn-ghost" onClick={() => scrollTo('contact')}>{tr.letsTalk} →</button>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo-glow" />
          <div ref={photoRef} className="hero-photo-frame">
            <img src={photo} alt="Nikita Markovskii" className="hero-photo-img" />
          </div>
          <div className="hero-badge">
            <span className="badge-dot" />
            {tr.openToWork}
          </div>
        </div>
      </div>
    </div>
  );
}
