import { LogoArtwork } from "@/components/brand/Logo";
import { MagneticLink } from "@/components/site/Buttons";
import { RevealBlock, RevealLines } from "@/components/site/Reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-44">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px] animate-pulse-glow" />
      </div>

      {/* trail moving behind the logo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-1/2 h-px overflow-hidden"
      >
        <div className="trail-x h-px w-1/2 animate-sweep" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8">
        <LogoArtwork className="mx-auto h-40 w-[min(90vw,34rem)]" />

        <RevealLines
          as="h2"
          className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-[4.6rem]"
          lines={[
            "Let's create something",
            <>
              that <em className="not-italic text-primary text-glow">moves</em>.
            </>,
          ]}
        />

        <RevealBlock delay={160}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <MagneticLink to="/contact">Start a Project</MagneticLink>
            <MagneticLink to="/contact" variant="ghost">
              Contact Us
            </MagneticLink>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
