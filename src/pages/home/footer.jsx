"use client";

import { handpickedProjectDetails } from "@/constants";
import React from "react";

export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-gray-400">
      <p>Handpicked © 2025 — Curated Quality Resources</p>
      <p>
        Built by{" "}
        <a
          href={`https://github.com/${handpickedProjectDetails.repoOwner}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          @{handpickedProjectDetails.repoOwner}
        </a>
      </p>
    </footer>
  );
}
