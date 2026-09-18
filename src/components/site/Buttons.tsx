import { Link } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import { useIsDesktop } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  to: string;
  variant?: "primary" | "ghost";
  className?: string;
};

/**
 * Magnetic CTA: the label drifts a few pixels toward the cursor and a soft blue
 * light follows the pointer inside the button. No bouncing.
 */
export function MagneticLink({ children, to, variant = "primary", className }: Props) {
  const desktop = useIsDesktop();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0, gx: 50, gy: 50, on: false });

  const onMove = (e: React.PointerEvent) => {
    if (!desktop || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      x: (px - 0.5) * 12,
      y: (py - 0.5) * 8,
      gx: px * 100,
      gy: py * 100,
      on: true,
    });
  };

  return (
    <Link
      to={to}
      ref={ref}
      data-cursor="expand"
      onPointerMove={onMove}
      onPointerLeave={() => setT((s) => ({ ...s, x: 0, y: 0, on: false }))}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-shadow duration-500",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:shadow-[var(--glow-md)]"
          : "border border-border text-foreground hover:border-primary/60",
        className,
      )}
      style={{
        transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
        transition: "transform 500ms var(--ease-cine), box-shadow 500ms",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120px circle at ${t.gx}% ${t.gy}%, oklch(1 0 0 / 0.22), transparent 70%)`,
        }}
      />
      <span className="relative">{children}</span>
      <span
        aria-hidden
        className="relative h-px w-5 bg-current transition-all duration-500 group-hover:w-8"
      />
    </Link>
  );
}
