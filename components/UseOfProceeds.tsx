// Use of proceeds per Section 8 of the SAFE Term Sheet.
const USES = [
  "General corporate purposes",
  "US substance-building — executive team, office, customer contracts, infrastructure",
  "LMM platform research and development",
  "Working capital for the Company and its subsidiaries",
  "Acquisition of residual minority interests in the Indian operating subsidiary",
  "Strategic acquisitions consistent with the business plan"
];

export function UseOfProceeds() {
  return (
    <section className="space-y-5">
      <p className="lmm-eyebrow">· Use of proceeds</p>
      <h2 className="lmm-display text-2xl md:text-3xl">
        Where the capital goes
      </h2>
      <div className="lmm-rule-emerald" />

      {/* Surface: Deep Emerald */}
      <ul className="grid gap-px border border-signal/30 bg-signal/25 shadow-card-lift md:grid-cols-2">
        {USES.map((u, i) => (
          <li key={u} className="flex gap-3 bg-deep-emerald px-5 py-4">
            <span className="font-mono text-[0.65rem] tracking-mono text-signal">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-sm font-light leading-body text-oat/85">
              {u}
            </span>
          </li>
        ))}
      </ul>

      <p className="lmm-source">
        · And such other purposes as the Board approves. Allocation is at the
        Company&rsquo;s discretion and is described in full in the offering
        documents.
      </p>
    </section>
  );
}
