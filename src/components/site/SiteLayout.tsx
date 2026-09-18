import type { ReactNode } from "react";
import { CursorGlow } from "@/components/site/CursorGlow";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { ExperienceRail } from "@/components/site/ExperienceRail";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <CursorGlow />
      <ExperienceRail />
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Inner page header used by the secondary routes. */
export function PageHeader({
  label,
  title,
  intro,
}: {
  label: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <header className="relative overflow-hidden pb-6 pt-40 sm:pt-48">
      <div className="grid-veil absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary glow-ring" />
          {label}
        </div>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.5rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-tight">
          {title}
        </h1>
        {intro && (
          <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-muted-foreground">{intro}</p>
        )}
        <div className="mt-12 h-px w-full trail-x" />
      </div>
    </header>
  );
}
