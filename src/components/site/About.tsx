import { RevealBlock, RevealLines, SectionLabel } from "@/components/site/Reveal";
import { useCountUp, useInView } from "@/lib/motion";

const STATS = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 64, suffix: "", label: "Clients" },
  { value: 38, suffix: "", label: "Digital experiences" },
  { value: 9, suffix: "", label: "Years in motion" },
];

export function About() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel>About</SectionLabel>

        <div className="mt-8 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <RevealLines
            as="h2"
            className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-[4.4rem]"
            lines={[
              <>We create digital</>,
              <>
                experiences that <em className="not-italic text-primary">move</em>.
              </>,
            ]}
          />
          <RevealBlock delay={140}>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Digital Mov is a small, senior studio. We design and build websites, digital menus and
              interactive products where movement carries the meaning — not decoration added at the
              end.
            </p>
          </RevealBlock>
        </div>

        <div
          ref={ref}
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-border pt-12 lg:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <Stat key={s.label} {...s} active={inView} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  active,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  delay: number;
}) {
  const n = useCountUp(value, active, 1500 + delay);
  return (
    <div>
      <p className="font-display text-5xl font-bold tracking-tight text-glow sm:text-6xl">
        {n}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{label}</p>
    </div>
  );
}
