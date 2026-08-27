import { useEffect, useState } from "react";
import { bootJokes, t } from "@/lib/content";
import { useLang } from "@/lib/i18n";

/** Retro "booting" overlay with joke lines and a fake progress bar. */
export function BootScreen() {
  const { tr } = useLang();
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(3);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const lines = window.setInterval(() => setStep((s) => s + 1), 620);
    const bar = window.setInterval(() => setPct((p) => Math.min(100, p + Math.random() * 13)), 180);
    const end = window.setTimeout(() => setDone(true), 3200);
    return () => {
      window.clearInterval(lines);
      window.clearInterval(bar);
      window.clearTimeout(end);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (done) return null;

  const joke = bootJokes[step % bootJokes.length]!;

  return (
    <div
      role="status"
      aria-live="polite"
      className="boot-screen fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-background px-6"
    >
      <span className="bulb-strip pointer-events-none absolute inset-x-0 top-0 h-3" aria-hidden />
      <span
        className="bulb-strip pointer-events-none absolute inset-x-0 bottom-0 h-3"
        aria-hidden
      />

      <h2 className="neon-text text-center font-display text-[clamp(2.6rem,12vw,6rem)] uppercase leading-[0.85]">
        Vym<br />Drix
      </h2>

      <p className="min-h-[2.6em] max-w-sm text-center font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-foreground/75">
        {tr(joke)}
      </p>

      <div className="w-full max-w-sm border-3 border-foreground bg-muted p-1 shadow-hard">
        <div
          className="h-4 bg-primary transition-[width] duration-200"
          style={{ width: `${Math.round(pct)}%` }}
        />
      </div>

      <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">
        <span>
          {tr(t.bootTitle)} {Math.round(pct)}%
        </span>
        <button
          type="button"
          onClick={() => setDone(true)}
          className="border-2 border-foreground bg-secondary px-3 py-1.5 text-secondary-foreground transition-transform hover:-translate-y-0.5"
        >
          {tr(t.skipBoot)}
        </button>
      </div>
    </div>
  );
}
