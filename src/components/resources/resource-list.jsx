import React, { useContext, useEffect, useMemo, useState } from "react";
import { BookmarksContext } from "@/store/bookmarks";
import { Separator } from "@/components/ui/separator";
import ResourceCard from "./resource-card";

export default function ResourcesList({ query = "" }) {
  const { bookmarks } = useContext(BookmarksContext);
  const [categories, setCategories] = useState([]);
  const [isLoadingResources, setIsLoadingResources] = useState(true);
  const [resourcesError, setResourcesError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadResources = async () => {
      setIsLoadingResources(true);
      setResourcesError("");

      try {
        const params = new URLSearchParams();
        if (query?.trim()) {
          params.set("q", query.trim());
        }
        params.set("limit", "9");

        const endpoint = `/api/resources?${params.toString()}`;
        const response = await fetch(endpoint, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (controller.signal.aborted) return;
        setCategories(Array.isArray(payload?.categories) ? payload.categories : []);
      } catch (error) {
        if (controller.signal.aborted) return;
        setCategories([]);
        setResourcesError(error?.message || "Failed to load resources");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingResources(false);
        }
      }
    };

    loadResources();

    return () => controller.abort();
  }, [query]);

  // Add a "Favorites" pseudo-category at the top
  const favoritesCategory = bookmarks.length
    ? [{ name: "Favorites", tags: bookmarks }]
    : [];

  const allCategories = useMemo(
    () => [...favoritesCategory, ...categories],
    [favoritesCategory, categories]
  );

  if (isLoadingResources) {
    return <p>Loading resources...</p>;
  }

  if (resourcesError) {
    return <p>Unable to load resources right now.</p>;
  }

  if (!allCategories.length) return <p>No resources found.</p>;

  return (
    <div className="flex flex-col gap-4">
      {allCategories.map((category) => {
        const categoryId = category.name.toLowerCase().replace(/\s+/g, "-");

        return (
          <section
            key={category.name}
            id={categoryId}
            className="flex flex-col gap-8 py-4 md:px-8"
          >
            {/* Header */}
            <div className="flex items-center gap-4 justify-start w-full">
              <h2 className="text-2xl font-bold truncate">{category.name}</h2>
              <Separator className="flex-1" />
            </div>

            {/* Cards grid */}
            <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {category.tags.map((resource) => (
                <li key={resource.url}>
                  <ResourceCard
                    name={resource.name}
                    url={resource.url}
                    imageUrl={resource.imageUrl}
                    tags={resource.tags || []}
                    badges={resource.badges || []}
                    className="w-full" // Card takes full width of the grid cell
                  />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
