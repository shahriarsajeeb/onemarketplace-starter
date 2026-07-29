import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";
import { ClientShell } from "../_components/dashboard/client-shell";
import { clientJobs } from "../_components/data/client-data";

export const metadata: Metadata = {
  title: "Job Posts",
  description: "Manage your fixed-price marketplace job posts.",
};

export default function JobsPage() {
  return (
    <ClientShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[.14em] text-[#62805f] uppercase">
            Hiring
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
            Job posts
          </h1>
          <p className="mt-2 text-sm text-[#72776f]">
            Create fixed-price projects and review applicant activity.
          </p>
        </div>
        <Link
          href="/jobs/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
        >
          <Icon icon="solar:add-circle-linear" width="18" />
          Post a new job
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {clientJobs.map((job) => (
          <article
            key={job.id}
            className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      job.status === "Open"
                        ? "bg-[#e7f2e4] text-[#4d784a]"
                        : "bg-[#f1f0e7] text-[#766f47]"
                    }`}
                  >
                    {job.status}
                  </span>
                  <span className="text-[10px] text-[#8a8f87]">
                    {job.posted}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-semibold">{job.title}</h2>
                <p className="mt-2 text-xs text-[#757b73]">
                  Fixed price · ${job.budget.toLocaleString()} · {job.level} ·{" "}
                  {job.duration}
                </p>
              </div>
              <div className="flex flex-wrap items-start justify-end gap-2">
                {job.hires > 0 ? (
                  <span
                    title="A job post cannot be edited after a hire is made."
                    className="inline-flex h-10 cursor-not-allowed items-center gap-1.5 rounded-xl border border-black/8 bg-[#f1f2ef] px-4 text-xs font-semibold text-[#9a9e97]"
                  >
                    <Icon icon="solar:lock-keyhole-linear" width="15" />
                    Editing locked
                  </span>
                ) : (
                  <Link
                    href={`/jobs/${job.id}/edit`}
                    className="h-10 rounded-xl border border-black/10 px-4 py-3 text-xs font-semibold"
                  >
                    Edit
                  </Link>
                )}
                {job.status === "Open" && (
                  <Link
                    href={`/proposals?job=${job.id}`}
                    className="h-10 rounded-xl bg-[#252724] px-4 py-3 text-xs font-semibold text-white"
                  >
                    Review proposals
                  </Link>
                )}
              </div>
            </div>

            {job.hires > 0 && (
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#f5f1e7] px-3 py-2 text-[10px] font-medium text-[#746b4a]">
                <Icon icon="solar:info-circle-linear" width="14" />
                This job post is locked because a contract has already been
                created from it.
              </p>
            )}

            <p className="mt-5 max-w-4xl text-sm leading-6 text-[#6f756d]">
              {job.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-[#f0f3ee] px-2.5 py-1.5 text-[10px] text-[#657062]"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-black/7 pt-4 sm:max-w-md">
              <JobStat label="Proposals" value={job.proposals} />
              <JobStat label="Shortlisted" value={job.shortlisted} />
              <JobStat label="Hires" value={job.hires} />
            </div>
          </article>
        ))}
      </div>
    </ClientShell>
  );
}

function JobStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-base font-semibold">{value}</p>
      <p className="mt-1 text-[10px] text-[#8a8f87]">{label}</p>
    </div>
  );
}
