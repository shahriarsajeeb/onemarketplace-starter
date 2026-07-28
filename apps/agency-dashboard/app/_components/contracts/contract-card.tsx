"use client";

import { Icon } from "../ui/icon";
import { contractStatusStyles } from "./contracts-data";
import type { AgencyContract } from "./types";

export function ContractCard({
  contract,
  onView,
  onSubmit,
}: {
  contract: AgencyContract;
  onView: (contract: AgencyContract) => void;
  onSubmit: (contract: AgencyContract) => void;
}) {
  const completed = contract.status === "Completed";
  const awaiting = contract.status === "Awaiting feedback";

  return (
    <article className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-5 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${contractStatusStyles[contract.status]}`}>{contract.status}</span>
            <span className="text-xs text-[#858a82]">{completed ? `Completed ${contract.completed}` : `Started ${contract.started}`}</span>
          </div>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.025em]">{contract.title}</h2>
          <div className="mt-2 flex items-center gap-2 text-sm text-[#747a72]"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e9efea] text-[10px] font-semibold text-[#4e716b]">{contract.clientInitials}</span><strong className="text-[#343833]">{contract.client}</strong><span>·</span><span>{contract.clientLocation}</span></div>
        </div>
        <div className="grid grid-cols-3 gap-5 lg:min-w-72">
          {[["Contract", contract.totalBudget], ["Earned", contract.earned], ["In escrow", contract.escrow]].map(([label, value]) => <div key={label}><p className="text-[11px] text-[#858a82]">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>)}
        </div>
      </div>
      <div className="mt-6 rounded-xl bg-[#f4f6f2] p-4">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[11px] font-semibold tracking-wide text-[#6e756c] uppercase">{completed ? "Contract result" : "Current milestone"}</p><p className="mt-1.5 text-sm font-semibold">{contract.currentMilestone}</p></div><div className="sm:text-right"><p className="text-[11px] text-[#858a82]">{completed ? "Status" : "Next deadline"}</p><p className="mt-1 text-sm font-semibold">{contract.nextDeadline}</p></div></div>
        <div className="mt-4 flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-[#dfe5dc]"><div className="h-full rounded-full bg-[#638b60]" style={{ width: `${contract.progress}%` }} /></div><span className="text-xs font-semibold text-[#52784f]">{contract.progress}%</span></div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-xs text-[#737870]"><Icon name={completed ? "verified" : "contract"} size={17} />{completed ? "All agency milestones paid" : awaiting ? "Submission awaiting client review" : `${contract.escrow} funded for the current milestone`}</p>
        <div className="flex gap-2"><button type="button" onClick={() => onView(contract)} className="h-10 cursor-pointer rounded-xl border border-black/10 px-4 text-xs font-semibold hover:bg-black/3">View contract</button>{!completed && <button type="button" onClick={() => onSubmit(contract)} className="h-10 cursor-pointer rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white">{awaiting ? "Add submission" : "Submit work"}</button>}</div>
      </div>
    </article>
  );
}
