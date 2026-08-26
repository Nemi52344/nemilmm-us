// SECTION 02 — How we get there. Replaces the earlier "Own the factories"
// thesis strip. Two bands: the three-phase roadmap, then the three pillars
// that fund and compound it.
type Phase = {
  kicker: string;
  /** Small emerald tag beside the kicker, e.g. "Open" */
  tag?: string;
  title: string;
  /** Product names carried in emerald beside the title */
  aside?: string;
  detail: string;
  highlight?: boolean;
};

const PHASES: Phase[] = [
  {
    kicker: "Phase 1",
    title: "Automate Design",
    aside: "(eNvision + Engineer)",
    detail:
      "High-mix Low-volume · Aerospace, Defense, Space, High-end Automotive"
  },
  {
    kicker: "Phase 2",
    title: "Automate the Factory",
    aside: "(Manufacture + Improve)",
    detail: "High-volume Low-mix · Automotive, Consumer Electronics"
  },
  {
    kicker: "Phase 3",
    tag: "Open",
    title: "Open the platform",
    detail: "Allow all manufacturing companies to use our platform",
    highlight: true
  }
];

export function HowWeGetThere() {
  return (
    <section id="how-we-get-there" className="scroll-mt-20 space-y-8">
      <div className="space-y-4">
        <p className="lmm-eyebrow">· How we get there</p>
        <h2 className="lmm-display text-2xl md:text-4xl">
          Hardware doesn&rsquo;t have an open data set.
        </h2>
        <p className="max-w-2xl font-display text-base font-light leading-body text-ground/80 md:text-lg">
          The only way is to be a manufacturer ourselves.
        </p>
        <div className="lmm-rule-emerald" />
      </div>

      {/* The three phases. Phase 3 carries the emerald rule as the open end.
          Each column is a subgrid spanning the same three parent rows, so the
          kicker, title and detail line up across all three even when one title
          wraps to two lines and another doesn't. */}
      <ol className="grid gap-8 md:grid-cols-3 md:grid-rows-[auto_auto_auto] md:gap-x-10 md:gap-y-3">
        {PHASES.map((p) => (
          <li
            key={p.kicker}
            className={`grid content-start gap-3 border-t pt-5 md:row-span-3 md:grid-rows-subgrid ${
              p.highlight ? "border-t-2 border-signal" : "border-ground/25"
            }`}
          >
            <p className="font-mono text-[0.7rem] font-medium uppercase tracking-mono-wide text-ground">
              {p.kicker}
              {p.tag && (
                <span className="ml-2 text-[0.6rem] text-signal">
                  · {p.tag}
                </span>
              )}
            </p>
            <p className="font-display text-lg font-medium leading-snug text-ground md:text-xl">
              {p.title}
              {p.aside && <span className="text-signal"> {p.aside}</span>}
            </p>
            {/* Title case rather than the usual mono caps, matching the deck. */}
            <p
              className={`font-mono text-[0.7rem] capitalize leading-body tracking-mono ${
                p.highlight ? "font-medium text-signal" : "text-mono-grey"
              }`}
            >
              {p.detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
