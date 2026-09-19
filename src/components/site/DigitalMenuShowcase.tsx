import {
  RevealBlock,
  RevealLines,
  SectionLabel,
} from "@/components/site/Reveal";

import {
  range,
  useScrollProgress,
} from "@/lib/motion";

const CATEGORIES = [
  "Signature",
  "Grill",
  "Pasta",
  "Desserts",
];

const DISHES = [
  [
    {
      name: "Black Truffle Scallop",
      price: "$28",
    },
    {
      name: "Smoked Beetroot Tartare",
      price: "$19",
    },
    {
      name: "Caviar Potato Cream",
      price: "$24",
    },
  ],

  [
    {
      name: "Dry-Aged Ribeye",
      price: "$46",
    },
    {
      name: "Charcoal Lamb Rack",
      price: "$38",
    },
    {
      name: "Josper Sea Bass",
      price: "$34",
    },
  ],

  [
    {
      name: "Squid Ink Tagliolini",
      price: "$26",
    },
    {
      name: "Wild Mushroom Ravioli",
      price: "$23",
    },
    {
      name: "Cacio e Pepe 2.0",
      price: "$21",
    },
  ],

  [
    {
      name: "Blue Yuzu Sphere",
      price: "$14",
    },
    {
      name: "Dark Chocolate Ember",
      price: "$16",
    },
    {
      name: "Pistachio Cloud",
      price: "$13",
    },
  ],
];

/* ═════════════════════════════════════════════
   DIGITAL MENU SHOWCASE
═════════════════════════════════════════════ */

