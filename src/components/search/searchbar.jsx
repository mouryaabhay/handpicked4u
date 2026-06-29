import React, { useRef, useEffect } from "react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Command, Search } from "lucide-react";

export default function Searchbar({ value, onChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <InputGroup>
      <InputGroupInput
        ref={inputRef}
        placeholder="Search for resources..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <InputGroupAddon className="text-sm text-muted-foreground">
        <Search />
      </InputGroupAddon>
      <InputGroupAddon
        align="end"
        className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground mr-1.5"
      >
        <kbd className="border bg-muted py-1 px-2 text-xs font-semibold">/</kbd>
        <span className="text-xs text-muted-foreground">or</span>
        <kbd className="flex gap-1 p-1 items-center align-middle border bg-muted text-xs font-semibold">
          <Command size={14} />
          <span>K</span>
        </kbd>
      </InputGroupAddon>
    </InputGroup>
  );
}
