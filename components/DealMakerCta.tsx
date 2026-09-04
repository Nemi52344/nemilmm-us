"use client";

import { useState } from "react";
import { PortalNotice } from "./PortalNotice";

type Props = {
  offering: "reg-d" | "reg-s";
};

// Original centered CTA panel layout, restyled: Deep-Emerald ground with the
// approved emerald wash, oat type, single emerald button.
export function DealMakerCta({ offering }: Props) {
  const [noticeOpen, setNoticeOpen] = useState(false);

  const label =
    offering === "reg-d"
      ? "Begin investment process: U.S. accredited investors"
      : "Begin investment process: Non-U.S. persons";

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
          <button
            type="button"
            onClick={() => setNoticeOpen(true)}
            className="lmm-btn-primary w-full shadow-card md:w-auto"
          >
            <span>{label}</span>
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <PortalNotice
        open={noticeOpen}
        onClose={() => setNoticeOpen(false)}
      />
    </section>
  );
}
