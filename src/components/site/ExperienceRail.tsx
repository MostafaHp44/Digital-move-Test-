import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/** Quiet page-level progress keeps long cinematic pages spatially legible. */
export function ExperienceRail() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maximum > 0 ? Math.min(1, window.scrollY / maximum) : 0);
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden w-8 lg:block"
    >
      <div className="absolute inset-y-24 right-5 w-px bg-border">
        <div
          className="w-px origin-top bg-primary glow-ring"
          style={{
            height: `${Math.max(3, progress * 100)}%`,
            transition: reduced ? "none" : "height 120ms linear",
          }}
        />
      </div>
      <span className="absolute bottom-8 right-3 font-mono text-[9px] text-muted-foreground [writing-mode:vertical-rl]">
        {(progress * 100).toFixed(0).padStart(2, "0")} / 100
      </span>
    </div>
  );
}
