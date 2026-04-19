import React from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

function formatSectionName(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  const section = parts[parts.length - 1] || "Built for people who build.";
  return decodeURIComponent(section)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function HeaderCurrentSection({ className }) {
  const location = useLocation();
  const currentSection = formatSectionName(location.pathname);

  return (
    <h1 className={clsx("text-base font-medium", className)}>
      {currentSection}
    </h1>
  );
}