export function DigitalMenuShowcase() {
  const { ref, progress } =
    useScrollProgress<HTMLDivElement>();

  const p = range(
    progress,
    0.15,
    0.9
  );

  const step = Math.min(
    CATEGORIES.length - 1,
    Math.floor(
      p * CATEGORIES.length
    )
  );

  const dishes =
    DISHES[step] ??
    DISHES[0] ??
    [];

  return (
    <section
      id="digital-menu"
      ref={ref}
      className="
        relative
        overflow-hidden

        py-20
        sm:py-28
        lg:py-36
      "
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-7xl

          gap-14

          px-5

          sm:px-8

          lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]
          lg:items-center
          lg:gap-16
        "
      >
        {/* ═══════════════════════════════════
            LEFT CONTENT
        ═══════════════════════════════════ */}

        <div className="min-w-0">
          <SectionLabel>
            Digital Menu
          </SectionLabel>

          <RevealLines
            as="h2"
            className="
              mt-6

              max-w-2xl

              font-display

              text-4xl
              font-bold

              leading-[1.02]

              tracking-tight

              sm:text-5xl
              lg:text-6xl
            "
            lines={[
              "A menu that",
              "behaves like",
              "a product.",
            ]}
          />

          <RevealBlock delay={120}>
            <p
              className="
                mt-7
                max-w-md

                text-[14px]
                leading-relaxed

                text-muted-foreground

                sm:mt-8
                sm:text-[15px]
              "
            >
              One QR code opens a fast,
              branded menu. Categories glide,
              dishes animate in, prices and
              availability change instantly —
              no printing, no app store.
            </p>
          </RevealBlock>

          {/* FEATURES */}

          <div
            className="
              mt-8

              grid
              max-w-md

              gap-4

              sm:mt-10
              sm:grid-cols-2
            "
          >
            {[
              "Instant category flow",
              "Multi-language ready",
              "Live availability",
              "Branded per venue",
            ].map(
              (
                feature,
                index
              ) => (
                <RevealBlock
                  key={feature}
                  delay={
                    200 +
                    index * 70
                  }
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3

                      text-sm

                      text-muted-foreground
                    "
                  >
                    <span
                      className="
                        h-1
                        w-6
                        shrink-0

                        trail-x
                      "
                    />

                    {feature}
                  </div>
                </RevealBlock>
              )
            )}
          </div>

          {/* CONNECTION TRAIL */}

          <div
            aria-hidden
            className="
              mt-12
              hidden
              h-px
              w-full
              overflow-hidden

              lg:block
            "
          >
            <div
              className="
                trail-x
                h-px
              "
              style={{
                width:
                  `${
                    20 +
                    p * 80
                  }%`,

                transition:
                  "width 120ms linear",
              }}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════
            PREVIEW AREA
        ═══════════════════════════════════ */}

        <div
          className="
            relative

            flex
            w-full

            items-center
            justify-center

            overflow-visible

            py-4

            sm:py-8
            lg:py-0
          "
        >
          {/* OUTER PHONE ANIMATION */}

          <div
            className="
              relative

              w-[min(78vw,17rem)]

              sm:w-[17.5rem]

              lg:w-[18rem]

              will-change-transform
            "
            style={{
              transform: `
                perspective(1400px)
                rotateY(${
                  6 -
                  p * 10
                }deg)
                rotateX(${
                  2 -
                  p * 3
                }deg)
                translateY(${
                  (0.5 -
                    p) *
                  18
                }px)
              `,

              transition:
                "transform 120ms linear",
            }}
          >
            {/* GLOW */}

            <div
              className="
                pointer-events-none

                absolute

                -inset-8
                -z-10

                rounded-full

                bg-primary/20

                blur-[70px]

                sm:-inset-10
                sm:blur-[100px]
              "
            />

            {/* ═════════════════════════════
                PHONE BODY

                مفيش h ثابت
                الارتفاع بيتحدد من النسبة
            ═════════════════════════════ */}

            <div
              className="
                relative

                w-full

                overflow-hidden

                rounded-[2.1rem]

                border
                border-border

                bg-ink

                p-2

                shadow-2xl

                glow-soft

                sm:rounded-[2.6rem]
                sm:p-3
              "
              style={{
                aspectRatio:
                  "35 / 72",
              }}
            >
              {/* INNER SCREEN */}

              <div
                className="
                  relative

                  h-full
                  w-full

                  overflow-hidden

                  rounded-[1.65rem]

                  border
                  border-border

                  bg-background

                  sm:rounded-[2rem]
                "
              >
                {/* SPEAKER */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-2.5

                    z-20

                    h-1.5
                    w-12

                    -translate-x-1/2

                    rounded-full

                    bg-surface-2

                    sm:top-3
                    sm:w-14
                  "
                />

                {/* ═══════════════════════════
                    PHONE CONTENT
                ═══════════════════════════ */}

                <div
                  className="
                    flex
                    h-full
                    min-h-0
                    flex-col

                    px-3.5
                    pb-4
                    pt-8

                    sm:px-5
                    sm:pb-6
                    sm:pt-10
                  "
                >
                  {/* BRAND */}

                  <p
                    className="
                      shrink-0

                      text-[8px]
                      uppercase

                      tracking-[0.28em]

                      text-muted-foreground

                      sm:text-[10px]
                      sm:tracking-[0.3em]
                    "
                  >
                    Noir Table
                  </p>

                  <h3
                    className="
                      mt-1

                      shrink-0

                      font-display

                      text-base
                      font-semibold

                      sm:text-lg
                    "
                  >
                    Menu
                  </h3>

                  {/* ═══════════════════════════
                      CATEGORIES

                      scrollable لو الشاشة ضيقة
                  ═══════════════════════════ */}

                  <div
                    className="
                      mt-3

                      flex
                      shrink-0

                      gap-1.5

                      overflow-x-auto

                      pb-1

                      [scrollbar-width:none]

                      [&::-webkit-scrollbar]:hidden

                      sm:mt-4
                      sm:gap-2
                    "
                  >
                    {CATEGORIES.map(
                      (
                        category,
                        index
                      ) => (
                        <span
                          key={
                            category
                          }
                          className="
                            shrink-0

                            whitespace-nowrap

                            rounded-full

                            px-2
                            py-1

                            text-[8px]

                            transition-all
                            duration-500

                            [transition-timing-function:var(--ease-cine)]

                            sm:px-2.5
                            sm:text-[10px]
                          "
                          style={{
                            background:
                              index ===
                              step
                                ? "var(--primary)"
                                : "var(--surface)",

                            color:
                              index ===
                              step
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

                  {/* ═══════════════════════════
                      DISHES
                  ═══════════════════════════ */}

                  <div
                    className="
                      mt-3

                      flex
                      min-h-0
                      flex-1
                      flex-col

                      justify-center

                      gap-2

                      sm:mt-5
                      sm:gap-3
                    "
                  >
                    {dishes.map(
                      (
                        dish,
                        index
                      ) => (
                        <div
                          key={
                            dish.name
                          }
                          className="
                            flex
                            min-w-0
                            items-center

                            gap-2

                            rounded-lg

                            border
                            border-border

                            bg-surface

                            p-2

                            sm:gap-3
                            sm:rounded-xl
                            sm:p-3
                          "
                          style={{
                            animation:
                              `dm-drift ${
                                6 +
                                index
                              }s ease-in-out infinite`,
                          }}
                        >
                          {/* IMAGE PLACEHOLDER */}

                          <div
                            className="
                              h-9
                              w-9

                              shrink-0

                              rounded-md

                              bg-surface-2

                              sm:h-11
                              sm:w-11
                              sm:rounded-lg
                            "
                          />

                          {/* TEXT */}

                          <div
                            className="
                              min-w-0
                              flex-1
                            "
                          >
                            <p
                              className="
                                truncate

                                text-[10px]
                                font-medium

                                sm:text-[13px]
                              "
                            >
                              {
                                dish.name
                              }
                            </p>

                            <p
                              className="
                                mt-0.5

                                truncate

                                text-[8px]

                                text-muted-foreground

                                sm:text-[11px]
                              "
                            >
                              Chef&apos;s
                              selection
                            </p>
                          </div>

                          {/* PRICE */}

                          <span
                            className="
                              shrink-0

                              text-[10px]

                              text-primary

                              sm:text-[13px]
                            "
                          >
                            {
                              dish.price
                            }
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  {/* ═══════════════════════════
                      BOTTOM BAR
                  ═══════════════════════════ */}

                  <div
                    className="
                      mt-3

                      flex
                      shrink-0

                      items-center
                      justify-between

                      gap-2

                      rounded-full

                      border
                      border-border

                      px-3
                      py-2

                      text-[8px]

                      text-muted-foreground

                      sm:mt-4
                      sm:px-4
                      sm:py-2.5
                      sm:text-[11px]
                    "
                  >
                    <span
                      className="
                        truncate
                      "
                    >
                      Scan · Browse ·
                      Order
                    </span>

                    <span
                      className="
                        h-1.5
                        w-1.5

                        shrink-0

                        rounded-full

                        bg-primary

                        glow-ring
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}