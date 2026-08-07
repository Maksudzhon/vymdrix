import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useMemo, useState } from "react";
import retroSun from "@/assets/retro-sun.jpg";
import retroVinyl from "@/assets/retro-vinyl.jpg";
import { LanguageProvider, useLang } from "@/lib/i18n";
import { ContactForm } from "@/components/ContactForm";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MusicPlayer } from "@/components/MusicPlayer";
import { BackToTop } from "@/components/BackToTop";
import { PartyToggle } from "@/components/PartyToggle";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";

// modal code (and its content) only downloads when a visitor opens a project
const ProjectModal = lazy(() =>
  import("@/components/ProjectModal").then((m) => ({ default: m.ProjectModal })),
);
import { marquee, projects, skills, socials, stats, t, type Project } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VymDrix | Full Stack Dasturchi" },
      {
        name: "description",
        content:
          "Muqimov Maqsudjon (VymDrix) — Qo'qonlik full stack dasturchi. Loyihalar, texnik ko'nikmalar va bog'lanish ma'lumotlari.",
      },
      { property: "og:title", content: "VymDrix | Full Stack Dasturchi" },
      {
        property: "og:description",
        content:
          "Muqimov Maqsudjon (VymDrix) — Qo'qonlik full stack dasturchi. Loyihalar, texnik ko'nikmalar va bog'lanish ma'lumotlari.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <LanguageProvider>
      <Index />
    </LanguageProvider>
  );
}

