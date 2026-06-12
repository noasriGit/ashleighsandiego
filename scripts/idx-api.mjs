/**
 * Shared IDX Broker API helpers for Node scripts.
 */

const API_BASE = "https://api.idxbroker.com";

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
 * @returns API response (may include new link ID depending on account API version).
 */
export async function createSavedLink(apiKey, fields) {
  const body = new URLSearchParams(fields).toString();
  return idxRequest(apiKey, "PUT", "/clients/savedlinks", body);
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
 * Rewrite a default IDX Broker host (e.g. nvdigitalconsulting.idxbroker.com) to the branded
 * subdomain, preserving the /i/{linkName} path. Returns the URL unchanged when it is already
 * branded or when the base URL is itself an idxbroker host (branding not yet configured).
 */
export function brandSavedLinkUrl(url, baseUrl, linkName) {
  const root = (baseUrl ?? "").replace(/\/$/, "");
  if (!root) return url;
  const baseIsBranded = !/idxbroker\.com/i.test(root);
  if (!url || !/idxbroker\.com/i.test(url) || !baseIsBranded) return url;
  try {
    const parsed = new URL(url);
    const base = new URL(root);
    parsed.protocol = base.protocol;
    parsed.host = base.host;
    return parsed.toString();
  } catch {
    return buildSavedLinkUrl(root, linkName) || url;
  }
}
