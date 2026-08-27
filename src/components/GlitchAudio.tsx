import { useEffect, useRef, useState } from "react";
import { playGlitch } from "@/lib/glitch-sound";
import { t } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const KEY = "vym-glitch-sound";
/** Matches the `neon` keyframes cycle in styles.css (4.5s, flicker near the end). */
const CYCLE = 4500;
const FLICKER_AT = 4180;

/**
 * Plays a short electric zap in sync with the VYMDRIX neon flicker.
 * Sound only starts after the visitor's first interaction (browser autoplay rules).
 */
export function GlitchAudio() {
  const { tr } = useLang();
  const [on, setOn] = useState(true);
  const [armed, setArmed] = useState(false);
  const onRef = useRef(on);
  onRef.current = on;

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved !== null) setOn(saved === "1");
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, on ? "1" : "0");
  }, [on]);

  // Arm audio after the first user gesture.
  useEffect(() => {
    const arm = () => setArmed(true);
    window.addEventListener("pointerdown", arm, { once: true });
    window.addEventListener("keydown", arm, { once: true });
    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, []);

  useEffect(() => {
    if (!armed) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let stopped = false;
    let timer = 0;

    /** ms until the next flicker, read from the real CSS animation clock. */
    const untilFlicker = () => {
      const el = document.querySelector<HTMLElement>(".neon-text");
      const anim = el?.getAnimations?.().find((a) => (a as CSSAnimation).animationName === "neon");
      const now = typeof anim?.currentTime === "number" ? anim.currentTime : performance.now();
      const pos = ((now % CYCLE) + CYCLE) % CYCLE;
      const delta = FLICKER_AT - pos;
      return delta > 20 ? delta : delta + CYCLE;
    };

    const tick = () => {
      if (stopped) return;
      if (onRef.current && !document.hidden) playGlitch(0.22);
      timer = window.setTimeout(tick, untilFlicker());
    };
    timer = window.setTimeout(tick, untilFlicker());

    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, [armed]);


  return (
    <button
      type="button"
      onClick={() => {
        setArmed(true);
        setOn((v) => {
          if (!v) playGlitch(0.22);
          return !v;
        });
      }}
      aria-pressed={on}
      aria-label={tr(on ? t.glitchSoundOn : t.glitchSoundOff)}
      title={tr(on ? t.glitchSoundOn : t.glitchSoundOff)}
      className="border-3 border-foreground bg-background px-2 py-1.5 font-mono text-[10px] uppercase leading-none tracking-[0.15em] shadow-hard transition-transform hover:-translate-y-0.5 sm:px-3 sm:py-2 sm:text-[11px]"
    >
      {on ? "⚡" : "🔇"}
    </button>
  );
}