function Index() {
  const { tr } = useLang();
  const [active, setActive] = useState<Project | null>(null);
  const [query, setQuery] = useState("");
  const [tech, setTech] = useState<string>("");

  const allTech = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.stack))).sort((a, b) => a.localeCompare(b)),
    [],
  );

  const visibleProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesTech = !tech || p.stack.includes(tech);
      if (!matchesTech) return false;
      if (!q) return true;
      const haystack = [p.name, p.year, ...p.stack, tr(p.desc), tr(p.role), tr(p.result)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, tech, tr]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <ScrollProgress />
      <BackToTop />

      <div className="fixed right-3 top-3 z-40 flex items-center gap-2 sm:right-6 sm:top-8">
        <PartyToggle />
        <LanguageSwitcher />
      </div>

      {/* ── HERO ─────────────────────────────────────── */}
      <header className="border-b-4 border-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col justify-between border-foreground p-6 sm:p-8 lg:border-r-4 lg:p-12">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-12 font-mono text-[10px] uppercase tracking-[0.2em] sm:justify-between sm:pr-28 sm:pt-0 sm:text-[11px] sm:tracking-[0.25em]">
              <span>{tr(t.role)}</span>
              <span>{tr(t.est)}</span>
            </div>

            <div className="py-10 sm:py-12">
              <h1 className="neon-text animate-rise font-display text-[clamp(3.2rem,13vw,8rem)] uppercase leading-[0.82] tracking-tight">
                Vym
                <br />
                Drix
              </h1>
              <p className="mt-4 font-script text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">
                Muqimov Maqsudjon
              </p>
            </div>

            <p className="max-w-md text-[15px] leading-relaxed text-foreground/75">{tr(t.intro)}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#loyihalar"
                className="glow-pulse border-3 border-foreground bg-primary px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground shadow-hard transition-transform hover:-translate-y-0.5 sm:px-6 sm:text-xs"
              >
                {tr(t.ctaProjects)}
              </a>
              <a
                href="#aloqa"
                className="border-3 border-foreground bg-background px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] shadow-hard transition-transform hover:-translate-y-0.5 sm:px-6 sm:text-xs"
              >
                {tr(t.ctaContact)}
              </a>
            </div>
          </div>

          <div className="relative border-t-4 border-foreground lg:border-t-0">
            <img
              src={retroSun}
              alt="Retro uslubdagi quyosh botishi illyustratsiyasi"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1024}
              height={768}
              className="h-56 w-full object-cover sm:h-80 lg:h-full"
            />
            <span
              className="bulb-strip pointer-events-none absolute inset-x-0 bottom-0 h-4"
              aria-hidden
            />
            <span
              className="bulb-strip pointer-events-none absolute inset-x-0 top-0 h-4"
              aria-hidden
            />
          </div>
        </div>
      </header>

      <main>
        {/* ── MARQUEE ──────────────────────────────────── */}
        <div className="relative overflow-hidden border-y-3 border-foreground bg-foreground py-3">
          <span
            className="bulb-strip pointer-events-none absolute inset-x-0 top-0 h-2 opacity-80"
            aria-hidden
          />
          <span
            className="bulb-strip pointer-events-none absolute inset-x-0 bottom-0 h-2 opacity-80"
            aria-hidden
          />
          <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-background sm:text-xs">
            {[...marquee, ...marquee].map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-10">
                {item}
                <span className="text-secondary">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── STATS ────────────────────────────────────── */}
        <section className="mx-auto grid max-w-6xl grid-cols-2 border-b-4 border-foreground lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.value}
              className={`${s.tone} border-foreground p-5 sm:p-8 ${
                i % 2 === 0 ? "border-r-4" : ""
              } ${i < 2 ? "border-b-4 lg:border-b-0" : ""} ${i === 1 ? "lg:border-r-4" : ""} ${
                i === 2 ? "lg:border-r-4" : ""
              }`}
            >
              <div className="font-display text-4xl leading-none sm:text-6xl">{s.value}</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] sm:text-[11px]">
                {tr(s.label)}
              </div>
            </div>
          ))}
        </section>

        {/* ── SKILLS ───────────────────────────────────── */}
        <section className="mx-auto max-w-6xl border-b-4 border-foreground px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-3 border-foreground pb-4 sm:mb-10">
            <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl lg:text-7xl">
              {tr(t.skillsTitle)}
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] sm:text-[11px]">
              {tr(t.junior)}
            </span>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {skills.map((s, i) => (
              <Reveal
                key={s.num}
                delay={i * 90}
                className={`${s.tone} border-3 border-foreground p-5 shadow-hard transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.6deg] hover:shadow-[8px_8px_0_0_var(--foreground)] sm:p-7`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] tracking-[0.3em]">{s.num}</span>
                  <span className="font-script text-2xl opacity-80">skill</span>
                </div>
                <h3 className="mt-3 font-display text-2xl uppercase leading-none sm:text-3xl">
                  {tr(s.title)}
                </h3>
                <p className="mt-2 text-sm opacity-80">{tr(s.desc)}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-2 border-current px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────── */}
        <section id="loyihalar" className="border-b-4 border-foreground">
          <div className="mx-auto max-w-6xl px-6 pt-12 sm:px-8 sm:pt-16 lg:px-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-3 border-foreground pb-4 sm:mb-10">
              <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl lg:text-7xl">
                {tr(t.projectsTitle)}
              </h2>
              <span className="font-script text-2xl text-primary sm:text-3xl">
                {tr(t.selected)}
              </span>
            </div>

            {/* filters + search */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label
                  htmlFor="project-search"
                  className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/60 sm:sr-only"
                >
                  {tr(t.searchLabel)}
                </label>
                <input
                  id="project-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={tr(t.searchPlaceholder)}
                  className="w-full border-3 border-foreground bg-background px-4 py-3 font-mono text-xs uppercase tracking-[0.15em] shadow-hard placeholder:text-muted-foreground focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
                {(query || tech) && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setTech("");
                    }}
                    className="shrink-0 border-3 border-foreground bg-secondary px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-secondary-foreground shadow-hard transition-transform hover:-translate-y-0.5"
                  >
                    {tr(t.resetFilters)}
                  </button>
                )}
              </div>

              <div role="group" aria-label={tr(t.filterByTech)} className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTech("")}
                  aria-pressed={tech === ""}
                  className={`border-2 border-foreground px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-transform hover:-translate-y-0.5 ${
                    tech === "" ? "bg-primary text-primary-foreground" : "bg-background"
                  }`}
                >
                  {tr(t.allTech)}
                </button>
                {allTech.map((techName) => (
                  <button
                    key={techName}
                    type="button"
                    onClick={() => setTech((cur) => (cur === techName ? "" : techName))}
                    aria-pressed={tech === techName}
                    className={`border-2 border-foreground px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-transform hover:-translate-y-0.5 ${
                      tech === techName ? "bg-primary text-primary-foreground" : "bg-background"
                    }`}
                  >
                    {techName}
                  </button>
                ))}
              </div>

              <p
                aria-live="polite"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60"
              >
                {visibleProjects.length} {tr(t.found)}
              </p>
            </div>

            <div className="grid gap-5 pb-12 sm:gap-6 sm:pb-16 md:grid-cols-2">
              {visibleProjects.map((p, i) => (
                <Reveal key={p.idx} delay={i * 80}>
                  <button
                    type="button"
                    onClick={() => setActive(p)}
                    className="group flex h-full w-full flex-col border-3 border-foreground bg-background p-5 text-left shadow-hard transition-all duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg] hover:shadow-[8px_8px_0_0_var(--primary)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-7"
                  >
                    <div
                      className={`${p.tone} -mx-5 -mt-5 mb-5 border-b-3 border-foreground px-5 py-3 sm:-mx-7 sm:-mt-7 sm:mb-6 sm:px-7`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em]">
                        <span>{p.idx}</span>
                        <span>{p.year}</span>
                      </div>
                    </div>
                    <h3 className="font-display text-2xl uppercase leading-none transition-transform group-hover:translate-x-1 sm:text-3xl">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm text-foreground/70">{tr(p.desc)}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className={`${p.tone} border-2 border-foreground px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em]`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em]">
                      {tr(t.details)}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </button>
                </Reveal>
              ))}
              {visibleProjects.length === 0 && (
                <p className="border-3 border-dashed border-foreground p-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 md:col-span-2">
                  {tr(t.noResults)}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── MUSIC ────────────────────────────────────── */}
        <section className="border-b-4 border-foreground bg-muted">
          <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[auto_1fr]">
            <div className="flex justify-center border-b-4 border-foreground p-8 lg:border-b-0 lg:border-r-4 lg:p-12">
              <img
                src={retroVinyl}
                alt="Retro vinil plastinka muqovasi"
                loading="lazy"
                decoding="async"
                width={512}
                height={512}
                className="animate-spin-slow glow-pulse size-36 rounded-full border-3 border-foreground object-cover sm:size-48"
              />
            </div>
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] sm:text-[11px]">
                <span className="size-2 rounded-full bg-olive" />
                {tr(t.nowPlaying)}
              </div>
              <h2 className="mt-3 whitespace-pre-line font-display text-3xl uppercase leading-none sm:text-4xl lg:text-6xl">
                {tr(t.soundtrack)}
              </h2>
              <MusicPlayer />
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────── */}
        <section id="aloqa" className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2">
          <div className="border-foreground p-6 sm:p-8 lg:border-r-4 lg:p-12">
            <h2 className="whitespace-pre-line font-display text-4xl uppercase leading-none sm:text-5xl lg:text-7xl">
              {tr(t.contactTitle)}
            </h2>
            <p className="mt-4 max-w-sm text-sm text-foreground/70">{tr(t.contactDesc)}</p>

            <div className="mt-8 space-y-3 sm:mt-10">
              <a
                href="tel:+998771570470"
                className="flex items-center justify-between gap-3 border-3 border-foreground bg-secondary px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-secondary-foreground shadow-hard transition-transform hover:-translate-y-0.5 sm:px-5 sm:text-xs"
              >
                +998 77 157 04 70 <span>↗</span>
              </a>
              <a
                href="mailto:maksudzonmukimov@gmail.com"
                className="flex items-center justify-between gap-3 border-3 border-foreground bg-background px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] shadow-hard transition-transform hover:-translate-y-0.5 sm:px-5 sm:text-xs"
              >
                <span className="truncate">maksudzonmukimov@gmail.com</span> <span>↗</span>
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 border-3 border-foreground bg-background px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] shadow-hard transition-transform hover:-translate-y-0.5 sm:px-5 sm:text-xs"
                >
                  <span>{s.label}</span>
                  <span className="truncate opacity-60">{s.handle}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="border-t-4 border-foreground bg-rose p-6 text-rose-foreground sm:p-8 lg:border-t-0 lg:p-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] sm:text-[11px]">
              {tr(t.writeMsg)}
            </span>
            <ContactForm />
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="border-t-4 border-foreground bg-foreground text-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-center font-mono text-[10px] uppercase tracking-[0.25em] sm:px-8 sm:text-[11px] md:flex-row md:text-left lg:px-12">
          <span>© 2026 VymDrix</span>
          <span className="font-script text-xl normal-case tracking-normal text-secondary sm:text-2xl">
            {tr(t.city)}
          </span>
          <span>Muqimov Maqsudjon</span>
        </div>
      </footer>

      {active && (
        <Suspense fallback={null}>
          <ProjectModal project={active} onClose={() => setActive(null)} />
        </Suspense>
      )}
    </div>
  );
}
