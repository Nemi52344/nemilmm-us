import type { Config } from "tailwindcss";

// NEMI LMM brand tokens — Brand Book v2.0 ("2029 Theme").
// Emerald + graphite editorial system. Signal Emerald is the ONLY accent.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        signal: "#10A37E", // Signal Emerald — the one hero color
        "deep-emerald": "#0A4938", // dark green anchor
        graphite: "#292926", // warm dark neutral
        panel: "#161615",
        ground: "#070707", // black canvas / ink
        bone: "#FEFEFE", // light canvas
        oat: "#ECE7DD", // card surface / dark-theme headings
        "oat-pale": "#F6F4E8", // callout strip tint
        "mono-grey": "#8A8A85"
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        mono: "0.08em",
        "mono-wide": "0.14em"
      },
      lineHeight: {
        body: "1.5"
      },
      backgroundImage: {
        "lmm-dark": "url('/nemi-lmm-dark-bg.png')",
        "lmm-white": "url('/nemi-lmm-white-bg.png')",
        // The signature Deep Emerald -> Signal Emerald wash
        "emerald-wash":
          "linear-gradient(135deg, #0A4938 0%, #10A37E 55%, transparent 100%)"
      },
      boxShadow: {
        // The page slab floating above the blueprint grid
        float: "0 24px 80px -24px rgba(7,7,7,0.35), 0 2px 8px rgba(7,7,7,0.06)",
        // Cards lifted off the bone canvas
        card: "0 10px 30px -12px rgba(7,7,7,0.22), 0 1px 3px rgba(7,7,7,0.05)",
        "card-lift":
          "0 18px 44px -14px rgba(7,7,7,0.30), 0 2px 6px rgba(7,7,7,0.07)"
      }
    }
  },
  plugins: []
};

export default config;
