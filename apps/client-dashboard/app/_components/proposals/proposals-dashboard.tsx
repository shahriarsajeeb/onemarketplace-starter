"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  clientJobs,
  clientProposals,
  type ClientJob,
  type ClientProposal,
} from "../data/client-data";

const proposalsPerPage = 2;

export function ProposalsDashboard({
  initialJobId = null,
}: {
  initialJobId?: number | null;
}) {
  const router = useRouter();
  const [selectedJobId, setSelectedJobId] = useState<number | null>(
    initialJobId,
  );
  const [filter, setFilter] = useState("All");
  const [proposals, setProposals] = useState(clientProposals);
  const [selectedProposal, setSelectedProposal] =
    useState<ClientProposal | null>(null);
  const [notice, setNotice] = useState("");
  const [page, setPage] = useState(1);

  const selectedJob = clientJobs.find((job) => job.id === selectedJobId);
  const filteredProposals = proposals.filter(
    (proposal) =>
      proposal.jobId === selectedJobId &&
      (filter === "All" || proposal.status === filter),
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProposals.length / proposalsPerPage),
  );
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * proposalsPerPage;
  const visibleProposals = filteredProposals.slice(
    pageStart,
    pageStart + proposalsPerPage,
  );

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3500);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const updateStatus = (
    proposalId: number,
    status: ClientProposal["status"],
  ) => {
    setProposals((current) =>
      current.map((proposal) =>
        proposal.id === proposalId ? { ...proposal, status } : proposal,
      ),
    );
    setSelectedProposal((current) =>
      current?.id === proposalId ? { ...current, status } : current,
    );
    setNotice(`Proposal moved to ${status.toLowerCase()}.`);
  };

  const startInterview = (proposal: ClientProposal) => {
    updateStatus(proposal.id, "Interview");
    setSelectedProposal(null);
    router.push(
      `/messages?person=${encodeURIComponent(proposal.bidder)}&action=interview`,
    );
  };

  const hireProposal = (proposal: ClientProposal) => {
    updateStatus(proposal.id, "Offer sent");
    setSelectedProposal(null);
    router.push(
      `/messages?person=${encodeURIComponent(proposal.bidder)}&action=contract-offer`,
    );
  };

  if (!selectedJob) {
    return (
      <>
        <PageHeading />
        <section className="mt-8 grid gap-4">
          {clientJobs.map((job) => (
            <JobProposalCard
              key={job.id}
              job={job}
              onView={() => {
                setSelectedJobId(job.id);
                setFilter("All");
                setPage(1);
                setNotice("");
              }}
            />
          ))}
        </section>
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setSelectedJobId(null);
          setPage(1);
          setNotice("");
        }}
        className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#52784f]"
      >
        <Icon icon="solar:arrow-left-linear" width="15" />
        Back to job posts
      </button>

      <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[.14em] text-[#62805f] uppercase">
            Proposal review
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
            {selectedJob.title}
          </h1>
          <p className="mt-2 text-sm text-[#72776f]">
            Compare every freelancer and agency that applied to this job.
          </p>
        </div>
        {selectedJob.hires > 0 ? (
          <Link
            href="/contracts"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold"
          >
            <Icon icon="solar:case-round-linear" width="17" />
            View contract
          </Link>
        ) : (
          <Link
            href={`/jobs/${selectedJob.id}/edit`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold"
          >
            <Icon icon="solar:pen-2-linear" width="17" />
            Edit job post
          </Link>
        )}
      </div>

      <section className="mt-6 rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-4">
          <JobMetric label="Fixed budget" value={`$${selectedJob.budget.toLocaleString()}`} />
          <JobMetric label="Proposals" value={String(selectedJob.proposals)} />
          <JobMetric label="Shortlisted" value={String(selectedJob.shortlisted)} />
          <JobMetric label="Hires" value={String(selectedJob.hires)} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2 border-t border-black/7 pt-5">
          {selectedJob.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-[#f0f3ee] px-2.5 py-1.5 text-[10px] text-[#657062]"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {notice && (
        <p
          role="status"
          className="mt-5 rounded-xl bg-[#e7f2e4] p-3 text-xs font-semibold text-[#4d784a]"
        >
          {notice}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[
            "All",
            "New",
            "Shortlisted",
            "Interview",
            "Offer sent",
            "Rejected",
            "Hired",
          ].map(
            (item) => {
              const count =
                item === "All"
                  ? proposals.filter(
                      (proposal) => proposal.jobId === selectedJob.id,
                    ).length
                  : proposals.filter(
                      (proposal) =>
                        proposal.jobId === selectedJob.id &&
                        proposal.status === item,
                    ).length;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setFilter(item);
                    setPage(1);
                  }}
                  className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg px-3 text-xs font-semibold ${
                    filter === item
                      ? "bg-[#edf4ea] text-[#4e774b]"
                      : "bg-white text-[#6f756d] hover:bg-black/3"
                  }`}
                >
                  {item}
                  <span className="text-[9px] opacity-65">{count}</span>
                </button>
              );
            },
          )}
        </div>
        <p className="text-xs text-[#858a82]">
          {filteredProposals.length
            ? `Showing ${pageStart + 1}–${Math.min(
                pageStart + proposalsPerPage,
                filteredProposals.length,
              )} of ${filteredProposals.length} proposals`
            : "No proposals shown"}
        </p>
      </div>

      <div className="mt-5 grid gap-4">
        {visibleProposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            onView={() => setSelectedProposal(proposal)}
            onShortlist={() => updateStatus(proposal.id, "Shortlisted")}
          />
        ))}
        {!visibleProposals.length && (
          <div className="rounded-2xl border border-dashed border-black/10 bg-white p-12 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf4ea] text-[#52784f]">
              <Icon icon="solar:users-group-rounded-linear" width="26" />
            </span>
            <h2 className="mt-4 text-sm font-semibold">
              No proposals in this view
            </h2>
            <p className="mt-2 text-xs text-[#858a82]">
              Choose another status or return to your job posts.
            </p>
          </div>
        )}
      </div>

      {filteredProposals.length > proposalsPerPage && (
        <ProposalPagination
          page={currentPage}
          totalPages={totalPages}
          totalResults={filteredProposals.length}
          pageStart={pageStart}
          onPageChange={setPage}
        />
      )}

      {selectedProposal && (
        <ProposalDrawer
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
          onDecline={() => {
            updateStatus(selectedProposal.id, "Rejected");
            setSelectedProposal(null);
          }}
          onInterview={() => startInterview(selectedProposal)}
          onHire={() => hireProposal(selectedProposal)}
        />
      )}
    </>
  );
}

function ProposalPagination({
  page,
  totalPages,
  totalResults,
  pageStart,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  totalResults: number;
  pageStart: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <nav
      aria-label="Proposals pagination"
      className="mt-5 flex flex-col gap-3 rounded-2xl border border-black/8 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-[10px] text-[#858a82]">
        Showing {pageStart + 1}–
        {Math.min(pageStart + proposalsPerPage, totalResults)} of {totalResults}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous proposals page"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-black/10 disabled:cursor-not-allowed disabled:opacity-35"
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
              aria-label={`Open proposals page ${pageNumber}`}
              aria-current={active ? "page" : undefined}
              onClick={() => onPageChange(pageNumber)}
              className={`h-9 min-w-9 cursor-pointer rounded-lg px-3 text-xs font-semibold ${
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
          aria-label="Next proposals page"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-black/10 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Icon icon="solar:alt-arrow-right-linear" width="16" />
        </button>
      </div>
    </nav>
  );
}

function PageHeading() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-semibold tracking-[.14em] text-[#62805f] uppercase">
          Talent review
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
          Proposals
        </h1>
        <p className="mt-2 text-sm text-[#72776f]">
          Choose a job post to review its freelancers and agencies.
        </p>
      </div>
      <Link
        href="/jobs/new"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
      >
        <Icon icon="solar:add-circle-linear" width="18" />
        Post another job
      </Link>
    </div>
  );
}

function JobProposalCard({
  job,
  onView,
}: {
  job: ClientJob;
  onView: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/8 bg-white">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  job.status === "Open"
                    ? "bg-[#e7f2e4] text-[#4d784a]"
                    : job.status === "Draft"
                      ? "bg-[#f1f0e7] text-[#766f47]"
                      : "bg-[#f0f1ef] text-[#767b74]"
                }`}
              >
                {job.status}
              </span>
              <span className="text-[10px] text-[#8a8f87]">{job.posted}</span>
            </div>
            <h2 className="mt-3 text-lg font-semibold">{job.title}</h2>
            <p className="mt-2 text-xs text-[#757b73]">
              Fixed price · ${job.budget.toLocaleString()} · {job.level} ·{" "}
              {job.duration}
            </p>
            <p className="mt-4 line-clamp-2 max-w-4xl text-sm leading-6 text-[#6f756d]">
              {job.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:min-w-72">
            <JobMetric label="Proposals" value={String(job.proposals)} />
            <JobMetric label="Shortlisted" value={String(job.shortlisted)} />
            <JobMetric label="Hires" value={String(job.hires)} />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {job.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-[#f0f3ee] px-2.5 py-1.5 text-[10px] text-[#657062]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-black/7 bg-[#fafbf9] px-5 py-4 sm:px-6">
        <p className="text-xs text-[#858a82]">
          {job.proposals
            ? `${job.proposals} people and agencies applied`
            : "No proposals received yet"}
        </p>
        <button
          type="button"
          disabled={job.proposals === 0}
          onClick={onView}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#c2c5c0]"
        >
          View proposals
          <Icon icon="solar:arrow-right-linear" width="15" />
        </button>
      </footer>
    </article>
  );
}

function ProposalCard({
  proposal,
  onView,
  onShortlist,
}: {
  proposal: ClientProposal;
  onView: () => void;
  onShortlist: () => void;
}) {
  return (
    <article className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex min-w-0 flex-1 gap-4">
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#527a73] text-sm font-semibold text-white">
            {proposal.initials}
            {proposal.online && (
              <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#5ca568]" />
            )}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{proposal.bidder}</h2>
              <span className="rounded-full bg-[#f0f3ee] px-2 py-1 text-[9px] font-semibold text-[#627260]">
                {proposal.accountType}
              </span>
              {proposal.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#52784f]">
                  <Icon icon="solar:verified-check-bold" width="14" />
                  Verified
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-[#70766e]">{proposal.title}</p>
            <p className="mt-2 text-xs text-[#8a8f87]">
              {proposal.location} · Submitted {proposal.submitted}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-left sm:grid-cols-4 lg:text-right">
          <Mini label="Bid" value={`$${proposal.bid.toLocaleString()}`} />
          <Mini label="Duration" value={proposal.duration} />
          <Mini label="Success" value={`${proposal.jobSuccess}%`} />
          <Mini label="Rating" value={String(proposal.rating)} />
        </div>
      </div>
      <p className="mt-5 line-clamp-2 text-sm leading-6 text-[#686e66]">
        {proposal.coverLetter}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {proposal.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-[#f0f3ee] px-2.5 py-1.5 text-[10px]"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/7 pt-4">
        <span className="rounded-full bg-[#edf4ea] px-3 py-1.5 text-[10px] font-semibold text-[#4e774b]">
          {proposal.status}
        </span>
        <div className="flex flex-wrap gap-2">
          <a
            href={getProfileHref(proposal)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-black/10 px-4 py-3 text-xs font-semibold"
          >
            View profile
            <Icon icon="solar:arrow-right-up-linear" width="14" />
          </a>
          <button
            type="button"
            onClick={onView}
            className="h-10 cursor-pointer rounded-xl border border-black/10 px-4 text-xs font-semibold"
          >
            View proposal
          </button>
          <Link
            href="/messages"
            className="h-10 rounded-xl border border-black/10 px-4 py-3 text-xs font-semibold"
          >
            Message
          </Link>
          {proposal.status !== "Shortlisted" && (
            <button
              type="button"
              onClick={onShortlist}
              className="h-10 cursor-pointer rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white"
            >
              Shortlist
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function JobMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#f3f5f1] p-3">
      <p className="text-base font-semibold">{value}</p>
      <p className="mt-1 text-[9px] text-[#858a82]">{label}</p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold">{value}</p>
      <p className="mt-1 text-[9px] text-[#8a8f87]">{label}</p>
    </div>
  );
}

function ProposalDrawer({
  proposal,
  onClose,
  onDecline,
  onInterview,
  onHire,
}: {
  proposal: ClientProposal;
  onClose: () => void;
  onDecline: () => void;
  onInterview: () => void;
  onHire: () => void;
}) {
  const [confirmDecline, setConfirmDecline] = useState(false);
  const [declineNote, setDeclineNote] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 bg-black/25"
      onMouseDown={(event) =>
        event.target === event.currentTarget && onClose()
      }
    >
      <aside className="absolute top-0 right-0 h-full w-full max-w-2xl overflow-y-auto bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#62805f]">
              {proposal.accountType} proposal
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{proposal.bidder}</h2>
            <p className="mt-1 text-sm text-[#747a72]">{proposal.title}</p>
          </div>
          <button type="button" onClick={onClose}>
            <Icon icon="solar:close-circle-linear" width="24" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            ["Bid", `$${proposal.bid.toLocaleString()}`],
            ["Duration", proposal.duration],
            ["Completed", String(proposal.completedProjects)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-[#f3f5f1] p-4">
              <p className="text-[10px] text-[#858a82]">{label}</p>
              <p className="mt-1 text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <section className="mt-6">
          <h3 className="text-sm font-semibold">Cover letter</h3>
          <p className="mt-3 text-sm leading-7 text-[#686e66]">
            {proposal.coverLetter}
          </p>
        </section>
        <section className="mt-6">
          <h3 className="text-sm font-semibold">Proposed milestones</h3>
          <div className="mt-3 divide-y divide-black/6 rounded-xl border border-black/7">
            {proposal.milestonePlan.map((item) => (
              <div
                key={item.title}
                className="flex justify-between gap-4 p-4"
              >
                <div>
                  <p className="text-xs font-semibold">{item.title}</p>
                  <p className="mt-1 text-[10px] text-[#858a82]">
                    {item.duration}
                  </p>
                </div>
                <p className="text-xs font-semibold">
                  ${item.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>
        <a
          href={getProfileHref(proposal)}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl border border-black/10 px-4 text-xs font-semibold"
        >
          <Icon
            icon={
              proposal.accountType === "Agency"
                ? "solar:buildings-2-linear"
                : "solar:user-circle-linear"
            }
            width="18"
          />
          View {proposal.accountType.toLowerCase()} profile
          <Icon icon="solar:arrow-right-up-linear" width="14" />
        </a>
        <div className="mt-7 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={() => setConfirmDecline(true)}
            className="h-11 rounded-xl border border-[#d8b8b8] px-4 text-xs font-semibold text-[#8b5656]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={onInterview}
            className="h-11 rounded-xl border border-black/10 px-4 text-xs font-semibold"
          >
            Start interview
          </button>
          <button
            type="button"
            onClick={onHire}
            className="h-11 rounded-xl bg-[#252724] px-5 text-xs font-semibold text-white"
          >
            Send contract offer
          </button>
        </div>
      </aside>
      {confirmDecline && (
        <div
          className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/50 p-5 backdrop-blur-[3px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setConfirmDecline(false);
            }
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="decline-proposal-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold tracking-[.12em] text-[#9a5a5a] uppercase">
                  Decline proposal
                </p>
                <h2
                  id="decline-proposal-title"
                  className="mt-2 text-xl font-semibold"
                >
                  Decline {proposal.bidder}?
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setConfirmDecline(false)}
                aria-label="Close decline confirmation"
                className="cursor-pointer text-[#697067]"
              >
                <Icon icon="solar:close-circle-linear" width="24" />
              </button>
            </div>

            <p className="mt-4 text-xs leading-6 text-[#70766e]">
              This proposal will move to Rejected and will no longer appear in
              your active review pipeline.
            </p>

            <label className="mt-5 block text-xs font-semibold">
              Note to {proposal.accountType.toLowerCase()}{" "}
              <span className="font-normal text-[#8a8f87]">(optional)</span>
              <textarea
                value={declineNote}
                onChange={(event) => setDeclineNote(event.target.value)}
                rows={4}
                placeholder="Share a brief reason or helpful feedback…"
                className="mt-2 w-full resize-none rounded-xl border border-black/10 p-3 text-sm font-normal outline-none focus:border-[#a87979]"
              />
            </label>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setConfirmDecline(false)}
                className="h-11 cursor-pointer rounded-xl border border-black/10 px-4 text-xs font-semibold"
              >
                Keep reviewing
              </button>
              <button
                type="button"
                onClick={onDecline}
                className="h-11 cursor-pointer rounded-xl bg-[#8b5656] px-4 text-xs font-semibold text-white"
              >
                Yes, decline proposal
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function getProfileHref(proposal: ClientProposal) {
  return proposal.accountType === "Agency"
    ? `/agency/${proposal.id}`
    : `/talent/${proposal.id}`;
}
