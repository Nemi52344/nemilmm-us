const STEPS = [
  {
    title: "Acquire factories around the world",
    detail:
      "Underutilised, high-quality assets acquired below replacement cost, then upgraded with the LMM. Named pipeline across KSA, Taiwan and the US."
  },
  {
    title: "Complete the stack",
    detail:
      "Extend from design automation into full factory automation — metals, plastics, batteries, motors, electronics and complex assemblies under one platform."
  },
  {
    title: "Scale to $500M+ revenue",
    detail:
      "Growth is targeted to be constrained by supply rather than demand, on the strength of the cost, quality and speed advantage the LMM creates.",
    forwardLooking: true
  },
  {
    title: "IPO",
    detail:
      "Build the operating, financial and governance readiness required for a listing on a US national securities exchange.",
    forwardLooking: true
  }
];

// SECTION 3 — What we want to do next / use of funds.
export function WhatsNext() {
  return (
    <section id="whats-next" className="scroll-mt-20 space-y-6">
      <p className="lmm-eyebrow">· What we do next · Use of funds</p>
      <h2 className="lmm-display text-2xl md:text-4xl">
        Where this capital takes the business
      </h2>
      <div className="lmm-rule-emerald" />

      <ol className="space-y-4">
        {STEPS.map((s) => (
          <li
            key={s.title}
            className="lmm-snip flex gap-5 border border-ground/10 bg-oat p-6 shadow-card"
          >
            <span aria-hidden className="mt-2.5 h-0.5 w-6 shrink-0 bg-signal" />
            <div className="space-y-1.5">
              <p className="font-display text-lg font-medium text-ground">
                {s.title}
                {s.forwardLooking && (
                  <span className="ml-2 align-middle font-mono text-[0.55rem] uppercase tracking-mono text-mono-grey">
                    · forward-looking
                  </span>
                )}
              </p>
              <p className="font-display text-sm font-light leading-body text-ground/80">
                {s.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="lmm-snip border border-oat/12 bg-graphite p-4 font-mono text-[0.65rem] uppercase leading-body tracking-mono text-oat/70 shadow-card-lift">
        · Forward-looking statement. Statements regarding future revenue, the
        acquisition pipeline, capacity build, geographic expansion, and the
        timing, structure or completion of any capital event or listing are
        forward-looking. They reflect current management expectations, are not
        predictions of actual performance, and are subject to significant risks
        beyond the Company&rsquo;s control. Actual results may differ
        materially. See the risk factors below and the offering documents.
      </p>
    </section>
  );
}
