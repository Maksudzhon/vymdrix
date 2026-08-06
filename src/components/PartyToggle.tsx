import { useEffect, useState } from "react";
import { t } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Vegas mode: flips the whole page into a blinking, hue-shifting neon sign.
 *  Also triggered by the Konami code as an easter egg. */
export function PartyToggle() {
  const { tr } = useLang();
  const [on, setOn] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("party", on);
  }, [on]);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const expected = KONAMI[idx];
      if (expected && e.key.toLowerCase() === expected.toLowerCase()) {
        idx += 1;
        if (idx === KONAMI.length) {
          idx = 0;
          setOn((v) => !v);
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      aria-label={on ? tr(t.partyOff) : tr(t.partyOn)}
      className={`flex items-center gap-2 border-3 border-foreground px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] shadow-hard transition-transform hover:-translate-y-0.5 ${
        on ? "bg-secondary text-secondary-foreground" : "bg-background"
      }`}
    >
      <span aria-hidden>{on ? "✷" : "✦"}</span>
      <span className="hidden sm:inline">{tr(t.partyOn)}</span>
    </button>
  );
}
