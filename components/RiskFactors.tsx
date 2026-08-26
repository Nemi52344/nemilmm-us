// Risk factor summary. The first eight are the standard required set for a
// private placement; the remainder are issuer-specific risks drawn from the
// Company's own disclosure in the August 2026 management presentation.
// Summary only — full risk factors live in the offering documents.
type Variant = "reg-d" | "reg-s";

type Risk = { label: string; body: string };

const RISKS: Risk[] = [
  {
    label: "Speculative and illiquid",
    body: "No public market exists for these securities and none is expected to develop. Transfer of the SAFE requires the Company's prior written consent, subject to limited exceptions, so you should assume you cannot exit this investment."
  },
  {
    label: "Total loss of investment",
    body: "You could lose your entire investment. You should not invest funds you cannot afford to lose in full."
  },
  {
    label: "Early stage and limited operating history",
    body: "The Company is an early-stage business with a limited operating history in its current structure, and is completing a redomicile from India to the United States. Early-stage companies fail at high rates."
  },
  {
    label: "Dilution",
    body: "Future financing rounds, the conversion of this and other SAFEs, and issuances under equity incentive plans will dilute your resulting ownership, potentially significantly."
  },
  {
    label: "Dependence on key personnel",
    body: "The business depends on retaining its founders and senior management. The loss of one or more of them could materially harm the Company, which also faces competition from substantially better-capitalised entrants."
  },
  {
    label: "Conflicts of interest",
    body: "The Company, its affiliates and the investment platform have a financial interest in the successful completion of this offering, including fees payable on capital raised. Their interests may not align with yours."
  },
  {
    label: "No dividends or guaranteed return",
    body: "The SAFE pays no interest, has no maturity date, and carries no dividend or guaranteed return. If no conversion event occurs, it may never convert and may deliver nothing."
  },
  {
    label: "Illustrative figures are not performance",
    body: "Any illustrative or hypothetical returns, valuations, scenarios or comparisons are not indicative of actual performance and must not be relied upon as a prediction of results."
  },
  {
    label: "Geographic concentration",
    body: "Substantially all operating activity is currently conducted through the Company's Indian operating subsidiaries. The planned reduction in that concentration depends on acquisitions that may not complete."
  },
  {
    label: "Execution and further capital",
    body: "The growth plan depends on executing an acquisition pipeline, integrating acquired businesses, and on the availability, size and timing of subsequent capital, none of which is assured."
  },
  {
    label: "Unaudited financial information",
    body: "Historical financial information is preliminary and unaudited, is prepared on an Indian GAAP basis, and remains subject to completion of a PCAOB-standard audit. It may differ materially from audited financial statements."
  }
];

export function RiskFactors({ variant }: { variant: Variant }) {
  // Each page names only its own offering document.
  const document =
    variant === "reg-d"
      ? "Private Placement Memorandum"
      : "Subscription Documents";

  return (
    <section className="space-y-4">
      <p className="lmm-eyebrow">· Risk factors summary</p>
      <h3 className="lmm-display text-xl md:text-2xl">
        Read the offering documents before investing.
      </h3>
      <div className="lmm-rule-emerald" />

      <ul className="space-y-3 pt-2">
        {RISKS.map((r) => (
          <li key={r.label} className="flex gap-3">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />
            <span className="lmm-body text-sm">
              <span className="font-medium text-ground">{r.label}.</span>{" "}
              {r.body}
            </span>
          </li>
        ))}
      </ul>

      <p className="lmm-source pt-1">
        · The above is a summary only. Full risk factors are set out in the{" "}
        {document} and must be reviewed in their entirety.
      </p>
    </section>
  );
}
