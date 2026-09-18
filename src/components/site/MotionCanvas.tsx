import { range, useScrollProgress } from "@/lib/motion";
import { SectionLabel } from "@/components/site/Reveal";

/**
 * Calm, elegant canvas: electric lines draw shapes — frames, a play symbol, a
 * phone outline — then resolve into the Digital Mov mark.
 */
export function MotionCanvas() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  const draw = range(progress, 0.1, 0.55);
  const morph = range(progress, 0.45, 0.8);
  const resolve = range(progress, 0.72, 0.95);

  return (
    <section ref={ref} className="relative h-[260svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionLabel>Motion Studio</SectionLabel>
          <h2 className="mt-6 max-w-xl font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Lines become interfaces.
          </h2>
        </div>

        <svg
          viewBox="0 0 1200 600"
          className="mt-6 h-[52svh] w-full"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="dm-canvas" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--electric-soft)" />
              <stop offset="100%" stopColor="var(--electric-deep)" />
            </linearGradient>
          </defs>

          {/* horizontal field lines drawing in */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="80"
              y1={140 + i * 80}
              x2="1120"
              y2={140 + i * 80}
              stroke="url(#dm-canvas)"
              strokeWidth="1"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - range(draw, i * 0.1, i * 0.1 + 0.6)}
              opacity={0.35 * (1 - morph)}
            />
          ))}

          {/* UI frames forming */}
          {[
            { x: 150, y: 190, w: 240, h: 150 },
            { x: 470, y: 150, w: 260, h: 230 },
            { x: 810, y: 200, w: 240, h: 160 },
          ].map((r, i) => (
            <rect
              key={i}
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx="12"
              fill="none"
              stroke="var(--electric)"
              strokeWidth="1.2"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - range(draw, 0.2 + i * 0.12, 0.7 + i * 0.12)}
              opacity={(1 - resolve) * 0.9}
              style={{
                transform: `translateY(${(1 - morph) * 0 + morph * (i === 1 ? -20 : 16)}px)`,
                transition: "transform 120ms linear",
              }}
            />
          ))}

          {/* phone outline emerging in the middle frame */}
          <rect
            x="540"
            y="170"
            width="120"
            height="220"
            rx="22"
            fill="none"
            stroke="var(--electric-soft)"
            strokeWidth="1.4"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - morph}
            opacity={(1 - resolve) * 0.9}
          />

          {/* play symbol resolving into the mark */}
          <path
            d="M560 210 L680 280 L560 350 Z"
            fill="none"
            stroke="var(--electric)"
            strokeWidth="2"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - range(morph, 0.35, 1)}
            opacity={0.4 + resolve * 0.6}
            style={{
              transform: `scale(${1 + resolve * 0.12})`,
              transformOrigin: "600px 280px",
              transition: "transform 120ms linear",
            }}
          />
          <ellipse
            cx="600"
            cy="280"
            rx="200"
            ry="100"
            transform="rotate(-22 600 280)"
            fill="none"
            stroke="var(--electric)"
            strokeWidth="1.4"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - resolve}
            opacity={resolve}
          />

          {/* particles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={i}
              x={420 - i * 14}
              y={230 + (i % 3) * 12}
              width={5 - (i % 3)}
              height={5 - (i % 3)}
              fill="var(--electric-soft)"
              opacity={resolve * (1 - i / 14)}
            />
          ))}
        </svg>

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <p
            className="max-w-sm text-sm text-muted-foreground"
            style={{ opacity: 0.4 + resolve * 0.6 }}
          >
            Every frame we draw ends up as something people can use.
          </p>
        </div>
      </div>
    </section>
  );
}
