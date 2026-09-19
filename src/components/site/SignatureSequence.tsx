import { LogoMark } from "@/components/brand/Logo";
import { range, useScrollProgress } from "@/lib/motion";
import { SectionLabel } from "@/components/site/Reveal";

export function SignatureSequence() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  const pParticles = range(progress, 0.05, 0.22);
  const pTrail = range(progress, 0.14, 0.34);
  const pPhone = range(progress, 0.3, 0.48);
  const pMenu = range(progress, 0.44, 0.6);
  const pSpread = range(progress, 0.58, 0.76);
  const pCollapse = range(progress, 0.76, 0.94);

  const chapters = [
    {
      at: pParticles,
      label: "01 — An idea appears",
    },
    {
      at: pPhone,
      label: "02 — It takes a form",
    },
    {
      at: pMenu,
      label: "03 — It becomes a product",
    },
    {
      at: pSpread,
      label: "04 — It becomes an experience",
    },
  ];

  const active = chapters.reduce(
    (acc, chapter, index) =>
      chapter.at > 0.35 ? index : acc,
    0
  );

  return (
    <section
      ref={ref}
      className="
        relative
        h-[300svh]
        sm:h-[380svh]
      "
    >
      {/* STICKY VIEWPORT */}

      <div
        className="
          sticky
          top-0
          flex
          h-[100svh]
          w-full
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* BACKGROUND GRID */}

        <div className="grid-veil absolute inset-0 -z-10" />

        {/* GLOW */}

        <div
          aria-hidden
          className="
            absolute
            left-1/2
            top-1/2
            -z-10
            h-[22rem]
            w-[22rem]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-primary/15
            blur-[100px]

            sm:h-[32rem]
            sm:w-[32rem]
            sm:blur-[130px]
          "
          style={{
            opacity: 0.3 + pPhone * 0.6,
          }}
        />

        {/* CHAPTER LABEL */}

        <div
          className="
            absolute
            left-5
            top-20
            z-30

            sm:left-8
            sm:top-24
          "
        >
          <SectionLabel>
            {chapters[active]?.label ??
              chapters[0]?.label}
          </SectionLabel>
        </div>

        {/* ═════════════════════════════════════
            MAIN STAGE
        ═════════════════════════════════════ */}

        <div
          className="
            relative
            flex
            h-[72svh]
            w-full
            max-w-4xl
            items-center
            justify-center

            sm:h-[76svh]
          "
        >
          {/* ═══════════════════════════════════
              PARTICLES
          ═══════════════════════════════════ */}

          {Array.from({ length: 26 }).map((_, i) => {
            const angle =
              (i / 26) * Math.PI * 2;

            const radius =
              20 + (i % 6) * 4;

            const gather =
              pParticles;

            return (
              <span
                key={i}
                suppressHydrationWarning
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-1
                  w-1
                  rounded-full
                  bg-primary
                "
                style={{
                  transform: `
                    translate(-50%, -50%)
                    translate(
                      ${(
                        Math.cos(angle) *
                        radius *
                        (1 - gather) *
                        1.6
                      ).toFixed(3)}vmin,
                      ${(
                        Math.sin(angle) *
                        radius *
                        (1 - gather) *
                        1.1
                      ).toFixed(3)}vmin
                    )
                    scale(${(
                      1 -
                      gather * 0.4
                    ).toFixed(3)})
                  `,

                  opacity:
                    (1 - pPhone) *
                    (0.25 +
                      gather * 0.75),
                }}
              />
            );
          })}

          {/* ═══════════════════════════════════
              MOTION TRAIL
          ═══════════════════════════════════ */}

          <svg
            viewBox="0 0 800 400"
            className="
              pointer-events-none
              absolute
              inset-0
              h-full
              w-full
            "
            aria-hidden
          >
            <defs>
              <linearGradient
                id="dm-trail"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="var(--electric)"
                  stopOpacity="0"
                />

                <stop
                  offset="60%"
                  stopColor="var(--electric)"
                  stopOpacity="0.9"
                />

                <stop
                  offset="100%"
                  stopColor="var(--electric-soft)"
                />
              </linearGradient>
            </defs>

            <path
              d="
                M20 300
                C 200 300,
                240 120,
                400 120
                C 560 120,
                620 250,
                780 250
              "
              fill="none"
              stroke="url(#dm-trail)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={
                1 - pTrail
              }
              style={{
                opacity:
                  1 - pMenu,
              }}
            />
          </svg>

          {/* ═══════════════════════════════════
              PHONE
          ═══════════════════════════════════ */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              z-10
            "
            style={{
              opacity:
                pPhone *
                (1 - pCollapse),

              transform: `
                translate(-50%, -50%)
                perspective(1200px)
                rotateY(${
                  (1 - pPhone) * 22 -
                  pSpread * 10
                }deg)
                rotateX(${
                  (1 - pPhone) * 8
                }deg)
                scale(${
                  0.72 +
                  pPhone * 0.28 -
                  pCollapse * 0.35
                })
              `,

              transition:
                "opacity 120ms linear",
            }}
          >
            {/* PHONE BODY */}

            <div
              className="
                relative

                h-[50svh]
                w-[min(38svh,13.5rem)]

                overflow-hidden

                rounded-[2rem]

                border
                border-border

                bg-ink

                glow-soft

                sm:h-[62svh]
                sm:w-[min(30svh,15rem)]
                sm:rounded-[2.2rem]
              "
            >
              {/* SPEAKER */}

              <div
                className="
                  absolute
                  left-1/2
                  top-2
                  h-1.5
                  w-14
                  -translate-x-1/2
                  rounded-full
                  bg-surface-2

                  sm:w-16
                "
              />

              {/* PHONE CONTENT */}

              <div
                className="
                  flex
                  h-full
                  flex-col
                  px-3
                  pb-3
                  pt-7

                  sm:px-4
                  sm:pb-4
                  sm:pt-8
                "
              >
                <div
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.24em]
                    text-muted-foreground

                    sm:text-[10px]
                  "
                >
                  Digital Menu
                </div>

                {/* CATEGORIES */}

                <div
                  className="
                    mt-2
                    flex
                    gap-1.5

                    sm:mt-3
                    sm:gap-2
                  "
                >
                  {[
                    "Starters",
                    "Mains",
                    "Drinks",
                  ].map(
                    (
                      category,
                      index
                    ) => (
                      <span
                        key={
                          category
                        }
                        className="
                          rounded-full
                          px-1.5
                          py-0.5
                          text-[7px]

                          sm:px-2
                          sm:py-1
                          sm:text-[9px]
                        "
                        style={{
                          background:
                            index ===
                            Math.min(
                              2,
                              Math.floor(
                                pMenu *
                                  3
                              )
                            )
                              ? "var(--primary)"
                              : "var(--surface-2)",

                          color:
                            index ===
                            Math.min(
                              2,
                              Math.floor(
                                pMenu *
                                  3
                              )
                            )
                              ? "var(--primary-foreground)"
                              : "var(--muted-foreground)",
                        }}
                      >
                        {
                          category
                        }
                      </span>
                    )
                  )}
                </div>

                {/* MENU CARDS */}

                <div
                  className="
                    mt-2
                    flex
                    flex-1
                    flex-col
                    gap-1.5

                    sm:mt-3
                    sm:gap-2
                  "
                >
                  {Array.from({
                    length: 4,
                  }).map((_, i) => {
                    const itemProgress =
                      range(
                        pMenu,
                        i * 0.16,
                        i * 0.16 +
                          0.3
                      );

                    return (
                      <div
                        key={i}
                        className="
                          flex
                          items-center
                          gap-1.5

                          rounded-lg

                          border
                          border-border

                          bg-surface

                          p-1.5

                          sm:gap-2
                          sm:p-2
                        "
                        style={{
                          opacity:
                            itemProgress,

                          transform: `
                            translateY(${
                              (1 -
                                itemProgress) *
                              14
                            }px)
                          `,
                        }}
                      >
                        <div
                          className="
                            h-6
                            w-6
                            shrink-0
                            rounded-md
                            bg-surface-2

                            sm:h-8
                            sm:w-8
                          "
                        />

                        <div
                          className="
                            flex-1
                            space-y-1
                          "
                        >
                          <div
                            className="
                              h-1.5
                              w-3/4
                              rounded
                              bg-surface-2
                            "
                          />

                          <div
                            className="
                              h-1.5
                              w-1/3
                              rounded
                              bg-primary/50
                            "
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SCANNER */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  h-10
                  bg-primary/10

                  sm:h-16
                "
                style={{
                  opacity:
                    pMenu > 0.1
                      ? 1
                      : 0,
                }}
              >
                <div
                  className="
                    animate-scan
                    h-10
                    w-full
                    bg-gradient-to-b
                    from-transparent
                    via-primary/25
                    to-transparent

                    sm:h-16
                  "
                />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════
              SPREADING SCREENS
          ═══════════════════════════════════ */}

          {[
            {
              x: -46,
              y: -18,
              r: -9,
            },
            {
              x: 44,
              y: -24,
              r: 8,
            },
            {
              x: -34,
              y: 22,
              r: 6,
            },
            {
              x: 38,
              y: 24,
              r: -7,
            },
          ].map((screen, i) => (
            <div
              key={i}
              className="
                absolute
                left-1/2
                top-1/2

                h-16
                w-24

                overflow-hidden

                rounded-xl

                border
                border-border

                bg-surface/90

                backdrop-blur-sm

                sm:h-36
                sm:w-60
              "
              style={{
                opacity:
                  pSpread *
                  (1 - pCollapse),

                transform: `
                  translate(-50%, -50%)
                  translate(
                    ${
                      screen.x *
                      pSpread
                    }%,
                    ${
                      screen.y *
                      pSpread *
                      2.2
                    }%
                  )
                  rotate(${
                    screen.r *
                    pSpread
                  }deg)
                  scale(${
                    0.7 +
                    pSpread *
                      0.3 -
                    pCollapse *
                      0.6
                  })
                `,
              }}
            >
              <div
                className="
                  flex
                  h-4
                  items-center
                  gap-1
                  border-b
                  border-border
                  px-2
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
                    h-1
                    w-1
                    rounded-full
                    bg-muted-foreground/50
                  "
                />
              </div>

              <div className="space-y-1.5 p-3">
                <div className="h-2 w-2/3 rounded bg-surface-2" />

                <div className="h-1.5 w-1/2 rounded bg-surface-2" />

                <div className="mt-3 h-10 w-full rounded bg-primary/15" />
              </div>
            </div>
          ))}

          {/* ═══════════════════════════════════
              COLLAPSE LOGO
          ═══════════════════════════════════ */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              z-20
              text-center
            "
            style={{
              opacity:
                pCollapse,

              transform: `
                translate(-50%, -50%)
                scale(${
                  0.7 +
                  pCollapse *
                    0.3
                })
              `,
            }}
          >
            <LogoMark
              className="
                mx-auto
                h-14
                w-14
                glow-ring

                sm:h-20
                sm:w-20
              "
            />

            <p
              className="
                mt-4
                w-[80vw]
                max-w-md

                font-display

                text-xl
                font-semibold

                tracking-tight

                sm:mt-6
                sm:text-4xl
              "
            >
              One idea. An entire
              experience.
            </p>
          </div>
        </div>

        {/* ═════════════════════════════════════
            BOTTOM TIMELINE
        ═════════════════════════════════════ */}

        <div
          className="
            absolute
            bottom-6
            left-1/2

            h-px
            w-[min(72vw,32rem)]

            -translate-x-1/2

            bg-border

            sm:bottom-10
          "
        >
          <div
            className="
              trail-x
              h-px
            "
            style={{
              width:
                `${progress * 100}%`,

              transition:
                "width 80ms linear",
            }}
          />
        </div>
      </div>
    </section>
  );
}