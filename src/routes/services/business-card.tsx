import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA } from "@/components/site/FinalCTA";
import { PageHeader, SiteLayout } from "@/components/site/SiteLayout";
import { RevealBlock, RevealLines } from "@/components/site/Reveal";
import { Link } from "@tanstack/react-router";

const title = "Digital Business Card — Digital Mov";
const description =
  "Modern digital business cards accessible via NFC tap or QR code scan — instant access to contact information.";

export const Route = createFileRoute("/services/business-card")({
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
  component: BusinessCardServicePage,
});

const ACCESS_METHODS = [
  {
    icon: "NFC",
    title: "NFC Tap",
    description:
      "The customer simply brings their phone close to the NFC card or tag, and the Digital Business Card link opens automatically.",
    steps: [
      "Hold phone near NFC card",
      "Link opens automatically",
      "Contact info displayed instantly",
    ],
  },
  {
    icon: "QR",
    title: "QR Code Scan",
    description:
      "The customer scans the QR Code using their phone camera and is directed to the same Digital Business Card.",
    steps: ["Open phone camera", "Scan the QR code", "Card opens in browser"],
  },
];

const FEATURES = [
  {
    title: "Instant Contact Sharing",
    description:
      "Share your name, title, phone, email, website and social links in one tap or scan.",
  },
  {
    title: "Custom Design",
    description:
      "Branded card design that matches your identity — colors, fonts and layout tailored to you.",
  },
  {
    title: "Mobile Optimized",
    description:
      "Beautiful on every phone — responsive design that loads fast and looks professional.",
  },
  {
    title: "Easy Updates",
    description: "Change your information anytime without reprinting — updates go live instantly.",
  },
  {
    title: "No App Required",
    description: "Works through the phone's browser — no downloads, no sign-ups, no friction.",
  },
  {
    title: "Analytics",
    description: "Track how many people viewed your card and which links they clicked.",
  },
];

function BusinessCardServicePage() {
  return (
    <SiteLayout>
      <PageHeader
        label="Service"
        title={
          <>
            Digital <em className="not-italic text-primary">Business Card</em>.
          </>
        }
        intro="A modern digital business card that allows customers to instantly access a person's or company's contact information."
      />

      {/* Access Methods */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <RevealLines
          as="h2"
          className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
          lines={["Two ways to", "connect instantly."]}
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {ACCESS_METHODS.map((method, i) => (
            <RevealBlock key={method.title} delay={i * 120}>
              <div className="group rounded-2xl border border-border bg-surface p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-[var(--glow-sm)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-mono text-sm font-bold text-primary">
                  {method.icon}
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                  {method.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {method.description}
                </p>
                <ol className="mt-6 space-y-3">
                  {method.steps.map((step, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] text-primary">
                        {j + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <RevealLines
          as="h2"
          className="font-display text-3xl font-bold tracking-tight sm:text-5xl"
          lines={["Everything you", "need in one card."]}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <RevealBlock key={f.title} delay={i * 80}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-display text-lg font-semibold tracking-tight">{f.title}</h3>
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
            {[
              {
                n: "01",
                t: "Design",
                d: "We design your digital card with your brand identity, photo and contact information.",
              },
              {
                n: "02",
                t: "Program",
                d: "We generate your NFC tag and QR code — both linked to your unique digital card URL.",
              },
              {
                n: "03",
                t: "Connect",
                d: "Hand out your card, share your QR code or tap your NFC — connections happen instantly.",
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
            lines={["Ready to go", "digital?"]}
          />
          <RevealBlock delay={100}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-shadow duration-500 hover:shadow-[var(--glow-md)]"
              >
                Get Your Card
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
