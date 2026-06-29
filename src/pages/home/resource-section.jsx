import React, { useState, useEffect } from "react";
import ResourcesList from "@/components/resources/resource-list";
import Searchbar from "@/components/search/searchbar";
import { useDebounce } from "@/hooks/use-debounce";

export default function ResourcesSection() {
  // Initialize query from URL
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  // Debounced query
  const debouncedQuery = useDebounce(query, 300);

  // Update URL whenever debouncedQuery changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedQuery) {
      params.set("q", debouncedQuery);
      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    } else {
      // Remove ? if query is empty
      if (params.has("q")) {
        params.delete("q");
        const newUrl = params.toString()
          ? `${window.location.pathname}?${params.toString()}`
          : window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, [debouncedQuery]);

  return (
    <div
      id="resources-section"
      className="flex flex-col gap-4 m-8 lg:mx-24"
    >
      <Searchbar value={query} onChange={setQuery} />
      <ResourcesList query={debouncedQuery} />
    </div>
  );
}
