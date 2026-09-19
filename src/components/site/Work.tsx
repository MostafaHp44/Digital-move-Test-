import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import work1 from "@/assets/digital video.mp4";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

import { SectionLabel } from "@/components/site/Reveal";
import {
  useIsDesktop,
  usePrefersReducedMotion,
} from "@/lib/motion";
import { useAdminStore } from "@/lib/admin-store";

gsap.registerPlugin(ScrollTrigger);

/* ═════════════════════════════════════════════
   FALLBACK PROJECTS
═════════════════════════════════════════════ */

const FALLBACK_PROJECTS = [
  {
    title: "Noir Table",
    category: "Digital Menu",
    year: "2026",
    media_url: work1,
    media_type: "video" as const,
    blurb:
      "A fine-dining menu experience where every category transition is choreographed.",
  },
  {
    title: "Velocity",
    category: "Motion Identity",
    year: "2025",
    media_url: work2,
    media_type: "image" as const,
    blurb:
      "A brand system built entirely around light trails and momentum.",
  },
  {
    title: "Aurora",
    category: "Brand & Web",
    year: "2025",
    media_url: work3,
    media_type: "image" as const,
    blurb:
      "Members-only club identity, from print edges to interactive invitations.",
  },
  {
    title: "Vellora",
    category: "Interactive Kiosk",
    year: "2026",
    media_url: work4,
    media_type: "image" as const,
    blurb:
      "Lobby check-in experience running across hotel screens in four languages.",
  },
];

/* ═════════════════════════════════════════════
   TYPES
═════════════════════════════════════════════ */

interface DisplayProject {
  title: string;
  category: string;
  year: string;
  media_url: string;
  media_type: "image" | "video";
  blurb: string;
}

/* ═════════════════════════════════════════════
   WORK
═════════════════════════════════════════════ */

export function Work({
  heading = true,
}: {
  heading?: boolean;
}) {
  const { projects } = useAdminStore();

  const desktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  const displayProjects: DisplayProject[] =
    useMemo(() => {
      if (projects.length > 0) {
        return [...projects]
          .sort(
            (a, b) =>
              a.sort_order -
              b.sort_order
          )
          .map((p) => ({
            title: p.title,
            category: p.category,
            year: p.year,
            media_url:
              p.media_url || work1,
            media_type:
              p.media_type || "image",
            blurb: p.blurb || "",
          }));
      }

      return FALLBACK_PROJECTS;
    }, [projects]);

  return (
    <section
      id="work"
      className="relative"
    >
      {desktop && !reduced ? (
        <DesktopWork
          key="desktop-work"
          projects={displayProjects}
          heading={heading}
        />
      ) : (
        <MobileStack
          key="mobile-work"
          projects={displayProjects}
          heading={heading}
        />
      )}
    </section>
  );
}

/* ═════════════════════════════════════════════
   DESKTOP WRAPPER
═════════════════════════════════════════════ */

