import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./content";

type Tri = Record<Lang, string>;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (value: Tri) => string;
};

const LangContext = createContext<Ctx>({
  lang: "uz",
  setLang: () => {},
  tr: (v) => v.uz,
});

const STORAGE_KEY = "vym-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "uz" || saved === "ru" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const tr = useCallback((value: Tri) => value[lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, tr }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
