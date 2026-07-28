"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ContractCard } from "../_components/contracts/contract-card";
import { ContractDrawer } from "../_components/contracts/contract-drawer";
import { initialAgencyContracts } from "../_components/contracts/contracts-data";
import { SubmitWorkModal } from "../_components/contracts/submit-work-modal";
import type {
  AgencyContract,
  AgencyContractStatus,
} from "../_components/contracts/types";
import { AgencyShell } from "../_components/dashboard/agency-shell";
import { Icon } from "../_components/ui/icon";

const tabs = ["All", "Active", "Awaiting feedback", "Completed"] as const;

export function ContractsDashboard() {
  const [contracts, setContracts] = useState(initialAgencyContracts);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AgencyContract | null>(null);
  const [submitTarget, setSubmitTarget] = useState<AgencyContract | null>(null);

  const visibleContracts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return contracts.filter(
      (contract) =>
        (activeTab === "All" || contract.status === activeTab) &&
        (!query ||
          `${contract.title} ${contract.client} ${contract.currentMilestone}`
            .toLowerCase()
            .includes(query)),
    );
  }, [activeTab, contracts, search]);

  const count = (status: AgencyContractStatus) =>
    contracts.filter((contract) => contract.status === status).length;

  const markSubmitted = (target: AgencyContract) => {
    setContracts((current) =>
      current.map((contract) =>
        contract.id === target.id
          ? {
              ...contract,
              status: "Awaiting feedback",
              nextDeadline: "Client review",
            }
          : contract,
      ),
    );
    setSelected((current) =>
      current?.id === target.id
        ? {
            ...current,
            status: "Awaiting feedback",
            nextDeadline: "Client review",
          }
        : current,
    );
  };

  return (
    <AgencyShell>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">
            Client delivery
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Agency contracts
          </h1>
          <p className="mt-2 text-sm text-[#72776f]">
            Manage agency milestones, submissions, payments, and client
            approvals.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
        >
          <Icon name="search" size={18} /> Find more work
        </Link>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            "Active contracts",
            count("Active"),
            "contract",
            "bg-[#e7f2e4] text-[#4d784a]",
          ],
          [
            "Awaiting feedback",
            count("Awaiting feedback"),
            "message",
            "bg-[#f1f0e6] text-[#766f47]",
          ],
          [
            "Contract value",
            "$165.5K",
            "briefcase",
            "bg-[#e8eff4] text-[#4c6e86]",
          ],
          [
            "Available earnings",
            "$47.5K",
            "wallet",
            "bg-[#eeeaf5] text-[#6b5d82]",
          ],
        ].map(([label, value, icon, color]) => (
          <div
            key={String(label)}
            className="flex items-center gap-4 rounded-2xl border border-black/8 bg-white p-5"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
            >
              <Icon name={icon as "contract"} size={22} />
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
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold ${
                activeTab === tab
                  ? "bg-[#edf4ea] text-[#4e774b]"
                  : "text-[#747971] hover:bg-black/3"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <label className="flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 sm:w-72">
          <Icon name="search" size={18} className="text-[#7b8078]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search agency contracts"
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
          <div className="rounded-2xl border border-dashed border-black/12 bg-white px-6 py-16 text-center">
            <Icon
              name="contract"
              size={35}
              className="mx-auto text-[#858a82]"
            />
            <h2 className="mt-4 font-semibold">No contracts found</h2>
            <p className="mt-2 text-sm text-[#7c8179]">
              Try another status or search term.
            </p>
          </div>
        )}
      </div>

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
          onSubmitted={markSubmitted}
        />
      )}
    </AgencyShell>
  );
}
