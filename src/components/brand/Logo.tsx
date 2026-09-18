import logoAsset from "@/assets/digitalmov-logo.jpg.asset.json";
import { cn } from "@/lib/utils";

/**
 * Play-mark distilled from the DIGITAL MOV logo: two opposed play triangles,
 * an orbit ellipse and pixel particles. Used for site chrome where the raster
 * logo would be too heavy.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Digital Mov mark"
      className={cn("h-8 w-8", className)}
    >
      <defs>
        <linearGradient id="dm-mark-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--electric-soft)" />
          <stop offset="100%" stopColor="var(--electric-deep)" />
        </linearGradient>
        <linearGradient id="dm-mark-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--foreground)" />
          <stop offset="100%" stopColor="var(--electric-soft)" />
        </linearGradient>
      </defs>
      <ellipse
        cx="32"
        cy="31"
        rx="27"
        ry="14"
        transform="rotate(-24 32 31)"
        fill="none"
        stroke="var(--electric)"
        strokeWidth="1.4"
        opacity="0.85"
      />
      <path
        d="M20 12 L44 26 L20 40 Z"
        fill="url(#dm-mark-a)"
        rx="2"
        strokeLinejoin="round"
        stroke="url(#dm-mark-a)"
        strokeWidth="3"
      />
      <path
        d="M44 24 L44 52 L20 38 Z"
        fill="url(#dm-mark-b)"
        strokeLinejoin="round"
        stroke="url(#dm-mark-b)"
        strokeWidth="3"
        opacity="0.95"
      />
      <g fill="var(--electric-soft)">
        <rect x="6" y="14" width="3" height="3" />
        <rect x="11" y="19" width="2.4" height="2.4" opacity="0.8" />
        <rect x="4" y="22" width="2" height="2" opacity="0.6" />
      </g>
    </svg>
  );
}

export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-display leading-none tracking-tight",
        compact ? "text-sm" : "text-base",
        className,
      )}
    >
      <span className="font-bold">DIGITAL</span>
      <span className="ml-1.5 font-light text-muted-foreground">MOV</span>
    </span>
  );
}

export function LogoLockup({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={compact ? "h-6 w-6" : "h-8 w-8"} />
      <Wordmark compact={compact} />
    </span>
  );
}

/**
 * The original supplied logo artwork. Its plate is masked into the page so the
 * surrounding smoke never shows as a hard edge.
 */
export function LogoArtwork({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="DIGITAL MOV"
      className={cn("logo-plate select-none object-contain", className)}
      draggable={false}
    />
  );
}
