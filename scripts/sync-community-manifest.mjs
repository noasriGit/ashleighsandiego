/**
 * Merges community-image-sources.json into image-manifest.json as neighborhood slots.
 * Usage: node scripts/sync-community-manifest.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const manifestPath = path.join(root, "src/data/image-manifest.json");
const sourcesPath = path.join(root, "src/data/community-image-sources.json");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const sources = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));

function makeSlot(slotId, slug, kind, config, altText) {
  const isHero = kind === "hero";
  return {
    slotId,
    phase: 1,
    category: isHero ? "neighborhood-hero" : "neighborhood-thumb",
    route: `/neighborhoods/${slug}`,
    filePath: `/images/neighborhoods/${slug}-${isHero ? "hero" : "thumb"}.jpg`,
    targetDimensions: isHero ? "1920x1080" : "800x450",
    altText,
    selectedCandidateIndex: 0,
    status: "pending",
    candidates: [config],
  };
}

const communitySlots = [];
for (const [slug, entry] of Object.entries(sources.communities)) {
  communitySlots.push(
    makeSlot(`neighborhood-hero/${slug}`, slug, "hero", entry.hero, entry.heroAlt),
    makeSlot(`neighborhood-thumb/${slug}`, slug, "thumb", entry.thumb, entry.thumbAlt),
  );
}

const communitySlotIds = new Set(communitySlots.map((s) => s.slotId));
const preserved = manifest.slots.filter((s) => !communitySlotIds.has(s.slotId));

manifest.generatedAt = new Date().toISOString().slice(0, 10);
manifest.slots = [...preserved, ...communitySlots];

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Synced ${communitySlots.length} neighborhood slots (${Object.keys(sources.communities).length} communities).`);
