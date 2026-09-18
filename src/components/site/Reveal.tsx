import type { ReactNode } from "react";
import { useInView } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Masked line-by-line reveal for headings and paragraphs. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  as: Tag = "p",
  delayStep = 90,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  delayStep?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <Tag className={className}>
      <span ref={ref} className={cn("block", inView && "is-revealed")}>
        {lines.map((line, i) => (
          <span key={i} className="line-mask">
            <span
              className={cn("line-inner", lineClassName)}
              style={{ transitionDelay: `${i * delayStep}ms` }}
            >
              {line}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Layered entrance: rise + slight 3D tilt settle. */
export function RevealBlock({
  children,
  className,
  delay = 0,
  distance = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.18 });

  return (
    <div
      ref={ref}
      className={cn("[transition-property:transform,opacity,filter]", className)}
      style={{
        transitionDuration: "1000ms",
        transitionTimingFunction: "var(--ease-cine)",
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0px)" : "blur(6px)",
        transform: inView
          ? "translate3d(0,0,0) rotateX(0deg)"
          : `translate3d(0,${distance}px,0) rotateX(6deg)`,
      }}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary glow-ring" />
      {children}
    </div>
  );
}
