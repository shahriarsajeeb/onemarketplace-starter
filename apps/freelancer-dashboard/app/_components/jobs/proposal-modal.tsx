"use client";

import { Icon } from "@iconify/react";
import { FormEvent, useState } from "react";
import type { Job } from "./types";

type ProposalModalProps = {
  job: Job;
  onClose: () => void;
};

export function ProposalModal({ job, onClose }: ProposalModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const submitProposal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#182019]/55 p-4 backdrop-blur-[2px]"
    >
      <div className="max-h-[calc(100svh-2rem)] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {submitted ? (
          <div className="px-7 py-12 text-center sm:px-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f3e5] text-[#4f7b4c]">
              <Icon icon="solar:check-circle-bold" width="34" />
            </span>
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.035em]">
              Proposal submitted
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#686e66]">
              Your proposal for “{job.title}” is ready for {job.company} to
              review.
            </p>
            <button type="button" onClick={onClose} className="mt-7 cursor-pointer rounded-xl bg-[#252724] px-6 py-3 text-sm font-semibold text-white">
              Back to jobs
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between border-b border-black/8 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#5c8159] uppercase">Submit proposal</p>
                <h2 id="proposal-title" className="mt-2 max-w-md text-xl font-semibold tracking-tight">{job.title}</h2>
                <p className="mt-1 text-sm text-[#777c74]">{job.company}</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close proposal" className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-black/5">
                <Icon icon="solar:close-circle-linear" width="23" />
              </button>
            </div>
            <form onSubmit={submitProposal} className="grid gap-5 px-6 py-6 sm:px-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Your bid
                  <span className="relative">
                    <span className="absolute inset-y-0 left-3.5 flex items-center text-[#777c74]">$</span>
                    <input required type="number" min="1" defaultValue={job.type === "Hourly" ? "85" : job.budget.replace(/[$,]/g, "")} className="h-12 w-full rounded-xl border border-black/11 bg-white pr-14 pl-8 font-normal outline-none focus:border-[#70966d]" />
                    <span className="absolute inset-y-0 right-3.5 flex items-center text-xs text-[#858a82]">{job.type === "Hourly" ? "/ hour" : "USD"}</span>
                  </span>
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Delivery
                  <select required className="h-12 rounded-xl border border-black/11 bg-white px-3.5 font-normal outline-none focus:border-[#70966d]">
                    <option>Less than 1 month</option><option>1–2 months</option><option>3–6 months</option><option>More than 6 months</option>
                  </select>
                </label>
              </div>
              <label className="grid gap-2 text-sm font-semibold">
                Cover letter
                <textarea required minLength={80} rows={6} placeholder="Introduce yourself, explain your relevant experience, and describe how you would approach this project..." className="resize-none rounded-xl border border-black/11 bg-white p-3.5 font-normal leading-6 outline-none placeholder:text-[#a1a59e] focus:border-[#70966d]" />
                <span className="text-right text-[11px] font-normal text-[#8a8e87]">Minimum 80 characters</span>
              </label>
              <div className="rounded-xl bg-[#eff4ed] p-4 text-xs leading-5 text-[#626960]"><strong className="text-[#333832]">You’ll use 8 Connects.</strong> You have 64 Connects available.</div>
              <div className="flex justify-end gap-3 border-t border-black/7 pt-5">
                <button type="button" onClick={onClose} className="cursor-pointer rounded-xl border border-black/10 px-5 py-2.5 text-sm font-semibold">Cancel</button>
                <button type="submit" className="cursor-pointer rounded-xl bg-[#252724] px-5 py-2.5 text-sm font-semibold text-white">Send proposal</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
