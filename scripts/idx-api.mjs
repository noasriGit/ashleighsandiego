/**
 * Shared IDX Broker API helpers for Node scripts.
 */

const API_BASE = "https://api.idxbroker.com";

/** IDX system property types included in saved searches and browse URLs. */
const RESIDENTIAL_PROPERTY_TYPES = ["sfr", "cnd", "mfr"];

export async function idxRequest(apiKey, method, path, body) {
  const headers = {
    accesskey: apiKey,
    outputtype: "json",
  };
  if (body) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  const res = await fetch(`${API_BASE}${path}`, { method, headers, body });
  const text = await res.text();

  let data = null;
  if (text.trim()) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  return { ok: res.ok, status: res.status, data, text };
}

export function parseSavedLinks(data) {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.map(normalizeSavedLink).filter(Boolean);
  }
  if (typeof data === "object") {
    return Object.entries(data)
      .map(([key, value]) => normalizeSavedLink(value, key))
      .filter(Boolean);
  }
  return [];
}

function normalizeSavedLink(raw, fallbackId) {
  if (!raw || typeof raw !== "object") return null;
  const id = String(raw.id ?? raw.linkID ?? raw.savedLinkID ?? fallbackId ?? "");
  const linkName = String(raw.linkName ?? raw.name ?? raw.savedName ?? "");
  const url = String(raw.url ?? raw.linkUrl ?? raw.savedLink ?? "");
  const queryString = String(raw.queryString ?? raw.query ?? "");
  return { ...raw, id, linkName, url, queryString };
}

export async function fetchSavedLinks(apiKey) {
  const { ok, status, data } = await idxRequest(apiKey, "GET", "/clients/savedlinks");
  if (!ok) {
    throw new Error(`IDX API GET /clients/savedlinks returned ${status}`);
  }
  return parseSavedLinks(data);
}

/**
 * Create a saved link via PUT /clients/savedlinks.
 *
 * IDX expects nested queryString params in bracket notation:
 *   queryString[zipcode][]=92037  (not queryString=zipcode%5B%5D%3D92037)
 *
 * Accepts either a flat `fields` object (legacy) or an explicit `zipCodes`/`cityIds`
 * array so the body is built with proper nesting.
 *
 * @returns API response (may include new link ID depending on account API version).
 */
export async function createSavedLink(apiKey, fields) {
  const { linkName, linkTitle, pageTitle, zipCodes, cityIds, idxID } = fields;

  const params = new URLSearchParams();
  if (linkName) params.set("linkName", linkName);
  if (linkTitle) params.set("linkTitle", linkTitle);
  if (pageTitle) params.set("pageTitle", pageTitle);

  // IDX MLS prefix — required so the saved link targets the right feed.
  const mlsId = idxID ?? "d010";
  params.set("queryString[idxID]", mlsId);

  // Zip codes / city IDs as array params.
  if (Array.isArray(zipCodes)) {
    zipCodes.forEach((zip) => params.append("queryString[zipcode][]", zip));
  }
  if (Array.isArray(cityIds)) {
    cityIds.forEach((id) => params.append("queryString[city][]", String(id)));
  }

  RESIDENTIAL_PROPERTY_TYPES.forEach((pt) =>
    params.append("queryString[pt][]", pt),
  );

  params.append("queryString[a_status][]", "active");

  return idxRequest(apiKey, "PUT", "/clients/savedlinks", params.toString());
}

/** List accepted PUT fields (empty PUT per IDX API docs). */
export async function inspectSavedLinkFields(apiKey) {
  return idxRequest(apiKey, "PUT", "/clients/savedlinks");
}

export function normalize(str) {
  return String(str ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function matchSavedLink(links, slug, name) {
  const slugNorm = slug.replace(/^_/, "");
  const slugKey = normalize(slugNorm);
  const nameNorm = normalize(name);
  const labelNorm = normalize(`${name} homes`);

  for (const link of links) {
    const linkKey = normalize(link.linkName);
    const haystack = normalize(`${link.url} ${link.linkName} ${link.id}`);

    if (linkKey === slugKey || linkKey === nameNorm || linkKey === labelNorm) {
      return link;
    }
    if (haystack.includes(slugKey) || haystack.includes(nameNorm)) {
      return link;
    }
    if (
      normalize(link.linkName) === normalize(`${name} Homes for Sale`) ||
      normalize(link.linkTitle ?? "") === normalize(`${name} Homes for Sale`)
    ) {
      return link;
    }
  }
  return null;
}

export function buildSavedLinkUrl(baseUrl, linkName) {
  const root = baseUrl.replace(/\/$/, "");
  if (!root || !linkName) return "";
  // IDX saved links use /i/{linkName} on the branded subdomain.
  return `${root}/i/${linkName}`;
}

/**
 * Rewrite an IDX Broker host to the configured base URL, preserving path/query.
 * Handles both custom domains (search.example.com) and *.idxbroker.com subdomains
 * (e.g. nvdigitalconsulting.idxbroker.com → sdcommunities.idxbroker.com).
 */
export function brandSavedLinkUrl(url, baseUrl, linkName) {
  const root = (baseUrl ?? "").replace(/\/$/, "");
  if (!root) return url;
  if (!url) return buildSavedLinkUrl(root, linkName);
  try {
    const parsed = new URL(url);
    const base = new URL(root);
    if (parsed.host === base.host) return url;
    if (/idxbroker\.com/i.test(parsed.hostname) || !/idxbroker\.com/i.test(base.hostname)) {
      parsed.protocol = base.protocol;
      parsed.host = base.host;
      return parsed.toString();
    }
  } catch {
    /* fall through */
  }
  return buildSavedLinkUrl(root, linkName) || url;
}
