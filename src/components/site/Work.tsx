import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import work1 from "@/assets/digital video.mp4";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import { SectionLabel } from "@/components/site/Reveal";
import { useIsDesktop, usePrefersReducedMotion } from "@/lib/motion";
import { useAdminStore } from "@/lib/admin-store";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_PROJECTS = [
  {
    title: "Noir Table",
    category: "Digital Menu",
    year: "2026",
    blurb: "A fine-dining menu experience where every category transition is choreographed.",
    media_url: work1,
    media_type: "video" as const,
    blurb: "A fine-dining menu experience where every category transition is choreographed.",
  },
  {
    title: "Velocity",
    category: "Motion Identity",
    year: "2025",
    media_url: work2,
    media_type: "image" as const,
    blurb: "A brand system built entirely around light trails and momentum.",
  },
  {
    title: "Aurora",
    category: "Brand & Web",
    year: "2025",
    media_url: work3,
    media_type: "image" as const,
    blurb: "Members-only club identity, from print edges to interactive invitations.",
  },
  {
    title: "Vellora",
    category: "Interactive Kiosk",
    year: "2026",
    media_url: work4,
    media_type: "image" as const,
    blurb: "Lobby check-in experience running across hotel screens in four languages.",
  },
];

interface DisplayProject {
  title: string;
  category: string;
  year: string;
  media_url: string;
  media_type: "image" | "video";
  blurb: string;
}

export function Work({ heading = true }: { heading?: boolean }) {
  const { projects } = useAdminStore();
  const desktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayProjects: DisplayProject[] = useMemo(() => {
    if (projects.length > 0) {
      return projects
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((p) => ({
          title: p.title,
          category: p.category,
          year: p.year,
          media_url: p.media_url || work1,
          media_type: p.media_type || "image",
          blurb: p.blurb || "",
        }));
    }
    return FALLBACK_PROJECTS;
  }, [projects]);

  useEffect(() => {
  if (!desktop || reduced) return;

  const section = sectionRef.current;
  const track = trackRef.current;

  if (!section || !track) return;

  const layers = Array.from(
    track.querySelectorAll<HTMLElement>("[data-phone-layer]")
  );

  if (!layers.length) return;

  const ctx = gsap.context(() => {
    const total = layers.length;

    // أهم حاجة: خلي المشاريع ظاهرة من البداية
    gsap.set(layers, {
      opacity: 1,
      scale: 1,
    });

    gsap.set(track, {
      y: 0,
    });

    gsap.to(track, {
      y: () => -(layers[0].offsetHeight * (total - 1)),
      ease: "none",

      scrollTrigger: {
        trigger: section,

        start: "top top",

        end: () =>
          `+=${Math.max(total - 1, 1) * 100}svh`,

        pin: true,

        scrub: 1,

        invalidateOnRefresh: true,

        anticipatePin: 1,

        onUpdate: (self) => {
          const idx = Math.min(
            total - 1,
            Math.round(self.progress * (total - 1))
          );

          setActiveIndex(idx);
        },
      },
    });
  }, section);

  ScrollTrigger.refresh();

  return () => {
    ctx.revert();
  };
}, [desktop, reduced, displayProjects]);

  return (
    <section id="work" ref={sectionRef} className="relative">
      {desktop && !reduced ? (
        <DesktopPhoneShowcase
          trackRef={trackRef}
          activeIndex={activeIndex}
          projects={displayProjects}
          heading={heading}
        />
      ) : (
        <MobileStack projects={displayProjects} heading={heading} />
      )}
    </section>
  );
}

/* ── Desktop: Left text + Right phone with wavy frame ── */

