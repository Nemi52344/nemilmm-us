// Each supplied logo PNG has a white canvas plus a light-grey (~246) card
// border drawn inside it. That frame is what renders as an "individual border"
// around every logo in the wall.
//
// This crops each file to the bounding box of its actual artwork — ignoring
// both the white ground and the grey frame — so the wall can be laid out with
// one consistent grid instead of two nested boxes.
import { readdirSync, renameSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const DIR = "public/nemi/logos";
const FRAME_MAX = 236; // >= this on every channel is white ground or grey frame
const PAD = 4; // breathing room kept around the artwork

const files = readdirSync(DIR).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const path = join(DIR, file);
  const { data, info } = await sharp(path).raw().toBuffer({
    resolveWithObject: true
  });
  const { width: w, height: h, channels: c } = info;

  let minX = w;
  let maxX = -1;
  let minY = h;
  let maxY = -1;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * c;
      const isGround =
        data[i] >= FRAME_MAX &&
        data[i + 1] >= FRAME_MAX &&
        data[i + 2] >= FRAME_MAX;
      if (isGround) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < 0) {
    console.log(`  ${file.padEnd(22)} SKIPPED — no artwork detected`);
    continue;
  }

  const left = Math.max(0, minX - PAD);
  const top = Math.max(0, minY - PAD);
  const width = Math.min(w - left, maxX - minX + 1 + PAD * 2);
  const height = Math.min(h - top, maxY - minY + 1 + PAD * 2);

  await sharp(path)
    .extract({ left, top, width, height })
    .png({ compressionLevel: 9 })
    .toFile(path + ".tmp");
  renameSync(path + ".tmp", path);

  console.log(
    `  ${file.padEnd(22)} ${w}x${h} → ${width}x${height}`
  );
}

console.log(`\n  ${files.length} logos trimmed.`);
