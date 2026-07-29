"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

const completedWork = [
  {
    project: "Real-time product workspace",
    client: "Northstar Labs",
    completed: "July 2026",
    budget: "$11,500",
    rating: "5.0",
    review:
      "Excellent product judgment, communication, and execution. Every milestone was thoughtful, polished, and delivered as promised.",
  },
  {
    project: "Research platform architecture",
    client: "Lumen Research",
    completed: "May 2026",
    budget: "$8,400",
    rating: "4.9",
    review:
      "A deeply capable partner who simplified a difficult product and left our team with a dependable foundation.",
  },
  {
    project: "Healthcare operations dashboard",
    client: "Wellmade Health",
    completed: "February 2026",
    budget: "$6,800",
    rating: "5.0",
    review:
      "Reliable from discovery through delivery. The final product was accessible, fast, and easy for our team to maintain.",
  },
  {
    project: "Commerce design system",
    client: "Aster Technologies",
    completed: "November 2025",
    budget: "$9,200",
    rating: "4.8",
    review:
      "Strong communication and excellent attention to detail. The reusable system made our subsequent releases much faster.",
  },
];

const itemsPerPage = 2;

export function WorkHistoryPagination({
  averageRating,
}: {
  averageRating: number;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(completedWork.length / itemsPerPage);
  const pageStart = (page - 1) * itemsPerPage;
  const visibleWork = completedWork.slice(
    pageStart,
    pageStart + itemsPerPage,
  );

  const openPage = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return (
    <section className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[.13em] text-[#62805f] uppercase">
            Client feedback
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            Completed work and reviews
          </h2>
        </div>
        <p className="text-xs text-[#8a8f87]">
          {averageRating} average rating
        </p>
      </div>

      <div className="grid gap-4">
        {visibleWork.map((work) => (
          <article
            key={work.project}
            className="rounded-xl border border-black/7 p-5"
          >
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">{work.project}</h3>
                <p className="mt-1 text-xs text-[#7b8078]">
                  {work.client} · Completed {work.completed}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{work.budget}</p>
                <span className="mt-1 flex items-center justify-end gap-1 text-xs font-semibold">
                  <Icon
                    icon="solar:star-bold"
                    width="15"
                    className="text-[#d4a934]"
                  />
                  {work.rating}
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#626861]">
              “{work.review}”
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-black/7 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#838980]">
          Showing {pageStart + 1}–
          {Math.min(pageStart + itemsPerPage, completedWork.length)} of{" "}
          {completedWork.length} completed projects
        </p>
        <nav
          aria-label="Work history pagination"
          className="flex items-center gap-2"
        >
          <button
            type="button"
            aria-label="Previous work history page"
            disabled={page === 1}
            onClick={() => openPage(page - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Icon icon="solar:alt-arrow-left-linear" width="16" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const active = pageNumber === page;

            return (
              <button
                key={pageNumber}
                type="button"
                aria-label={`Open work history page ${pageNumber}`}
                aria-current={active ? "page" : undefined}
                onClick={() => openPage(pageNumber)}
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
            aria-label="Next work history page"
            disabled={page === totalPages}
            onClick={() => openPage(page + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Icon icon="solar:alt-arrow-right-linear" width="16" />
          </button>
        </nav>
      </div>
    </section>
  );
}
