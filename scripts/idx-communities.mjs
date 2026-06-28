/**
 * Parse launch communities + zip codes from project source files.
 */

import { readFileSync } from "fs";
import { join } from "path";

export function loadCommunitySearchTargets(rootDir) {
  const zipsSource = readFileSync(
    join(rootDir, "src/data/community-zips.ts"),
    "utf8",
  );
  const zipBlock = zipsSource.match(
    /const ZIP_OVERRIDES[\s\S]*?= \{([\s\S]*?)\};/,
  )?.[1];
  if (!zipBlock) {
    throw new Error("Could not parse ZIP_OVERRIDES from community-zips.ts");
  }

  const zipOverrides = {};
  for (const match of zipBlock.matchAll(/(?:"([^"]+)"|([a-z0-9_-]+)):\s*\[([^\]]*)\]/g)) {
    const slug = match[1] ?? match[2];
    const zips = [...match[3].matchAll(/"(\d{5})"/g)].map((m) => m[1]);
    zipOverrides[slug] = zips;
  }

  const communitiesSource = readFileSync(
    join(rootDir, "src/data/communities.ts"),
    "utf8",
  );
  const launchBlock = communitiesSource.match(
    /hasGuide:\s*true/g,
  );
  if (!launchBlock) {
    throw new Error("Could not parse hasGuide communities from communities.ts");
  }

  const launchSlugs = [...communitiesSource.matchAll(
    /\{\s*slug:\s*"([^"]+)"[\s\S]*?hasGuide:\s*true/g,
  )].map((m) => m[1]);

  const communityNames = {};
  for (const match of communitiesSource.matchAll(
    /\{\s*slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"/g,
  )) {
    communityNames[match[1]] = match[2];
  }

  const targets = launchSlugs.map((slug) => ({
    slug,
    name: communityNames[slug] ?? slug,
    zipCodes: zipOverrides[slug] ?? [],
  }));

  targets.push({
    slug: "_military",
    name: "San Diego Military Bases",
    zipCodes: zipOverrides._military ?? [],
  });

  // General search: union of all launch zips (site's San Diego focus area).
  const generalZips = [
    ...new Set(launchSlugs.flatMap((slug) => zipOverrides[slug] ?? [])),
  ].sort();
  targets.push({
    slug: "_general",
    name: "San Diego",
    zipCodes: generalZips,
  });

  return targets;
}
