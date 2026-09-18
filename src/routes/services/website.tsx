import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA } from "@/components/site/FinalCTA";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { RevealBlock, RevealLines } from "@/components/site/Reveal";
import { Link } from "@tanstack/react-router";

const title = "Website Development — Digital Mov";
const description =
  "Complete website solutions from design to development — UI/UX, front-end, back-end, databases, APIs, payment integration and admin dashboard.";

export const Route = createFileRoute("/services/website")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WebsiteServicePage,
});

const SERVICES = [
  {
    icon: "UX",
    title: "UI/UX Design",
    description:
      "User interfaces designed around motion — art direction, layout systems and prototypes that show how a page should feel.",
  },
  {
    icon: "FE",
    title: "Front-End Development",
    description:
      "Pixel-perfect, performant interfaces built with modern frameworks — React, animations and scroll choreography.",
  },
  {
    icon: "BE",
    title: "Back-End Development",
    description:
      "Robust server architecture, APIs and business logic — built for scale, security and reliability.",
  },
  {
    icon: "DB",
    title: "Database Integration",
    description:
      "Structured data architecture for products, orders, users and content — optimized for performance.",
  },
  {
    icon: "API",
    title: "APIs & Payment Integration",
    description:
      "RESTful APIs, third-party integrations and secure payment processing — Stripe, PayPal and local methods.",
  },
  {
    icon: "RSP",
    title: "Responsive Website",
    description:
      "Every screen size, every device — websites that look and perform beautifully everywhere.",
  },
  {
    icon: "ADM",
    title: "Admin Dashboard",
    description:
      "Manage your content, products, orders and business operations directly — no developer needed for updates.",
  },
];

function WebsiteServicePage() {
  return (
    <SiteLayout>
      <PageHeader
        label="Service"
        title={
          <>
            Website <em className="not-italic text-primary">Development</em>.
          </>
        }
        intro="Complete website solutions from design to development — so you can manage your business without needing a developer for every update."
      />

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <RevealLines
          as="h2"
          className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
          lines={["Built to perform,", "designed to move."]}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <RevealBlock key={s.title} delay={i * 80}>
              <div className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-[var(--glow-sm)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs text-primary">
                  {s.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* Admin Dashboard Highlight */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs text-primary">
                ADM
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Admin Dashboard
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The goal is to provide a{" "}
                <strong className="text-foreground">complete website system</strong>, so you can
                manage your content, products, orders and other business operations directly through
                the Admin Dashboard — without needing to come back to the development team for every
                update.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Manage products and inventory",
                  "Process and track orders",
                  "Update content and pages",
                  "View analytics and reports",
                  "Manage users and permissions",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-xl border border-border bg-ink p-6">
              <div className="grid-veil absolute inset-0 rounded-xl" />
              <div className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-destructive/60" />
                  <div className="h-3 w-3 rounded-full bg-primary/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-1/3 rounded bg-surface-2" />
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 rounded bg-surface-2/50" />
                    ))}
                  </div>
                  <div className="h-2 w-2/3 rounded bg-surface-2" />
                  <div className="h-2 w-1/2 rounded bg-surface-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <RevealLines
            as="h2"
            className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
            lines={["Ready to build", "your website?"]}
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
                to="/work"
                className="inline-flex items-center gap-3 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-accent"
              >
                See Examples
              </Link>
            </div>
          </RevealBlock>
        </div>
      </section>

      <FinalCTA />
    </SiteLayout>
  );
}
