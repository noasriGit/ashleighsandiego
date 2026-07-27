/**
 * Fair Housing Act compliance scan (docs/seo-rebuild-plan.md §15).
 *
 * Scans src/data and src/app for prohibited/high-risk terms that steer buyers by
 * protected class (familial status, race/ethnicity, religion, national origin,
 * disability) rather than describing objective housing/location attributes.
 *
 * This is a heuristic linter, not legal advice — a human compliance review is
 * still required before publishing new community copy. Flagged lines should be
 * rewritten to describe the property/area (e.g. "3+ bedroom homes", "walking
 * distance to parks") instead of the people who supposedly belong there.
 *
 * Run: npm run fairhousing:scan
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SCAN_DIRS = ["src/data", "src/app"];
const FILE_EXTENSIONS = new Set([".ts", ".tsx"]);

// Steering / demographic-framing phrases. Deliberately does NOT flag neutral
// housing-fact terms like "single-family home", "3-bedroom", "school district".
const PROHIBITED_PATTERNS = [
  /family[- ]oriented/i,
  /family[- ]friendly/i,
  /good for families/i,
  /great for families/i,
  /popular with families/i,
  /perfect for families/i,
  /ideal for families/i,
  /best for (?:families|singles|couples|retirees|empty nesters)/i,
  /safe(?:st)? (?:neighborhood|area|community|place to live)/i,
  /crime[- ]free/i,
  /low[- ]crime/i,
  /exclusive (?:community|neighborhood|enclave)/i,
  /desirable (?:demographic|community)/i,
  /up[- ]and[- ]coming/i,
  /transitional neighborhood/i,
  /(?:christian|jewish|muslim|catholic) (?:community|neighborhood|families)/i,
  /english[- ]speaking/i,
  /no section 8/i,
  /adults[- ]only/i,
  /empty[- ]nesters? (?:only|preferred)/i,
  /wheelchair inaccessible/i,
];

// Allowlist: objective/quantitative uses of "family" that are not steering
// (bedroom counts, "single-family home" as a property type, etc.) are fine and
// intentionally NOT matched by the patterns above.

/** @param {string} filePath */
function scanFile(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  const lines = src.split("\n");
  const hits = [];

  lines.forEach((line, index) => {
    for (const pattern of PROHIBITED_PATTERNS) {
      if (pattern.test(line)) {
        hits.push({ line: index + 1, text: line.trim(), pattern: pattern.source });
      }
    }
  });

  return hits;
}

/** @param {string} dir */
function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (FILE_EXTENSIONS.has(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

function main() {
  const files = SCAN_DIRS.flatMap((dir) => walk(path.join(ROOT, dir)));
  let totalHits = 0;

  for (const file of files) {
    const hits = scanFile(file);
    if (hits.length === 0) continue;
    totalHits += hits.length;
    console.error(`\n${path.relative(ROOT, file)}`);
    for (const hit of hits) {
      console.error(`  L${hit.line}: ${hit.text}`);
    }
  }

  if (totalHits > 0) {
    console.error(
      `\nFair Housing scan failed: ${totalHits} flagged line(s). Rewrite steering/demographic ` +
        "language to describe the property or location instead of the people who \"belong\" there.",
    );
    process.exit(1);
  }

  console.log(`OK: Fair Housing scan passed (${files.length} files checked, 0 flags).`);
}

main();
