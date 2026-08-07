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
// housing-fact terms like "single-family home", "3-bedroom", "school district",
// "family room" (as a literal room type), or the age of a home/building.
//
// Two categories are covered below:
//   1. Explicit steering phrases ("good for families", "adults-only", etc.)
//   2. Demographic-class words (young professional, retiree, empty nester,
//      couples, singles, etc.) combined with framing that describes who
//      belongs in / is suited to a property or area, rather than an
//      objective attribute of the property or location itself.
const PROHIBITED_PATTERNS = [
  // --- Explicit "who belongs here" steering phrases ---
  /family[- ]oriented/i,
  /family[- ]friendly/i,
  /good for families/i,
  /great for families/i,
  /popular with families/i,
  /perfect for families/i,
  /ideal for families/i,
  /best for (?:families|singles|couples|retirees|empty nesters)/i,
  /best .{0,20}for families/i,
  /families relocating/i,
  /relocating families/i,
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

  // --- Age/life-stage demographic framing ("who lives/belongs here") ---
  // Matches "young professional(s)", "younger demographic/crowd/buyers/vibe",
  // and similar age-coded descriptions of an area's population.
  /young(?:er)? professionals?/i,
  /younger (?:demographic|crowd|buyers?|vibe|generation)/i,
  /a younger[, ]/i,
  /skews? younger/i,
  /empty[- ]nesters?/i,
  /\bretirees?\b/i,
  /retirement community/i,
  /senior(?:s)? community/i,

  // --- Familial-status / relationship-status framing ---
  // "families" is fine in generic factual contexts (e.g. "families relocating"
  // is caught above; "family room" is a literal feature). These patterns
  // target phrases that describe who a neighborhood/property suits by
  // household composition rather than an objective need.
  /families (?:who|wanting|seeking|looking for|prioritizing|comparing|relocating|between)/i,
  /popular (?:area |neighborhood )?with families/i,
  /\bcouples\b/i,
  /\bsingles\b/i,
  /\bbachelors?\b/i,
  /newlyweds/i,

  // --- Generic "who lives here" demographic description ---
  /demographic(?:s)? (?:of|for|in) (?:the|this) (?:neighborhood|area|community)/i,
  /population (?:base|makeup|mix)/i,
];

// Allowlist (documented for human reviewers, not machine-enforced): objective
// uses of these words are expected to remain and will NOT trip the patterns
// above, e.g. "single-family home", "multifamily property", "3-bedroom" /
// "4-bedroom", "family room" (literal feature), "school district" / "school
// boundary", and the age of a home or building (e.g. "built in the 1970s").

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
