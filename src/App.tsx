import { useEffect, useMemo, useState } from "react";
import { Printer, ArrowUp, Mail } from "lucide-react";
import { DEFAULT_CONFIG } from "./policy/config";
import { SECTIONS } from "./policy/Sections";
import {
  ArrowToy,
  DotMatrix,
  FloatingArrows,
  HEART_MAP,
  STAR_MAP,
  PLUS_MAP,
} from "./policy/decor";

export default function App() {
  const cfg = DEFAULT_CONFIG;
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(SECTIONS[0].id);
  const [showTop, setShowTop] = useState(false);

  /* reading progress + back-to-top visibility */
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll reveal */
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)")
    );
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [cfg]);

  /* scroll spy */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const readTime = useMemo(() => "≈ 5 min read", []);

  return (
    <div className="board-bg min-h-screen font-body">
      <FloatingArrows />

      {/* Top bar */}
      <header className="no-print fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <DotMatrix map={HEART_MAP} className="h-6 w-6" />
            <span className="font-display text-lg font-extrabold tracking-tight text-ink-deep">
              Tap Away
            </span>
            <span className="hidden rounded-full bg-cream-deep px-3 py-1 text-xs font-bold text-taupe sm:inline">
              Privacy Policy
            </span>
          </a>
          <a
            href={`mailto:${cfg.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-panel shadow-[0_2.5px_0_rgba(67,53,44,0.25)] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Contact</span>
          </a>
        </div>
        <div
          className="h-[3px] origin-left bg-sky transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="reveal">
            <div className="flex items-end gap-5">
              <DotMatrix map={HEART_MAP} className="h-12 w-12" beat />
              <DotMatrix map={STAR_MAP} className="h-10 w-10 translate-y-[-2px]" />
              <DotMatrix map={PLUS_MAP} className="h-9 w-9" />
            </div>
            <p className="mt-6 text-xs font-extrabold tracking-[0.28em] text-taupe uppercase">
              Arrow Escape · Shape Puzzles
            </p>
            <h1 className="mt-2 font-display text-6xl leading-[0.95] font-extrabold tracking-tight text-ink-deep sm:text-7xl">
              Privacy
              <br />
              Policy
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-taupe">
              How Tap Away handles your data — written for players, not lawyers.
              The short version: we ask for almost nothing.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-panel px-4 py-2 text-sm font-bold text-ink ring-1 ring-line">
                Effective {cfg.effectiveDate}
              </span>
              <span className="rounded-full bg-panel px-4 py-2 text-sm font-bold text-ink ring-1 ring-line">
                {readTime}
              </span>
              <span className="rounded-full bg-sky/12 px-4 py-2 text-sm font-bold text-sky-deep ring-1 ring-sky/25">
                iOS & Android
              </span>
              <button
                onClick={() => window.print()}
                className="no-print inline-flex items-center gap-2 rounded-full bg-panel px-4 py-2 text-sm font-bold text-taupe ring-1 ring-line transition-colors hover:text-ink hover:ring-taupe-soft"
              >
                <Printer className="h-4 w-4" />
                Save as PDF
              </button>
            </div>
          </div>

          <div className="reveal hidden justify-center lg:flex" style={{ transitionDelay: "120ms" }}>
            <ArrowToy />
          </div>
        </div>

        {/* Mobile toy */}
        <div className="reveal mt-10 flex justify-center lg:hidden">
          <ArrowToy />
        </div>
      </section>

      {/* Mobile TOC chips */}
      <nav className="no-print sticky top-[57px] z-30 mt-10 border-y border-line/70 bg-cream/90 backdrop-blur-md lg:hidden">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold ring-1 transition-colors ${
                active === s.id
                  ? "bg-ink text-panel ring-ink"
                  : "bg-panel text-taupe ring-line"
              }`}
            >
              {s.num} · {s.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Body */}
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Desktop TOC */}
          <aside className="no-print hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-taupe-soft uppercase">
                On this page
              </p>
              <ul className="space-y-2.5 border-l border-line pl-5">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`toc-link block text-sm font-semibold text-taupe hover:text-ink ${
                        active === s.id ? "active" : ""
                      }`}
                    >
                      <span className="mr-1.5 font-display text-xs text-taupe-soft">
                        {s.num}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Sections */}
          <article className="max-w-3xl space-y-8">
            {SECTIONS.map((s, i) => {
              const Icon = s.icon;
              return (
                <section
                  key={s.id}
                  id={s.id}
                  className="reveal scroll-mt-28 rounded-[22px] bg-panel p-6 shadow-[0_2px_0_rgba(67,53,44,0.05)] ring-1 ring-line sm:p-9"
                >
                  <header className="mb-5 flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cream-deep text-ink">
                      <Icon className="h-5 w-5" strokeWidth={2.4} />
                    </span>
                    <div>
                      <p className="font-display text-xs font-bold tracking-[0.2em] text-sky-deep">
                        SECTION {s.num}
                      </p>
                      <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-deep sm:text-[1.7rem]">
                        {s.title}
                      </h2>
                    </div>
                  </header>
                  <div className="text-[15.5px]">{s.render(cfg)}</div>
                  {i < SECTIONS.length - 1 && (
                    <div className="mt-7 flex justify-center gap-2 opacity-40" aria-hidden="true">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 rounded-full bg-ink" />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}

            <p className="reveal px-2 text-center text-xs leading-relaxed text-taupe-soft">
              This page is a practical starting point for Tap Away’s privacy
              disclosures, not a substitute for legal advice. Review it with a
              qualified professional before publishing to the stores.
            </p>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-line/70 bg-panel-soft/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
          <div className="flex items-end gap-3 opacity-80">
            <DotMatrix map={HEART_MAP} className="h-7 w-7" />
            <DotMatrix map={STAR_MAP} className="h-6 w-6" />
            <DotMatrix map={PLUS_MAP} className="h-5 w-5" />
          </div>
          <p className="font-display text-lg font-extrabold text-ink-deep">
            Tap Away
          </p>
          <p className="text-xs font-extrabold tracking-[0.26em] text-taupe uppercase">
            Arrow Escape · Shape Puzzles
          </p>
          <p className="text-sm text-taupe">
            © 2026 {cfg.studioName} · Made for players, not lawyers.
          </p>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <a
          href="#top"
          aria-label="Back to top"
          className="no-print pop-in fixed right-5 bottom-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink text-panel shadow-[0_4px_0_rgba(67,53,44,0.25)] transition-all hover:-translate-y-1 active:translate-y-0.5"
        >
          <ArrowUp className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
