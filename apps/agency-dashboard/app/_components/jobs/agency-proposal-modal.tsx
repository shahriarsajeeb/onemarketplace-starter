"use client";

import { useState } from "react";
import { Icon } from "../ui/icon";
import type { AgencyJob } from "./types";

export function AgencyProposalModal({
  job,
  onClose,
}: {
  job: AgencyJob;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div role="dialog" aria-modal="true" className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f2e3] text-[#4d784a]"><Icon name="verified" size={29} /></span>
          <h2 className="mt-5 text-xl font-semibold">Agency proposal submitted</h2>
          <p className="mt-2 text-sm leading-6 text-[#737870]">Northstar Digital’s proposal was sent to {job.company}. The client will see the agency profile and team roster.</p>
          <button type="button" onClick={onClose} className="mt-6 h-11 w-full cursor-pointer rounded-xl bg-[#252724] text-sm font-semibold text-white">Back to jobs</button>
        </div>
      </div>
    );
  }

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="agency-proposal-title" className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]">
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="max-h-[calc(100svh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs font-semibold tracking-wide text-[#62805f] uppercase">Submit as Northstar Digital</p><h2 id="agency-proposal-title" className="mt-2 text-xl font-semibold">{job.title}</h2><p className="mt-1 text-xs text-[#7b8078]">{job.company} · Fixed price {job.budget}</p></div>
          <button type="button" onClick={onClose} aria-label="Close" className="cursor-pointer"><Icon name="close" size={25} /></button>
        </div>
        <div className="mt-6 rounded-xl bg-[#f2f5f0] p-4">
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#496e67] text-xs font-semibold text-white">ND</span><div><p className="text-sm font-semibold">Northstar Digital</p><p className="mt-0.5 text-[11px] text-[#7b8078]">Agency profile · 8 members · Payment verified</p></div></div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold">Agency bid<input required type="number" defaultValue={job.budgetValue} className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none focus:border-[#6e916a]" /></label>
          <label className="text-xs font-semibold">Delivery timeline<select defaultValue={job.duration} className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal outline-none"><option>Less than 1 month</option><option>1–2 months</option><option>3–6 months</option><option>6+ months</option></select></label>
        </div>
        <label className="mt-5 block text-xs font-semibold">Cover letter<textarea required rows={6} placeholder="Explain your agency’s relevant experience, approach, and why the team is a strong fit…" className="mt-2 w-full resize-none rounded-xl border border-black/10 p-3 text-sm font-normal leading-6 outline-none focus:border-[#6e916a]" /></label>
        <label className="mt-4 block text-xs font-semibold">Milestone plan <span className="font-normal text-[#8a8f87]">(optional)</span><textarea rows={3} placeholder="Outline the proposed delivery milestones…" className="mt-2 w-full resize-none rounded-xl border border-black/10 p-3 text-sm font-normal outline-none focus:border-[#6e916a]" /></label>
        <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f3f5f1] p-4 text-xs"><span>Connects required</span><strong>16 Agency Connects</strong></div>
        <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={onClose} className="h-11 cursor-pointer rounded-xl border border-black/10 px-5 text-sm font-semibold">Cancel</button><button type="submit" className="h-11 cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white">Submit agency proposal</button></div>
      </form>
    </div>
  );
}
