"use client";

import { Icon } from "../ui/icon";
import type { AgencyJob } from "./types";

export function AgencyJobCard({
  job,
  saved,
  onSave,
  onPropose,
}: {
  job: AgencyJob;
  saved: boolean;
  onSave: () => void;
  onPropose: () => void;
}) {
  return (
    <article className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#7d827a]">
            <span>Posted {job.posted}</span>
            {job.featured && <span className="rounded-full bg-[#f1eddc] px-2 py-1 font-semibold text-[#7b6c36]">GREAT MATCH</span>}
          </div>
          <h2 className="mt-3 text-lg font-semibold tracking-[-0.025em]">{job.title}</h2>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label="Open full job post" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/9 hover:bg-black/3"><Icon name="arrow" size={18} /></button>
          <button type="button" onClick={onSave} aria-label={saved ? "Remove saved job" : "Save job"} className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border ${saved ? "border-[#9dbc99] bg-[#e9f3e6] text-[#477344]" : "border-black/9 hover:bg-black/3"}`}><Icon name="bookmark" active={saved} size={18} /></button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#686e66]"><span>Fixed price</span><strong className="text-[#343833]">{job.budget}</strong><span>{job.level}</span><span>{job.duration}</span></div>
      <p className="mt-5 text-sm leading-7 text-[#6f756d]">{job.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-lg bg-[#edf1eb] px-2.5 py-1.5 text-xs text-[#626960]">{skill}</span>)}</div>
      <div className="mt-5 flex flex-col justify-between gap-4 border-t border-black/7 pt-5 sm:flex-row sm:items-center">
        <div><div className="flex flex-wrap items-center gap-3 text-xs"><strong>{job.company}</strong><span className="inline-flex items-center gap-1 font-semibold text-[#52784f]"><Icon name="verified" size={15} /> Payment verified</span><span className="text-[#c99a2f]">★</span><span>{job.rating}</span><span className="text-[#7b8078]">{job.spent}</span><span className="text-[#7b8078]">{job.location}</span></div><p className="mt-2 text-[11px] text-[#8a8f87]">{job.proposals} proposals</p></div>
        <button type="button" onClick={onPropose} className="h-11 shrink-0 cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white">Submit agency proposal</button>
      </div>
    </article>
  );
}
