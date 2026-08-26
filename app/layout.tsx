import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import GeoGate from "@/components/GeoGate";
import { NetlifyAddressForm } from "@/components/NetlifyAddressForm";
import "./globals.css";

// NEMI LMM type system: Space Grotesk carries voice, IBM Plex Mono carries data.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap"
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://invest-us.nemi-ai.com"),
  title: {
    default: "Invest in NEMI — U.S. Accredited Investors",
    template: "%s | NEMI"
  },
  description:
    "NEMI Regulation D 506(c) offering for U.S. accredited investors.",
  robots: {
    index: false,
    follow: false
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen font-display text-ground antialiased">
        {/* IP restriction ARMED: visitors whose IP resolves outside the U.S.
            get the 404 screen instead of the offering. This is a client-side,
            fail-open control — see components/GeoGate.tsx. The address gate at
            the investment step remains the hard control. */}
        <GeoGate audience="us">
          {children}
        </GeoGate>
        <NetlifyAddressForm />
      </body>
    </html>
  );
}
