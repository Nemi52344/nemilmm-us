"use client";

import { useId, useState } from "react";
import { COUNTRIES, isUSPersonCountry } from "./countries";
import { ADDRESS_FORM_NAME } from "./NetlifyAddressForm";

type Props = {
  offering: "reg-d" | "reg-s";
  open: boolean;
  onClose: () => void;
};

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

  // Netlify Forms: form-encoded POST to the site root.
  try {
    void fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": ADDRESS_FORM_NAME,
        ...record
      }).toString()
    });
  } catch {
    /* offline / non-Netlify host */
  }

  const endpoint = process.env.NEXT_PUBLIC_LOG_ENDPOINT;
  if (endpoint) {
    try {
      void fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      });
    } catch {
      /* webhook unreachable */
    }
  }
}

export function JurisdictionGate({ offering, open, onClose }: Props) {
  const [fullName, setFullName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [result, setResult] = useState<Result>(null);
  const dialogId = useId();

  if (!open) return null;

  function evaluate(e: React.FormEvent) {
    e.preventDefault();
    const usPerson = isUSPersonCountry(country);
    const eligible = offering === "reg-d" ? usPerson : !usPerson;

    logSubmission({
      offering,
      result: eligible ? "eligible" : "blocked",
      fullName,
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
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ground/80 p-4 md:items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
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
                    Postal code
                  </label>
                  <input
                    id="jg-postal"
                    required
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className={field}
                    autoComplete="postal-code"
                  />
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
              <button
                type="button"
                onClick={close}
                className="lmm-btn-ghost order-2 md:order-1"
              >
                Cancel
              </button>
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
              <button
                type="button"
                onClick={close}
                className="lmm-btn-primary order-1 md:order-2"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {result === "eligible" && (
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="lmm-eyebrow">· Eligibility confirmed</p>
              <h3 className="lmm-display text-lg md:text-xl">
                Continue to the secure investment platform
              </h3>
              <div className="lmm-rule-emerald" />
              <p className="lmm-body pt-1 text-sm">
                Based on the address provided, you may proceed. Identity
                verification
                {offering === "reg-d"
                  ? ", accredited investor verification,"
                  : ""}{" "}
                subscription documents, and funding are completed through
                DealMaker, a registered broker-dealer.
              </p>
            </div>
            <div className="pt-1">
              <button
                type="button"
                disabled
                aria-disabled
                className="lmm-btn-primary w-full"
                title="DealMaker embed / URL pending; replace before launch"
              >
                <span>Continue to DealMaker</span>
                <span aria-hidden>→</span>
              </button>
              <p className="lmm-source mt-3 text-center">
                · Placeholder — DealMaker{" "}
                {offering === "reg-d" ? "506(c)" : "Reg S"} URL to be supplied
                by partner
              </p>
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={close} className="lmm-btn-ghost">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
