/**
 * Fill missing neighborhood thumbs by copying heroes; download any remaining gaps.
 * Usage: node scripts/finalize-community-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourcesPath = path.join(root, "src/data/community-image-sources.json");
const manifestPath = path.join(root, "src/data/image-manifest.json");
const dir = path.join(root, "public/images/neighborhoods");

const { communities } = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function slotFor(slug, kind) {
  return manifest.slots.find((s) => s.slotId === `neighborhood-${kind}/${slug}`);
}

async function downloadOne(slot) {
  const candidate = slot.candidates[0];
  const headers = { "User-Agent": "sandiegohomes/1.0 (image download)" };
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch(candidate.downloadUrl, { redirect: "follow", headers });
    if (res.status === 429) {
      await sleep(8000 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 5000) throw new Error("too small");
    const dest = path.join(root, "public", slot.filePath.replace(/^\//, ""));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, buf);
    slot.status = "downloaded";
    console.log(`OK ${slot.slotId} (${Math.round(buf.length / 1024)} KB)`);
    return;
  }
  throw new Error("HTTP 429 after retries");
}

let copied = 0;
for (const slug of Object.keys(communities)) {
  const hero = path.join(dir, `${slug}-hero.jpg`);
  const thumb = path.join(dir, `${slug}-thumb.jpg`);
  if (!fs.existsSync(thumb) && fs.existsSync(hero)) {
    fs.copyFileSync(hero, thumb);
    const thumbSlot = slotFor(slug, "thumb");
    if (thumbSlot) thumbSlot.status = "downloaded";
    copied++;
    console.log(`COPY ${slug}-thumb <- hero`);
  }
}

const stillMissing = [];
for (const slug of Object.keys(communities)) {
  for (const kind of ["hero", "thumb"]) {
    const file = path.join(dir, `${slug}-${kind}.jpg`);
    if (!fs.existsSync(file)) stillMissing.push({ slug, kind });
  }
}

for (const { slug, kind } of stillMissing) {
  const slot = slotFor(slug, kind);
  if (!slot) continue;
  try {
    await sleep(5000);
    await downloadOne(slot);
  } catch (err) {
    console.error(`FAIL ${slug}-${kind}:`, err.message);
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nCopied ${copied} thumbs from heroes.`);

const remaining = [];
for (const slug of Object.keys(communities)) {
  for (const kind of ["hero", "thumb"]) {
    if (!fs.existsSync(path.join(dir, `${slug}-${kind}.jpg`))) remaining.push(`${slug}-${kind}`);
  }
}
console.log(`Remaining missing: ${remaining.length}`);
if (remaining.length) console.log(remaining.join("\n"));
