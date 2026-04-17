import { getResourcesByQuery } from "./_lib/resources-store.js";

export default function handler(req, res) {
  try {
    const { q = "", category = "", limit = "" } = req.query || {};

    const payload = getResourcesByQuery({
      q,
      category,
      limitPerCategory: limit,
    });

    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({
      error: "Failed to load resources",
      message: error?.message || "Unknown error",
    });
  }
}
