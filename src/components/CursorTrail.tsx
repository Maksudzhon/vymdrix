import { useEffect, useState } from "react";

type Spark = { id: number; x: number; y: number; char: string };

const CHARS = ["✦", "★", "✷", "☆", "✧"];

/** Retro sparkle trail that follows the pointer (desktop, motion-safe only). */
export function CursorTrail() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia?.("(pointer: fine)").matches) return;

    let id = 0;
    let last = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 70) return;
      last = now;
      const spark: Spark = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        char: CHARS[Math.floor(Math.random() * CHARS.length)]!,
      };
      setSparks((cur) => [...cur.slice(-14), spark]);
      window.setTimeout(() => setSparks((cur) => cur.filter((s) => s.id !== spark.id)), 700);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (sparks.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="spark absolute font-mono text-sm text-primary"
          style={{ left: s.x, top: s.y }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
