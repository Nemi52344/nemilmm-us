// Production builds use distDir ".next-build" so they can never clobber the
// chunks a running `next dev` server serves out of ".next". With output:
// "export", Next writes the static site straight into that distDir — so move
// it to "out", which is the folder you drag into Netlify.
import { existsSync, renameSync, rmSync } from "node:fs";

const BUILD_DIR = ".next-build";
const OUT_DIR = "out";

if (!existsSync(BUILD_DIR)) {
  console.error(
    `finalize-export: "${BUILD_DIR}" not found — did "next build" run?`
  );
  process.exit(1);
}

rmSync(OUT_DIR, { recursive: true, force: true });
renameSync(BUILD_DIR, OUT_DIR);
console.log(`finalize-export: static site ready in ./${OUT_DIR}`);
