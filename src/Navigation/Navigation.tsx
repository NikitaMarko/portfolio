import { useState, useEffect } from 'react';
import { useLang } from '../i18n/LangContext';
import './navigation.css';

export default function Navigation() {
  const { tr, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      let active = 'home';
      for (const id of ['home', 'about', 'skills', 'portfolio', 'contact']) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 130) active = id;
      }
      setActiveSection(active);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { id: 'home',      label: tr.nav.home },
    { id: 'about',     label: tr.nav.about },
    { id: 'skills',    label: tr.nav.skills },
    { id: 'portfolio', label: tr.nav.portfolio },
    { id: 'contact',   label: tr.nav.contact },
  ];

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => scrollTo('home')}>NM</button>

        <div className="nav-links">
          {navLinks.map(l => (
            <button
              key={l.id}
              className={`nav-btn${activeSection === l.id ? ' active' : ''}`}
              onClick={() => scrollTo(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button className="lang-toggle" onClick={() => setLang(lang === 'en' ? 'he' : 'en')}>
          <span className={lang === 'en' ? 'lang-active' : 'lang-dim'}>EN</span>
          <span className="lang-sep">|</span>
          <span className={lang === 'he' ? 'lang-active' : 'lang-dim'}>עב</span>
        </button>

        <button className="hamburger" onClick={() => setMenuOpen(m => !m)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(l => (
            <button
              key={l.id}
              className={`mobile-nav-btn${activeSection === l.id ? ' active' : ''}`}
              onClick={() => scrollTo(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