function DesktopWork({
  projects,
  heading,
}: {
  projects: DisplayProject[];
  heading: boolean;
}) {
  /*
   * rootRef:
   * ScrollTrigger trigger فقط.
   *
   * pinRef:
   * العنصر الوحيد المسموح لـ GSAP
   * يعمل له pin / pin-spacer.
   *
   * بالتالي React root مش بيتغير.
   */

  const rootRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const pinRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const trackRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;

    if (!root || !pin || !track) {
      return;
    }

    const layers = Array.from(
      track.querySelectorAll<HTMLElement>(
        "[data-phone-layer]"
      )
    );

    if (!layers.length) {
      return;
    }

    let tween:
      | gsap.core.Tween
      | null = null;

    const ctx = gsap.context(() => {
      const total = layers.length;

      /* INITIAL */

      gsap.set(layers, {
        opacity: 1,
        scale: 1,
      });

      gsap.set(track, {
        y: 0,
      });

      /* TRACK ANIMATION */

      tween = gsap.to(track, {
        y: () => {
          const itemHeight =
            layers[0]?.offsetHeight || 0;

          return -(
            itemHeight *
            (total - 1)
          );
        },

        ease: "none",

        scrollTrigger: {
          trigger: root,

          /*
           * مهم:
           * متعملش pin للـ root.
           */
          pin: pin,

          start: "top top",

          end: () =>
            `+=${
              Math.max(
                total - 1,
                1
              ) *
              window.innerHeight
            }`,

          scrub: 1,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const index =
              Math.min(
                total - 1,
                Math.round(
                  self.progress *
                    (total - 1)
                )
              );

            setActiveIndex(index);
          },
        },
      });
    }, root);

    /*
     * Refresh بعد ما layout يستقر.
     */

    const raf =
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

    return () => {
      cancelAnimationFrame(raf);

      /*
       * مهم جدًا:
       * نفك pin-spacer قبل React
       * ما يشيل الـ component.
       */

      if (
        tween?.scrollTrigger
      ) {
        tween.scrollTrigger.kill(
          true
        );
      }

      tween?.kill();

      ctx.revert();
    };
  }, [projects]);

  return (
    <div
      ref={rootRef}
      className="relative w-full"
    >
      <div
        ref={pinRef}
        className="
          relative
          h-[100svh]
          w-full
          overflow-hidden
        "
      >
        <DesktopPhoneShowcase
          trackRef={trackRef}
          activeIndex={activeIndex}
          projects={projects}
          heading={heading}
        />
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════
   DESKTOP SHOWCASE
═════════════════════════════════════════════ */

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
  const project =
    projects[activeIndex] ??
    projects[0];

  if (!project) {
    return null;
  }

  return (
    <div
      className="
        relative
        flex
        h-[100svh]
        w-full
        items-center
        overflow-hidden
      "
    >
      {/* ═══════════════════════════════
          LEFT
      ═══════════════════════════════ */}

      <div
        className="
          relative
          z-10
          flex
          w-[45%]
          flex-col
          pl-[max(1.25rem,calc((100vw-80rem)/2+2rem))]
          pr-8
        "
      >
        <SectionLabel>
          Selected Work
        </SectionLabel>

        {heading && (
          <h2
            className="
              mt-6
              font-display
              text-4xl
              font-bold
              leading-[1.02]
              tracking-tight
              sm:text-6xl
              lg:text-7xl
            "
          >
            <span className="line-mask">
              <span
                className="line-inner"
                style={{
                  transform:
                    "translateY(0)",
                  opacity: 1,
                }}
              >
                Projects that
              </span>
            </span>

            <span className="line-mask">
              <span
                className="line-inner"
                style={{
                  transform:
                    "translateY(0)",
                  opacity: 1,
                }}
              >
                moved something.
              </span>
            </span>
          </h2>
        )}

        {/* PROJECT INFO */}

        <div className="mt-12 max-w-md">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/20
              bg-primary/10
              px-3
              py-1
              backdrop-blur-sm
            "
          >
            <span
              className="
                h-1
                w-1
                rounded-full
                bg-primary
              "
            />

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-primary
              "
            >
              {project.category} ·{" "}
              {project.year}
            </span>
          </div>

          <h3
            key={project.title}
            className="
              mt-4
              font-display
              text-3xl
              font-bold
              tracking-tight
              text-foreground
              lg:text-4xl
            "
          >
            {project.title}
          </h3>

          <p
            className="
              mt-3
              max-w-sm
              text-sm
              leading-relaxed
              text-muted-foreground
            "
          >
            {project.blurb}
          </p>
        </div>

        {/* PROGRESS */}

        <div
          className="
            mt-10
            h-px
            w-[min(28vw,22rem)]
            bg-border
          "
        >
          <div
            className="trail-x h-px"
            style={{
              width: `${
                ((activeIndex + 1) /
                  projects.length) *
                100
              }%`,

              transition:
                "width 400ms var(--ease-cine)",
            }}
          />
        </div>

        <div
          className="
            mt-3
            font-mono
            text-[11px]
            text-muted-foreground
          "
        >
          <span className="text-foreground">
            {String(
              activeIndex + 1
            ).padStart(2, "0")}
          </span>

          {" / "}

          {String(
            projects.length
          ).padStart(2, "0")}
        </div>
      </div>

      {/* ═══════════════════════════════
          PHONE
      ═══════════════════════════════ */}

      <div className="relative w-[25em]">
        {/* GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            -z-10
            rounded-[3rem]
            bg-primary/15
            blur-[60px]
          "
        />

        {/* PHONE BODY */}

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
          {/* STATUS */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              z-20
              flex
              items-center
              justify-between
              px-6
              pb-2
              pt-3
            "
          >
            <span
              className="
                font-mono
                text-[10px]
                text-muted-foreground
              "
            >
              9:41
            </span>

            <div
              className="
                flex
                items-center
                gap-1.5
              "
            >
              <svg
                className="
                  h-3
                  w-3
                  text-muted-foreground
                "
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <rect
                  x="1"
                  y="10"
                  width="3"
                  height="5"
                  rx="0.5"
                />

                <rect
                  x="5"
                  y="7"
                  width="3"
                  height="8"
                  rx="0.5"
                />

                <rect
                  x="9"
                  y="4"
                  width="3"
                  height="11"
                  rx="0.5"
                />

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
                className="
                  h-3
                  w-3
                  text-muted-foreground
                "
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 11c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
                  opacity="0.3"
                />

                <circle
                  cx="8"
                  cy="8"
                  r="2.5"
                />
              </svg>
            </div>
          </div>

          {/* DYNAMIC ISLAND */}

          <div
            className="
              absolute
              left-1/2
              top-1
              z-30
              -translate-x-1/2
            "
          >
            <div
              className="
                h-5
                w-24
                rounded-b-2xl
                bg-ink
              "
            />
          </div>

          {/* SCREEN */}

          <div
            className="
              absolute
              inset-0
              overflow-hidden
            "
          >
            <div
              ref={trackRef}
              className="
                absolute
                inset-x-0
                top-0
                w-full
              "
            >
              {projects.map(
                (p, i) => (
                  <div
                    key={`${p.title}-${i}`}
                    data-phone-layer
                    className="
                      relative
                      aspect-[9/16]
                      w-full
                      overflow-hidden
                    "
                  >
                    {p.media_type ===
                    "video" ? (
                      <video
                        src={
                          p.media_url
                        }
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    ) : (
                      <img
                        src={
                          p.media_url
                        }
                        alt={`${p.title} — ${p.category}`}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    )}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        h-1/3
                        bg-gradient-to-t
                        from-ink/70
                        to-transparent
                      "
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* HOME */}

          <div
            className="
              absolute
              bottom-2
              left-1/2
              z-30
              -translate-x-1/2
            "
          >
            <div
              className="
                h-1
                w-28
                rounded-full
                bg-foreground/20
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════
   MOBILE CINEMATIC STACK
═════════════════════════════════════════════ */

function MobileStack({
  projects,
  heading,
}: {
  projects: DisplayProject[];
  heading: boolean;
}) {
  /*
   * نفس الفكرة:
   *
   * rootRef = trigger
   * pinRef = GSAP pin target
   *
   * متعملش pin للـ root.
   */

  const rootRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const pinRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const stageRef =
    useRef<HTMLDivElement | null>(
      null
    );

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;

    if (!root || !pin || !stage) {
      return;
    }

    const cards = Array.from(
      stage.querySelectorAll<HTMLElement>(
        "[data-project-card]"
      )
    );

    if (!cards.length) {
      return;
    }

    let timeline:
      | gsap.core.Timeline
      | null = null;

    const ctx = gsap.context(() => {
      /* ═══════════════════════════════
         INITIAL STATES
      ═══════════════════════════════ */

      cards.forEach(
        (card, index) => {
          const media =
            card.querySelector<HTMLElement>(
              "[data-project-media]"
            );

          const texts =
            card.querySelectorAll<HTMLElement>(
              "[data-project-text]"
            );

          const counter =
            card.querySelector<HTMLElement>(
              "[data-project-counter]"
            );

          /* FIRST CARD */

          if (index === 0) {
            gsap.set(card, {
              autoAlpha: 1,

              yPercent: 0,

              scale: 1,

              rotateX: 0,
              rotateZ: 0,

              filter: "none",

              zIndex: 1,

              transformOrigin:
                "50% 50%",
            });

            if (media) {
              gsap.set(media, {
                scale: 1.06,
                yPercent: 0,
              });
            }

            gsap.set(texts, {
              y: 0,
              autoAlpha: 1,
            });

            if (counter) {
              gsap.set(counter, {
                y: 0,
                autoAlpha: 1,
              });
            }

            return;
          }

          /* OTHER CARDS */

          gsap.set(card, {
            autoAlpha: 1,

            yPercent: 100,

            scale: 0.98,

            rotateX: 7,

            rotateZ:
              index % 2 === 0
                ? 0.6
                : -0.6,

            filter: "none",

            zIndex: index + 1,

            transformPerspective:
              1200,

            transformOrigin:
              "50% 100%",
          });

          if (media) {
            gsap.set(media, {
              scale: 1.18,
              yPercent: 3,
            });
          }

          gsap.set(texts, {
            y: 35,
            autoAlpha: 0,
          });

          if (counter) {
            gsap.set(counter, {
              y: 20,
              autoAlpha: 0,
            });
          }
        }
      );

      /*
       * لو Project واحد بس
       * مش محتاج ScrollTrigger.
       */

      if (cards.length <= 1) {
        return;
      }

      /* ═══════════════════════════════
         MASTER TIMELINE
      ═══════════════════════════════ */

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,

          /*
           * مهم:
           * pin العنصر الداخلي.
           */
          pin: pin,

          start: "top top",

          end: () =>
            `+=${
              window.innerHeight *
              Math.max(
                cards.length - 1,
                1
              ) *
              1.15
            }`,

          scrub: 0.85,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });

      /* ═══════════════════════════════
         PROJECT TRANSITIONS
      ═══════════════════════════════ */

      for (
        let i = 1;
        i < cards.length;
        i++
      ) {
        const previousCard =
          cards[i - 1];

        const currentCard =
          cards[i];

        const previousMedia =
          previousCard.querySelector<HTMLElement>(
            "[data-project-media]"
          );

        const currentMedia =
          currentCard.querySelector<HTMLElement>(
            "[data-project-media]"
          );

        const previousText =
          previousCard.querySelectorAll<HTMLElement>(
            "[data-project-text]"
          );

        const currentText =
          currentCard.querySelectorAll<HTMLElement>(
            "[data-project-text]"
          );

        const currentCounter =
          currentCard.querySelector<HTMLElement>(
            "[data-project-counter]"
          );

        const label =
          `project-${i}`;

        timeline.addLabel(label);

        /* ═════════════════════════════
           OLD PROJECT

           يفضل مالي الشاشة.
           مفيش black gap.
        ═════════════════════════════ */

        timeline.to(
          previousCard,
          {
            yPercent: -2,

            scale: 1.03,

            rotateX: 0,

            rotateZ: 0,

            filter:
              "brightness(.55) saturate(.75)",

            ease:
              "power2.inOut",

            duration: 1,
          },

          label
        );

        /* OLD IMAGE */

        if (previousMedia) {
          timeline.to(
            previousMedia,
            {
              scale: 1.12,

              yPercent: -2,

              ease:
                "power2.inOut",

              duration: 1,
            },

            label
          );
        }

        /* OLD TEXT */

        timeline.to(
          previousText,
          {
            y: -18,

            opacity: 0.18,

            ease:
              "power2.inOut",

            duration: 0.55,
          },

          label
        );

        /* ═════════════════════════════
           NEW PROJECT
        ═════════════════════════════ */

        timeline.fromTo(
          currentCard,

          {
            yPercent: 100,

            scale: 0.98,

            rotateX: 7,

            rotateZ:
              i % 2 === 0
                ? 0.6
                : -0.6,

            filter:
              "brightness(.9)",
          },

          {
            yPercent: 0,

            scale: 1,

            rotateX: 0,

            rotateZ: 0,

            filter:
              "brightness(1)",

            ease:
              "power3.inOut",

            duration: 1,

            immediateRender:
              false,
          },

          label
        );

        /* NEW IMAGE */

        if (currentMedia) {
          timeline.fromTo(
            currentMedia,

            {
              scale: 1.18,

              yPercent: 3,
            },

            {
              scale: 1.06,

              yPercent: 0,

              ease:
                "power2.out",

              duration: 1,

              immediateRender:
                false,
            },

            label
          );
        }

        /* COUNTER */

        if (currentCounter) {
          timeline.fromTo(
            currentCounter,

            {
              y: 20,
              autoAlpha: 0,
            },

            {
              y: 0,
              autoAlpha: 1,

              ease:
                "power3.out",

              duration: 0.4,

              immediateRender:
                false,
            },

            `${label}+=0.45`
          );
        }

        /* NEW TEXT */

        timeline.fromTo(
          currentText,

          {
            y: 35,
            autoAlpha: 0,
          },

          {
            y: 0,
            autoAlpha: 1,

            stagger: 0.06,

            ease:
              "power3.out",

            duration: 0.5,

            immediateRender:
              false,
          },

          `${label}+=0.45`
        );

        /* HOLD */

        timeline.to(
          {},
          {
            duration: 0.22,
          }
        );
      }
    }, root);

    /*
     * Refresh بعد layout.
     */

    const raf =
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

    return () => {
      cancelAnimationFrame(raf);

      /*
       * نفك pin-spacer الأول.
       */

      if (
        timeline?.scrollTrigger
      ) {
        timeline.scrollTrigger.kill(
          true
        );
      }

      timeline?.kill();

      ctx.revert();
    };
  }, [projects]);

  return (
    <div
      ref={rootRef}
      className="
        relative
        w-full
      "
    >
      {/* ═══════════════════════════════
          PIN TARGET
      ═══════════════════════════════ */}

      <div
        ref={pinRef}
        className="
          relative
          h-[100svh]
          w-full
          overflow-hidden
          bg-black
        "
      >
        {/* HEADER */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-[100]
            px-5
            pt-5
          "
        >
          <SectionLabel>
            Selected Work
          </SectionLabel>

          {heading && (
            <p
              className="
                mt-3
                font-mono
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-white/45
              "
            >
              Scroll to explore
            </p>
          )}
        </div>

        {/* ═══════════════════════════════
            STAGE
        ═══════════════════════════════ */}

        <div
          ref={stageRef}
          className="
            relative
            h-full
            w-full
            overflow-hidden
          "
          style={{
            perspective:
              "1200px",

            transformStyle:
              "preserve-3d",
          }}
        >
          {projects.map(
            (
              project,
              index
            ) => (
              <MobileCinematicCard
                key={`${project.title}-${index}`}
                project={
                  project
                }
                index={index}
                total={
                  projects.length
                }
              />
            )
          )}
        </div>

        {/* ═══════════════════════════════
            SCROLL INDICATOR
        ═══════════════════════════════ */}

        {projects.length > 1 && (
          <div
            className="
              pointer-events-none
              absolute
              bottom-6
              right-5
              z-[100]
              flex
              flex-col
              items-center
              gap-2
            "
          >
            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-white/35
                [writing-mode:vertical-rl]
              "
            >
              Scroll
            </span>

            <div
              className="
                h-10
                w-px
                bg-gradient-to-b
                from-primary
                to-transparent
              "
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════
   MOBILE PROJECT CARD
═════════════════════════════════════════════ */

function MobileCinematicCard({
  project,
  index,
  total,
}: {
  project: DisplayProject;
  index: number;
  total: number;
}) {
  return (
    <article
      data-project-card
      className="
        absolute
        inset-0
        h-full
        w-full
        overflow-hidden
        bg-black
        will-change-transform
      "
      style={{
        backfaceVisibility:
          "hidden",

        WebkitBackfaceVisibility:
          "hidden",
      }}
    >
      {/* ═══════════════════════════════
          MEDIA
      ═══════════════════════════════ */}

      <div
        data-project-media
        className="
          absolute
          -inset-y-[5%]
          inset-x-0
          h-[110%]
          w-full
          will-change-transform
        "
      >
        {project.media_type ===
        "video" ? (
          <video
            src={project.media_url}
            autoPlay
            loop
            muted
            playsInline
            preload={
              index === 0
                ? "auto"
                : "metadata"
            }
            className="
              h-full
              w-full
              object-cover
            "
          />
        ) : (
          <img
            src={project.media_url}
            alt={`${project.title} — ${project.category}`}
            loading={
              index === 0
                ? "eager"
                : "lazy"
            }
            width={900}
            height={1400}
            className="
              h-full
              w-full
              object-cover
            "
          />
        )}
      </div>

      {/* ═══════════════════════════════
          OVERLAYS
      ═══════════════════════════════ */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-b
          from-black/25
          via-transparent
          to-black/90
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-black/20
          via-transparent
          to-black/5
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[55%]
          bg-gradient-to-t
          from-black/75
          to-transparent
        "
      />

      {/* ═══════════════════════════════
          NUMBER
      ═══════════════════════════════ */}

      <div
        data-project-counter
        className="
          absolute
          right-5
          top-7
          z-30
          flex
          items-end
          gap-1.5
          font-mono
          text-white
        "
      >
        <span
          className="
            text-3xl
            font-light
            leading-none
          "
        >
          {String(
            index + 1
          ).padStart(2, "0")}
        </span>

        <span
          className="
            pb-[2px]
            text-[9px]
            text-white/40
          "
        >
          /{" "}
          {String(total).padStart(
            2,
            "0"
          )}
        </span>
      </div>

      {/* ═══════════════════════════════
          CONTENT
      ═══════════════════════════════ */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-30
          px-6
          pb-10
        "
      >
        {/* CATEGORY */}

        <div
          data-project-text
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/15
            bg-black/20
            px-3
            py-1.5
            backdrop-blur-md
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-primary
            "
          />

          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-white/75
            "
          >
            {project.category} ·{" "}
            {project.year}
          </span>
        </div>

        {/* TITLE */}

        <h3
          data-project-text
          className="
            mt-5
            max-w-[95%]
            font-display
            text-[clamp(3rem,14vw,5.5rem)]
            font-bold
            leading-[0.85]
            tracking-[-0.05em]
            text-white
          "
        >
          {project.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          data-project-text
          className="
            mt-5
            max-w-[90%]
            text-[13px]
            leading-[1.7]
            text-white/60
          "
        >
          {project.blurb}
        </p>

        {/* ACCENT */}

        <div
          data-project-text
          className="
            mt-6
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              h-px
              w-12
              bg-primary
            "
          />

          <span
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/40
            "
          >
            View project
          </span>
        </div>
      </div>

      {/* SIDE DECORATION */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-24
          right-5
          top-24
          z-20
          w-px
          bg-gradient-to-b
          from-transparent
          via-white/10
          to-transparent
        "
      />
    </article>
  );
}