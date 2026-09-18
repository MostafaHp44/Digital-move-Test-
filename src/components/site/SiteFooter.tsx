import { Link } from "@tanstack/react-router";
import { LogoLockup } from "@/components/brand/Logo";

/** Public footer. Intentionally contains no admin/dashboard entry point. */
export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <LogoLockup />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A creative digital studio building websites, digital menus and interactive
              experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-muted-foreground">
            <Link to="/work" className="electric-underline w-fit hover:text-foreground">
              Work
            </Link>
            <Link to="/services" className="electric-underline w-fit hover:text-foreground">
              Services
            </Link>
            <Link to="/about" className="electric-underline w-fit hover:text-foreground">
              About
            </Link>
            <Link
              to="/services/digital-menu"
              className="electric-underline w-fit hover:text-foreground"
            >
              Digital Menu
            </Link>
            <Link
              to="/services/branding"
              className="electric-underline w-fit hover:text-foreground"
            >
              Branding
            </Link>
            <Link to="/services/website" className="electric-underline w-fit hover:text-foreground">
              Websites
            </Link>
            <Link
              to="/services/business-card"
              className="electric-underline w-fit hover:text-foreground"
            >
              Business Cards
            </Link>
            <Link to="/contact" className="electric-underline w-fit hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Digital Mov. All rights reserved.</span>
          <span className="tracking-[0.24em] uppercase">Motion is the language</span>
        </div>
      </div>
    </footer>
  );
}
