import { useLang } from '../i18n/LangContext';
import './MySkills.css';

const ICONS: Record<string, string> = {
  React: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" stroke-width="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" stroke-width="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" stroke-width="1.2" fill="none" transform="rotate(120 12 12)"/></svg>',
  TypeScript: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6"/><text x="4.5" y="17" font-size="10" font-weight="700" fill="white" font-family="monospace">TS</text></svg>',
  JavaScript: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E"/><text x="4" y="17" font-size="9.5" font-weight="700" fill="#000" font-family="monospace">JS</text></svg>',
  'Node.js': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#3C873A" stroke-width="1.3" fill="none"/><path d="M12 2v20M3 7l9 5 9-5" stroke="#3C873A" stroke-width="1.3"/></svg>',
  MongoDB: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C9 6 7 9 7 13c0 2.8 2.2 5 5 5s5-2.2 5-5c0-4-2-7-5-11z" fill="#4DB33D"/><path d="M12 18v4" stroke="#4DB33D" stroke-width="2" stroke-linecap="round"/></svg>',
  Git: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.586l-9.586-9.586a2 2 0 0 0-2.828 0L7.75 3.836l2.828 2.828a2 2 0 0 1 2.528 2.528l2.727 2.727a2 2 0 1 1-1.414 1.414l-2.548-2.548v6.71a2 2 0 1 1-1.658.007V10.65a2 2 0 0 1-1.086-2.61L6.3 5.214 2 9.515v.07a2 2 0 0 0 0 2.83l9.586 9.585a2 2 0 0 0 2.828 0L22 14.413a2 2 0 0 0 0-2.827z" fill="#F05032"/></svg>',
  GitHub: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7C6.73 19.91 6.14 18 6.14 18c-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" fill="#ADBAC7"/></svg>',
  Docker: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 10.3c-.5-.3-1.7-.5-2.7-.3-.1-1-.7-1.9-1.6-2.4l-.5-.3-.4.5c-.5.6-.6 1.6-.5 2.3-.4-.2-.8-.3-1.5-.3H2.2c-.3 1.6.2 3.7 1.5 5.1.9 1 2.2 1.5 3.9 1.5 3.7 0 6.4-1.7 7.7-4.8.9.1 2.8 0 3.7-1.8l.2-.4-.7-.1z" fill="#2391E6"/><rect x="3" y="8" width="2" height="2" rx=".3" fill="white"/><rect x="6" y="8" width="2" height="2" rx=".3" fill="white"/><rect x="9" y="8" width="2" height="2" rx=".3" fill="white"/><rect x="12" y="8" width="2" height="2" rx=".3" fill="white"/><rect x="9" y="5" width="2" height="2" rx=".3" fill="white"/><rect x="12" y="5" width="2" height="2" rx=".3" fill="white"/></svg>',
  AWS: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 15.5c-2.5-.5-4-2-4-4 0-2.2 1.8-4 4-4 .3 0 .7 0 1 .1C8.5 5.8 10.1 4.5 12 4.5c2.5 0 4.5 2 4.5 4.5 0 .2 0 .4-.1.6C18 10 19.5 11.5 19.5 13c0 1.5-1 2.8-2.5 3.2" stroke="#FF9900" stroke-width="1.3" stroke-linecap="round" fill="none"/><path d="M8 19l2-3h4l2 3" stroke="#FF9900" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  PostgreSQL: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="#336791" stroke-width="1.3" fill="#336791" fill-opacity=".2"/><path d="M5 6v8c0 1.66 3.13 3 7 3s7-1.34 7-3V6" stroke="#336791" stroke-width="1.3" fill="none"/><path d="M19 10c0 1.66-3.13 3-7 3s-7-1.34-7-3" stroke="#336791" stroke-width="1"/></svg>',
  Redis: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 14l9-4 9 4-9 4-9-4z" fill="#DC382D" fill-opacity=".3" stroke="#DC382D" stroke-width="1.2"/><path d="M3 10l9-4 9 4-9 4-9-4z" fill="#DC382D" fill-opacity=".6" stroke="#DC382D" stroke-width="1.2"/><path d="M3 6l9-4 9 4-9 4-9-4z" fill="#DC382D" stroke="#DC382D" stroke-width="1.2"/></svg>',
  'Redux Toolkit': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.634 16.504c.87-.956 1.452-2.239 1.452-3.77C18.086 9.84 15.247 7 11.754 7c-.789 0-1.551.152-2.258.419L7.595 5.53A8.47 8.47 0 0 1 11.754 4.5c5.072 0 9.086 4.016 9.086 9.086 0 1.962-.626 3.782-1.698 5.258l-2.508-2.34zm-1.43 1.577-1.498-1.4a4.586 4.586 0 0 1-1.952.441C8.258 17.122 5.5 14.364 5.5 10.968c0-.693.12-1.357.34-1.973L3.87 7.12A8.52 8.52 0 0 0 3 10.968c0 4.994 4.058 9.052 9.052 9.052 1.18 0 2.303-.225 3.332-.634zM21 21 3 3" stroke="#764ABC" stroke-width="1.5" stroke-linecap="round"/></svg>',
  'React Query': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 12c-2.67 0-5.01-1.38-6.38-3.47.03-2.12 4.26-3.28 6.38-3.28 2.11 0 6.35 1.16 6.38 3.28C17.01 16.62 14.67 18 12 18z" fill="#FF4154"/></svg>',
  'Material UI': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.5L9.5 1l8.5 4.5v4L9.5 14 1 9.5V5.5z" fill="#007FFF" opacity=".8"/><path d="M9.5 14v4.5L18 14V9.5L9.5 14z" fill="#007FFF"/><path d="M1 9.5v4L9.5 18.5V14L1 9.5z" fill="#007FFF" opacity=".6"/></svg>',
  Vite: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 3L13.5 18l-2-4.5L4.5 21 21 3z" fill="#BD34FE"/><path d="M13.5 18L8 7.5l5.5 3L21 3 13.5 18z" fill="#FFD62E"/></svg>',
  'Express.js': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="2" y="15" font-size="8" font-weight="700" fill="#888" font-family="monospace">EXP</text><path d="M2 18h20" stroke="#888" stroke-width="1.2"/></svg>',
  JWT: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="#D63AFF" stroke-width="1.3"/><text x="4.5" y="15" font-size="7" font-weight="700" fill="#D63AFF" font-family="monospace">JWT</text></svg>',
  'OAuth 2.0': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="#F58B00" stroke-width="1.3" fill="none"/><path d="M8 12h8M12 8v8" stroke="#F58B00" stroke-width="1.5" stroke-linecap="round"/></svg>',
  WebSockets: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h3m12 0h3M12 3v3m0 12v3" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="4" stroke="#38BDF8" stroke-width="1.3" fill="none"/></svg>',
  RBAC: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#A78BFA" stroke-width="1.3" fill="none"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#A78BFA" stroke-width="1.3" stroke-linecap="round"/></svg>',
  Microservices: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="2.5" stroke="#34D399" stroke-width="1.2" fill="none"/><circle cx="19" cy="5" r="2.5" stroke="#34D399" stroke-width="1.2" fill="none"/><circle cx="12" cy="19" r="2.5" stroke="#34D399" stroke-width="1.2" fill="none"/><path d="M7.5 5h9M6 7l5 10M18 7l-5 10" stroke="#34D399" stroke-width="1"/></svg>',
  Prisma: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 18L12 3l4 12-13 3z" stroke="#5A67D8" stroke-width="1.3" fill="none"/><path d="M16 15l5-2-9-10" stroke="#5A67D8" stroke-width="1.3" fill="none"/></svg>',
  Mongoose: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C7 2 4 6 4 11c0 3 1.5 5.5 4 7l1 3h6l1-3c2.5-1.5 4-4 4-7 0-5-3-9-8-9z" stroke="#880000" stroke-width="1.3" fill="#880000" fill-opacity=".15"/><path d="M12 5v12" stroke="#880000" stroke-width="1.5" stroke-linecap="round"/></svg>',
  'CI/CD': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="12" r="2.5" stroke="#22C55E" stroke-width="1.3" fill="none"/><circle cx="19" cy="12" r="2.5" stroke="#22C55E" stroke-width="1.3" fill="none"/><path d="M7.5 12h9" stroke="#22C55E" stroke-width="1.3"/><path d="M16 8l3.5 4L16 16" stroke="#22C55E" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  Winston: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#6EE7B7" stroke-width="1.3" fill="none"/><path d="M6 8h12M6 12h8M6 16h10" stroke="#6EE7B7" stroke-width="1.3" stroke-linecap="round"/></svg>',
  Swagger: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#85EA2D" fill-opacity=".15" stroke="#85EA2D" stroke-width="1.3"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#85EA2D" stroke-width="1.3" stroke-linecap="round"/></svg>',
  Postman: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#FF6C37" fill-opacity=".15" stroke="#FF6C37" stroke-width="1.3"/><path d="M8 12l2.5 2.5L16 9" stroke="#FF6C37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'GitHub Actions': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="6" r="2.5" stroke="#8B949E" stroke-width="1.2" fill="none"/><circle cx="5" cy="18" r="2.5" stroke="#8B949E" stroke-width="1.2" fill="none"/><circle cx="19" cy="18" r="2.5" stroke="#8B949E" stroke-width="1.2" fill="none"/><path d="M12 8.5V13l-5.5 3M12 13l5.5 3" stroke="#8B949E" stroke-width="1.1"/></svg>',
  ChatGPT: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#74AA9C" fill-opacity=".15" stroke="#74AA9C" stroke-width="1.3"/><path d="M8 12a4 4 0 0 1 8 0M12 8v1m0 6v1" stroke="#74AA9C" stroke-width="1.3" stroke-linecap="round"/></svg>',
  Claude: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" fill="#D97757"/><text x="4.5" y="16" font-size="8.5" font-weight="700" fill="white" font-family="sans-serif">AI</text></svg>',
  Gemini: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gem" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop stop-color="#4285F4"/><stop offset=".5" stop-color="#9B72CB"/><stop offset="1" stop-color="#EA4335"/></linearGradient></defs><path d="M12 2C12 7.5 16.5 12 22 12 16.5 12 12 16.5 12 22 12 16.5 7.5 12 2 12 7.5 12 12 7.5 12 2z" fill="url(#gem)"/></svg>',
};

