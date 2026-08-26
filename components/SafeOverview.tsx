// SAFE mechanics per the Nemi Corp SAFE Term Sheet (v3, capped).
export function SafeOverview() {
  return (
    <section className="space-y-4">
      <p className="lmm-eyebrow">· SAFE note overview</p>
      <h3 className="lmm-display text-xl md:text-2xl">
        Post-Money Simple Agreement for Future Equity
      </h3>
      <div className="lmm-rule-emerald" />

      <p className="lmm-body pt-1 text-sm md:text-base">
        The instrument is a Post-Money SAFE in a form customary for US bridge
        financings. It carries no maturity date and no interest, and is not
        indebtedness. It converts to equity on a Qualified Financing (gross
        proceeds of at least US$20,000,000), a SPAC Merger or IPO on a US
        national securities exchange, or a Liquidity Event.
      </p>

      <p className="lmm-body text-sm md:text-base">
        The conversion price per share is the{" "}
        <span className="font-medium text-ground">lower</span> of (i) the
        Conversion Price Reference reduced by the investor&rsquo;s applicable
        Discount Rate, and (ii) the Valuation Cap divided by Company
        Capitalization. Whichever produces the lower price, and therefore the
        greater number of shares, governs. Securities issued on conversion are
        Class A common stock, or equivalent securities of the public entity
        following a SPAC Merger or IPO.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Surface: Warm Graphite */}
        <div className="lmm-snip space-y-2 border border-oat/12 bg-graphite p-6 shadow-card-lift md:p-7">
          <p className="font-mono text-[0.65rem] uppercase tracking-mono text-signal">
            Most Favored Nation
          </p>
          <p className="font-display text-sm font-light leading-body text-oat/80">
            If the Company later issues a SAFE or similar instrument on
            materially more favourable economic terms, holders may elect to
            amend to those terms within 30 days of notice. Differences in
            Discount Rate arising solely from the tiered schedule do not trigger
            this right.
          </p>
        </div>
        {/* Surface: Deep Emerald */}
        <div className="lmm-snip space-y-2 border border-signal/30 bg-deep-emerald p-6 shadow-card-lift md:p-7">
          <p className="font-mono text-[0.65rem] uppercase tracking-mono text-signal">
            Major Investor rights
          </p>
          <p className="font-display text-sm font-light leading-body text-oat/80">
            An aggregate Purchase Amount of US$1,000,000 or more confers
            pro-rata participation in the Qualified Financing, plus unaudited
            quarterly and audited annual financial statements, the annual
            operating budget and business plan, until the Company becomes
            subject to SEC periodic reporting.
          </p>
        </div>
      </div>

      <p className="lmm-source">
        · Because the cap is expressed on a post-money basis, where the cap
        governs a holder receives a percentage of post-money capitalization
        equal to its Purchase Amount divided by the Valuation Cap. Full terms,
        including Company Capitalization, are set out in the offering documents.
      </p>
    </section>
  );
}
