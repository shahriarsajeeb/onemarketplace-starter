"use client";

import { Icon } from "@iconify/react";
import type { SettingsSectionId } from "./settings-data";

type FinanceOverviewProps = {
  onOpenSection: (section: SettingsSectionId) => void;
  onBuyConnects: () => void;
  onWithdraw: () => void;
};

export function FinanceOverview({
  onOpenSection,
  onBuyConnects,
  onWithdraw,
}: FinanceOverviewProps) {
  return (
    <div className="grid gap-5">
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-[#252724] p-5 text-white">
          <div className="flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#a8c5a1]"><Icon icon="solar:wallet-money-linear" width="21" /></span>
            <span className="text-[11px] text-white/55">Available</span>
          </div>
          <p className="mt-6 text-3xl font-semibold tracking-[-0.045em]">$4,850.00</p>
          <p className="mt-1 text-xs text-white/60">$3,500 pending clearance</p>
          <button type="button" onClick={onWithdraw} className="mt-5 h-10 w-full cursor-pointer rounded-xl bg-white text-xs font-semibold text-[#252724]">Withdraw earnings</button>
        </article>

        <article className="rounded-2xl border border-black/8 bg-white p-5">
          <div className="flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eeeaf5] text-[#6b5d82]"><Icon icon="solar:bolt-linear" width="21" /></span>
            <button type="button" onClick={() => onOpenSection("connects")} className="cursor-pointer text-[11px] font-semibold text-[#52784f] hover:underline">View history</button>
          </div>
          <p className="mt-6 text-3xl font-semibold tracking-[-0.045em]">64</p>
          <p className="mt-1 text-xs text-[#7b8078]">Connects available</p>
          <button type="button" onClick={onBuyConnects} className="mt-5 h-10 w-full cursor-pointer rounded-xl border border-black/10 text-xs font-semibold hover:bg-black/3">Buy Connects</button>
        </article>

        <article className="rounded-2xl border border-black/8 bg-white p-5">
          <div className="flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f2e4] text-[#4d784a]"><Icon icon="solar:chart-2-linear" width="21" /></span>
            <button type="button" onClick={() => onOpenSection("earnings")} className="cursor-pointer text-[11px] font-semibold text-[#52784f] hover:underline">View report</button>
          </div>
          <p className="mt-6 text-3xl font-semibold tracking-[-0.045em]">$12,200</p>
          <p className="mt-1 text-xs text-[#7b8078]">Earned across active contracts</p>
          <div className="mt-5 flex h-10 items-end gap-1.5">
            {[35, 52, 43, 68, 59, 82, 95].map((height, index) => <span key={index} className="flex-1 rounded-t bg-[#8ba487]" style={{ height: `${height}%` }} />)}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div><h2 className="font-semibold">Account readiness</h2><p className="mt-1 text-xs text-[#7b8078]">Complete these items to keep payments and contracts running smoothly.</p></div>
          <strong className="text-sm text-[#52784f]">82%</strong>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e5e9e2]"><div className="h-full w-[82%] rounded-full bg-[#638b60]" /></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ["Identity verification", "Manage verification", "solar:user-id-linear", "verification"],
            ["Withdrawal method", "Payoneer •••• 4821", "solar:card-transfer-linear", "withdrawal"],
            ["Tax information", "Action required", "solar:document-text-linear", "tax"],
          ].map(([title, detail, icon, section]) => (
            <button key={title} type="button" onClick={() => onOpenSection(section as SettingsSectionId)} className="flex cursor-pointer items-center gap-3 rounded-xl border border-black/7 p-4 text-left hover:bg-[#f8f9f6]">
              <Icon icon={icon} width="20" className="shrink-0 text-[#597b56]" />
              <span className="min-w-0 flex-1"><strong className="block text-xs">{title}</strong><span className="mt-1 block truncate text-[11px] text-[#858a82]">{detail}</span></span>
              <Icon icon="solar:alt-arrow-right-linear" width="15" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
