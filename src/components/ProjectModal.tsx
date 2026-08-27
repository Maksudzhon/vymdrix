import { useEffect, useId, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { t, type Project } from "@/lib/content";

const FOCUSABLE =
  'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { tr } = useLang();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const activeEl = document.activeElement as HTMLElement | null;
      if (!panel?.contains(activeEl)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey, true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prev;
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-foreground/60 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="w-full max-w-2xl border-3 border-foreground bg-background shadow-hard"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`${project.tone} flex items-start justify-between gap-4 border-b-3 border-foreground p-5 sm:p-7`}
        >
          <div className="min-w-0">
            <span className="font-mono text-[10px] tracking-[0.3em]">
              {project.idx} · {project.year}
            </span>
            <h3
              id={titleId}
              className="mt-2 break-words font-display text-3xl uppercase leading-none sm:text-5xl"
            >
              {project.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={tr(t.close)}
            className="shrink-0 border-3 border-foreground bg-background px-3 py-1.5 font-mono text-xs text-foreground transition-transform hover:-translate-y-0.5"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          <p id={descId} className="text-sm leading-relaxed text-foreground/80">
            {tr(project.desc)}
          </p>

          <p className="border-3 border-foreground bg-secondary px-4 py-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-secondary-foreground">
            ⚠ {tr(t.demoNotice)}
          </p>


          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">
              {tr(t.stack)}
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="border-2 border-foreground bg-muted px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="border-3 border-foreground bg-muted p-4">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                {tr(t.roleLabel)}
              </h4>
              <p className="mt-2 text-sm leading-relaxed">{tr(project.role)}</p>
            </div>
            <div className="border-3 border-foreground bg-muted p-4">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                {tr(t.result)}
              </h4>
              <p className="mt-2 text-sm leading-relaxed">{tr(project.result)}</p>
            </div>
          </div>

          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border-3 border-foreground bg-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-hard transition-transform hover:-translate-y-0.5"
          >
            {tr(t.visit)} <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
