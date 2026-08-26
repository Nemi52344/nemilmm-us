// Required offering disclosures. The Reg D page carries the Rule 506(c) /
// accredited-investor set; the Reg S page carries the offshore equivalents for
// the same six headings. Counsel to confirm final wording before launch.
type Variant = "reg-d" | "reg-s";

type Item = { label: string; body: string };

function disclosures(variant: Variant): Item[] {
  const regD = variant === "reg-d";

  return [
    regD
      ? {
          label: "Accredited investors only",
          body: "This offering is limited to accredited investors as defined in Rule 501(a) of Regulation D. DealMaker, on behalf of the issuer, will take reasonable steps to verify your accredited investor status before any investment is accepted."
        }
      : {
          label: "Non-U.S. persons only",
          body: "This offering is limited to persons who are not U.S. persons as defined in Rule 902(k) of Regulation S. The issuer, through DealMaker, will take reasonable steps to verify your non-U.S. person status and that the sale is an offshore transaction before any investment is accepted."
        },
    {
      label: "No SEC approval",
      body: "The U.S. Securities and Exchange Commission has not approved or disapproved of these securities, and has not passed upon the accuracy or adequacy of the offering materials. Any representation to the contrary is a criminal offense."
    },
    regD
      ? {
          label: "No registration",
          body: "The securities are being offered under an exemption from registration provided by Rule 506(c) of Regulation D. They have not been registered under the Securities Act of 1933 or under the securities laws of any state."
        }
      : {
          label: "No registration",
          body: "The securities are being offered in reliance on Regulation S under the Securities Act of 1933. They have not been registered under that Act or under the securities laws of any U.S. state or territory."
        },
    regD
      ? {
          label: "Restricted resale",
          body: "These are restricted securities. They may not be resold except in compliance with applicable securities laws, which generally requires a holding period of at least one year and either registration or an available exemption."
        }
      : {
          label: "Restricted resale",
          body: "These are restricted securities. They may not be offered or sold in the United States, or to or for the account or benefit of U.S. persons, except pursuant to registration or an available exemption, and a distribution compliance period applies."
        },
    {
      label: "Forward-looking statements",
      body: "Any projections, plans, targets or other forward-looking statements reflect current management expectations only. They are not guarantees of future performance, and actual results may differ materially."
    },
    {
      label: "No investment advice",
      body: "Neither the issuer nor the investment platform is providing investment, legal, tax or accounting advice. You should consult your own independent advisers before making any investment decision."
    }
  ];
}

export function Disclosures({ variant }: { variant: Variant }) {
  return (
    <div className="space-y-4">
      <p className="lmm-label">Required disclosures</p>

      {/* Hairline-separated stack, matching the offering table treatment. */}
      <ul className="grid gap-px border border-ground/10 bg-ground/10 shadow-card">
        {disclosures(variant).map((d) => (
          <li key={d.label} className="space-y-1.5 bg-oat px-5 py-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-mono text-signal">
              · {d.label}
            </p>
            <p className="font-display text-sm font-light leading-body text-ground/80">
              {d.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
