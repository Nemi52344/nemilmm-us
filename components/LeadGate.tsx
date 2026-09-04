"use client";

import { useEffect, useState } from "react";
import { JurisdictionGate } from "./JurisdictionGate";

// Set only once a visitor has passed the eligibility check, so a refresh does
// not re-interrogate someone already cleared. A blocked or unanswered visitor
// gets the gate again on reload — there is no way to browse past it.
const SEEN_KEY = "nemi_lead_gate_cleared";

// Mandatory lead capture on arrival. The offering page renders behind a
// frosted scrim and cannot be reached until the jurisdiction form is
// completed: no Cancel, no backdrop dismiss, Escape attempts to close the tab.
export function LeadGate({ offering }: { offering: "reg-d" | "reg-s" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cleared = false;
    try {
      cleared = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage blocked — show the gate rather than let someone through */
    }
    if (cleared) return;

    // Let the hero paint before the dialog lands, so the first impression is
    // the page and not a bare modal on white.
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, []);

  // Hold the page still while the dialog owns the screen.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Only reachable from the eligible screen — a blocked visitor has no Close.
  function clear() {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* noop */
    }
    setOpen(false);
  }

  return (
    <JurisdictionGate
      offering={offering}
      open={open}
      onClose={clear}
      source="landing"
      dismissible={false}
    />
  );
}
