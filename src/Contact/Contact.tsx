import { type FormEvent, useRef, useState } from 'react';
import { useLang } from '../i18n/LangContext';
import './contact.css';

const PIN_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#9CA3AF"/></svg>';
const MAIL_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="20" height="16" rx="2" stroke="#9CA3AF" stroke-width="1.5"/><path d="M2 8l10 6 10-6" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/></svg>';
const PHONE_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const WA_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.57 1.37 5.05L2 22l5.08-1.35A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" stroke="#9CA3AF" stroke-width="1.3"/><path d="M16.5 14.5c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-1.8-.9-2.98-1.6-4.16-3.63-.32-.55.32-.51.91-1.7.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37C6.12 7.61 5 8.62 5 10.5c0 1.88 1.53 3.7 1.74 3.96.2.25 3 4.58 7.27 6.43 1.02.44 1.81.7 2.43.9.97.31 1.85.27 2.55.16.78-.12 2.39-1.02 2.72-2 .34-.98.34-1.82.24-2-.1-.18-.38-.28-.78-.48z" fill="#9CA3AF"/></svg>';
const LI_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="4" stroke="#9CA3AF" stroke-width="1.3"/><path d="M7 10v7M7 7.5v.01M11 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="7.5" r=".7" fill="#9CA3AF"/></svg>';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const { tr } = useLang();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    const data = new FormData(formRef.current);
    try {
      const r = await fetch('https://formspree.io/f/mykarwzn', {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      });
      if (r.ok) { setStatus('success'); formRef.current.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  const contacts = [
    { label: tr.locLabel, value: tr.locVal, href: 'https://maps.google.com/?q=Herzliya+Israel', target: '_blank', icon: PIN_SVG },
    { label: tr.emailLabel, value: 'nikita.markovskii@icloud.com', href: 'mailto:nikita.markovskii@icloud.com', target: '_self', icon: MAIL_SVG },
    { label: tr.phoneLabel, value: '+972 52-582-05-75', href: 'tel:+972525820575', target: '_self', icon: PHONE_SVG },
    { label: tr.waLabel, value: '+972 52-582-05-75', href: 'https://wa.me/972525820575', target: '_blank', icon: WA_SVG },
    { label: tr.liLabel, value: 'nikita-markovskii-dev', href: 'https://linkedin.com/in/nikita-markovskii-dev', target: '_blank', icon: LI_SVG },
  ];

  const statusMap: Record<Status, [string, string, string]> = {
    idle:    ['#F9F9F7', '#E8E8E4', '#9CA3AF'],
    sending: ['#FFFBEB', '#FDE68A', '#92400E'],
    success: ['#ECFDF5', '#BBF7D0', '#065F46'],
    error:   ['#FEF2F2', '#FECACA', '#B91C1C'],
  };
  const [fsBg, fsBorder, fsColor] = statusMap[status];
  const statusMsg = { idle: tr.idle_, sending: tr.sending_, success: tr.success_, error: tr.error_ }[status];

  return (
    <div className="container">
      <p data-rv className="section-mono">{tr.sectionContact}</p>
      <h2 data-rv data-d="1" className="section-title contact-headline">{tr.contactH}</h2>

      <div className="contact-grid">
        <div data-rv className="contact-left">
          <p className="contact-intro">{tr.contactIntro}</p>
          <div className="contact-info">
            {contacts.map(c => (
              <div className="contact-row" key={c.label}>
                <div className="contact-icon-wrap">
                  <span dangerouslySetInnerHTML={{ __html: c.icon }} />
                </div>
                <div className="contact-text">
                  <p className="contact-label">{c.label}</p>
                  <a href={c.href} target={c.target} rel="noopener noreferrer" className="contact-value">{c.value}</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-rv data-d="2" className="contact-right">
          <div className="form-card">
            <div className="form-status" style={{ background: fsBg, borderColor: fsBorder }}>
              <p style={{ color: fsColor, fontSize: 13, fontWeight: 500 }}>{statusMsg}</p>
            </div>
            <form ref={formRef} onSubmit={onSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>{tr.fn}</label>
                  <input type="text" name="name" placeholder={tr.fnph} required />
                </div>
                <div className="form-group">
                  <label>{tr.fe}</label>
                  <input type="email" name="email" placeholder={tr.feph} required />
                </div>
              </div>
              <div className="form-group">
                <label>{tr.fm}</label>
                <textarea name="message" placeholder={tr.fmph} rows={5} required />
              </div>
              <button type="submit" className="btn-submit" disabled={status === 'sending'} style={{ opacity: status === 'sending' ? 0.65 : 1 }}>
                {status === 'sending' ? tr.sending_ : tr.send} →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
