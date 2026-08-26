// Discount schedule — three tiers, single rate per tier, opening at US$100,000.
const TIERS = [
  { tier: "Tier 1", range: "US$100,000 – US$999,999", discount: "15%" },
  { tier: "Tier 2", range: "US$1,000,000 – US$2,999,999", discount: "20%" },
  { tier: "Tier 3", range: "US$3,000,000 and above", discount: "25%" }
];

const TIMELINE = [
  { date: "1 September 2026", event: "Offering launch", note: "Redomicile to the United States expected complete" },
  { date: "End September 2026", event: "First close", note: "Rolling closings as subscribers complete documentation" },
  { date: "End October 2026", event: "Final close", note: "Target close of the round" }
];

export function DiscountTiers() {
  return (
    <section id="terms" className="scroll-mt-20 space-y-5">
      <p className="lmm-eyebrow">· Discount schedule</p>
      <h2 className="lmm-display text-2xl md:text-3xl">
        Discount rate is tiered by subscription size
      </h2>
      <div className="lmm-rule-emerald" />

      <p className="lmm-body text-sm md:text-base">
        Each SAFE converts at a discount to the price paid in the next
        qualifying round. The applicable Discount Rate is set by the
        investor&rsquo;s tier — the aggregate Purchase Amount subscribed by that
        investor together with its affiliates across all closings.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[30rem] border border-ground/10 bg-oat text-left shadow-card">
          <thead>
            <tr className="border-b border-ground/10 bg-oat-pale">
              {["Tier", "Aggregate purchase amount", "Discount rate"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-5 py-3 font-mono text-[0.6rem] uppercase tracking-mono text-mono-grey"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIERS.map((t) => (
              <tr key={t.tier} className="border-b border-ground/10 last:border-0">
                <td className="px-5 py-4 font-mono text-[0.7rem] uppercase tracking-mono text-ground">
                  {t.tier}
                </td>
                <td className="px-5 py-4 font-display text-sm text-ground">
                  {t.range}
                </td>
                <td className="px-5 py-4 font-display text-base font-medium text-deep-emerald">
                  {t.discount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Round timeline */}
      <div className="space-y-3 pt-4">
        <p className="lmm-label">Round timeline</p>
        <ol className="grid gap-px border border-signal/30 bg-signal/25 shadow-card-lift md:grid-cols-3">
          {TIMELINE.map((t) => (
            <li key={t.event} className="space-y-1.5 bg-deep-emerald px-5 py-5">
              <p className="font-mono text-[0.6rem] uppercase tracking-mono text-signal">
                {t.date}
              </p>
              <p className="font-display text-base font-medium text-oat">
                {t.event}
              </p>
              <p className="font-display text-sm font-light leading-body text-oat/80">
                {t.note}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <p className="lmm-snip border border-oat/12 bg-graphite p-4 font-mono text-[0.65rem] uppercase leading-body tracking-mono text-oat/70 shadow-card-lift">
        · Tier is determined on an aggregate basis across all closings, together
        with an investor&rsquo;s affiliates, and pooled investment vehicles are
        treated as a single investor. Dates are targets and may change at the
        Company&rsquo;s discretion. Full mechanics, including aggregation and
        re-tiering, are set out in the offering documents, which control.
      </p>
    </section>
  );
}
