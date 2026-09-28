type Props = {
  offering: "reg-d" | "reg-s";
};

// DealMaker hosted checkout, one deal per jurisdiction. Using the invitation
// link rather than the <dm-checkout> embed: this site is a static export, so a
// hosted handoff avoids loading a third-party module script into the offering
// page. Swap to the embed if in-page checkout is wanted later — the deal ids
// are recorded beside each link.
const CHECKOUT = {
  "reg-d": {
    // deal id fe2461c7-d208-482c-93bb-eb8621c510b5
    url:
      process.env.NEXT_PUBLIC_DEALMAKER_URL_REG_D ||
      "https://app.dealmaker.tech/invitations/53a0feb7-5503-42fb-a970-4bf3f2a7c9a2/view",
    label: "Begin investment process: U.S. accredited investors"
  },
  "reg-s": {
    // deal id 07b0f498-aa9a-45b5-b903-0522a5ec63cb
    url:
      process.env.NEXT_PUBLIC_DEALMAKER_URL_REG_S ||
      "https://app.dealmaker.tech/invitations/a801228e-9a8b-47e7-97ba-7fd972cfc694/view",
    label: "Begin investment process: Non-U.S. persons"
  }
} as const;

// Original centered CTA panel layout, restyled: Deep-Emerald ground with the
// approved emerald wash, oat type, single emerald button.
export function DealMakerCta({ offering }: Props) {
  const { url, label } = CHECKOUT[offering];

  return (
    <section
      id="invest"
      aria-label="DealMaker investment CTA"
      className="relative isolate scroll-mt-24 overflow-hidden border border-signal/25 bg-ground p-8 shadow-card-lift md:p-10"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-emerald-wash opacity-30"
      />
      <div className="relative space-y-5 text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-signal">
          · Powered by DealMaker
        </p>
        <h3 className="font-display text-2xl font-medium leading-tight text-oat md:text-3xl">
          Continue on our investment platform
        </h3>
        <p className="mx-auto max-w-xl font-display text-sm font-light leading-body text-oat/80">
          The full investment process (verification, subscription documents, and
          funding) is completed through DealMaker, a registered broker-dealer.
        </p>

        <div className="pt-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="lmm-btn-primary w-full shadow-card md:w-auto"
          >
            <span>{label}</span>
            <span aria-hidden>→</span>
            <span className="sr-only"> (opens DealMaker in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
