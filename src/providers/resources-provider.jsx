import React, { useEffect, useMemo, useState } from "react";
import { ResourcesProviderContext } from "../contexts/resources-context";

export default function ResourcesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      setIsLoadingCategories(true);
      setCategoriesError("");

      try {
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (!isMounted) return;
        setCategories(Array.isArray(payload?.categories) ? payload.categories : []);
      } catch (error) {
        if (!isMounted) return;
        setCategories([]);
        setCategoriesError(error?.message || "Failed to load categories");
      } finally {
        if (isMounted) {
          setIsLoadingCategories(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const providerValue = useMemo(
    () => ({
      categories,
      isLoadingCategories,
      categoriesError,
    }),
    [categories, isLoadingCategories, categoriesError]
  );

  return (
    <ResourcesProviderContext.Provider value={providerValue}>
      {children}
    </ResourcesProviderContext.Provider>
  );
};
