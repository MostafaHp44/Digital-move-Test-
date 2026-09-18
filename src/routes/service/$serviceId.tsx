import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FinalCTA } from "@/components/site/FinalCTA";
import { useAdminStore } from "@/lib/admin-store";
import { RevealBlock, RevealLines } from "@/components/site/Reveal";

export const Route = createFileRoute("/service/$serviceId")({
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();
  const { services, loading } = useAdminStore();
  const service = services.find((s) => String(s.id) === String(serviceId));

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60svh] items-center justify-center text-muted-foreground">
          Loading...
        </div>
      </SiteLayout>
    );
  }

  if (!service) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60svh] flex-col items-center justify-center px-5 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground">Service not found</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            This service may have been removed or the link is incorrect.
          </p>
          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            View all services
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <header className="relative overflow-hidden pb-6 pt-40 sm:pt-48">
        <div className="grid-veil absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
        />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary glow-ring" />
            Service
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.5rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-tight">
            {service.title} <em className="not-italic text-primary">in motion</em>.
          </h1>
          <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            {service.subtitle}
          </p>
          <div className="mt-12 h-px w-full trail-x" />
        </div>
      </header>

      {/* Media */}
      {service.media_url && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <RevealBlock>
            <div className="overflow-hidden rounded-2xl border border-border">
              {service.media_type === "video" ? (
                <video
                  src={service.media_url}
                  className="w-full object-cover"
                  style={{ maxHeight: "600px" }}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={service.media_url}
                  alt={service.title}
                  className="w-full object-cover"
                  style={{ maxHeight: "600px" }}
                />
              )}
            </div>
          </RevealBlock>
        </section>
      )}

      {/* Description */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr]">
          <RevealLines
            as="h2"
            className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
            lines={["What we", "build."]}
          />
          <RevealBlock delay={100}>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* Features */}
      {(service.features ?? []).length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <RevealLines
            as="h2"
            className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
            lines={["Everything", "included."]}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(service.features ?? []).map((f, i) => (
              <RevealBlock key={f} delay={i * 60}>
                <div className="rounded-xl border border-border bg-surface p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-mono text-[10px] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-display text-base font-semibold text-foreground">{f}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <RevealLines
            as="h2"
            className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
            lines={["Ready to get", "started?"]}
          />
          <RevealBlock delay={100}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-shadow duration-500 hover:shadow-[var(--glow-md)]"
              >
                Start a Project
                <span className="h-px w-5 bg-current" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-3 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-accent"
              >
                All Services
              </Link>
            </div>
          </RevealBlock>
        </div>
      </section>

      <FinalCTA />
    </SiteLayout>
  );
}
