/** Report missing neighborhood image files and copy hero→thumb when needed. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourcesPath = path.join(root, "src/data/community-image-sources.json");
const dir = path.join(root, "public/images/neighborhoods");

const { communities } = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));
const missing = [];

for (const slug of Object.keys(communities)) {
  for (const kind of ["hero", "thumb"]) {
    const file = path.join(dir, `${slug}-${kind}.jpg`);
    if (!fs.existsSync(file)) missing.push(`${slug}-${kind}`);
  }
}

console.log(`On disk: ${fs.readdirSync(dir).filter((f) => f.endsWith(".jpg")).length} files`);
console.log(`Missing: ${missing.length}`);
if (missing.length) console.log(missing.join("\n"));
