/**
 * Downloads approved images from image-manifest.json into public/images/.
 *
 * Usage:
 *   node scripts/download-images.mjs                    # all non-skipped slots
 *   node scripts/download-images.mjs --neighborhoods    # neighborhood hero/thumb only
 *   node scripts/download-images.mjs --slug=bird-rock   # one community (hero + thumb)
 *   node scripts/download-images.mjs --dry-run          # validate URLs, no writes
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifestPath = path.join(root, "src/data/image-manifest.json");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const neighborhoodsOnly = args.includes("--neighborhoods");
const retryFailed = args.includes("--retry-failed");
const slugArg = args.find((a) => a.startsWith("--slug="));
const slugFilter = slugArg ? slugArg.split("=")[1] : null;

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

function slotMatchesFilter(slot) {
  if (neighborhoodsOnly && !slot.category?.startsWith("neighborhood-")) return false;
  if (slugFilter) {
    const match = slot.slotId.match(/^neighborhood-(?:hero|thumb)\/(.+)$/);
    if (!match || match[1] !== slugFilter) return false;
  }
  return true;
}

function attributionLine(candidate) {
  const parts = [candidate.license];
  if (candidate.photographer) parts.push(candidate.photographer);
  if (candidate.sourcePageUrl) parts.push(candidate.sourcePageUrl);
  return parts.join(" · ");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Wikimedia scaled thumb → full-resolution file URL. */
function wikimediaFullUrl(scaledUrl) {
  const m = scaledUrl.match(
    /^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/thumb\/([a-f0-9]\/[a-f0-9]{2}\/[^/]+)\/\d+px-[^/]+$/,
  );
  if (m) return `${m[1]}/${m[2]}`;
  return null;
}

function wikimediaFallbackUrls(url) {
  const fallbacks = [];
  const full = wikimediaFullUrl(url);
  if (full && full !== url) fallbacks.push(full);
  if (url.includes("/1920px-")) {
    fallbacks.push(url.replace("/1920px-", "/1280px-"));
    fallbacks.push(url.replace("/1920px-", "/800px-"));
  }
  if (url.includes("/800px-")) {
    fallbacks.push(url.replace("/800px-", "/640px-"));
    fallbacks.push(url.replace("/800px-", "/480px-"));
  }
  return [...new Set(fallbacks)];
}

async function fetchBuffer(url, headers, retries = 5) {
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url, { redirect: "follow", headers });
    if (res.status === 429 && attempt < retries - 1) {
      await sleep(4000 * (attempt + 1));
      continue;
    }
    if (!res.ok) return { ok: false, status: res.status, url };
    const buf = Buffer.from(await res.arrayBuffer());
    return { ok: true, buf, url };
  }
  return { ok: false, status: 429, url };
}

async function downloadSlot(slot) {
  const candidate = slot.candidates[slot.selectedCandidateIndex ?? 0];
  const dest = path.join(root, "public", slot.filePath.replace(/^\//, ""));

  const headers = { "User-Agent": "sandiegohomes/1.0 (image download)" };
  const urls = [candidate.downloadUrl, ...wikimediaFallbackUrls(candidate.downloadUrl)];

  let result = null;
  for (const url of urls) {
    result = await fetchBuffer(url, headers);
    if (result.ok) break;
  }
  if (!result?.ok) {
    throw new Error(`HTTP ${result.status} for ${candidate.downloadUrl}`);
  }

  const { buf } = result;
  if (buf.length < 5_000) {
    throw new Error(`downloaded file too small (${buf.length} bytes)`);
  }

  if (dryRun) {
    console.log(
      `DRY ${slot.slotId} -> ${slot.filePath} (${Math.round(buf.length / 1024)} KB) [${candidate.sourceType ?? "unsplash"}] ${attributionLine(candidate)}`,
    );
    return;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  console.log(
    `OK ${slot.slotId} -> ${slot.filePath} (${Math.round(buf.length / 1024)} KB) [${candidate.sourceType ?? "unsplash"}]`,
  );
}

let failed = 0;
let processed = 0;

for (const slot of manifest.slots) {
  if (slot.status === "skipped") continue;
  if (!slotMatchesFilter(slot)) continue;
  if (retryFailed && slot.status === "downloaded") continue;

  processed++;
  try {
    await downloadSlot(slot);
    if (!dryRun) slot.status = "downloaded";
  } catch (err) {
    failed++;
    if (!dryRun) slot.status = "failed";
    console.error(`FAIL ${slot.slotId}:`, err.message);
  }
  await sleep(2000);
}

if (!dryRun) {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

console.log(`\nProcessed ${processed} slot(s), ${failed} failed.`);
if (failed > 0) process.exit(1);
