"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Shapes } from "lucide-react";
import { handleScroll } from "@/utils/handle-scroll";
import { GOOGLE_FORM_URL } from "@/constant/global";

export default function HeroSection() {
  const handleOpenForm = () => {
    window.open(GOOGLE_FORM_URL, "_blank");
  };

  return (
    <section
      id="hero-section"
      className="my-20 flex flex-col items-center justify-center mx-4 sm:mx-8 lg:mx-20 text-center"
    >
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-600">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
        Handpicked is now live!
      </div>

      <div className="max-w-4xl space-y-6">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance">
          The shortlist. For everything.
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed">
          Handpicked is where the best tools, resources, and references live -
          curated across AI, design, development, and beyond.
        </p>
        <p className="text-base sm:text-lg text-muted-foreground/90 font-semibold">
          We don&apos;t collect. We choose. There&apos;s a difference.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Button size="lg" onClick={() => handleScroll("resources-section")}>
          <Search />
          Explore Resources
        </Button>
        <Button size="lg" variant="secondary" onClick={handleOpenForm}>
          <Shapes />
          Submit Resource
        </Button>
      </div>
    </section>
  );
}
