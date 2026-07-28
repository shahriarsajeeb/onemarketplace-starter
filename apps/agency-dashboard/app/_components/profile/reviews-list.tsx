"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { agencyReviews } from "./profile-data";

const REVIEWS_PER_PAGE = 2;

export function ReviewsList() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(agencyReviews.length / REVIEWS_PER_PAGE);
  const start = (page - 1) * REVIEWS_PER_PAGE;
  const visibleReviews = agencyReviews.slice(
    start,
    start + REVIEWS_PER_PAGE,
  );

  const openPage = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return (
    <>
      <div className="grid gap-4">
        {visibleReviews.map((review) => (
          <article
            key={review.id}
            className="rounded-xl border border-black/7 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">{review.project}</h3>
                <p className="mt-1 text-xs text-[#7b8078]">
                  {review.client} · {review.company}
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-[#6d6b43]">
                <Icon
                  icon="solar:star-bold"
                  width="15"
                  className="text-[#d4a934]"
                />
                {review.rating}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#626861]">
              “{review.review}”
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-black/7 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#858a82]">
          Showing {start + 1}–
          {Math.min(start + REVIEWS_PER_PAGE, agencyReviews.length)} of{" "}
          {agencyReviews.length} reviews
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {page > 1 && (
            <button
              type="button"
              onClick={() => openPage(page - 1)}
              className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-xl border border-black/10 px-3 text-xs font-semibold hover:bg-[#f6f8f4]"
            >
              <Icon icon="solar:alt-arrow-left-linear" width="15" />
              Previous
            </button>
          )}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  aria-label={`Open reviews page ${pageNumber}`}
                  aria-current={page === pageNumber ? "page" : undefined}
                  onClick={() => openPage(pageNumber)}
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-xs font-semibold ${
                    page === pageNumber
                      ? "bg-[#edf4ea] text-[#4e774b]"
                      : "hover:bg-black/4"
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}
          </div>
          {page < totalPages && (
            <button
              type="button"
              onClick={() => openPage(page + 1)}
              className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white"
            >
              See more reviews
              <Icon icon="solar:alt-arrow-right-linear" width="15" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
