"use client";

import Link from "next/link";
import { Icon } from "../ui/icon";
import { proposalStatusStyles } from "./proposals-data";
import type { AgencyProposal } from "./types";

export function ProposalDrawer({
  proposal,
  onClose,
  onWithdraw,
}: {
  proposal: AgencyProposal;
  onClose: () => void;
  onWithdraw: (proposal: AgencyProposal) => void;
}) {
  const closed = ["Archived", "Withdrawn"].includes(proposal.status);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="proposal-title" className="fixed inset-0 z-50 flex justify-end bg-[#172018]/45 backdrop-blur-[2px]">
      <div className="h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-black/8 bg-white px-6 py-5 sm:px-8">
          <div><p className="text-xs font-semibold tracking-wide text-[#62805f] uppercase">Agency proposal</p><h2 id="proposal-title" className="mt-2 text-xl font-semibold">{proposal.title}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close proposal" className="cursor-pointer"><Icon name="close" size={25} /></button>
        </header>
        <div className="grid gap-7 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${proposalStatusStyles[proposal.status]}`}>{proposal.status}</span>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52784f] hover:underline">View marketplace jobs <Icon name="arrow" size={14} /></Link>
          </div>
          <section className="rounded-2xl bg-[#f1f5ef] p-5">
            <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#496e67] text-xs font-semibold text-white">ND</span><div><p className="text-sm font-semibold">Submitted as Northstar Digital</p><p className="mt-1 text-xs text-[#777d75]">{proposal.client} · Submitted {proposal.submitted}</p></div></div>
          </section>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[["Agency bid", proposal.agencyBid], ["Client budget", proposal.clientBudget], ["Timeline", proposal.duration], ["Connects", proposal.connects]].map(([label, value]) => <div key={String(label)} className="rounded-xl border border-black/7 p-3"><p className="text-[10px] text-[#858a82]">{label}</p><p className="mt-1.5 text-sm font-semibold">{value}</p></div>)}
          </div>
          <section><h3 className="text-sm font-semibold">Cover letter</h3><p className="mt-3 rounded-xl border border-black/8 p-4 text-sm leading-7 text-[#666c64]">{proposal.coverLetter}</p></section>
          <section><h3 className="text-sm font-semibold">Milestone plan</h3><ol className="mt-3 overflow-hidden rounded-xl border border-black/8">{proposal.milestonePlan.map((milestone, index) => <li key={milestone} className={`flex items-center gap-3 p-4 text-sm ${index ? "border-t border-black/7" : ""}`}><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf4ea] text-xs font-semibold text-[#52784f]">{index + 1}</span>{milestone}</li>)}</ol></section>
          <section><h3 className="text-sm font-semibold">Relevant agency skills</h3><div className="mt-3 flex flex-wrap gap-2">{proposal.skills.map((skill) => <span key={skill} className="rounded-lg bg-[#edf2eb] px-2.5 py-1.5 text-xs font-medium">{skill}</span>)}</div></section>
          <section className="rounded-xl bg-[#edf4ea] p-4"><p className="text-xs font-semibold text-[#4e774b]">{proposal.activity}</p><p className="mt-1 text-xs leading-5 text-[#697168]">All client activity is recorded against the agency proposal.</p></section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {!closed && <button type="button" onClick={() => onWithdraw(proposal)} className="cursor-pointer text-xs font-semibold text-[#976060] hover:underline">Withdraw agency proposal</button>}
            {proposal.status === "Interview" && <Link href="/messages" className="ml-auto rounded-xl bg-[#252724] px-5 py-3 text-xs font-semibold text-white">Message client</Link>}
          </div>
        </div>
      </div>
    </div>
  );
}
