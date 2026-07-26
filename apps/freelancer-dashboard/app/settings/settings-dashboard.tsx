"use client";

import { useState } from "react";
import { DashboardHeader } from "../_components/dashboard/dashboard-header";
import { WorkspaceSidebar } from "../_components/dashboard/workspace-sidebar";
import { EarningsStatementModal } from "../_components/settings/earnings-statement-modal";
import { FinanceModal } from "../_components/settings/finance-modal";
import { FinanceOverview } from "../_components/settings/finance-overview";
import { type SettingsSectionId } from "../_components/settings/settings-data";
import { SettingsNavigation } from "../_components/settings/settings-navigation";
import {
  AccountPanel,
  ConnectsPanel,
  EarningsPanel,
  WithdrawalPanel,
} from "../_components/settings/settings-panels";

export function SettingsDashboard() {
  const [section, setSection] = useState<SettingsSectionId>("overview");
  const [modal, setModal] = useState<"connects" | "withdraw" | null>(null);
  const [statementOpen, setStatementOpen] = useState(false);

  return (
    <div className="min-h-svh bg-[#f4f6f2] font-(family-name:--font-dm-sans) text-[#242724]">
      <DashboardHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <div className="grid items-start gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
          <WorkspaceSidebar />
          <div className="min-w-0">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">Account center</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Settings</h1>
              <p className="mt-2 text-sm text-[#72776f]">Manage your finances, account preferences, security, and marketplace activity.</p>
            </div>

            <div className="mt-8 grid items-start gap-5 lg:grid-cols-[235px_minmax(0,1fr)]">
              <div className="lg:sticky lg:top-24">
                <SettingsNavigation active={section} onChange={setSection} />
              </div>
              <div className="min-w-0">
                {section === "overview" && <FinanceOverview onOpenSection={setSection} onBuyConnects={() => setModal("connects")} onWithdraw={() => setModal("withdraw")} />}
                {section === "connects" && <ConnectsPanel onBuy={() => setModal("connects")} />}
                {section === "earnings" && <EarningsPanel onWithdraw={() => setModal("withdraw")} onDownloadStatement={() => setStatementOpen(true)} />}
                {section === "withdrawal" && <WithdrawalPanel onWithdraw={() => setModal("withdraw")} />}
                {["tax", "security", "notifications"].includes(section) && <AccountPanel kind={section as "tax" | "security" | "notifications"} />}
              </div>
            </div>
          </div>
        </div>
      </main>
      {modal && <FinanceModal mode={modal} onClose={() => setModal(null)} />}
      {statementOpen && <EarningsStatementModal onClose={() => setStatementOpen(false)} />}
    </div>
  );
}
