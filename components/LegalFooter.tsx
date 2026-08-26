import Link from "next/link";

type Variant = "landing" | "reg-d" | "reg-s";

const GENERAL = `IMPORTANT NOTICE: This website is for informational purposes only and does not constitute an offer to sell, or a solicitation of an offer to buy, any security. Any offer or solicitation will be made only by means of the applicable offering documents (Private Placement Memorandum or Subscription Agreement) and only to qualified investors in jurisdictions where such offers are permitted.

Investing in early-stage companies involves significant risk, including the risk of total loss of invested capital. Past performance is not indicative of future results. Prospective investors should carefully review all offering documents and consult with independent legal, financial, and tax advisors before making an investment decision.

NEMI AI and its affiliates make no representations or warranties regarding the accuracy or completeness of the information on this website.`;

const REG_D = `This offering is being conducted pursuant to Rule 506(c) of Regulation D under the Securities Act of 1933, as amended. Securities offered have not been registered with the U.S. Securities and Exchange Commission or any state securities authority. These securities are offered and sold only to "accredited investors" within the meaning of Rule 501(a) of Regulation D, and investor accreditation must be verified prior to investment. These are restricted securities and may not be resold absent registration under the Securities Act or an applicable exemption therefrom.

No state or federal regulatory authority has reviewed, approved, or disapproved of these securities or passed upon the adequacy of the disclosures in the offering documents.`;

const REG_D_BLUE_SKY = `This offering has been or will be filed as a notice filing with the securities regulators of each state where investors are located, as required by applicable state law. The securities offered have not been registered under the laws of any state, and no state has approved or disapproved of these securities or determined that this offering document is accurate or complete.

Residents of all U.S. states and territories may invest only if they qualify as accredited investors and the Company has made the required state notice filing for that state. Contact invest@nemilmm.com to confirm availability in your state.`;

const REG_S = `This offering is being conducted in reliance upon Regulation S under the Securities Act of 1933, as amended, and is available only to persons who are not "U.S. persons" as defined in Rule 902(k) of Regulation S. These securities have not been registered under the Securities Act or the securities laws of any U.S. state or territory. Offers and sales are being made only in "offshore transactions" as defined in Regulation S.

These securities may not be offered, sold, or delivered, directly or indirectly, in the United States or to U.S. persons. Each investor must represent and warrant that they are not a U.S. person and are not acquiring securities on behalf of any U.S. person. Investors are responsible for ensuring compliance with the securities laws and regulations of their own jurisdiction.

This offering may not be available in all countries. Investors are responsible for compliance with the securities laws of their own jurisdiction.`;

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((p, i) => (
        <p
          key={i}
          className="font-display text-xs font-light leading-body text-oat/60"
        >
          {p}
        </p>
      ))}
    </>
  );
}

// Black Ground footer with mono system lines, echoing the deck footer:
// mono caps left (date · confidential), url right.
export function LegalFooter({ variant }: { variant: Variant }) {
  return (
    <footer className="w-full border-t border-oat/10 bg-ground">
      <div className="lmm-container flex flex-col gap-8 py-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.7rem] uppercase tracking-mono text-oat/70">
            Questions ·{" "}
            <a
              href="mailto:invest@nemilmm.com"
              className="text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
            >
              invest@nemilmm.com
            </a>
          </p>
          <Link
            href="https://nemilmm.com"
            className="font-mono text-[0.7rem] uppercase tracking-mono text-oat/50 hover:text-signal"
          >
            www.nemilmm.com&nbsp;&nbsp;→
          </Link>
        </div>

        <div className="h-px w-full bg-oat/10" />

        <div className="space-y-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-signal">
            · Important notice
          </p>
          <Paragraphs text={GENERAL} />
        </div>

        {variant === "reg-d" && (
          <>
            <div className="space-y-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-signal">
                · Regulation D · Rule 506(c)
              </p>
              <Paragraphs text={REG_D} />
            </div>
            <div className="space-y-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-signal">
                · State blue sky notice
              </p>
              <Paragraphs text={REG_D_BLUE_SKY} />
            </div>
          </>
        )}

        {variant === "reg-s" && (
          <div className="space-y-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-signal">
              · Regulation S
            </p>
            <Paragraphs text={REG_S} />
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-oat/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[0.65rem] uppercase tracking-mono text-oat/40">
            © {new Date().getFullYear()} NEMI · Confidential &amp; proprietary
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-mono text-oat/40">
            {variant === "reg-d"
              ? "Regulation D · 506(c)"
              : "Regulation S · Offshore"}
          </p>
        </div>
      </div>
    </footer>
  );
}
