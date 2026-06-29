import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import HeaderGitHubButton from "@/components/header/header-github-button";
import ThemeToggle from "@/components/themes/theme-toggle";
import RandomZinger from "@/components/header/random-zinger";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center gap-2 px-4 lg:px-6 py-4 h-[--header-height] shrink-0 bg-background/80 backdrop-blur-md">
      <div className="flex items-center align-middle gap-2 h-full">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mx-2 h-1" />

        <RandomZinger />
      </div>

      <div className="flex items-center align-middle gap-2 h-full">
        <HeaderGitHubButton />

        <Separator orientation="vertical" className="mx-2 h-1" />

        <ThemeToggle />
      </div>
    </header>
  );
}