function DesktopPhoneShowcase({
  trackRef,
  activeIndex,
  projects,
  heading,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
  projects: DisplayProject[];
  heading: boolean;
}) {
  const project = projects[activeIndex] ?? projects[0];

  if (!project) return null;

  return (
    <div className="relative flex h-[100svh] items-center overflow-hidden">
      {/* Left: text */}
      <div className="relative z-10 flex w-[45%] flex-col pl-[max(1.25rem,calc((100vw-80rem)/2+2rem))] pr-8">
        <SectionLabel>Selected Work</SectionLabel>
        {heading && (
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="line-mask">
              <span className="line-inner" style={{ transform: "translateY(0)", opacity: 1 }}>
                Projects that
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner" style={{ transform: "translateY(0)", opacity: 1 }}>
                moved something.
              </span>
            </span>
          </h2>
        )}

        {/* Active project info */}
        <div className="mt-12 max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
              {project.category} &middot; {project.year}
            </span>
          </div>
          <h3
            key={project.title}
            className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground lg:text-4xl"
          >
            {project.title}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {project.blurb}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-10 h-px w-[min(28vw,22rem)] bg-border">
          <div
            className="trail-x h-px"
            style={{
              width: `${((activeIndex + 1) / projects.length) * 100}%`,
              transition: "width 400ms var(--ease-cine)",
            }}
          />
        </div>
        <div className="mt-3 font-mono text-[11px] text-muted-foreground">
          <span className="text-foreground">{String(activeIndex + 1).padStart(2, "0")}</span>
          {" / "}
          {String(projects.length).padStart(2, "0")}
        </div>
      </div>

      {/* Right: wavy phone frame */}
     <div className="relative w-[25em]">
  {/* Glow */}
  <div className="pointer-events-none absolute inset-0 -z-10 rounded-[3rem] bg-primary/15 blur-[60px]" />

  {/* Phone body */}
  <div
    className="
      relative
      aspect-[9/16]
      w-full
      overflow-hidden
      rounded-[3rem]
      border
      border-border/50
      bg-surface
    "
  >
    {/* Status bar */}
    <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 pt-3 pb-2">
      <span className="font-mono text-[10px] text-muted-foreground">
        9:41
      </span>

      <div className="flex items-center gap-1.5">
        <svg
          className="h-3 w-3 text-muted-foreground"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <rect x="1" y="10" width="3" height="5" rx="0.5" />
          <rect x="5" y="7" width="3" height="8" rx="0.5" />
          <rect x="9" y="4" width="3" height="11" rx="0.5" />
          <rect
            x="13"
            y="1"
            width="3"
            height="14"
            rx="0.5"
            opacity="0.3"
          />
        </svg>

        <svg
          className="h-3 w-3 text-muted-foreground"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            d="M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 11c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
            opacity="0.3"
          />

          <circle cx="8" cy="8" r="2.5" />
        </svg>
      </div>
    </div>

    {/* Dynamic Island */}
    <div className="absolute left-1/2 top-1 z-30 -translate-x-1/2">
      <div className="h-5 w-24 rounded-b-2xl bg-ink" />
    </div>

    {/* Screen viewport */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Projects track */}
      <div
        ref={trackRef}
        className="absolute inset-x-0 top-0 w-full"
      >
        {projects.map((p, i) => (
          <div
            key={`${p.title}-${i}`}
            data-phone-layer
            className="relative aspect-[9/16] w-full overflow-hidden"
          >
            {p.media_type === "video" ? (
              <video
                src={p.media_url}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={p.media_url}
                alt={`${p.title} — ${p.category}`}
                className="h-full w-full object-cover"
              />
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
          </div>
        ))}
      </div>
    </div>

    {/* Home indicator */}
    <div className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2">
      <div className="h-1 w-28 rounded-full bg-foreground/20" />
    </div>
  </div>
</div>

    </div>
  );
}

/* ── Mobile: stacked cards ── */

function MobileStack({
  projects,
  heading,
}: {
  projects: DisplayProject[];
  heading: boolean;
}) {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel>Selected Work</SectionLabel>
        {heading && (
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            <span className="line-mask">
              <span className="line-inner" style={{ transform: "translateY(0)", opacity: 1 }}>
                Projects that
              </span>
            </span>
            <span className="line-mask">
              <span className="line-inner" style={{ transform: "translateY(0)", opacity: 1 }}>
                moved something.
              </span>
            </span>
          </h2>
        )}
      </div>
      <div className="mt-8 space-y-0">
        {projects.map((p, i) => (
          <MobileProjectCard key={`${p.title}-${i}`} project={p} index={i} total={projects.length} />
        ))}
      </div>
    </div>
  );
}

function MobileProjectCard({
  project,
  index,
  total,
}: {
  project: DisplayProject;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const media = mediaRef.current;
    if (!card || !media) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 30%",
            toggleActions: "play none none none",
          },
        },
      );
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={cardRef} className="relative h-[85svh] w-full overflow-hidden">
      <div
        ref={mediaRef}
        className="absolute inset-0"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      >
        {project.media_type === "video" ? (
          <video
            src={project.media_url}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={project.media_url}
            alt={`${project.title} — ${project.category}`}
            loading="lazy"
            width={800}
            height={1000}
            className="h-full w-full object-cover"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 pb-10">

        <p className="font-mono text-[11px] tracking-wider text-muted-foreground/70">
          {String(index + 1).padStart(2, "0")}
          <span className="mx-1.5 text-primary/40">/</span>
          {String(total).padStart(2, "0")}
        </p>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
            {project.category} &middot; {project.year}
          </span>
        </div>

        <h3 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground">
          {project.title}
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground/80">
          {project.blurb}
        </p>
        
        <div className="mt-5 h-px w-12 bg-gradient-to-r from-primary/60 to-transparent" />

      </div>
    </article>
  );
}
