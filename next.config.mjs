/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Static export — produces an `out/` folder you can drag-and-drop into
  // Netlify. No server runtime, so the jurisdiction split is handled
  // client-side (components/GeoGate.tsx + JurisdictionGate.tsx).
  output: "export",
  images: { unoptimized: true },
  // Keep production builds out of `.next` so running `next build` can never
  // clobber the chunks a live `next dev` server is serving.
  distDir: process.env.NODE_ENV === "production" ? ".next-build" : ".next"
};

export default nextConfig;
