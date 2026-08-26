// Serves the static export in ./out with zero dependencies.
//
// Why this exists: this project lives inside a OneDrive-synced folder, and
// OneDrive intermittently evicts files from `.next`, which makes `next dev`
// die with "Cannot find module './NNN.js'". The exported `out/` folder is
// plain files with no runtime chunk loading, so serving it sidesteps that
// entirely. Run `npm run build` first, then `npm run serve`.
//
//   node scripts/serve-out.mjs [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = Number(process.argv[2] ?? process.env.PORT ?? 3000);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8"
};

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(
    /^(\.\.[/\\])+/,
    ""
  );
  let candidate = join(root, clean);
  if (!candidate.startsWith(root)) return null; // no traversal out of ./out
  try {
    const s = await stat(candidate);
    if (s.isDirectory()) candidate = join(candidate, "index.html");
  } catch {
    candidate = candidate.endsWith(".html") ? candidate : `${candidate}.html`;
  }
  try {
    await stat(candidate);
    return candidate;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");
  if (!file) {
    try {
      const body = await readFile(join(root, "404.html"));
      res.writeHead(404, { "Content-Type": TYPES[".html"] });
      return res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404");
    }
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": TYPES[extname(file)] ?? "application/octet-stream",
      // Always revalidate so a rebuild shows up on refresh.
      "Cache-Control": "no-store"
    });
    res.end(body);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500");
  }
}).listen(port, () => {
  console.log(`Ready — serving ${root} on http://localhost:${port}`);
});
