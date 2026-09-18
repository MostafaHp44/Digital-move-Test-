import { RevealBlock, RevealLines, SectionLabel } from "@/components/site/Reveal";
import { range, useScrollProgress } from "@/lib/motion";

const CATEGORIES = ["Signature", "Grill", "Pasta", "Desserts"];

const DISHES = [
  [
    { name: "Black Truffle Scallop", price: "$28" },
    { name: "Smoked Beetroot Tartare", price: "$19" },
    { name: "Caviar Potato Cream", price: "$24" },
  ],
  [
    { name: "Dry-Aged Ribeye", price: "$46" },
    { name: "Charcoal Lamb Rack", price: "$38" },
    { name: "Josper Sea Bass", price: "$34" },
  ],
  [
    { name: "Squid Ink Tagliolini", price: "$26" },
    { name: "Wild Mushroom Ravioli", price: "$23" },
    { name: "Cacio e Pepe 2.0", price: "$21" },
  ],
  [
    { name: "Blue Yuzu Sphere", price: "$14" },
    { name: "Dark Chocolate Ember", price: "$16" },
    { name: "Pistachio Cloud", price: "$13" },
  ],
];

/** Scroll-driven product demonstration: the phone shows the menu working. */
export function DigitalMenuShowcase() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const p = range(progress, 0.15, 0.9);
  const step = Math.min(CATEGORIES.length - 1, Math.floor(p * CATEGORIES.length));
  const dishes = DISHES[step] ?? DISHES[0] ?? [];

  return (
    <section id="digital-menu" ref={ref} className="relative py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionLabel>Digital Menu</SectionLabel>
          <RevealLines
            as="h2"
            className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl"
            lines={["A menu that", "behaves like", "a product."]}
          />
          <RevealBlock delay={120}>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              One QR code opens a fast, branded menu. Categories glide, dishes animate in, prices
              and availability change instantly — no printing, no app store.
            </p>
          </RevealBlock>

          <div className="mt-10 grid max-w-md gap-y-4 sm:grid-cols-2">
            {[
              "Instant category flow",
              "Multi-language ready",
              "Live availability",
              "Branded per venue",
            ].map((f, i) => (
              <RevealBlock key={f} delay={200 + i * 70}>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="h-1 w-6 trail-x" />
                  {f}
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* trail connecting copy to the device */}
          <div aria-hidden className="mt-12 hidden h-px w-full overflow-hidden lg:block">
            <div
              className="trail-x h-px"
              style={{ width: `${20 + p * 80}%`, transition: "width 120ms linear" }}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div
            className="relative"
            style={{
              transform: `perspective(1400px) rotateY(${10 - p * 16}deg) rotateX(${4 - p * 6}deg) translateY(${(0.5 - p) * 40}px)`,
              transition: "transform 200ms linear",
            }}
          >
            <div className="absolute -inset-10 -z-10 rounded-full bg-primary/20 blur-[100px]" />
            <div className="h-[36rem] w-[17.5rem] overflow-hidden rounded-[2.6rem] border border-border bg-ink p-3 glow-soft">
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-border bg-background">
                <div className="absolute left-1/2 top-3 h-1.5 w-14 -translate-x-1/2 rounded-full bg-surface-2" />
                <div className="flex h-full flex-col px-5 pb-6 pt-10">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Noir Table
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold">Menu</h3>

                  <div className="mt-4 flex gap-2 overflow-hidden">
                    {CATEGORIES.map((c, i) => (
                      <span
                        key={c}
                        className="rounded-full px-2.5 py-1 text-[10px] transition-all duration-500 [transition-timing-function:var(--ease-cine)]"
                        style={{
                          background: i === step ? "var(--primary)" : "var(--surface)",
                          color:
                            i === step ? "var(--primary-foreground)" : "var(--muted-foreground)",
                          transform: `translateX(${-step * 4}px)`,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex-1 space-y-3">
                    {dishes.map((d, i) => (
                      <div
                        key={d.name}
                        className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3"
                        style={{
                          animation: `dm-drift ${6 + i}s ease-in-out infinite`,
                        }}
                      >
                        <div className="h-11 w-11 shrink-0 rounded-lg bg-surface-2" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-medium">{d.name}</p>
                          <p className="text-[11px] text-muted-foreground">Chef's selection</p>
                        </div>
                        <span className="text-[13px] text-primary">{d.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-full border border-border px-4 py-2.5 text-[11px] text-muted-foreground">
                    <span>Scan · Browse · Order</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary glow-ring" />
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
