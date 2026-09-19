import { useEffect, useRef } from "react";
import { MagneticLink } from "@/components/site/Buttons";
import { usePrefersReducedMotion, useScrollY } from "@/lib/motion";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function scrollRange(
  value: number,
  start: number,
  end: number
) {
  return clamp01(
    (value - start) / (end - start)
  );
}

/* ─────────────────────────────────────────────
   VIDEO INTRO
───────────────────────────────────────────── */

function VideoIntro({
  opacity,
}: {
  opacity: number;
}) {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current
      .play()
      .catch(() => {});
  }, []);

  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        fixed
        inset-0
        z-40
        flex
        items-center
        justify-center
        bg-ink
      "
      style={{
        opacity,

        visibility:
          opacity <= 0.001
            ? "hidden"
            : "visible",

        willChange: "opacity",
      }}
    >
      <video
        ref={videoRef}
        className="
          h-full
          w-full
          object-cover
        "
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/video-intro.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay بسيط عشان الكلام يبان أثناء الانتقال */}
      <div
        className="
          absolute
          inset-0
          bg-black/20
        "
      />
    </div>
  );
}

/* ═════════════════════════════════════════════
   HERO
═════════════════════════════════════════════ */

export function Hero() {
  const reduced =
    usePrefersReducedMotion();

  const y =
    useScrollY();

  const parallax =
    Math.min(y, 700);

  /* ═══════════════════════════════════════════
     SCROLL PROGRESS
  ═══════════════════════════════════════════ */

  /*
   * الفيديو:
   * 0px   = ظاهر بالكامل
   * 360px = اختفى بالكامل
   */
  const videoProgress =
    reduced
      ? 1
      : scrollRange(
          y,
          0,
          360
        );

  const videoOpacity =
    reduced
      ? 0
      : 1 -
        videoProgress;

  /*
   * Hero يبدأ يظهر بدري جدًا
   */

  const heroProgress =
    reduced
      ? 1
      : scrollRange(
          y,
          35,
          220
        );

  const eyebrowProgress =
    reduced
      ? 1
      : scrollRange(
          y,
          45,
          150
        );

  const lineOneProgress =
    reduced
      ? 1
      : scrollRange(
          y,
          60,
          180
        );

  const lineTwoProgress =
    reduced
      ? 1
      : scrollRange(
          y,
          90,
          220
        );

  const paragraphProgress =
    reduced
      ? 1
      : scrollRange(
          y,
          130,
          260
        );

  const buttonsProgress =
    reduced
      ? 1
      : scrollRange(
          y,
          170,
          300
        );

  const bottomProgress =
    reduced
      ? 1
      : scrollRange(
          y,
          200,
          330
        );

  return (
    <section
      className="
        relative
        isolate
        flex
        min-h-[100svh]
        flex-col
        justify-center
        overflow-hidden
        pt-28
      "
    >
      {/* ═══════════════════════════════════════
          VIDEO
      ═══════════════════════════════════════ */}

      {!reduced && (
        <VideoIntro
          opacity={
            videoOpacity
          }
        />
      )}

      {/* ═══════════════════════════════════════
          BACKGROUND
      ═══════════════════════════════════════ */}

      <div
        aria-hidden
        className="
          absolute
          inset-0
          -z-10
        "
        style={{
          transform: `
            translate3d(
              0,
              ${
                parallax *
                0.18
              }px,
              0
            )
          `,
        }}
      >
        <div
          className="
            grid-veil
            absolute
            inset-0
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[62%]

            h-[38rem]
            w-[38rem]

            -translate-x-1/2

            rounded-full

            bg-primary/20

            blur-[140px]

            animate-pulse-glow
          "
        />
      </div>

      {/* ═══════════════════════════════════════
          HERO CONTENT

          z-50 مهم:
          يخلي الكلام يظهر فوق الفيديو أثناء الـ fade
      ═══════════════════════════════════════ */}

      <div
        className="
          relative
          z-50

          mx-auto
          w-full
          max-w-7xl

          px-5

          sm:px-8
          pt-[18em]
        "
      >
        <div
          className="
            max-w-3xl
          "
          style={{
            opacity:
              heroProgress,

            transform: `
              translate3d(
                0,
                ${
                  (1 -
                    heroProgress) *
                  28
                }px,
                0
              )
            `,

            willChange:
              "opacity, transform",
          }}
        >
          {/* ═══════════════════════════════════
              EYEBROW
          ═══════════════════════════════════ */}

          <div
            className="
              flex
              items-center
              gap-3

              text-[11px]
              uppercase

              tracking-[0.38em]

              text-muted-foreground
            "
            style={{
              opacity:
                eyebrowProgress,

              transform: `
                translateY(
                  ${
                    (1 -
                      eyebrowProgress) *
                    12
                  }px
                )
              `,
            }}
          >
            <span
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-primary

                glow-ring
              "
            />

            Digital Mov — Creative Digital Studio
          </div>

          {/* ═══════════════════════════════════
              TITLE
          ═══════════════════════════════════ */}

          <h1
            className="
              mt-7

              font-display

              text-[13vw]
              font-bold

              leading-[0.92]

              tracking-tight

              sm:text-[9vw]

              lg:text-[6.4rem]
            "
          >
            {/* LINE 1 */}

            <span
              className="
                line-mask
                block
              "
            >
              <span
                className="
                  line-inner
                  block
                "
                style={{
                  opacity:
                    lineOneProgress,

                  transform: `
                    translateY(
                      ${
                        (1 -
                          lineOneProgress) *
                        110
                      }%
                    )
                  `,

                  willChange:
                    "transform, opacity",
                }}
              >
                Turning digital
              </span>
            </span>

            {/* LINE 2 */}

            <span
              className="
                line-mask
                block
              "
            >
              <span
                className="
                  line-inner
                  block
                "
                style={{
                  opacity:
                    lineTwoProgress,

                  transform: `
                    translateY(
                      ${
                        (1 -
                          lineTwoProgress) *
                        110
                      }%
                    )
                  `,

                  willChange:
                    "transform, opacity",
                }}
              >
                ideas into{" "}

                <em
                  className="
                    not-italic
                    text-primary
                    text-glow
                  "
                >
                  motion.
                </em>
              </span>
            </span>
          </h1>

          {/* ═══════════════════════════════════
              DESCRIPTION
          ═══════════════════════════════════ */}

          <p
            className="
              mt-8

              max-w-md

              text-[15px]

              leading-relaxed

              text-muted-foreground
            "
            style={{
              opacity:
                paragraphProgress,

              transform: `
                translateY(
                  ${
                    (1 -
                      paragraphProgress) *
                    18
                  }px
                )
              `,

              willChange:
                "opacity, transform",
            }}
          >
            Websites, digital menus and interactive
            experiences — designed as one continuous
            motion.
          </p>

          {/* ═══════════════════════════════════
              BUTTONS
          ═══════════════════════════════════ */}

          <div
            className="
              mt-10

              flex
              flex-wrap
              items-center

              gap-4
            "
            style={{
              opacity:
                buttonsProgress,

              transform: `
                translateY(
                  ${
                    (1 -
                      buttonsProgress) *
                    18
                  }px
                )
              `,

              willChange:
                "opacity, transform",
            }}
          >
            <MagneticLink to="/work">
              Explore Our Work
            </MagneticLink>

            <MagneticLink
              to="/services"
              variant="ghost"
            >
              Discover Our Services
            </MagneticLink>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          EXPERIENCE BACKGROUND TEXT
      ═══════════════════════════════════════ */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute

          -right-[0.08em]
          bottom-4

          -z-10

          hidden

          font-display

          text-[13vw]
          font-bold
          uppercase
          leading-none

          text-foreground/[0.018]

          lg:block
        "
        style={{
          transform: `
            translate3d(
              ${
                -parallax *
                0.08
              }px,
              0,
              0
            )
          `,
        }}
      >
        EXPERIENCE
      </div>

      {/* ═══════════════════════════════════════
          TRAIL
      ═══════════════════════════════════════ */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute

          bottom-24
          left-0
          right-0

          h-px

          overflow-hidden
        "
        style={{
          opacity:
            paragraphProgress,
        }}
      >
        <div
          className="
            trail-x

            h-px
            w-1/3

            animate-sweep
          "
        />
      </div>

      {/* ═══════════════════════════════════════
          BOTTOM INFO
      ═══════════════════════════════════════ */}

      <div
        className="
          relative
          z-50

          mx-auto

          mt-16

          w-full
          max-w-7xl

          px-5
          pb-10

          sm:px-8
        "
        style={{
          opacity:
            bottomProgress,

          transform: `
            translateY(
              ${
                (1 -
                  bottomProgress) *
                12
              }px
            )
          `,
        }}
      >
        <div
          className="
            flex
            items-center
            justify-between

            text-[11px]
            uppercase

            tracking-[0.28em]

            text-muted-foreground
          "
        >
          <span>
            Scroll to enter
          </span>

          <span
            className="
              hidden
              sm:block
            "
          >
            Motion becomes experience
          </span>
        </div>
      </div>
    </section>
  );
}