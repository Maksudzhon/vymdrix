import { LANGS } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex border-3 border-foreground bg-background shadow-hard">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors sm:px-3 ${
            lang === l.code ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
