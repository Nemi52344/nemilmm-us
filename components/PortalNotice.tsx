"use client";

import { useEffect, useId } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

// Shown when an investor presses "Begin investment process". The DealMaker
// portal is not connected yet, so this states that plainly rather than handing
// them a dead button. Replace the body with the platform handoff once the
// DealMaker URL exists.
export function PortalNotice({ open, onClose }: Props) {
  const dialogId = useId();

  // This one is dismissible: the visitor has already registered, and trapping
  // them here would be hostile.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogId}
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ground/70 p-4 backdrop-blur-md md:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="my-8 w-full max-w-lg border border-ground/15 bg-bone p-6 md:p-8">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="lmm-eyebrow">· Investment platform</p>
            <h3 id={dialogId} className="lmm-display text-lg md:text-xl">
              Taking you to the investment portal
            </h3>
            <div className="lmm-rule-emerald" />
          </div>

          <div className="border-l-2 border-signal bg-oat-pale p-4">
            <p className="font-display text-sm font-light leading-body text-ground">
              At this time, we are not yet ready to accept investments. Stay
              tuned and we will notify you.
            </p>
          </div>

          <p className="lmm-body text-sm">
            We will contact you using the details you registered as soon as the
            platform opens. For anything in the meantime, write to{" "}
            <a
              href="mailto:invest@nemilmm.com"
              className="text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
            >
              invest@nemilmm.com
            </a>
            .
          </p>

          <div className="flex justify-end pt-1">
            <button type="button" onClick={onClose} className="lmm-btn-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