const GROUPS = [
  { label: 'Frontend', color: '#61DAFB', items: ['React','TypeScript','JavaScript','Redux Toolkit','React Query','Material UI','Vite'] },
  { label: 'Backend & APIs', color: '#4ADE80', items: ['Node.js','Express.js','JWT','OAuth 2.0','WebSockets','RBAC','Microservices'] },
  { label: 'Databases', color: '#F6AD55', items: ['PostgreSQL','MongoDB','Redis','Prisma','Mongoose'] },
  { label: 'Cloud & DevOps', color: '#63B3ED', items: ['AWS','Docker','CI/CD','GitHub Actions','Winston','Swagger','Postman','Git','GitHub'] },
  { label: 'AI Tools', color: '#D97757', items: ['ChatGPT','Claude','Gemini'] },
];

export default function MySkills() {
  const { tr } = useLang();
  return (
    <div className="container">
      <p data-rv className="section-mono">{tr.sectionSkills}</p>
      <h2 data-rv data-d="1" className="section-title skills-headline">{tr.skillsH}</h2>

      {GROUPS.map(g => (
        <div data-rv className="skill-group" key={g.label}>
          <div className="skill-group-header">
            <span className="skill-dot" style={{ background: g.color }} />
            <p className="skill-group-label">{g.label}</p>
          </div>
          <div className="skill-grid">
            {g.items.map(name => (
              <div className="skill-tile" key={name}>
                <span
                  className="skill-icon"
                  dangerouslySetInnerHTML={{ __html: ICONS[name] || `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="#888" stroke-width="1.3"/><text x="3" y="15" font-size="7" font-weight="700" fill="#888" font-family="monospace">${name.slice(0,3).toUpperCase()}</text></svg>` }}
                />
                <span className="skill-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div data-rv className="soft-skills">
        <p className="skill-group-label soft-label">{tr.softLabel}</p>
        <div className="soft-grid">
          {tr.soft.map(s => (
            <span className="soft-chip" key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
