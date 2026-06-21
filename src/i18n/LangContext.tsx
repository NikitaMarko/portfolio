import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { t, type Lang, type Translations } from './translations';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: Translations;
}

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, tr: t.en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang') as Lang | null;
    if (saved === 'en' || saved === 'he') setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('portfolio-lang', l);
    document.documentElement.dir = l === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <Ctx.Provider value={{ lang, setLang, tr: t[lang] as Translations}}>
      {children}
    </Ctx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(Ctx);
