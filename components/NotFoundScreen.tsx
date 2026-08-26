// Themed 404. Shown to wrong-jurisdiction visitors by GeoGate, and by
// app/not-found.tsx for genuinely missing routes — so both look identical and
// the block is indistinguishable from an ordinary missing page.
//
// NEMI LMM: Black Ground + blueprint grid, crop-mark corners, oversized
// Space Grotesk figure, snipped statement card, slim emerald rule.
export function NotFoundScreen() {
  return (
    <main className="lmm-cropmark relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-ground bg-lmm-dark bg-cover bg-center">
      <div className="lmm-container">
        <div className="max-w-xl space-y-5">
          <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-signal">
            · Error
          </p>

          <p className="font-display text-6xl font-medium leading-none tracking-[-0.02em] text-oat md:text-8xl">
            404
          </p>

          {/* Single-corner-snipped rectangle, emerald fill to match the label */}
          <div className="lmm-snip inline-block border border-signal/40 bg-deep-emerald px-6 py-4 shadow-card-lift">
            <h1 className="font-display text-lg font-medium text-oat md:text-xl">
              This page could not be found.
            </h1>
          </div>

          <div className="h-0.5 w-12 bg-signal" />

          <p className="max-w-md font-display text-sm font-light leading-body text-oat/70">
            The page you are looking for is unavailable. If you believe this is
            an error, contact{" "}
            <a
              href="mailto:invest@nemilmm.com"
              className="whitespace-nowrap text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
            >
              invest@nemilmm.com
            </a>
            <span aria-hidden className="ml-1.5 text-signal">
              →
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
