"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

const members = [
  { id: 1, initials: "SK", name: "Shahriar Sajeeb", role: "Full-stack product engineer" },
  { id: 6, initials: "MR", name: "Maya Robinson", role: "Machine learning engineer" },
  { id: 3, initials: "DC", name: "Daniel Cho", role: "Senior software engineer" },
  { id: 4, initials: "AM", name: "Amelia Morgan", role: "Senior product designer" },
  { id: 7, initials: "NR", name: "Nadia Rahman", role: "Product manager" },
  { id: 8, initials: "LM", name: "Lucas Martin", role: "Frontend engineer" },
  { id: 9, initials: "PN", name: "Priya Nair", role: "Data engineer" },
  { id: 10, initials: "EW", name: "Ethan Williams", role: "Cloud infrastructure engineer" },
];

const membersPerPage = 4;

export function AgencyMembersPagination() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(members.length / membersPerPage);
  const start = (page - 1) * membersPerPage;
  const visibleMembers = members.slice(start, start + membersPerPage);

  return (
    <section className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[.13em] text-[#62805f] uppercase">
            Our specialists
          </p>
          <h2 className="mt-2 text-xl font-semibold">Featured agency members</h2>
        </div>
        <p className="text-xs text-[#8a8f87]">
          {start + 1}–{Math.min(start + membersPerPage, members.length)} of{" "}
          {members.length} members
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {visibleMembers.map((member) => (
          <Link
            key={member.id}
            href={`/talent/${member.id}`}
            aria-label={`View ${member.name}'s profile`}
            className="group flex items-center gap-3 rounded-xl border border-black/7 p-4 transition-colors hover:border-[#9fb99c] hover:bg-[#f6f9f4]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#527a73] text-xs font-semibold text-white">
              {member.initials}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold">{member.name}</h3>
              <p className="mt-1 truncate text-xs text-[#70766e]">
                {member.role}
              </p>
            </div>
            <Icon
              icon="solar:arrow-right-up-linear"
              width="18"
              className="shrink-0 text-[#7d847b] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#52784f]"
            />
          </Link>
        ))}
      </div>

      <nav
        aria-label="Agency members pagination"
        className="mt-5 flex items-center justify-between border-t border-black/7 pt-5"
      >
        <p className="text-xs text-[#838980]">Page {page} of {totalPages}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous members page"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(current - 1, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Icon icon="solar:alt-arrow-left-linear" width="16" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const active = page === pageNumber;

            return (
              <button
                key={pageNumber}
                type="button"
                aria-label={`Open agency members page ${pageNumber}`}
                aria-current={active ? "page" : undefined}
                onClick={() => setPage(pageNumber)}
                className={`h-9 min-w-9 rounded-lg px-3 text-xs font-semibold ${
                  active
                    ? "bg-[#e9f1e6] text-[#4f794c]"
                    : "border border-black/10 text-[#656b63]"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            type="button"
            aria-label="Next members page"
            disabled={page === totalPages}
            onClick={() =>
              setPage((current) => Math.min(current + 1, totalPages))
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Icon icon="solar:alt-arrow-right-linear" width="16" />
          </button>
        </div>
      </nav>
    </section>
  );
}
