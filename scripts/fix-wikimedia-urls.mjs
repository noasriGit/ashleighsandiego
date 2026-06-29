/** Fix Wikimedia thumb URLs to full-resolution direct file URLs. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcesPath = path.join(__dirname, "../src/data/community-image-sources.json");

function wikimediaFullUrl(scaledUrl) {
  const m = scaledUrl.match(
    /^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/thumb\/([a-f0-9]\/[a-f0-9]{2}\/[^/]+)\/\d+px-[^/]+$/,
  );
  if (m) return `${m[1]}/${m[2]}`;
  return scaledUrl;
}

const sources = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));
let fixed = 0;

for (const entry of Object.values(sources.communities)) {
  for (const kind of ["hero", "thumb"]) {
    const img = entry[kind];
    if (img.sourceType === "wikimedia" && img.downloadUrl.includes("/thumb/")) {
      const full = wikimediaFullUrl(img.downloadUrl);
      if (full !== img.downloadUrl) {
        img.downloadUrl = full;
        fixed++;
      }
    }
  }
}

fs.writeFileSync(sourcesPath, JSON.stringify(sources, null, 2));
console.log(`Fixed ${fixed} Wikimedia URLs to full resolution.`);
