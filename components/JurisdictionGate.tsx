"use client";

import { useEffect, useId, useState } from "react";
import { COUNTRIES, isUSPersonCountry } from "./countries";

type Props = {
  offering: "reg-d" | "reg-s";
  open: boolean;
  onClose: () => void;
  /** Where the form was opened from, recorded on the lead. */
  source?: "landing" | "cta";
  /** false = no escape hatch: no Cancel, no backdrop dismiss, Escape tries to
   *  close the tab. Only a successful eligibility check releases the page. */
  dismissible?: boolean;
};

// The sibling offering, for redirecting someone who landed on the wrong page.
// Override per environment; defaults are the production subdomains.
const OTHER_OFFERING = {
  "reg-d": {
    label: "Regulation S offering for non-U.S. persons",
    url: process.env.NEXT_PUBLIC_INTL_URL || "https://invest-intl.nemilmm.com"
  },
  "reg-s": {
    label: "Regulation D offering for U.S. accredited investors",
    url: process.env.NEXT_PUBLIC_US_URL || "https://invest-reg-d.nemilmm.com"
  }
} as const;

type Result = "eligible" | "blocked" | null;

// Record every address submission (eligible AND blocked) to:
//  1. the browser console (structured),
//  2. localStorage (rolling local audit trail),
//  3. Netlify Forms (captured in the Netlify dashboard, no backend),
//  4. an optional webhook (NEXT_PUBLIC_LOG_ENDPOINT) if configured.
function logSubmission(record: Record<string, string>) {
  try {
    // eslint-disable-next-line no-console
    console.info("[investor-address]", JSON.stringify(record));
  } catch {
    /* noop */
  }

  try {
    const key = "nemi_investor_submissions";
    const prev = JSON.parse(localStorage.getItem(key) ?? "[]");
    prev.push(record);
    localStorage.setItem(key, JSON.stringify(prev.slice(-100)));
  } catch {
    /* storage unavailable */
  }

  // The investor platform. keepalive lets the request survive the page being
  // closed straight after submit, which is common on a landing gate.
  const endpoint = process.env.NEXT_PUBLIC_LOG_ENDPOINT;
  if (endpoint) {
    try {
      void fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
        keepalive: true
      }).catch(() => {
        /* platform unreachable - the localStorage copy is the fallback */
      });
    } catch {
      /* platform unreachable */
    }
  }
}

type Lookup = { region?: string; city?: string } | null;

