type ImgProps = {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  /** Optional overlay caption naming what the shot shows, e.g. "Machining" */
  label?: string;
};

// Static export runs with images unoptimized, so a plain <img> is the simplest
// correct choice — no loader, no layout shift once the ratio box is set.
export function Shot({
  src,
  alt,
  ratio = "aspect-video",
  className = "",
  label
}: ImgProps) {
  return (
    <div
      className={`lmm-snip relative overflow-hidden shadow-card ${ratio} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      {label && (
        <>
          {/* Scrim so the caption holds contrast over any frame */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ground/90 via-ground/45 to-transparent"
          />
          <span className="absolute bottom-3 left-3 font-mono text-[0.6rem] uppercase tracking-mono text-oat">
            · {label}
          </span>
        </>
      )}
    </div>
  );
}

type VideoProps = {
  src: string;
  poster?: string;
  caption: string;
  /** Accessible description of what the footage shows */
  alt: string;
};

// Never autoplays — the offering spec requires no auto-play media, and controls
// are keyboard-reachable for WCAG AA.
export function Clip({ src, poster, caption, alt }: VideoProps) {
  return (
    <figure className="space-y-2">
      <div className="lmm-snip overflow-hidden border border-signal/25 bg-ground shadow-card-lift">
        <video
          src={src}
          poster={poster}
          controls
          preload="metadata"
          playsInline
          aria-label={alt}
          className="aspect-video w-full object-cover"
        />
      </div>
      <figcaption className="font-mono text-[0.6rem] uppercase tracking-mono text-mono-grey">
        · {caption}
      </figcaption>
    </figure>
  );
}
