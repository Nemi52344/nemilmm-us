type Props = {
  variant: "reg-d" | "reg-s";
};

// Eligibility + verification, merged into a single notice that sits directly
// above the investment CTA — so the restriction and the verification step are
// read together, immediately before the investor acts.
export function EligibilityNotice({ variant }: Props) {
  const regD = variant === "reg-d";

  return (
    <aside
      role="note"
      aria-label={
        regD
          ? "Accredited investor eligibility and verification notice"
          : "Non-U.S. persons eligibility and verification notice"
      }
      className="border border-signal/30 bg-deep-emerald px-6 py-6 shadow-card-lift md:px-8 md:py-8"
    >
      {/* Eligibility */}
      <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-signal">
        ⚠ {regD ? "Accredited investors only" : "Non-U.S. persons only"}
      </p>
      <h2 className="mt-3 font-display text-lg font-medium leading-snug text-oat md:text-xl">
        {regD
          ? "This offering is available only to U.S. accredited investors."
          : "This offering is available only to non-U.S. persons."}
      </h2>

      {regD ? (
        <p className="mt-3 font-display text-sm font-light leading-body text-oat/80">
          This offering is being made pursuant to Rule 506(c) of Regulation D
          under the Securities Act of 1933. Securities offered have not been
          registered under the Securities Act or any state securities laws and
          are &ldquo;restricted securities.&rdquo; They may not be resold absent
          registration or an applicable exemption.
        </p>
      ) : (
        <>
          <p className="mt-3 font-display text-sm font-light leading-body text-oat/80">
            This offering is being made outside the United States in reliance on
            Regulation S under the Securities Act of 1933. It is{" "}
            <strong className="font-medium text-oat">NOT</strong> available to
            &ldquo;U.S. persons&rdquo; as defined in SEC Rule 902(k). This
            includes U.S. citizens, U.S. residents, and certain entities
            organized in the United States.
          </p>
          <p className="mt-3 font-display text-sm font-light leading-body text-oat/80">
            If you are a U.S. person, you must leave this page immediately and
            may not participate in this offering. By remaining on this page, you
            confirm that you are not a U.S. person and are not acquiring these
            securities for the account or benefit of a U.S. person.
          </p>
        </>
      )}

      {/* Divider between the two merged notices */}
      <div aria-hidden className="my-6 h-px w-full bg-signal/25" />

      {/* Verification */}
      <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-signal">
        · Verification required
      </p>
      <h3 className="mt-3 font-display text-lg font-medium leading-snug text-oat md:text-xl">
        {regD
          ? "Accredited investor status is verified before investment."
          : "Non-U.S. person status is confirmed before investment."}
      </h3>
      <p className="mt-3 font-display text-sm font-light leading-body text-oat/80">
        {regD
          ? "Under Rule 506(c), NEMI is required to take reasonable steps to verify that all investors are accredited before accepting any investment. Verification is conducted through our investment platform partner, DealMaker."
          : "Investors must execute Regulation S representations confirming offshore status at the time of offer and sale. Identity and eligibility checks are conducted through our investment platform partner, DealMaker."}
      </p>
      <p className="mt-3 font-mono text-[0.65rem] uppercase leading-body tracking-mono text-oat/55">
        {regD
          ? "· Documentation: tax returns · W-2 · brokerage statements · or a letter from a licensed attorney, CPA, or investment advisor"
          : "· Documentation: proof of non-U.S. residence · government identification · KYC/AML and source-of-funds records"}
      </p>
    </aside>
  );
}
