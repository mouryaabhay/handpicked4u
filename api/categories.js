import { getCategoriesSummary } from "./_lib/resources-store.js";

export default function handler(_req, res) {
  try {
    const categories = getCategoriesSummary();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({
      error: "Failed to load categories",
      message: error?.message || "Unknown error",
    });
  }
}
