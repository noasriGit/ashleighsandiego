/** Update community content files with slug-specific image paths from community-image-sources.json */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourcesPath = path.join(root, "src/data/community-image-sources.json");
const phase1Path = path.join(root, "src/data/community-content-phase1.ts");
const mainPath = path.join(root, "src/data/community-content.ts");

const { communities } = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));

function imageBlock(slug, entry) {
  return [
    `    heroImage: "/images/neighborhoods/${slug}-hero.jpg",`,
    `    heroImageAlt: ${JSON.stringify(entry.heroAlt)},`,
    `    thumbnail: "/images/neighborhoods/${slug}-thumb.jpg",`,
    `    thumbnailAlt: ${JSON.stringify(entry.thumbAlt)},`,
  ].join("\n");
}

function patchFile(filePath, slugs) {
  let content = fs.readFileSync(filePath, "utf8");
  for (const slug of slugs) {
    const entry = communities[slug];
    if (!entry) continue;
    const block = imageBlock(slug, entry);
    const re = new RegExp(
      `("${slug.replace(/-/g, "\\-")}":\\s*\\{[\\s\\S]*?)(    heroImage:[\\s\\S]*?    thumbnailAlt:[^\\n]*\\n)`,
    );
    if (!re.test(content)) {
      console.warn(`No match for ${slug} in ${path.basename(filePath)}`);
      continue;
    }
    content = content.replace(re, `$1${block}\n`);
  }
  fs.writeFileSync(filePath, content);
}

const phase1Slugs = Object.keys(communities).filter((s) => {
  const phase1 = fs.readFileSync(phase1Path, "utf8");
  return phase1.includes(`"${s}":`);
});

const mainSlugs = ["mission-valley", "sorrento-valley"];

patchFile(phase1Path, phase1Slugs);
patchFile(mainPath, mainSlugs);

console.log(`Updated ${phase1Slugs.length} phase1 entries and ${mainSlugs.length} main entries.`);
