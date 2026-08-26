type Props = {
  variant: "reg-d" | "reg-s";
};

// Original boxed banner layout, restyled in the LMM emerald system:
// Deep-Emerald panel, mono eyebrow, oat type, lifted with a shadow.
export function ComplianceBanner({ variant }: Props) {
  if (variant === "reg-d") {
    return (
      <aside
        role="note"
        aria-label="Accredited investor compliance notice"
        className="border border-signal/30 bg-deep-emerald px-6 py-6 shadow-card-lift md:px-8"
      >
        <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-signal">
          ⚠ Accredited investors only
        </p>
        <h2 className="mt-3 font-display text-lg font-medium leading-snug text-oat md:text-xl">
          This offering is available only to U.S. accredited investors.
        </h2>
        <p className="mt-3 font-display text-sm font-light leading-body text-oat/80">
          This offering is being made pursuant to Rule 506(c) of Regulation D
          under the Securities Act of 1933. Securities offered have not been
          registered under the Securities Act or any state securities laws and
          are &ldquo;restricted securities.&rdquo; They may not be resold absent
          registration or an applicable exemption. Accredited investor status
          must be verified before any investment is accepted.
        </p>
      </aside>
    );
  }

  return (
    <aside
      role="note"
      aria-label="Non-U.S. persons compliance notice"
      className="border border-signal/30 bg-deep-emerald px-6 py-6 shadow-card-lift md:px-8"
    >
      <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-signal">
        ⚠ Non-U.S. persons only
      </p>
      <h2 className="mt-3 font-display text-lg font-medium leading-snug text-oat md:text-xl">
        This offering is available only to non-U.S. persons.
      </h2>
      <p className="mt-3 font-display text-sm font-light leading-body text-oat/80">
        This offering is being made outside the United States in reliance on
        Regulation S under the Securities Act of 1933. It is{" "}
        <strong className="font-medium text-oat">NOT</strong> available to
        &ldquo;U.S. persons&rdquo; as defined in SEC Rule 902(k). This includes
        U.S. citizens, U.S. residents, and certain entities organized in the
        United States.
      </p>
      <p className="mt-3 font-display text-sm font-light leading-body text-oat/80">
        If you are a U.S. person, you must leave this page immediately and may
        not participate in this offering. By remaining on this page, you confirm
        that you are not a U.S. person and are not acquiring these securities
        for the account or benefit of a U.S. person.
      </p>
    </aside>
  );
}
