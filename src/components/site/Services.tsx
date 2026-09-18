import { useState, useEffect, useRef } from "react";
import { RevealBlock, RevealLines, SectionLabel } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useAdminStore } from "@/lib/admin-store";
import { useIsDesktop } from "@/lib/motion";

const FALLBACK_SERVICES = [
  {
    id: "digital-menu",
    title: "Digital Menu",
    line: "QR-first menus that feel like an app.",
    detail:
      "Complete digital menu solution with QR codes, online ordering, payment integration and delivery service connectivity.",
    features: [
      "QR Code Access",
      "PDF Menu",
      "Online Menu (/menu)",
      "Direct Ordering",
      "Online Payment",
      "Delivery Integration",
    ],
    href: "/services/digital-menu",
  },
  {
    id: "branding",
    title: "Branding & Graphic Design",
    line: "Visual identities that leave a mark.",
    detail:
      "Complete visual designs for restaurants, cafés and businesses — from menus to social media, packaging to promotional items.",
    features: [
      "Menu & Leaflets",
      "Stickers & Packaging",
      "Caps & Promo Items",
      "Social Media Graphics",
      "Banners",
      "Printed Materials",
    ],
    href: "/services/branding",
  },
  {
    id: "website",
    title: "Website Development",
    line: "Complete web solutions, designed to perform.",
    detail:
      "Full-stack website development with admin dashboard, so you can manage your content, products and orders — no developer needed.",
    features: [
      "UI/UX Design",
      "Front-End & Back-End",
      "Database & APIs",
      "Payment Integration",
      "Responsive Design",
      "Admin Dashboard",
    ],
    href: "/services/website",
  },
  {
    id: "business-card",
    title: "Digital Business Card",
    line: "Your identity, one tap away.",
    detail:
      "Modern digital business cards accessible via NFC tap or QR code scan — instant access to contact information.",
    features: [
      "NFC Card / Tag",
      "QR Code Access",
      "Instant Contact Sharing",
      "Custom Design",
      "Mobile Optimized",
      "Easy Updates",
    ],
    href: "/services/business-card",
  },
];

interface DisplayService {
  id: string;
  title: string;
  line: string;
  detail: string;
  features: string[];
  href: string;
}

export function Services({ compact = false }: { compact?: boolean }) {
  const { services } = useAdminStore();
  const [active, setActive] = useState(0);
  const desktop = useIsDesktop();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const displayServices: DisplayService[] =
    services.length > 0
      ? services.map((s) => ({
          id: String(s.id),
          title: s.title,
          line: s.subtitle,
          detail: s.description || s.subtitle,
          features: s.features ?? [],
          href: `/service/${s.id}`,
        }))
      : FALLBACK_SERVICES;

  const items = compact ? displayServices.slice(0, 4) : displayServices;
  const activeService = items[active] ?? items[0];

  // Auto-cycle on mobile
  useEffect(() => {
    if (desktop) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [desktop, items.length]);

  // Reset interval when user taps on mobile
  const handleMobileTap = (i: number) => {
    setActive(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 3000);
  };

  if (!activeService) return null;

  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel>Services</SectionLabel>
        <RevealLines
          as="h2"
          className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl"
          lines={["What we", "make move."]}
        />

        <div className="mt-16 grid gap-8 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Service list */}
          <ul className="divide-y divide-border border-y border-border">
            {items.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.id}>
                  <Link
                    to={s.href}
                    data-cursor="expand"
                    onMouseEnter={() => desktop && setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={(e) => {
                      if (!desktop) {
                        e.preventDefault();
                        handleMobileTap(i);
                      }
                    }}
                    className="group flex w-full items-baseline gap-4 py-5 text-left sm:gap-6 sm:py-6"
                  >
                    <span
                      className={cn(
                        "w-6 shrink-0 font-mono text-[11px] transition-colors duration-500 sm:w-8",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block font-display text-xl font-semibold tracking-tight transition-all duration-500 [transition-timing-function:var(--ease-cine)] sm:text-3xl",
                          isActive ? "translate-x-1 sm:translate-x-2 text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {s.title}
                      </span>
                      <span
                        className="block overflow-hidden text-xs text-muted-foreground transition-all duration-700 [transition-timing-function:var(--ease-cine)] sm:text-sm"
                        style={{
                          maxHeight: isActive ? 80 : 0,
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateY(8px)" : "translateY(0)",
                        }}
                      >
                        {s.detail}
                      </span>
                    </span>
                    <span
                      className="hidden h-px shrink-0 transition-all duration-700 [transition-timing-function:var(--ease-cine)] sm:block"
                      style={{
                        width: isActive ? 56 : 16,
                        background: isActive ? "var(--electric)" : "var(--border)",
                        boxShadow: isActive ? "var(--glow-sm)" : "none",
                      }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Preview card */}
          <RevealBlock className="lg:sticky lg:top-28 lg:h-fit">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface sm:aspect-auto sm:min-h-[28rem]">
              <div className="grid-veil absolute inset-0" />
              <div className="absolute -bottom-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/25 blur-[80px]" />

              <div className="relative flex h-full flex-col justify-between p-4 sm:p-6">
                <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Preview
                </div>

                <ServicePreview index={active} />

                <div>
                  <p className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                    {activeService.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{activeService.line}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                    {activeService.features.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-border bg-ink/60 px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground sm:px-3 sm:text-[10px]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={activeService.href}
                    className="mt-3 inline-flex items-center gap-2 text-xs text-primary transition-colors hover:text-primary/80 sm:mt-4 sm:text-sm"
                  >
                    Learn more
                    <span className="h-px w-4 bg-current transition-all duration-300 group-hover:w-6" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile: auto-cycle dots */}
            {!desktop && (
              <div className="mt-4 flex justify-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleMobileTap(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === active
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-border hover:bg-muted-foreground",
                    )}
                  />
                ))}
              </div>
            )}
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}

