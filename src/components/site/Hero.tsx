import { useEffect, useRef } from "react";
import { MagneticLink } from "@/components/site/Buttons";
import { usePrefersReducedMotion, useScrollY } from "@/lib/motion";

/** Full-screen video intro that fades out on scroll. */
function VideoIntro({ opacity }: { opacity: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-ink"
      style={{
        opacity,
        transition: "opacity 100ms linear",
        willChange: "opacity",
      }}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/video-intro.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const y = useScrollY();

  const parallax = Math.min(y, 700);

  // Video fades out over first 600px of scroll
  const videoOpacity = reduced ? 0 : Math.max(0, 1 - y / 600);

  // Hero content reveals after video starts fading
  const heroRevealed = reduced || y > 200;

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28">
      {/* Full-screen video intro */}
      {!reduced && <VideoIntro opacity={videoOpacity} />}

      {/* backdrop: single deep blue light source + faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ transform: `translate3d(0, ${parallax * 0.18}px, 0)` }}
      >
        <div className="grid-veil absolute inset-0" />
        <div className="absolute left-1/2 top-[62%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px] animate-pulse-glow" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div
          className="max-w-3xl"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(26px)",
            transition:
              "opacity 1100ms var(--ease-cine) 120ms, transform 1100ms var(--ease-cine) 120ms",
          }}
        >
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.38em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary glow-ring" />
            Digital Mov — Creative Digital Studio
          </div>

          <h1 className="mt-7 font-display text-[13vw] font-bold leading-[0.92] tracking-tight sm:text-[9vw] lg:text-[6.4rem]">
            <span className="line-mask">
              <span
                className="line-inner"
                style={{
                  transform: heroRevealed ? "translateY(0)" : undefined,
                  opacity: heroRevealed ? 1 : 0,
                  transitionDelay: "200ms",
                }}
              >
                Turning digital
              </span>
            </span>
            <span className="line-mask">
              <span
                className="line-inner"
                style={{
                  transform: heroRevealed ? "translateY(0)" : undefined,
                  opacity: heroRevealed ? 1 : 0,
                  transitionDelay: "330ms",
                }}
              >
                ideas into <em className="not-italic text-primary text-glow">motion.</em>
              </span>
            </span>
          </h1>

          <p
            className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 900ms 700ms",
            }}
          >
            Websites, digital menus and interactive experiences — designed as one continuous motion.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 900ms 820ms, transform 900ms var(--ease-cine) 820ms",
            }}
          >
            <MagneticLink to="/work">Explore Our Work</MagneticLink>
            <MagneticLink to="/services" variant="ghost">
              Discover Our Services
            </MagneticLink>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-[0.08em] bottom-4 -z-10 hidden font-display text-[13vw] font-bold uppercase leading-none text-foreground/[0.018] lg:block"
        style={{ transform: `translate3d(${-parallax * 0.08}px,0,0)` }}
      >
        EXPERIENCE
      </div>

      {/* motion trail crossing the viewport, tied to the play-mark language */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-24 left-0 right-0 h-px overflow-hidden"
        style={{ opacity: heroRevealed ? 1 : 0, transition: "opacity 1200ms 1000ms" }}
      >
        <div className="trail-x h-px w-1/3 animate-sweep" />
      </div>

      <div
        className="mx-auto mt-16 w-full max-w-7xl px-5 pb-10 sm:px-8"
        style={{ opacity: heroRevealed ? 1 : 0, transition: "opacity 900ms 1100ms" }}
      >
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          <span>Scroll to enter</span>
          <span className="hidden sm:block">Motion becomes experience</span>
        </div>
      </div>
    </section>
  );
}
