"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { featuredMembers } from "./profile-data";

export function FeaturedMembers() {
  const [expanded, setExpanded] = useState(false);
  const visibleMembers = expanded
    ? featuredMembers
    : featuredMembers.slice(0, 4);
  const remainingCount = featuredMembers.length - 4;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        {visibleMembers.map((member) => (
          <article
            key={member.id}
            className="flex items-center gap-4 rounded-xl border border-black/7 p-4"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#527a73] text-xs font-semibold text-white">
              {member.initials}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold">{member.name}</h3>
              <p className="mt-1 text-xs text-[#70766e]">{member.role}</p>
              <p className="mt-1 truncate text-[10px] text-[#969a93]">
                {member.skills}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/7 pt-5">
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-black/10 px-4 text-xs font-semibold transition hover:bg-[#f6f8f4]"
        >
          <Icon
            icon={
              expanded
                ? "solar:alt-arrow-up-linear"
                : "solar:alt-arrow-down-linear"
            }
            width="16"
          />
          {expanded ? "Show fewer members" : `Show ${remainingCount} more members`}
        </button>
        <Link
          href="/team"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white"
        >
          Manage full team
          <Icon icon="solar:arrow-right-up-linear" width="15" />
        </Link>
      </div>
    </>
  );
}
