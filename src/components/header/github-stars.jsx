import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export function GitHubStars({ repoOwner, repoName }) {
  const [stars, setStars] = useState(null);

  const cacheKey = `github_stars_${repoOwner}_${repoName}`;
  const apiEndpoint = `https://api.github.com/repos/${repoOwner}/${repoName}`;

  const formatStarCount = (stars) => {
    if (stars < 1000) return `${stars}`;

    if (stars < 1_000_000) {
      const value = stars / 1000;
      const formatted = value.toFixed(1);
      return formatted.endsWith(".0") ? `${parseInt(formatted)}k` : `${formatted}k`;
    }

    const value = stars / 1_000_000;
    const formatted = value.toFixed(1);
    return formatted.endsWith(".0") ? `${parseInt(formatted)}M` : `${formatted}M`;
  };

  const fetchStars = useCallback(
    async (refresh = false) => {
      if (!refresh) {
        const cachedStars = localStorage.getItem(cacheKey);
        if (cachedStars) return setStars(+cachedStars);
      }

      try {
        const { data } = await axios.get(apiEndpoint);
        const count = data?.stargazers_count;
        if (typeof count === "number") {
          setStars(count);
          localStorage.setItem(cacheKey, count);
        }
      } catch (err) {
        console.error("GitHub stars fetch failed:", err);
      }
    },
    [cacheKey, apiEndpoint]
  );

  useEffect(() => {
    fetchStars();
    const interval = setInterval(() => fetchStars(true), 86400000); // 1 day
    return () => clearInterval(interval);
  }, [fetchStars]);

  return <>{stars !== null ? formatStarCount(stars) : "GitHub"}</>;
}
