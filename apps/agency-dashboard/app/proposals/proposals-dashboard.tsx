"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AgencyShell } from "../_components/dashboard/agency-shell";
import { ProposalDrawer } from "../_components/proposals/proposal-drawer";
import {
  initialAgencyProposals,
  proposalStatusStyles,
} from "../_components/proposals/proposals-data";
import type {
  AgencyProposal,
  AgencyProposalStatus,
} from "../_components/proposals/types";
import { Icon } from "../_components/ui/icon";

const tabs = [
  "All",
  "Interview",
  "Viewed",
  "Submitted",
  "Archived",
  "Withdrawn",
] as const;
const proposalsPerPage = 3;

export function ProposalsDashboard() {
  const [proposals, setProposals] = useState(initialAgencyProposals);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AgencyProposal | null>(null);
  const [page, setPage] = useState(1);
  const [withdrawTarget, setWithdrawTarget] =
    useState<AgencyProposal | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return proposals.filter(
      (proposal) =>
        (activeTab === "All" || proposal.status === activeTab) &&
        (!query ||
          `${proposal.title} ${proposal.client} ${proposal.skills.join(" ")}`
            .toLowerCase()
            .includes(query)),
    );
  }, [activeTab, proposals, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / proposalsPerPage),
  );
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * proposalsPerPage;
  const visibleProposals = filtered.slice(
    pageStart,
    pageStart + proposalsPerPage,
  );

  const count = (status: AgencyProposalStatus) =>
    proposals.filter((proposal) => proposal.status === status).length;

  const withdrawProposal = () => {
    if (!withdrawTarget) return;
    setProposals((current) =>
      current.map((proposal) =>
        proposal.id === withdrawTarget.id
          ? {
              ...proposal,
              status: "Withdrawn",
              activity: "Withdrawn just now",
            }
          : proposal,
      ),
    );
    setSelected((current) =>
      current?.id === withdrawTarget.id
        ? {
            ...current,
            status: "Withdrawn",
            activity: "Withdrawn just now",
          }
        : current,
    );
    setWithdrawTarget(null);
  };

  return (
    <AgencyShell>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">
            Opportunity pipeline
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Agency proposals
          </h1>
          <p className="mt-2 text-sm text-[#72776f]">
            Track client activity and every proposal submitted as Northstar
            Digital.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
        >
          <Icon name="search" size={18} /> Find more work
        </Link>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            "Interview",
            count("Interview"),
            "message",
            "bg-[#e7f2e4] text-[#4d784a]",
          ],
          [
            "Viewed",
            count("Viewed"),
            "proposal",
            "bg-[#e8eff4] text-[#4c6e86]",
          ],
          [
            "Submitted",
            count("Submitted"),
            "arrow",
            "bg-[#f1f0e6] text-[#766f47]",
          ],
          [
            "Agency Connects used",
            proposals
              .filter((proposal) => proposal.status !== "Withdrawn")
              .reduce((total, proposal) => total + proposal.connects, 0),
            "wallet",
            "bg-[#eeeaf5] text-[#6b5d82]",
          ],
        ].map(([label, value, icon, color]) => (
          <div
            key={String(label)}
            className="flex items-center gap-4 rounded-2xl border border-black/8 bg-white p-5"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
            >
              <Icon
                name={icon as "message"}
                size={22}
              />
            </span>
            <div>
              <p className="text-2xl font-semibold tracking-[-0.04em]">
                {value}
              </p>
              <p className="mt-0.5 text-xs text-[#7c8179]">{label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-black/8 bg-white">
        <div className="flex flex-col gap-4 border-b border-black/7 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setPage(1);
                }}
                className={`shrink-0 cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold ${
                  activeTab === tab
                    ? "bg-[#edf4ea] text-[#4e774b]"
                    : "text-[#747971] hover:bg-black/3"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <label className="flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 sm:w-72">
            <Icon name="search" size={18} className="text-[#7b8078]" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search agency proposals"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </label>
        </div>

        {visibleProposals.map((proposal, index) => (
          <article
            key={proposal.id}
            className={`p-5 sm:p-6 ${
              index ? "border-t border-black/7" : ""
            }`}
          >
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      proposalStatusStyles[proposal.status]
                    }`}
                  >
                    {proposal.status}
                  </span>
                  <span className="text-xs text-[#858a82]">
                    Submitted {proposal.submitted}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em]">
                  {proposal.title}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#737870]">
                  <strong className="text-[#343833]">{proposal.client}</strong>
                  <span className="text-[#d1a238]">
                    ★ {proposal.clientRating}
                  </span>
                  <span>{proposal.clientSpent}</span>
                </div>
                <p
                  className={`mt-4 text-xs font-medium ${
                    proposal.status === "Interview"
                      ? "text-[#4d784a]"
                      : "text-[#737870]"
                  }`}
                >
                  {proposal.activity}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                <div>
                  <p className="text-sm font-semibold">{proposal.agencyBid}</p>
                  <p className="mt-1 text-[11px] text-[#858a82]">
                    Agency bid · {proposal.duration}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(proposal)}
                  className="h-10 cursor-pointer rounded-xl border border-black/10 px-4 text-xs font-semibold hover:bg-black/3"
                >
                  View proposal
                </button>
                {proposal.status === "Interview" && (
                  <Link
                    href="/messages"
                    className="inline-flex h-10 items-center rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white"
                  >
                    Message client
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}

        {!filtered.length && (
          <div className="px-6 py-16 text-center">
            <Icon
              name="proposal"
              size={34}
              className="mx-auto text-[#858a82]"
            />
            <h2 className="mt-4 font-semibold">No proposals found</h2>
            <p className="mt-2 text-sm text-[#7c8179]">
              Try another status or search term.
            </p>
          </div>
        )}

        {filtered.length > 0 && (
          <footer className="flex flex-col gap-3 border-t border-black/7 bg-[#fafbf9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#7c8179]">
              Showing {pageStart + 1}–
              {Math.min(pageStart + proposalsPerPage, filtered.length)} of{" "}
              {filtered.length} proposals
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={currentPage === 1}
                className="inline-flex h-9 items-center gap-1 rounded-xl border border-black/9 bg-white px-3 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Icon name="arrow-left" size={15} />
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    aria-label={`Go to proposals page ${pageNumber}`}
                    aria-current={
                      currentPage === pageNumber ? "page" : undefined
                    }
                    className={`h-9 min-w-9 rounded-xl px-2 text-xs font-semibold ${
                      currentPage === pageNumber
                        ? "bg-[#252724] text-white"
                        : "border border-black/9 bg-white text-[#6e736c]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                disabled={currentPage === totalPages}
                className="inline-flex h-9 items-center gap-1 rounded-xl border border-black/9 bg-white px-3 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-35"
              >
                Next
                <Icon name="arrow-right" size={15} />
              </button>
            </div>
          </footer>
        )}
      </section>

      {selected && (
        <ProposalDrawer
          proposal={selected}
          onClose={() => setSelected(null)}
          onWithdraw={setWithdrawTarget}
        />
      )}

      {withdrawTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-semibold">Withdraw agency proposal?</h2>
            <p className="mt-2 text-sm leading-6 text-[#737870]">
              Northstar Digital will no longer be considered for “
              {withdrawTarget.title}.” This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setWithdrawTarget(null)}
                className="h-10 cursor-pointer rounded-xl border border-black/10 px-4 text-xs font-semibold"
              >
                Keep proposal
              </button>
              <button
                type="button"
                onClick={withdrawProposal}
                className="h-10 cursor-pointer rounded-xl bg-[#8b5656] px-4 text-xs font-semibold text-white"
              >
                Withdraw proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </AgencyShell>
  );
}
