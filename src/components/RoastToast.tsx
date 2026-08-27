import { useEffect, useState } from "react";
import { roastJokes } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const FIRST_DELAY = 14000;
const INTERVAL = 26000;
const VISIBLE = 7000;

/** Pops playful "loving bully" roasts at the visitor every once in a while. */
export function RoastToast() {
  const { tr } = useLang();
  const [idx, setIdx] = useState(-1);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let n = 0;
    let hide = 0;
    let loop = 0;

    const pop = () => {
      setIdx(n % roastJokes.length);
      n += 1;
      setShown(true);
      window.clearTimeout(hide);
      hide = window.setTimeout(() => setShown(false), VISIBLE);
    };

    const first = window.setTimeout(() => {
      pop();
      loop = window.setInterval(pop, INTERVAL);
    }, FIRST_DELAY);

    return () => {
      window.clearTimeout(first);
      window.clearTimeout(hide);
      window.clearInterval(loop);
    };
  }, []);


  const joke = idx < 0 ? undefined : roastJokes[idx];
  if (!joke) return null;


  return (
    <div
      aria-live="polite"
      className={`pointer-events-none fixed bottom-4 left-3 z-40 max-w-[min(20rem,calc(100vw-6rem))] transition-all duration-300 sm:bottom-8 sm:left-6 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <div className="border-3 border-foreground bg-secondary px-3 py-2 font-mono text-[11px] leading-snug text-secondary-foreground shadow-hard sm:px-4 sm:py-3 sm:text-xs">
        {tr(joke)}
      </div>
    </div>
  );
}
