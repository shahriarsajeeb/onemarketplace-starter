import type { Metadata } from "next";
import { ClientShell } from "../../_components/dashboard/client-shell";
import { JobPostForm } from "../../_components/jobs/job-post-form";

export const metadata: Metadata = {
  title: "Post a Job",
  description: "Create a complete fixed-price marketplace job post.",
};

export default function NewJobPage() {
  return (
    <ClientShell>
      <div>
        <p className="text-xs font-semibold tracking-[.14em] text-[#62805f] uppercase">
          New opportunity
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
          Post a fixed-price job
        </h1>
        <p className="mt-2 text-sm text-[#72776f]">
          Give freelancers and agencies everything they need to submit an
          accurate proposal.
        </p>
      </div>
      <JobPostForm />
    </ClientShell>
  );
}
