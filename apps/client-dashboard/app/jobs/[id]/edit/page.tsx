import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientShell } from "../../../_components/dashboard/client-shell";
import { clientJobs } from "../../../_components/data/client-data";
import { JobPostForm } from "../../../_components/jobs/job-post-form";

export const metadata: Metadata = {
  title: "Edit Job Post",
  description: "Update an open fixed-price marketplace job post.",
};

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = clientJobs.find((item) => item.id === Number(id));

  if (!job) notFound();

  return (
    <ClientShell>
      {job.hires > 0 ? (
        <section className="mx-auto max-w-2xl rounded-2xl border border-black/8 bg-white p-7 text-center sm:p-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1f0e7] text-[#766f47]">
            <Icon icon="solar:lock-keyhole-linear" width="30" />
          </span>
          <h1 className="mt-5 text-2xl font-semibold">
            This job post is locked
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#737970]">
            You hired talent from this job post, so its scope, budget, and
            requirements can no longer be edited. Manage the agreed work from
            the associated contract instead.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link
              href="/jobs"
              className="h-11 rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold"
            >
              Back to job posts
            </Link>
            <Link
              href="/contracts"
              className="h-11 rounded-xl bg-[#252724] px-5 py-3 text-sm font-semibold text-white"
            >
              View contract
            </Link>
          </div>
        </section>
      ) : (
        <>
          <div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52784f]"
            >
              <Icon icon="solar:arrow-left-linear" width="15" />
              Back to job posts
            </Link>
            <p className="mt-6 text-xs font-semibold tracking-[.14em] text-[#62805f] uppercase">
              Hiring
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
              Edit job post
            </h1>
            <p className="mt-2 text-sm text-[#72776f]">
              Update the scope, requirements, and milestones before making a
              hire.
            </p>
          </div>
          <JobPostForm initialJob={job} />
        </>
      )}
    </ClientShell>
  );
}
