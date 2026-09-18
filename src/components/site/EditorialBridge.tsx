import { SectionLabel } from "@/components/site/Reveal";
import { range, useScrollProgress } from "@/lib/motion";

const WORDS = "One digital idea can become an entire experience.".split(" ");

export function EditorialBridge() {
  const { ref, progress } = useScrollProgress<HTMLElement>();

  return (
    <section
      ref={ref}
      className="section-seam relative flex min-h-[92svh] items-center py-28 sm:py-36"
    >
      <div className="grid-veil absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.28fr_0.72fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <SectionLabel>Our principle</SectionLabel>
          <p className="mt-6 max-w-[14rem] text-sm leading-relaxed text-muted-foreground">
            We connect identity, interface and interaction into one continuous language.
          </p>
        </div>
        <p className="max-w-5xl font-display text-[clamp(3.1rem,7.4vw,7.8rem)] font-bold leading-[0.92] tracking-tight">
          {WORDS.map((word, index) => {
            const start = 0.12 + index * 0.055;
            const visible = range(progress, start, start + 0.16);
            return (
              <span
                key={`${word}-${index}`}
                className="mr-[0.22em] inline-block transition-[color,filter,transform] duration-300"
                style={{
                  color: `color-mix(in oklab, var(--foreground) ${12 + visible * 88}%, transparent)`,
                  filter: `blur(${(1 - visible) * 7}px)`,
                  transform: `translate3d(0,${(1 - visible) * 14}px,0)`,
                }}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
