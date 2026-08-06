import { useRef } from "react";
import { LANGS, t } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang, tr } = useLang();
  const ref = useRef<HTMLDivElement | null>(null);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const buttons = Array.from(ref.current?.querySelectorAll("button") ?? []);
    let nextIndex = index;
    if (e.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
    if (e.key === "Home") nextIndex = 0;
    if (e.key === "End") nextIndex = buttons.length - 1;
    buttons[nextIndex]?.focus();
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label={tr(t.languageLabel)}
      className="flex border-3 border-foreground bg-background shadow-hard"
    >
      {LANGS.map((l, i) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          onKeyDown={(e) => onKeyDown(e, i)}
          aria-pressed={lang === l.code}
          aria-label={l.label}
          className={`px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3 ${
            lang === l.code ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
