"use client";

import { Icon } from "@iconify/react";
import type { Contract, MilestoneStatus } from "./types";

const milestoneStyle: Record<MilestoneStatus, string> = {
  Paid: "bg-[#e6f2e3] text-[#477344]",
  "In progress": "bg-[#e8eff4] text-[#496c86]",
  Upcoming: "bg-[#f0f1ee] text-[#747971]",
};

type ContractDrawerProps = {
  contract: Contract;
  onClose: () => void;
  onSubmit: () => void;
};

export function ContractDrawer({ contract, onClose, onSubmit }: ContractDrawerProps) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="contract-title" className="fixed inset-0 z-50 flex justify-end bg-[#172018]/45 backdrop-blur-[2px]">
      <div className="h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-black/8 bg-white px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#62805f] uppercase">Contract workspace</p>
            <h2 id="contract-title" className="mt-2 text-xl font-semibold">{contract.title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close contract" className="cursor-pointer text-[#6e736c]">
            <Icon icon="solar:close-circle-linear" width="26" />
          </button>
        </header>

        <div className="grid gap-7 p-6 sm:p-8">
          <section className="flex flex-col justify-between gap-4 rounded-2xl bg-[#f1f5ef] p-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs text-[#777d75]">Client</p>
              <p className="mt-1 font-semibold">{contract.client}</p>
              <p className="mt-1 text-xs text-[#777d75]">{contract.clientLocation}</p>
            </div>
            <button type="button" className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-black/9 bg-white px-4 text-xs font-semibold">
              <Icon icon="solar:chat-round-dots-linear" width="17" /> Message client
            </button>
          </section>

          <section>
            <h3 className="text-sm font-semibold">Contract overview</h3>
            <p className="mt-3 text-sm leading-7 text-[#686e66]">{contract.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[["Total", contract.totalBudget], ["Earned", contract.earned], ["In escrow", contract.funded], ["Started", contract.started]].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-black/7 p-3">
                  <p className="text-[10px] text-[#858a82]">{label}</p>
                  <p className="mt-1.5 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Milestones</h3>
              <span className="text-xs text-[#7b8078]">{contract.milestones.filter((item) => item.status === "Paid").length} of {contract.milestones.length} paid</span>
            </div>
            <div className="mt-3 overflow-hidden rounded-2xl border border-black/8">
              {contract.milestones.map((milestone, index) => (
                <div key={milestone.id} className={`flex items-center gap-4 p-4 ${index ? "border-t border-black/7" : ""}`}>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${milestone.status === "Paid" ? "bg-[#e4f0e1] text-[#4d784a]" : "bg-[#f0f2ee] text-[#7b8078]"}`}>
                    <Icon icon={milestone.status === "Paid" ? "solar:check-circle-bold" : "solar:clock-circle-linear"} width="18" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{milestone.title}</p>
                    <p className="mt-1 text-[11px] text-[#858a82]">Due {milestone.due}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{milestone.amount}</p>
                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${milestoneStyle[milestone.status]}`}>{milestone.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-[#252724] p-5 text-white">
            <p className="text-xs text-white/60">Current milestone</p>
            <p className="mt-2 font-semibold">{contract.currentMilestone}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-[#9fbd98]" style={{ width: `${contract.progress}%` }} />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-white/65">{contract.progress}% complete</span>
              <button type="button" onClick={onSubmit} className="cursor-pointer rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-[#252724]">
                Submit work
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
