import { useLang } from '../i18n/LangContext';
import './AboutMe.css';

export default function AboutMe() {
  const { tr } = useLang();
  return (
    <div className="container">
      <p data-rv className="section-mono">{tr.sectionAbout}</p>
      <div className="about-grid">
        {/* Left */}
        <div data-rv className="about-left">
          <h2 className="section-title about-headline">
            {tr.h1}<br />
            <span style={{ color: 'var(--blue)' }}>{tr.h2}</span>
          </h2>
          <p className="about-bio">{tr.bio}</p>
        </div>

        {/* Cards */}
        <div data-rv data-d="2" className="about-cards">
          {tr.q.map((q, i) => (
            <div className="qual-card" key={i}>
              <p className="qual-num">{q.n}</p>
              <p className="qual-title">{q.t}</p>
              <p className="qual-desc">{q.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
