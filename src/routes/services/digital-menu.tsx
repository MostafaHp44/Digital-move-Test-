import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA } from "@/components/site/FinalCTA";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { RevealBlock, RevealLines } from "@/components/site/Reveal";
import { Link } from "@tanstack/react-router";

const title = "Digital Menu — Digital Mov";
const description =
  "QR-first digital menus for restaurants, cafés and hotels — instant access, online ordering, payment and delivery integration.";

export const Route = createFileRoute("/services/digital-menu")({
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
  component: DigitalMenuServicePage,
});

const FEATURES = [
  {
    icon: "QR",
    title: "QR Code Access",
    description:
      "Customers scan a single QR code at the table and the menu opens instantly — no app download required.",
  },
  {
    icon: "PDF",
    title: "PDF Menu",
    description:
      "A beautifully designed digital PDF version of your menu that can be shared via email, WhatsApp or social media.",
  },
  {
    icon: "/menu",
    title: "Online Menu",
    description:
      "A dedicated online menu page at /menu — share the link anywhere for takeaway orders or remote browsing.",
  },
  {
    icon: "ORD",
    title: "Direct Ordering",
    description:
      "Customers order directly through the website — no phone calls, no third-party apps taking a cut.",
  },
  {
    icon: "PAY",
    title: "Online Payment",
    description:
      "Integrated payment processing — credit cards, digital wallets and local payment methods supported.",
  },
  {
    icon: "DLV",
    title: "Delivery Integration",
    description:
      "Connect with delivery services or manage your own delivery fleet — orders flow directly into your system.",
  },
];

const STEPS = [
  {
    n: "01",
    t: "Design",
    d: "We design your menu with your brand identity, photography and layout — optimized for mobile screens.",
  },
  {
    n: "02",
    t: "Build",
    d: "We develop the digital menu with smooth animations, category flows and instant update capability.",
  },
  {
    n: "03",
    t: "Launch",
    d: "QR codes are generated, the menu goes live and your customers start ordering — all within days.",
  },
];

function DigitalMenuServicePage() {
  return (
    <SiteLayout>
      <PageHeader
        label="Service"
        title={
          <>
            Digital Menu, <em className="not-italic text-primary">in motion</em>.
          </>
        }
        intro="A complete digital menu solution for restaurants, cafés and hotels — designed to be as considered as the food it presents."
      />

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <RevealLines
          as="h2"
          className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
          lines={["Everything your", "menu needs."]}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <RevealBlock key={f.title} delay={i * 80}>
              <div className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-[var(--glow-sm)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs text-primary">
                  {f.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            How it works
          </h3>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <RevealBlock key={s.n} delay={i * 100}>
                <p className="font-mono text-[11px] text-primary">{s.n}</p>
                <h4 className="mt-3 font-display text-xl font-semibold tracking-tight">{s.t}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <RevealLines
            as="h2"
            className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
            lines={["Ready to digitize", "your menu?"]}
          />
          <RevealBlock delay={100}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-shadow duration-500 hover:shadow-[var(--glow-md)]"
              >
                Get Started
                <span className="h-px w-5 bg-current" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-3 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-accent"
              >
                See Our Work
              </Link>
            </div>
          </RevealBlock>
        </div>
      </section>

      <FinalCTA />
    </SiteLayout>
  );
}
