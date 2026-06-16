/**
 * Downloads approved images from image-manifest.json into public/images/.
 * Usage: node scripts/download-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifestPath = path.join(root, "src/data/image-manifest.json");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

async function downloadSlot(slot) {
  const dest = path.join(root, "public", slot.filePath.replace(/^\//, ""));
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  const candidate = slot.candidates[slot.selectedCandidateIndex ?? 0];
  const url = candidate.downloadUrl;

  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`${slot.slotId}: HTTP ${res.status} for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 10_000) {
    throw new Error(`${slot.slotId}: downloaded file too small (${buf.length} bytes)`);
  }
  fs.writeFileSync(dest, buf);
  console.log(`OK ${slot.slotId} -> ${slot.filePath} (${Math.round(buf.length / 1024)} KB)`);
}

let failed = 0;
for (const slot of manifest.slots) {
  if (slot.status === "skipped") continue;
  try {
    await downloadSlot(slot);
    slot.status = "downloaded";
  } catch (err) {
    failed++;
    console.error(`FAIL ${slot.slotId}:`, err.message);
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
if (failed > 0) process.exit(1);
