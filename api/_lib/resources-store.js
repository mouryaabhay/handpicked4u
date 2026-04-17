import fs from "node:fs";
import path from "node:path";

const DATA_FILE_PATH = path.resolve(process.cwd(), "src/data/resources.json");
const MAX_LIMIT_PER_CATEGORY = 24;
const DEFAULT_LIMIT_PER_CATEGORY = 9;

let cachedData = null;
let cachedMtimeMs = 0;

function readResourcesData() {
  const stat = fs.statSync(DATA_FILE_PATH);

  if (cachedData && cachedMtimeMs === stat.mtimeMs) {
    return cachedData;
  }

  const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
  const parsed = JSON.parse(raw);

  cachedData = parsed;
  cachedMtimeMs = stat.mtimeMs;

  return parsed;
}

function toSearchText(categoryName, resource) {
  return [
    categoryName,
    resource.name,
    resource.url,
    ...(resource.tags || []),
    ...(resource.badges || []),
  ]
    .join(" ")
    .toLowerCase();
}

function sanitizeLimit(value) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_LIMIT_PER_CATEGORY;
  }

  return Math.min(Math.floor(parsed), MAX_LIMIT_PER_CATEGORY);
}

function normalizeString(value) {
  return (value || "").toString().trim().toLowerCase();
}

export function getCategoriesSummary() {
  const data = readResourcesData();
  const categories = Array.isArray(data?.categories) ? data.categories : [];

  return categories.map((category) => ({
    name: category.name,
    icon: category.icon,
    count: Array.isArray(category.tags) ? category.tags.length : 0,
  }));
}

export function getResourcesByQuery({ q = "", category = "", limitPerCategory } = {}) {
  const data = readResourcesData();
  const categories = Array.isArray(data?.categories) ? data.categories : [];
  const normalizedQuery = normalizeString(q);
  const normalizedCategory = normalizeString(category);
  const limit = sanitizeLimit(limitPerCategory);

  const filtered = categories
    .filter((cat) => {
      if (!normalizedCategory) return true;
      return normalizeString(cat.name) === normalizedCategory;
    })
    .map((cat) => {
      const allResources = Array.isArray(cat.tags) ? cat.tags : [];

      const matches = normalizedQuery
        ? allResources.filter((resource) =>
            toSearchText(cat.name, resource).includes(normalizedQuery)
          )
        : allResources;

      const visible = matches.slice(0, limit);

      if (!visible.length) {
        return null;
      }

      return {
        name: cat.name,
        icon: cat.icon,
        tags: visible,
        totalMatches: matches.length,
        hasMore: matches.length > visible.length,
      };
    })
    .filter(Boolean);

  return {
    categories: filtered,
    meta: {
      query: q || "",
      category: category || "",
      limitPerCategory: limit,
      totalCategories: filtered.length,
    },
  };
}
