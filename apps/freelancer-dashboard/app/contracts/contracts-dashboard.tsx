"use client";

import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { ContractCard } from "../_components/contracts/contract-card";
import { ContractDrawer } from "../_components/contracts/contract-drawer";
import { contracts } from "../_components/contracts/contracts-data";
import { SubmitWorkModal } from "../_components/contracts/submit-work-modal";
import type { Contract } from "../_components/contracts/types";
import { DashboardHeader } from "../_components/dashboard/dashboard-header";
import { WorkspaceSidebar } from "../_components/dashboard/workspace-sidebar";

export function ContractsDashboard() {
  const [status, setStatus] = useState("All running");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contract | null>(null);
  const [submitTarget, setSubmitTarget] = useState<Contract | null>(null);

  const visibleContracts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return contracts.filter(
      (contract) =>
        (status === "All running" || contract.status === status) &&
        (!query ||
          `${contract.title} ${contract.client} ${contract.currentMilestone}`
            .toLowerCase()
            .includes(query)),
    );
  }, [search, status]);

  return (
    <div className="min-h-svh bg-[#f4f6f2] font-(family-name:--font-dm-sans) text-[#242724]">
      <DashboardHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <div className="grid items-start gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
          <WorkspaceSidebar />
          <div className="min-w-0">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">
                  Delivery workspace
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                  My contracts
                </h1>
                <p className="mt-2 text-sm text-[#72776f]">
                  Manage milestones, submit work, and keep every active contract
                  moving.
                </p>
              </div>
            </div>

            <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "Active contracts",
                  "3",
                  "solar:case-round-linear",
                  "bg-[#e7f2e4] text-[#4d784a]",
                ],
                [
                  "Contract value",
                  "$34.3K",
                  "solar:wallet-money-linear",
                  "bg-[#e8eff4] text-[#4c6e86]",
                ],
                [
                  "Earned",
                  "$12.2K",
                  "solar:hand-money-linear",
                  "bg-[#f1f0e6] text-[#766f47]",
                ],
                [
                  "Funded now",
                  "$11.6K",
                  "solar:shield-check-linear",
                  "bg-[#eeeaf5] text-[#6b5d82]",
                ],
              ].map(([label, value, icon, color]) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-black/8 bg-white p-5"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
                  >
                    <Icon icon={icon} width="22" />
                  </span>
                  <div>
                    <p className="text-2xl font-semibold tracking-[-0.04em]">
                      {value}
                    </p>
                    <p className="mt-0.5 text-xs text-[#7c8179]">{label}</p>
                  </div>
                </div>
              ))}
            </section>

            <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-black/8 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-1 overflow-x-auto">
                {["All running", "Active", "Awaiting feedback"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setStatus(item)}
                    className={`shrink-0 cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold ${status === item ? "bg-[#edf4ea] text-[#4e774b]" : "text-[#747971] hover:bg-black/3"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label className="flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 sm:w-72">
                <Icon
                  icon="solar:magnifer-linear"
                  width="18"
                  className="text-[#7b8078]"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search contracts"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </label>
            </section>

            <div className="mt-4 grid gap-4">
              {visibleContracts.map((contract) => (
                <ContractCard
                  key={contract.id}
                  contract={contract}
                  onView={setSelected}
                  onSubmit={setSubmitTarget}
                />
              ))}
              {!visibleContracts.length && (
                <div className="rounded-2xl border border-black/8 bg-white px-6 py-16 text-center">
                  <Icon
                    icon="solar:case-round-linear"
                    width="36"
                    className="mx-auto text-[#858a82]"
                  />
                  <h2 className="mt-4 font-semibold">No contracts found</h2>
                  <p className="mt-2 text-sm text-[#7c8179]">
                    Try another status or search term.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {selected && (
        <ContractDrawer
          contract={selected}
          onClose={() => setSelected(null)}
          onSubmit={() => {
            setSubmitTarget(selected);
            setSelected(null);
          }}
        />
      )}
      {submitTarget && (
        <SubmitWorkModal
          contract={submitTarget}
          onClose={() => setSubmitTarget(null)}
        />
      )}
    </div>
  );
}
