import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoLockup } from "@/components/brand/Logo";
import { useScrollY } from "@/lib/motion";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const y = useScrollY();
  const compact = y > 40;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 [transition-timing-function:var(--ease-cine)]",
          compact ? "py-2" : "py-5",
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between px-5 transition-all duration-700 [transition-timing-function:var(--ease-cine)] sm:px-8",
            compact
              ? "max-w-5xl rounded-full border border-border bg-ink/70 py-2 backdrop-blur-xl"
              : "max-w-7xl border border-transparent py-2",
          )}
        >
          <Link to="/" aria-label="Digital Mov home" data-cursor="expand">
            {/* <LogoLockup compact={compact} /> */}
            <img src={logo} className="w-[11em]"></img>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                data-cursor="expand"
                className="electric-underline text-[13px] tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="group flex h-9 w-9 flex-col items-end justify-center gap-[5px] md:hidden"
          >
            <span className="h-px w-6 bg-foreground transition-all duration-500 group-hover:w-4" />
            <span className="h-px w-4 bg-primary transition-all duration-500 group-hover:w-6" />
          </button>
        </div>
      </header>

      {/* Mobile overlay: sequenced curtain, not a hamburger flip */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-visibility duration-700 md:hidden",
          open ? "pointer-events-auto visible" : "pointer-events-none invisible delay-700",
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 origin-top bg-ink/95 backdrop-blur-xl transition-transform duration-700 [transition-timing-function:var(--ease-cine)]"
          style={{ transform: open ? "scaleY(1)" : "scaleY(0)" }}
        />
        <div
          className="relative flex h-full flex-col px-6 pb-12 pt-6 transition-opacity duration-300"
          style={{ opacity: open ? 1 : 0 }}
        >
          <div className="flex items-center justify-between">
            <LogoLockup compact />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-xs uppercase tracking-[0.28em] text-muted-foreground"
              style={{
                opacity: open ? 1 : 0,
                transition: "opacity 400ms 300ms",
              }}
            >
              Close
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-1">
            {NAV.map((item, i) => (
              <span key={item.to} className="line-mask">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-display text-4xl font-semibold tracking-tight"
                  style={{
                    transform: open ? "translateY(0)" : "translateY(110%)",
                    opacity: open ? 1 : 0,
                    transition: `transform 700ms var(--ease-cine) ${180 + i * 70}ms, opacity 700ms ${180 + i * 70}ms`,
                  }}
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>

          <div className="mt-auto">
            <div className="trail-x h-px w-full" />
            <p className="mt-4 text-xs tracking-[0.24em] text-muted-foreground">
              WE CREATE DIGITAL EXPERIENCES THAT MOVE
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
