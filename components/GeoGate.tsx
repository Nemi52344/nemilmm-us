"use client";

import { useEffect, useState } from "react";
import { detectCountry } from "./geo";
import { isUSPersonCountry } from "./countries";
import { NotFoundScreen } from "./NotFoundScreen";

type Props = {
  // "us": only U.S. visitors may see the site (Reg D).
  // "non-us": only non-U.S. visitors may see the site (Reg S).
  audience: "us" | "non-us";
  // Master switch for the IP restriction. Set false to open the site to every
  // visitor (review/QA); set back to true to re-arm the 404 block.
  enabled?: boolean;
  children: React.ReactNode;
};

type Status = "checking" | "allowed" | "blocked";

// IP-level gate. Wrong-region visitors never see the offering — they get a
// 404-style screen. Right-region (or undetectable) visitors see the site; the
// address gate at the investment step remains the hard control.
//
// Fail-open: if the IP lookup is slow or fails, the site is shown (a US person
// on a VPN is still stopped at the address gate). For true server-side blocking
// that never delivers content, deploy via Netlify Edge Functions.
export default function GeoGate({ audience, enabled = true, children }: Props) {
  const [status, setStatus] = useState<Status>(
    enabled ? "checking" : "allowed"
  );

  useEffect(() => {
    if (!enabled) {
      setStatus("allowed");
      return;
    }

    let settled = false;
    const finish = (s: Status) => {
      if (!settled) {
        settled = true;
        setStatus(s);
      }
    };

    // Fail open if geo can't be determined quickly.
    const timer = setTimeout(() => finish("allowed"), 3500);

    (async () => {
      const country = await detectCountry();
      if (settled) return;
      clearTimeout(timer);
      if (!country) return finish("allowed"); // unknown -> fail open
      const isUS = isUSPersonCountry(country);
      const ok = audience === "us" ? isUS : !isUS;
      finish(ok ? "allowed" : "blocked");
    })();

    return () => {
      settled = true;
      clearTimeout(timer);
    };
  }, [audience, enabled]);

  if (status === "allowed") return <>{children}</>;
  if (status === "blocked") return <NotFoundScreen />;
  return <CheckingScreen />;
}

function CheckingScreen() {
  return (
    <main
      aria-busy
      className="flex min-h-screen items-center justify-center bg-bone px-6"
    >
      <span
        aria-hidden
        className="h-6 w-6 animate-spin border-2 border-ground/10 border-t-signal"
      />
      <span className="sr-only">Loading…</span>
    </main>
  );
}

// NotFoundScreen lives in its own module so app/not-found.tsx renders the
// identical screen — a jurisdiction block is indistinguishable from a real 404.
