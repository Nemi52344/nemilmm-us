import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { EligibilityNotice } from "@/components/EligibilityNotice";
import { VisionSection } from "@/components/VisionSection";
import { HowWeGetThere } from "@/components/HowWeGetThere";
import { WhereWeAre } from "@/components/WhereWeAre";
import { LmmInAction } from "@/components/LmmInAction";
import { PublicSiteCta } from "@/components/PublicSiteCta";
import { WhatsNext } from "@/components/WhatsNext";
import { OfferingTable } from "@/components/OfferingTable";
import { SafeOverview } from "@/components/SafeOverview";
import { DiscountTiers } from "@/components/DiscountTiers";
import { DealMakerCta } from "@/components/DealMakerCta";
import { Disclosures } from "@/components/Disclosures";
import { RiskFactors } from "@/components/RiskFactors";
import { LegalFooter } from "@/components/LegalFooter";

export const metadata: Metadata = {
  title: "Regulation D 506(c) Offering",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "https://invest-us.nemi-ai.com" }
};

// Terms per the Nemi Corp SAFE Term Sheet (v3, capped) and the August 2026
// management presentation. Counsel to confirm before launch.
const OFFERING_ROWS = [
  { label: "Issuer", value: "Nemi Corp, a Texas corporation" },
  {
    label: "Offering type",
    value: "Post-Money SAFE (Simple Agreement for Future Equity)"
  },
  { label: "Securities Act rule", value: "Rule 506(c), Regulation D" },
  { label: "Eligible investors", value: "U.S. accredited investors only" },
  {
    label: "Offering document",
    value: "Private Placement Memorandum (available after verification)"
  },
  { label: "Valuation cap", value: "US$400,000,000 post-money" },
  {
    label: "Discount rate",
    value: "15% – 25% on the next qualifying round, tiered by subscription size"
  },
  {
    label: "Minimum investment",
    value: "US$100,000"
  },
  {
    label: "Investment platform",
    value: "DealMaker (registered broker-dealer)"
  },
  { label: "Maximum raise", value: "US$50,000,000" },
  {
    label: "Conversion triggers",
    value:
      "Qualified Financing (gross proceeds ≥ US$20,000,000), SPAC Merger or IPO on a US national securities exchange, or a Liquidity Event"
  },
  {
    label: "Expected conversion",
    value: "Approximately 12 months from initial closing"
  },
  { label: "Underlying security", value: "Class A common stock" },
  { label: "Major Investor threshold", value: "US$1,000,000 aggregate" },
  {
    label: "Closing structure",
    value: "Rolling closings as subscribers complete documentation and funding"
  },
  { label: "Offering launch", value: "1 September 2026 (target)" },
  { label: "First close", value: "End September 2026 (target)" },
  { label: "Final close", value: "End October 2026 (target)" },
  { label: "Governing law", value: "State of Texas" }
];

export default function RegDPage() {
  return (
    // The site slab floats above the fixed blueprint-grid ground (see body in
    // globals.css); the gutter lets the grid show around it.
    <main className="lmm-slab w-full">
      {/* ---- Nav with CTA ---------------------------------------------------- */}
      <TopNav />

      {/* ---- Vision is the landing ------------------------------------------ */}
      <VisionSection offering="reg-d" />

      {/* ---- Everything else sits below ------------------------------------ */}
      <div className="lmm-container space-y-16 py-14 md:py-16">
        {/* How we get there — the roadmap and the pillars that fund it */}
        <HowWeGetThere />

        
        <WhereWeAre />

        
        {/* Product proof: the suites running */}
        <LmmInAction />

        {/* Bridge to the public product site, above the capital ask */}
        <PublicSiteCta />

        <WhatsNext />

        {/* Fund terms */}
        <section id="terms-table" className="scroll-mt-20 space-y-5">
          <p className="lmm-eyebrow">· Fund terms</p>
          <h2 className="lmm-display text-2xl md:text-4xl">
            Key offering parameters
          </h2>
          <div className="lmm-rule-emerald" />

          <OfferingTable rows={OFFERING_ROWS} />

          <p className="lmm-snip border border-signal/30 bg-deep-emerald p-4 font-mono text-[0.65rem] uppercase leading-body tracking-mono text-oat/75 shadow-card-lift">
            · The PPM contains the full terms and conditions of the offering,
            including risk factors, use of proceeds, and investor rights.
            Investors are strongly encouraged to read the PPM in its entirety
            and consult with independent legal and financial advisors before
            investing.
          </p>
        </section>

        <SafeOverview />

        <DiscountTiers />

        {/* Eligibility + verification, merged — read immediately before the CTA */}
        <EligibilityNotice variant="reg-d" />

        {/* Primary CTA (also pinned in the nav bar) */}
        <DealMakerCta offering="reg-d" />

        {/* Disclosures */}
        <section id="disclosures" className="scroll-mt-20 space-y-5">
          <p className="lmm-eyebrow">· Disclosures</p>
          <h2 className="lmm-display text-2xl md:text-4xl">
            What you must read before investing
          </h2>
          <div className="lmm-rule-emerald" />

          <Disclosures variant="reg-d" />

          <RiskFactors variant="reg-d" />
        </section>
      </div>

      <LegalFooter variant="reg-d" />
    </main>
  );
}
