// Best-effort visitor country lookup from public IP-geo APIs. Returns a
// 2-letter ISO code, or "" when it can't be determined (caller fails open).
export async function detectCountry(): Promise<string> {
  if (typeof window === "undefined") return "";

  // Dev-only manual override for testing: ?__geo=US / ?__geo=GB
  if (process.env.NODE_ENV !== "production") {
    const override = new URLSearchParams(window.location.search).get("__geo");
    if (override) return override.toUpperCase();
  }

  const sources: Array<() => Promise<string>> = [
    async () => {
      const r = await fetch("https://get.geojs.io/v1/ip/country.json");
      const j = await r.json();
      return j?.country ?? "";
    },
    async () => {
      const r = await fetch("https://ipapi.co/country/");
      return (await r.text()).trim();
    }
  ];

  for (const source of sources) {
    try {
      const code = await source();
      if (/^[A-Za-z]{2}$/.test(code)) return code.toUpperCase();
    } catch {
      // try next source
    }
  }
  return "";
}