// Resolve a postal code to state / city WITHIN a known country.
//
// The country is never inferred from the code. Postal codes are not unique
// across countries — 400020 is both Mumbai and a district of Chongqing — and
// this form's country field decides Reg D vs Reg S eligibility, so a wrong
// guess would misroute an investor. The visitor picks the country; the code
// only fills the fields below it.
//
// Two free, key-less services, which matters because this is a static export
// in a public repo: an API key here would be readable by anyone.
async function lookupPostcode(code: string, country: string): Promise<Lookup> {
  const pc = code.trim();
  if (pc.length < 3 || !country) return null;
  const cc = country.toLowerCase();

  // Zippopotam: exact, fast, good coverage of US/EU postal systems.
  try {
    const r = await fetch(
      `https://api.zippopotam.us/${cc}/${encodeURIComponent(pc)}`
    );
    if (r.ok) {
      const j = await r.json();
      const place = j?.places?.[0];
      if (place) {
        return {
          region: place.state || "",
          city: place["place name"] || ""
        };
      }
    }
  } catch {
    /* fall through */
  }

  // Nominatim, constrained to the chosen country. Covers places Zippopotam
  // does not, India included.
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(pc)}&countrycodes=${cc}&format=jsonv2&addressdetails=1&limit=1`
    );
    if (!r.ok) return null;
    const [hit] = await r.json();
    const a = hit?.address;
    if (!a) return null;
    return {
      region: a.state || a.region || a.county || "",
      city: a.city || a.town || a.village || a.suburb || a.county || ""
    };
  } catch {
    return null;
  }
}

export function JurisdictionGate({
  offering,
  open,
  onClose,
  source = "cta",
  dismissible = true
}: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [lookup, setLookup] = useState<
    "idle" | "busy" | "hit" | "miss" | "needs-country"
  >("idle");
  const dialogId = useId();

  // Fill state / city from the postal code once a country is chosen, a short
  // beat after typing stops. Never blocks submission: a miss just leaves the
  // fields for the visitor to complete.
  useEffect(() => {
    const pc = postal.trim();
    if (pc.length < 3) {
      setLookup("idle");
      return;
    }
    if (!country) {
      setLookup("needs-country");
      return;
    }
    let cancelled = false;
    setLookup("busy");
    const t = setTimeout(async () => {
      const hit = await lookupPostcode(pc, country);
      if (cancelled) return;
      if (!hit || (!hit.city && !hit.region)) {
        setLookup("miss");
        return;
      }
      if (hit.city) setCity(hit.city);
      if (hit.region) setRegion(hit.region);
      setLookup("hit");
    }, 700);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [postal, country]);

  // Non-dismissible mode: Escape attempts to close the tab rather than the
  // dialog. window.close() is ignored by every major browser unless the tab
  // was opened by script, so treat this as best-effort; the form simply stays.
  useEffect(() => {
    if (!open || dismissible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      try {
        window.close();
      } catch {
        /* blocked by the browser - the gate stays up */
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, dismissible]);

  if (!open) return null;

  function evaluate(e: React.FormEvent) {
    e.preventDefault();
    const usPerson = isUSPersonCountry(country);
    const eligible = offering === "reg-d" ? usPerson : !usPerson;

    logSubmission({
      offering,
      source,
      result: eligible ? "eligible" : "blocked",
      fullName,
      email,
      addressLine1: line1,
      addressLine2: line2,
      city,
      region,
      postalCode: postal,
      country,
      countryName: COUNTRIES.find((c) => c.code === country)?.name ?? country,
      timestamp: new Date().toISOString(),
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : ""
    });

    setResult(eligible ? "eligible" : "blocked");
  }

  function reset() {
    setResult(null);
  }


  function close() {
    setResult(null);
    onClose();
  }

  const field = "lmm-field";
  const labelCls =
    "mb-1 block font-mono text-[0.65rem] uppercase tracking-mono text-mono-grey";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogId}
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ground/70 p-4 backdrop-blur-md md:items-center"
      onClick={(e) => {
        if (dismissible && e.target === e.currentTarget) close();
      }}
    >
      <div className="my-8 w-full max-w-lg border border-ground/15 bg-bone p-6 md:p-8">
        {result === null && (
          <form onSubmit={evaluate} className="space-y-5">
            <div className="space-y-2">
              <p className="lmm-eyebrow">· Investor address</p>
              <h3 id={dialogId} className="lmm-display text-lg md:text-xl">
                Confirm your jurisdiction to continue
              </h3>
              <div className="lmm-rule-emerald" />
              <p className="lmm-body pt-1 text-sm">
                Enter the legal residential address of the investor. Eligibility
                for this offering is determined by jurisdiction and verified
                before the investment can proceed.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="jg-name" className={labelCls}>
                  Full legal name
                </label>
                <input
                  id="jg-name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={field}
                  placeholder="Jane A. Investor"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="jg-email" className={labelCls}>
                  Email address
                </label>
                <input
                  id="jg-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={field}
                  placeholder="jane@example.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>

              <div>
                <label htmlFor="jg-line1" className={labelCls}>
                  Address line 1
                </label>
                <input
                  id="jg-line1"
                  required
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  className={field}
                  placeholder="123 Main Street"
                  autoComplete="address-line1"
                />
              </div>

              <div>
                <label htmlFor="jg-line2" className={labelCls}>
                  Address line 2 <span className="normal-case">(optional)</span>
                </label>
                <input
                  id="jg-line2"
                  value={line2}
                  onChange={(e) => setLine2(e.target.value)}
                  className={field}
                  placeholder="Apt, suite, unit"
                  autoComplete="address-line2"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="jg-city" className={labelCls}>
                    City
                  </label>
                  <input
                    id="jg-city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={field}
                    autoComplete="address-level2"
                  />
                </div>
                <div>
                  <label htmlFor="jg-region" className={labelCls}>
                    State / Province
                  </label>
                  <input
                    id="jg-region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className={field}
                    autoComplete="address-level1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="jg-postal" className={labelCls}>
                    Pincode / Zipcode
                  </label>
                  <input
                    id="jg-postal"
                    required
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className={field}
                    autoComplete="postal-code"
                    aria-describedby="jg-postal-status"
                  />
                  <p
                    id="jg-postal-status"
                    aria-live="polite"
                    className="mt-1 font-mono text-[0.6rem] uppercase tracking-mono text-mono-grey"
                  >
                    {lookup === "busy" && "· Looking up…"}
                    {lookup === "hit" && "· City and state filled from code"}
                    {lookup === "miss" && "· Not found — enter manually"}
                    {lookup === "needs-country" &&
                      "· Choose a country to auto-fill"}
                  </p>
                </div>
                <div>
                  <label htmlFor="jg-country" className={labelCls}>
                    Country of residence
                  </label>
                  <select
                    id="jg-country"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`${field} appearance-none`}
                  >
                    <option value="" disabled>
                      Select a country…
                    </option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-1 md:flex-row md:justify-end">
              {dismissible && (
                <button
                  type="button"
                  onClick={close}
                  className="lmm-btn-ghost order-2 md:order-1"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={!country}
                className="lmm-btn-primary order-1 md:order-2"
              >
                <span>Verify &amp; continue</span>
                <span aria-hidden>→</span>
              </button>
            </div>
          </form>
        )}

        {result === "blocked" && (
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="font-mono text-[0.7rem] uppercase tracking-mono-wide text-graphite">
                · Jurisdiction not supported
              </p>
              <h3 className="lmm-display text-lg md:text-xl">
                You cannot continue with this offering
              </h3>
            </div>
            <div className="border-l-2 border-graphite bg-oat p-4">
              <p className="font-display text-sm font-light leading-body text-ground">
                {offering === "reg-s"
                  ? "Based on the address you provided, you are a U.S. person. This offering is made under Regulation S and is not available to U.S. persons."
                  : "Based on the address you provided, you are not a U.S. person. This offering is made under Regulation D, Rule 506(c) and is available only to U.S. accredited investors."}
              </p>
            </div>
            <p className="lmm-body text-sm">
              {offering === "reg-s"
                ? "If you are a U.S. accredited investor, the Regulation D offering may be available to you. "
                : "If you are a non-U.S. person, the Regulation S offering may be available to you. "}
              For assistance, contact{" "}
              <a
                href="mailto:invest@nemilmm.com"
                className="text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
              >
                invest@nemilmm.com
              </a>
              .
            </p>
            <div className="flex flex-col gap-3 pt-1 md:flex-row md:justify-end">
              <button
                type="button"
                onClick={reset}
                className="lmm-btn-ghost order-2 md:order-1"
              >
                Edit address
              </button>
              <a
                href={OTHER_OFFERING[offering].url}
                className="lmm-btn-primary order-1 md:order-2"
              >
                <span>Go to that offering</span>
                <span aria-hidden>&rarr;</span>
              </a>
            </div>
          </div>
        )}

        {result === "eligible" && (
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="lmm-eyebrow">· Registration received</p>
              <h3 className="lmm-display text-lg md:text-xl">
                Thank you for registering
              </h3>
              <div className="lmm-rule-emerald" />
              <p className="lmm-body pt-1 text-sm">
                Your details have been recorded and your jurisdiction confirmed
                for this offering. You can now view the offering in full.
              </p>
            </div>
            <div className="border-l-2 border-signal bg-oat-pale p-4">
              <p className="font-display text-sm font-light leading-body text-ground">
                When the investment platform opens, we will be in touch using
                the details you provided. To reach us in the meantime, contact{" "}
                <a
                  href="mailto:invest@nemilmm.com"
                  className="text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
                >
                  invest@nemilmm.com
                </a>
                .
              </p>
            </div>
            <div className="flex justify-end pt-1">
              <button type="button" onClick={close} className="lmm-btn-primary">
                <span>Continue to the offering</span>
                <span aria-hidden>&rarr;</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
