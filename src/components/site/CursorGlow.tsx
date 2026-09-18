import { useEffect, useRef, useState } from "react";
import { useIsDesktop, usePrefersReducedMotion } from "@/lib/motion";

/**
 * Subtle glowing cursor. Desktop pointers only, disabled for reduced motion.
 * Expands over anything marked data-cursor="expand".
 */
export function CursorGlow() {
  const desktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const dot = useRef<HTMLDivElement | null>(null);
  const halo = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!desktop || reduced) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...target };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest('[data-cursor="expand"], a, button')));
    };

    const loop = () => {
      eased.x += (target.x - eased.x) * 0.18;
      eased.y += (target.y - eased.y) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%,-50%)`;
      }
      if (halo.current) {
        halo.current.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%,-50%)`;
      }
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [desktop, reduced]);

  if (!desktop || reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms" }}
    >
      <div
        ref={halo}
        className="absolute rounded-full bg-primary/25"
        style={{
          height: active ? 56 : 26,
          width: active ? 56 : 26,
          filter: "blur(6px)",
          transition: "height 400ms var(--ease-cine), width 400ms var(--ease-cine)",
        }}
      />
      <div
        ref={dot}
        className="absolute rounded-full bg-primary glow-ring"
        style={{
          height: active ? 6 : 4,
          width: active ? 6 : 4,
          transition: "height 300ms, width 300ms",
        }}
      />
    </div>
  );
}
