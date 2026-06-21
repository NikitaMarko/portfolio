import { useEffect } from 'react';
import './index.css';
import Navigation from './Navigation/Navigation';
import Home from './Home/Home';
import AboutMe from './AboutMe/AboutMe';
import MySkills from './MySkills/MySkills';
import Portfolio from './Portfolio/Portfolio';
import Contact from './Contact/Contact';
import { LangProvider } from './i18n/LangContext';

function AppInner() {
  useEffect(() => {
    // Scroll progress bar
    const bar = document.getElementById('scroll-progress');
    const onScroll = () => {
      if (!bar) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Intersection observer for reveal animations
    const delays = ['0s','0.08s','0.16s','0.24s','0.32s','0.40s','0.48s'];
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

    const els = document.querySelectorAll('[data-rv]');
    els.forEach(el => {
      const d = Math.min(parseInt((el as HTMLElement).dataset.d || '0'), 6);
      (el as HTMLElement).style.transitionDelay = delays[d];
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <div id="scroll-progress" />
      <Navigation />
      <main>
        <section id="home"><Home /></section>
        <section id="about" style={{ background: '#F7F7F5', padding: '108px 0' }}><AboutMe /></section>
        <section id="skills" style={{ background: '#FFFFFF', padding: '108px 0' }}><MySkills /></section>
        <section id="portfolio" style={{ background: '#F7F7F5', padding: '108px 0' }}><Portfolio /></section>
        <section id="contact" style={{ background: '#FFFFFF', padding: '108px 0' }}><Contact /></section>
      </main>
      <footer style={{ background: '#111110', color: '#6B7280', padding: '40px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' }}>NM</span>
          <p style={{ fontSize: 13 }}>© 2026 Nikita Markovskii · All rights reserved.</p>
          <a href="https://linkedin.com/in/nikita-markovskii-dev" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, transition: 'color 0.18s' }} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}>LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
