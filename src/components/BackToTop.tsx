import { useEffect, useState } from "react";
import { t } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export function BackToTop() {
  const { tr } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={tr(t.backToTop)}
      className="fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center border-3 border-foreground bg-primary text-primary-foreground shadow-hard transition-transform hover:-translate-y-1 sm:bottom-8 sm:right-8"
    >
      <span aria-hidden>↑</span>
    </button>
  );
}
