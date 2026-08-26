"use client";

import { useEffect, useRef } from "react";

type Props = {
  offering: "reg-d" | "reg-s";
};

// SECTION 01 — Vision as the landing hero, matching the nemilmm.com treatment:
// full-viewport dark stage, background footage under a heavy scrim, centred
// display headline with a caret, crop-mark corners, scroll cue.
export function VisionSection({ offering }: Props) {
  const regD = offering === "reg-d";
  const videoRef = useRef<HTMLVideoElement>(null);

  // Runs on a continuous loop. The only exception is prefers-reduced-motion,
  // where the poster frame is held instead — the remaining safeguard now that
  // there is no manual pause control.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <section
      id="vision"
      className="lmm-cropmark relative flex min-h-[100svh] w-full scroll-mt-16 flex-col items-center justify-center overflow-hidden bg-ground"
    >
      {/* Background footage */}
      <video
        ref={videoRef}
        src="/nemi/video/hero-main.mp4"
        poster="/nemi/img/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Scrim so the type holds contrast over the footage */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ground/80 mix-blend-multiply"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ground/70 via-ground/40 to-ground"
      />

      {/* Centre stage */}
      <div className="lmm-container relative z-10 flex flex-col items-center py-24 text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-signal">
          · {regD ? "Regulation D · Rule 506(c)" : "Regulation S · Offshore transaction"}
        </p>

        {/* Matches the nemilmm.com .display rule:
            font-size: clamp(2.3rem, 5.4vw, 4.6rem); weight 700; -0.025em */}
        <h1 className="mt-8 font-display text-[clamp(2.3rem,5.4vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.025em] text-white">
          NEMI LMM for Physical AI
          <span aria-hidden className="lmm-caret" />
        </h1>

        <p className="mt-8 max-w-2xl font-display text-base font-light leading-relaxed text-oat/85 md:text-xl">
          Do for manufacturing what LLMs have done for AI
        </p>

        <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-mono text-oat/50">
          {regD
            ? "U.S. accredited investors only · Verification required · Restricted securities"
            : "Non-U.S. persons only · Rule 902(k) · Not registered under the Securities Act"}
        </p>
      </div>

      {/* Scroll cue */}
      <a
        href="#where-we-are"
        aria-label="Scroll to content"
        className="absolute bottom-10 left-1/2 z-10 h-12 w-px -translate-x-1/2 bg-signal/70 transition hover:bg-signal"
      />

    </section>
  );
}
