"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardHeader } from "./_components/dashboard/dashboard-header";
import { WorkspaceSidebar } from "./_components/dashboard/workspace-sidebar";
import { JobCard } from "./_components/jobs/job-card";
import {
  emptyJobFilters,
  JobFilterPopover,
  type JobFilters,
} from "./_components/jobs/job-filter-popover";
import { dashboardJobs } from "./_components/jobs/jobs-data";
import { ProposalModal } from "./_components/jobs/proposal-modal";
import type { Job } from "./_components/jobs/types";
import { redirect } from "next/navigation";

export function FreelancerDashboard() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Best matches");
  const [saved, setSaved] = useState<number[]>([]);
  const [proposalJob, setProposalJob] = useState<Job | null>(null);
  const [filters, setFilters] = useState<JobFilters>(emptyJobFilters);

  const activeFilterCount =
    filters.experienceLevels.length +
    filters.durations.length +
    Number(Boolean(filters.minBudget || filters.maxBudget)) +
    Number(filters.proposalRange !== "Any number") +
    Number(filters.verifiedOnly);

  const visibleJobs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return dashboardJobs.filter((job) => {
      const searchable = [
        job.title,
        job.company,
        job.description,
        ...job.skills,
      ]
        .join(" ")
        .toLowerCase();
      if (query && !searchable.includes(query)) return false;
      if (activeTab === "Saved jobs") return saved.includes(job.id);
      if (
        filters.experienceLevels.length &&
        !filters.experienceLevels.includes(job.level)
      )
        return false;
      if (filters.durations.length && !filters.durations.includes(job.duration))
        return false;
      const budget = Number(job.budget.replace(/[^0-9.]/g, ""));
      if (filters.minBudget && budget < Number(filters.minBudget)) return false;
      if (filters.maxBudget && budget > Number(filters.maxBudget)) return false;
      if (
        filters.proposalRange !== "Any number" &&
        job.proposals !== filters.proposalRange
      )
        return false;
      if (filters.verifiedOnly && !job.verified) return false;
      return true;
    });
  }, [activeTab, filters, saved, search]);

  const toggleSaved = (id: number) =>
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  return (
    <div className="min-h-svh bg-[#f4f6f2] font-(family-name:--font-dm-sans) text-[#242724]">
      <DashboardHeader />

      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-[#62805f]">
              Saturday, July 25
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Good morning, Shahriar.
            </h1>
            <p className="mt-2 text-sm text-[#72776f]">
              Here are fresh opportunities matched to your profile.
            </p>
          </div>
          <label className="flex h-12 w-full items-center gap-3 rounded-xl border border-black/9 bg-white px-4 focus-within:border-[#72956f] lg:max-w-md">
            <Icon
              icon="solar:magnifer-linear"
              width="20"
              className="text-[#7c8179]"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs by title or skill"
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#a0a49e]"
            />
            <kbd className="hidden rounded-md border border-black/8 bg-[#f4f5f2] px-2 py-1 text-[10px] text-[#8b8f88] sm:block">
              ⌘ K
            </kbd>
          </label>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[240px_minmax(0,1fr)_280px]">
          <WorkspaceSidebar profileStrength={85} />

          <section className="min-w-0">
            <div className="rounded-2xl border border-black/8 bg-white px-3 pt-3">
              <div className="flex gap-1 overflow-x-auto border-b border-black/7 px-2">
                {["Best matches", "Most recent", "Saved jobs"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative shrink-0 cursor-pointer px-4 py-3 text-sm font-semibold ${
                      activeTab === tab ? "text-[#4d764a]" : "text-[#777c74]"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#5e875b]" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between px-3 py-4">
                <div>
                  <h2 className="font-semibold">{activeTab}</h2>
                  <p className="mt-0.5 text-xs text-[#858a82]">
                    {visibleJobs.length} opportunities based on your skills
                  </p>
                </div>
                <JobFilterPopover
                  filters={filters}
                  activeCount={activeFilterCount}
                  onApply={setFilters}
                  onClear={() => setFilters(emptyJobFilters)}
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              {visibleJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  saved={saved.includes(job.id)}
                  onSave={() => toggleSaved(job.id)}
                  onPropose={() => setProposalJob(job)}
                />
              ))}
              {!visibleJobs.length && (
                <div className="rounded-2xl border border-dashed border-black/12 bg-white px-6 py-16 text-center">
                  <Icon
                    icon="solar:case-minimalistic-linear"
                    width="34"
                    className="mx-auto text-[#7c8179]"
                  />
                  <h2 className="mt-4 text-lg font-semibold">
                    No jobs here yet
                  </h2>
                  <p className="mt-2 text-sm text-[#777c74]">
                    {activeTab === "Saved jobs"
                      ? "Save a job and it will appear here."
                      : activeFilterCount
                        ? "Try adjusting or clearing your job filters."
                        : "Try a broader search term."}
                  </p>
                </div>
              )}
            </div>
          </section>

          <aside className="grid gap-5 xl:sticky xl:top-24">
            <section className="rounded-2xl border border-black/8 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Proposal activity</h2>
                <Link
                  href="/my-proposals"
                  className="text-xs font-semibold text-[#52784f]"
                >
                  View all
                </Link>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  ["7", "Active"],
                  ["3", "Viewed"],
                  ["2", "Interviews"],
                ].map(([value, label], index) => (
                  <div
                    key={label}
                    className={`rounded-xl px-2 py-3 ${
                      index === 2 ? "bg-[#eaf3e7]" : "bg-[#f2f4f0]"
                    }`}
                  >
                    <strong
                      className={
                        index === 2 ? "text-lg text-[#4f784c]" : "text-lg"
                      }
                    >
                      {value}
                    </strong>
                    <p className="mt-1 text-[10px] text-[#81867e]">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-black/7 pt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#777c74]">Available Connects</span>
                  <strong>64</strong>
                </div>
                <button
                  type="button"
                  onClick={() => redirect("/settings?section=connects")}
                  className="mt-3 w-full cursor-pointer rounded-xl border border-black/10 py-2.5 text-xs font-semibold hover:bg-black/3"
                >
                  Buy Connects
                </button>
              </div>
            </section>

            <section className="rounded-2xl bg-[#252a26] p-5 text-white">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#b9c1b8]">
                  Earnings this month
                </p>
                <Icon
                  icon="solar:chart-2-linear"
                  width="20"
                  className="text-[#9fbb9c]"
                />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                $4,850
              </p>
              <p className="mt-1 text-xs text-[#aeb6ad]">
                +$1,240 from last month
              </p>
              <div
                className="mt-5 flex h-14 items-end gap-2"
                aria-hidden="true"
              >
                {[35, 52, 44, 70, 59, 86, 100].map((height, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-t bg-[#71866f]"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[#d5dfd2] bg-[#edf4ea] p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#52784f]">
                <Icon icon="solar:lightbulb-bolt-linear" width="21" />
              </span>
              <h2 className="mt-4 font-semibold">Stand out to clients</h2>
              <p className="mt-2 text-xs leading-5 text-[#667064]">
                Add two recent projects to your portfolio to improve your match
                quality.
              </p>
              <Link
                href="/my-profile"
                className="mt-4 inline-block text-xs font-semibold text-[#4c7549] hover:underline"
              >
                Update portfolio
              </Link>
            </section>
          </aside>
        </div>
      </main>

      {proposalJob && (
        <ProposalModal job={proposalJob} onClose={() => setProposalJob(null)} />
      )}
    </div>
  );
}
