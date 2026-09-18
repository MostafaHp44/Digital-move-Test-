import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA } from "@/components/site/FinalCTA";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { RevealBlock, RevealLines } from "@/components/site/Reveal";
import { Link } from "@tanstack/react-router";

const title = "Branding & Graphic Design — Digital Mov";
const description =
  "Complete visual designs for restaurants, cafés and businesses — menus, packaging, social media, banners and printed marketing materials.";

export const Route = createFileRoute("/services/branding")({
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
  component: BrandingServicePage,
});

const SERVICES = [
  {
    icon: "MNU",
    title: "Menu & Menu Leaflets",
    description:
      "Professionally designed menus and leaflets that showcase your food and brand — print-ready and digital formats.",
  },
  {
    icon: "STK",
    title: "Stickers",
    description:
      "Custom sticker designs for packaging, promotions and branding — die-cut, vinyl and eco-friendly options.",
  },
  {
    icon: "PKG",
    title: "Paper Bags & Packaging",
    description:
      "Branded packaging design that turns every takeaway into a marketing opportunity — bags, boxes and wraps.",
  },
  {
    icon: "CAP",
    title: "Caps & Promotional Items",
    description:
      "Branded merchandise including caps, t-shirts, mugs and promotional items for events and giveaways.",
  },
  {
    icon: "SML",
    title: "Social Media Graphics",
    description:
      "Scroll-stopping social media content — posts, stories, covers and templates designed for engagement.",
  },
  {
    icon: "BAN",
    title: "Banners",
    description:
      "Large format banner design for storefronts, events, trade shows and indoor/outdoor advertising.",
  },
  {
    icon: "PRN",
    title: "Printed Marketing Materials",
    description:
      "Business cards, flyers, brochures and posters — complete print collateral for your marketing needs.",
  },
];

function BrandingServicePage() {
  return (
    <SiteLayout>
      <PageHeader
        label="Service"
        title={
          <>
            Branding & <em className="not-italic text-primary">Graphic Design</em>.
          </>
        }
        intro="Complete visual designs for restaurants, cafés and businesses — from menus to social media, packaging to promotional items."
      />

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <RevealLines
          as="h2"
          className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
          lines={["Design that", "tells your story."]}
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

      {/* Process */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Our design process
          </h3>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "Discover",
                d: "We learn about your brand, audience and goals — understanding what makes you unique.",
              },
              {
                n: "02",
                t: "Design",
                d: "We create visual concepts that capture your identity — refined through collaboration.",
              },
              {
                n: "03",
                t: "Deliver",
                d: "Final files in all formats — print-ready, digital-ready and ready to use immediately.",
              },
            ].map((s, i) => (
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
            lines={["Let's design", "something great."]}
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
                View Portfolio
              </Link>
            </div>
          </RevealBlock>
        </div>
      </section>

      <FinalCTA />
    </SiteLayout>
  );
}
