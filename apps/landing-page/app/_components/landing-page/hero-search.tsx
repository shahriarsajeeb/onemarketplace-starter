"use client";

import { Icon } from "@iconify/react";
import { FormEvent, useRef, useState } from "react";

export function HeroSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(
    "What do you need help with?",
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    document.getElementById("talent")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (trimmedQuery) {
      setQuery("");
      setPlaceholder(`Showing talent for “${trimmedQuery}”`);
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 shadow-sm">
        <Icon
          icon="solar:magnifer-linear"
          width="20"
          className="text-[#747873]"
          strokeWidth="1.5"
        />
        <input
          ref={inputRef}
          id="hero-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-[#252724] outline-none placeholder:text-[#9a9d98]"
        />
      </div>
      <button
        id="search-button"
        type="submit"
        className="cursor-pointer rounded-xl bg-[#242622] px-5 py-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#3c403a]"
      >
        Find talent
      </button>
    </form>
  );
}