function ServicePreview({ index }: { index: number }) {
  const shared = "absolute inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-6";
  switch (index % 4) {
    case 0:
      return (
        <div className={cn(shared, "flex justify-center gap-2 sm:gap-3")}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-20 w-14 animate-drift rounded-lg border border-border bg-ink p-1.5 sm:h-28 sm:w-20 sm:rounded-xl sm:p-2"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <div className="h-6 w-full rounded bg-primary/20 sm:h-10" />
              <div className="mt-1.5 h-1 w-3/4 rounded bg-surface-2 sm:mt-2 sm:h-1.5" />
              <div className="mt-1 h-1 w-1/2 rounded bg-primary/40 sm:mt-1.5 sm:h-1.5" />
            </div>
          ))}
        </div>
      );
    case 1:
      return (
        <div className={cn(shared, "space-y-2 sm:space-y-3")}>
          <div className="h-1.5 w-1/3 rounded bg-primary/60 sm:h-2" />
          <div className="h-16 w-full overflow-hidden rounded-lg border border-border bg-ink sm:h-24 sm:rounded-xl">
            <div className="trail-x h-px w-1/2 animate-sweep" />
            <div className="space-y-1.5 p-2 sm:space-y-2 sm:p-3">
              <div className="h-1.5 w-2/3 rounded bg-surface-2 sm:h-2" />
              <div className="h-1.5 w-1/2 rounded bg-surface-2 sm:h-2" />
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className={cn(shared, "font-mono text-[10px] leading-5 sm:text-[11px] sm:leading-6")}>
          {["<section data-motion>", "  <Trail speed={0.8} />", "</section>"].map((l, i) => (
            <div
              key={l}
              className="text-muted-foreground"
              style={{
                animation: `dm-drift ${5 + i}s ease-in-out infinite`,
              }}
            >
              <span className="text-primary">{l.slice(0, 2)}</span>
              {l.slice(2)}
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className={cn(shared, "flex items-center justify-center")}>
          <div className="relative h-24 w-24 sm:h-32 sm:w-32">
            <span className="absolute inset-0 rounded-full border border-primary/40 animate-pulse-glow" />
            <span className="absolute inset-3 rounded-full border border-primary/25 sm:inset-4" />
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary glow-ring sm:h-2 sm:w-2" />
          </div>
        </div>
      );
  }
}
