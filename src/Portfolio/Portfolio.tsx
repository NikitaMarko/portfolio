import { useState } from 'react';
import { useLang } from '../i18n/LangContext';
import './Portfolio.css';

// Images from /public/files/
const lockerImg = '/files/locker_station.png';
const tcpImg = '/files/tcp.png';
const shopImg = '/files/product_shop.png';

interface Project {
  title: string; subtitle: string; desc: string; details: string;
  impact: readonly string[];
  impactStats?: { num: string; label: string }[];
  tags: readonly string[]; image: string;
}

export default function Portfolio() {
  const { tr } = useLang();
  const [active, setActive] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: tr.p1title, subtitle: tr.p1sub, desc: tr.p1desc,
      details: tr.p1details, impact: tr.p1impact,
      impactStats: [
        { num: '160+', label: 'lockers live' },
        { num: '45%',  label: 'Jest coverage' },
        { num: '2×',   label: 'faster deploys' },
      ],
      tags: tr.p1tags, image: lockerImg,
    },
    {
      title: tr.p2title, subtitle: tr.p2sub, desc: tr.p2desc,
      details: tr.p2details, impact: tr.p2impact,
      tags: tr.p2tags, image: tcpImg,
    },
    {
      title: tr.p3title, subtitle: tr.p3sub, desc: tr.p3desc,
      details: tr.p3details, impact: tr.p3impact,
      tags: tr.p3tags, image: shopImg,
    },
  ];

  const featured = projects[0];
  const others = projects.slice(1);

  const closeOnBg = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setActive(null);
  };

  return (
    <div className="container">
      <p data-rv className="section-mono">{tr.sectionPortfolio}</p>
      <h2 data-rv data-d="1" className="section-title portfolio-headline">{tr.portfolioH}</h2>

      {/* Featured */}
      <article data-rv className="proj-card featured-card" onClick={() => setActive(featured)}>
        <div className="featured-inner">
          <div className="featured-img" style={{ backgroundImage: `url(${featured.image})` }} />
          <div className="featured-body">
            <div>
              <div className="proj-header">
                <p className="proj-sub">{featured.subtitle}</p>
                <span className="proj-view">{tr.viewCase}</span>
              </div>
              <h3 className="proj-title">{featured.title}</h3>
              <p className="proj-desc">{featured.desc}</p>
            </div>
            <div>
              {featured.impactStats && (
                <div className="featured-stats">
                  {featured.impactStats.map(s => (
                    <div key={s.label}>
                      <p className="stat-num">{s.num}</p>
                      <p className="stat-label">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="proj-tags">
                {[...featured.tags].slice(0, 4).map(t => <span className="proj-tag" key={t}>{t}</span>)}
                {featured.tags.length > 4 && <span className="proj-tag muted">+{featured.tags.length - 4}</span>}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Others */}
      <div className="other-grid">
        {others.map(p => (
          <article data-rv className="proj-card other-card" key={p.title} onClick={() => setActive(p)}>
            <div className="other-img" style={{ backgroundImage: `url(${p.image})` }} />
            <div className="other-body">
              <p className="proj-sub">{p.subtitle}</p>
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.desc}</p>
              <div className="impact-row">
                {p.impact.map(i => <span className="impact-item" key={i}>{i}</span>)}
              </div>
              <div className="proj-tags">
                {[...p.tags].slice(0, 4).map(t => <span className="proj-tag" key={t}>{t}</span>)}
                {p.tags.length > 4 && <span className="proj-tag muted">+{p.tags.length - 4}</span>}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div className="modal-overlay" onClick={closeOnBg}>
          <div className="modal-wrap">
            <button className="modal-close" onClick={() => setActive(null)}>✕</button>
            <div className="modal-img" style={{ backgroundImage: `url(${active.image})` }} />
            <div className="modal-body">
              <p className="proj-sub">{active.subtitle}</p>
              <h3 className="modal-title">{active.title}</h3>
              <div className="modal-impact">
                {active.impact.map(i => <span className="impact-badge" key={i}>{i}</span>)}
              </div>
              <div className="modal-tags">
                {[...active.tags].map(t => <span className="proj-tag" key={t}>{t}</span>)}
              </div>
              <div className="modal-paras">
                {active.details.split('\n').filter(s => s.trim()).map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
