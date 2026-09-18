import { LogoMark } from "@/components/brand/Logo";
import { range, useScrollProgress } from "@/lib/motion";
import { SectionLabel } from "@/components/site/Reveal";

/**
 * Signature scroll-driven story: particles → motion trail → phone frame →
 * digital menu → screens spreading → everything collapsing into the mark.
 * One continuous timeline scrubbed by scroll position.
 */
export function SignatureSequence() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  const pParticles = range(progress, 0.05, 0.22);
  const pTrail = range(progress, 0.14, 0.34);
  const pPhone = range(progress, 0.3, 0.48);
  const pMenu = range(progress, 0.44, 0.6);
  const pSpread = range(progress, 0.58, 0.76);
  const pCollapse = range(progress, 0.76, 0.94);

  const chapters = [
    { at: pParticles, label: "01 — An idea appears" },
    { at: pPhone, label: "02 — It takes a form" },
    { at: pMenu, label: "03 — It becomes a product" },
    { at: pSpread, label: "04 — It becomes an experience" },
  ];
  const active = chapters.reduce((acc, c, i) => (c.at > 0.35 ? i : acc), 0);

  return (
    <section ref={ref} className="relative h-[280svh] sm:h-[380svh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div className="grid-veil absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px]"
          style={{ opacity: 0.3 + pPhone * 0.6 }}
        />

        <div className="absolute left-5 top-28 sm:left-8 sm:top-24">
          <SectionLabel>{chapters[active]?.label ?? chapters[0]?.label}</SectionLabel>
        </div>

        {/* stage */}
        <div className="
relative
h-[65svh]
w-full
max-w-4xl
sm:h-[70svh]
">
          {/* particles condensing */}
          {Array.from({ length: 26 }).map((_, i) => {
            const angle = (i / 26) * Math.PI * 2;
            const r = 20 + (i % 6) * 4;
            const gather = pParticles;
            return (
              <span
                key={i}
                suppressHydrationWarning
                className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-primary"
                style={{
                  transform: `translate(-50%,-50%) translate(${(Math.cos(angle) * r * (1 - gather) * 1.6).toFixed(3)}vmin, ${(Math.sin(angle) * r * (1 - gather) * 1.1).toFixed(3)}vmin) scale(${(1 - gather * 0.4).toFixed(3)})`,
                  opacity: (1 - pPhone) * (0.25 + gather * 0.75),
                }}
              />
            );
          })}

          {/* motion trail sweeping into the device */}
          <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="dm-trail" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--electric)" stopOpacity="0" />
                <stop offset="60%" stopColor="var(--electric)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--electric-soft)" />
              </linearGradient>
            </defs>
            <path
              d="M20 300 C 200 300, 240 120, 400 120 C 560 120, 620 250, 780 250"
              fill="none"
              stroke="url(#dm-trail)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - pTrail}
              style={{ opacity: 1 - pMenu }}
            />
          </svg>

          {/* phone frame + digital menu */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              opacity: pPhone * (1 - pCollapse),
              transform: `translate(-50%,-50%) perspective(1200px) rotateY(${(1 - pPhone) * 22 - pSpread * 10}deg) rotateX(${(1 - pPhone) * 8}deg) scale(${0.72 + pPhone * 0.28 - pCollapse * 0.35})`,
              transition: "opacity 120ms linear",
            }}
          >
            <div className="relative h-[42svh]
w-[min(32svh,12rem)]
sm:h-[62svh]
sm:w-[min(30svh,15rem)] sm:h-[62svh] sm:w-[min(30svh,15rem)] overflow-hidden rounded-[2.2rem] border border-border bg-ink glow-soft">
              <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-surface-2" />
              <div className="flex h-full flex-col px-4 pb-4 pt-8">
                <div className="text-[8px] uppercase tracking-[0.24em] text-muted-foreground sm:text-[10px]">
                  Digital Menu
                </div>
                <div className="mt-2 flex gap-1.5 sm:mt-3 sm:gap-2">
                  {["Starters", "Mains", "Drinks"].map((c, i) => (
                    <span
                      key={c}
                      className="rounded-full px-1.5 py-0.5 text-[7px] sm:px-2 sm:py-1 sm:text-[9px]"
                      style={{
                        background:
                          i === Math.min(2, Math.floor(pMenu * 3))
                            ? "var(--primary)"
                            : "var(--surface-2)",
                        color:
                          i === Math.min(2, Math.floor(pMenu * 3))
                            ? "var(--primary-foreground)"
                            : "var(--muted-foreground)",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex flex-1 flex-col gap-1.5 sm:mt-3 sm:gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 rounded-lg border border-border bg-surface p-1.5 sm:gap-2 sm:p-2"
                      style={{
                        opacity: range(pMenu, i * 0.16, i * 0.16 + 0.3),
                        transform: `translateY(${(1 - range(pMenu, i * 0.16, i * 0.16 + 0.3)) * 14}px)`,
                      }}
                    >
                      <div className="h-6 w-6 rounded-md bg-surface-2 sm:h-8 sm:w-8" />
                      <div className="flex-1 space-y-1">
                        <div className="h-1.5 w-3/4 rounded bg-surface-2" />
                        <div className="h-1.5 w-1/3 rounded bg-primary/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 h-10 bg-primary/10 sm:h-16"
                style={{ opacity: pMenu > 0.1 ? 1 : 0 }}
              >
                <div className="animate-scan h-10 w-full bg-gradient-to-b from-transparent via-primary/25 to-transparent sm:h-16" />
              </div>
            </div>
          </div>

          {/* menu cards becoming website screens, spreading out */}
          {[
            { x: -46, y: -18, r: -9 },
            { x: 44, y: -24, r: 8 },
            { x: -34, y: 22, r: 6 },
            { x: 38, y: 24, r: -7 },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-16 w-24 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-surface/90 backdrop-blur-sm sm:h-36 sm:w-60"
              style={{
                opacity: pSpread * (1 - pCollapse),
                transform: `translate(-50%,-50%) translate(${s.x * pSpread}%, ${s.y * pSpread * 2.2}%) rotate(${s.r * pSpread}deg) scale(${0.7 + pSpread * 0.3 - pCollapse * 0.6})`,
              }}
            >
              <div className="flex h-4 items-center gap-1 border-b border-border px-2">
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              </div>
              <div className="space-y-1.5 p-3">
                <div className="h-2 w-2/3 rounded bg-surface-2" />
                <div className="h-1.5 w-1/2 rounded bg-surface-2" />
                <div className="mt-3 h-10 w-full rounded bg-primary/15" />
              </div>
            </div>
          ))}

          {/* collapse into the mark */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            style={{
              opacity: pCollapse,
              transform: `translate(-50%,-50%) scale(${0.7 + pCollapse * 0.3})`,
            }}
          >
            <LogoMark className="mx-auto h-14 w-14 sm:h-20 sm:w-20 glow-ring" />
            <p className="mt-4 font-display text-xl font-semibold tracking-tight sm:mt-6 sm:text-4xl">
              One idea. An entire experience.
            </p>
          </div>
        </div>

        {/* timeline */}
        <div className="absolute bottom-6 left-1/2 h-px w-[min(70vw,32rem)] -translate-x-1/2 bg-border sm:bottom-10">
          <div
            className="trail-x h-px"
            style={{ width: `${progress * 100}%`, transition: "width 80ms linear" }}
          />
        </div>
      </div>
    </section>
  );
}
