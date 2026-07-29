"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  clientProposals,
  clientTalentProfiles,
  type ClientProposal,
} from "../data/client-data";

type AccountFilter = "All" | "Freelancer" | "Agency";

const marketplaceProfiles = [
  ...clientTalentProfiles,
  ...clientProposals.filter(
    (proposal) => proposal.accountType === "Agency",
  ),
];

const popularSearches = [
  "Next.js",
  "Product design",
  "Applied AI",
  "Design systems",
];

export function MarketplaceSearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [accountFilter, setAccountFilter] = useState<AccountFilter>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return marketplaceProfiles.filter((profile) => {
      const matchesType =
        accountFilter === "All" || profile.accountType === accountFilter;
      const searchableText = [
        profile.bidder,
        profile.title,
        profile.location,
        profile.accountType,
        ...profile.skills,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesType &&
        (!normalizedQuery || searchableText.includes(normalizedQuery))
      );
    });
  }, [accountFilter, query]);

  useEffect(() => {
    const openWithShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", openWithShortcut);
    return () => document.removeEventListener("keydown", openWithShortcut);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    setQuery("");
    setAccountFilter("All");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-black/8 px-3 text-[#656b63] transition-colors hover:border-[#a8bda5] hover:bg-[#f5f8f3] sm:w-60 xl:w-72"
        aria-label="Search talent and agencies"
      >
        <Icon icon="solar:magnifer-linear" width="19" />
        <span className="hidden flex-1 text-left text-xs sm:block">
          Search marketplace
        </span>
        <span className="hidden rounded-md border border-black/8 bg-[#f4f6f2] px-1.5 py-1 text-[9px] text-[#8b9089] sm:block">
          ⌘ K
        </span>
      </button>

      {open &&
        createPortal(
        <div
          className="fixed inset-0 z-60 flex items-start justify-center bg-[#172017]/38 px-3 py-5 backdrop-blur-[3px] sm:px-6 sm:py-16"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="marketplace-search-title"
            className="flex max-h-[calc(100svh-2.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_30px_100px_rgba(20,28,20,.28)] sm:max-h-[calc(100svh-8rem)]"
          >
            <header className="border-b border-black/7 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-[.13em] text-[#62805f] uppercase">
                    Marketplace search
                  </p>
                  <h2
                    id="marketplace-search-title"
                    className="mt-1 text-lg font-semibold"
                  >
                    Find talent or an agency
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close marketplace search"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/8 text-[#697067] hover:bg-black/4"
                >
                  <Icon icon="solar:close-circle-linear" width="21" />
                </button>
              </div>

              <label className="mt-4 flex h-13 items-center gap-3 rounded-xl border border-black/10 bg-[#f8faf7] px-4 focus-within:border-[#82a17f] focus-within:ring-3 focus-within:ring-[#dfeadb]">
                <Icon
                  icon="solar:magnifer-linear"
                  width="21"
                  className="shrink-0 text-[#657064]"
                />
                <span className="sr-only">Search marketplace</span>
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, role, location, or skill"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9ba19a]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-[10px] font-semibold text-[#52784f]"
                  >
                    Clear
                  </button>
                )}
              </label>

              <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-1 rounded-lg bg-[#f0f3ed] p-1">
                  {(["All", "Freelancer", "Agency"] as AccountFilter[]).map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={accountFilter === option}
                        onClick={() => setAccountFilter(option)}
                        className={`h-8 rounded-md px-3 text-[10px] font-semibold ${
                          accountFilter === option
                            ? "bg-white text-[#52784f] shadow-sm"
                            : "text-[#727870]"
                        }`}
                      >
                        {option === "Freelancer" ? "Talent" : option}
                      </button>
                    ),
                  )}
                </div>
                <p className="text-[10px] text-[#858b83]">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </p>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {!query && accountFilter === "All" && (
                <div className="flex flex-wrap items-center gap-2 border-b border-black/6 px-4 py-3 sm:px-5">
                  <span className="mr-1 text-[10px] text-[#858b83]">
                    Popular:
                  </span>
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="rounded-lg bg-[#f1f4ef] px-2.5 py-1.5 text-[10px] text-[#596257] hover:bg-[#e4ede1] hover:text-[#52784f]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}

              {results.length ? (
                <div className="grid sm:grid-cols-2">
                  {results.map((profile) => (
                    <SearchResult
                      key={`${profile.accountType}-${profile.id}`}
                      profile={profile}
                      closeModal={closeModal}
                      setQuery={setQuery}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4ea] text-[#52784f]">
                    <Icon icon="solar:user-search-linear" width="25" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold">
                    No matching profiles
                  </h3>
                  <p className="mt-2 max-w-sm text-xs leading-5 text-[#7b8078]">
                    Try another name, role, location, or skill.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>,
          document.body,
        )}
    </>
  );
}

function SearchResult({
  profile,
  closeModal,
  setQuery,
}: {
  profile: ClientProposal;
  closeModal: () => void;
  setQuery: (query: string) => void;
}) {
  const agency = profile.accountType === "Agency";
  const profileHref = agency
    ? `/agency/${profile.id}`
    : `/talent/${profile.id}`;

  return (
    <article className="border-b border-black/6 p-4 odd:sm:border-r sm:p-5">
      <div className="flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center bg-[#527a73] text-xs font-semibold text-white ${
            agency ? "rounded-xl" : "rounded-full"
          }`}
        >
          {profile.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-xs font-semibold">{profile.bidder}</h3>
            {profile.verified && (
              <Icon
                icon="solar:verified-check-bold"
                width="14"
                className="shrink-0 text-[#5b8658]"
              />
            )}
            <span className="rounded-full bg-[#eef3eb] px-2 py-1 text-[8px] font-semibold text-[#587655]">
              {agency ? "Agency" : "Talent"}
            </span>
          </div>
          <p className="mt-1 truncate text-[10px] text-[#686f66]">
            {profile.title}
          </p>
          <p className="mt-1 flex items-center gap-1 text-[9px] text-[#929790]">
            <Icon icon="solar:map-point-linear" width="12" />
            <span className="truncate">{profile.location}</span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex min-h-5 flex-wrap items-center gap-1.5">
        {profile.skills.slice(0, 3).map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => setQuery(skill)}
            className="inline-flex h-5 items-center rounded-md bg-[#f0f3ed] px-2 text-[9px] leading-none font-medium text-[#667064] transition-colors hover:bg-[#e4ede1] hover:text-[#52784f]"
          >
            {skill}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/6 pt-3">
        <div className="flex gap-3 text-[9px] text-[#81877f]">
          <span>
            <strong className="text-[10px] text-[#30332f]">
              {profile.jobSuccess}%
            </strong>{" "}
            success
          </span>
          <span className="flex items-center gap-1">
            <Icon icon="solar:star-bold" width="11" className="text-[#d3a631]" />
            <strong className="text-[10px] text-[#30332f]">
              {profile.rating}
            </strong>
          </span>
        </div>
        <Link
          href={profileHref}
          onClick={closeModal}
          className="inline-flex h-8 items-center justify-center gap-1 rounded-lg bg-[#252724] px-3 text-[10px] font-semibold text-white"
        >
          View profile
          <Icon icon="solar:arrow-right-up-linear" width="13" />
        </Link>
      </div>
    </article>
  );
}
