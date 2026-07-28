"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AgencyShell } from "../_components/dashboard/agency-shell";
import {
  agencyConnectsHistory,
  agencyEarnings,
  agencyWithdrawals,
  type FinanceSection,
} from "../_components/finances/finance-data";
import { FinanceModal } from "../_components/finances/finance-modal";
import { FinanceNavigation } from "../_components/finances/finance-navigation";
import { Icon } from "../_components/ui/icon";

const validSections: FinanceSection[] = [
  "overview",
  "earnings",
  "withdrawals",
  "connects",
  "statements",
  "tax",
];

export function FinancesDashboard({
  initialSection,
}: {
  initialSection?: string;
}) {
  const [section, setSection] = useState<FinanceSection>(
    validSections.includes(initialSection as FinanceSection)
      ? (initialSection as FinanceSection)
      : "overview",
  );
  const [modal, setModal] = useState<"withdraw" | "connects" | null>(null);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const openSection = (next: FinanceSection) => {
    setSection(next);
    router.push(`/finances?section=${next}`, { scroll: false });
  };

  const filteredEarnings = useMemo(() => {
    const query = search.trim().toLowerCase();
    return agencyEarnings.filter(
      (item) =>
        !query ||
        `${item.title} ${item.client} ${item.status}`
          .toLowerCase()
          .includes(query),
    );
  }, [search]);

  const downloadStatement = (period: string) => {
    const statementId = `OMS-AGENCY-2026-${period.replace(/\D/g, "") || "YTD"}-ND`;
    const content = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Agency Earnings Statement</title><style>body{font-family:Arial,sans-serif;color:#242724;max-width:820px;margin:48px auto;padding:0 32px;line-height:1.55}header{display:flex;justify-content:space-between;border-bottom:2px solid #242724;padding-bottom:24px}.brand{font-size:22px;font-weight:700}.badge{background:#edf4ea;color:#4e774b;padding:8px 12px;border-radius:999px;font-size:12px;font-weight:700}h1{font-size:34px;margin:48px 0 8px}.muted{color:#737870}.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:32px 0}.card{border:1px solid #dfe3dc;border-radius:12px;padding:18px}.label{font-size:11px;color:#737870;text-transform:uppercase;letter-spacing:.08em}.value{font-size:18px;font-weight:700;margin-top:6px}.total{background:#242724;color:white;border-radius:14px;padding:24px;margin:28px 0}footer{border-top:1px solid #dfe3dc;margin-top:48px;padding-top:20px;font-size:12px;color:#737870}</style></head><body><header><div class="brand">OneMarketplace.io</div><div class="badge">Verified agency statement</div></header><h1>Official Agency Earnings Statement</h1><p class="muted">This document confirms marketplace earnings received by the agency named below.</p><div class="grid"><div class="card"><div class="label">Agency</div><div class="value">Northstar Digital</div></div><div class="card"><div class="label">Agency ID</div><div class="value">OMP-AG-1842</div></div><div class="card"><div class="label">Statement period</div><div class="value">${period}</div></div><div class="card"><div class="label">Account owner</div><div class="value">Shahriar Sajeeb</div></div></div><div class="total"><div class="label" style="color:#bfc7bc">Gross agency earnings</div><div style="font-size:32px;font-weight:700;margin-top:8px">$47,500.00</div></div><p>These earnings were generated through client contracts completed or actively delivered by Northstar Digital through OneMarketplace.io.</p><footer>Statement reference: ${statementId}<br>Verify this statement by contacting verification@onemarketplace.io.</footer></body></html>`;
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `Northstar-Digital-Earnings-${period.replaceAll(" ", "-")}.html`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setNotice(`${period} earnings statement downloaded.`);
  };

  return (
    <AgencyShell>
      <div>
        <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">
          Agency finances
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
          Earnings & finances
        </h1>
        <p className="mt-2 text-sm text-[#72776f]">
          Manage client payments, Agency Connects, statements, and withdrawals.
        </p>
      </div>

      {notice && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-[#cfdfcb] bg-[#edf4ea] px-4 py-3 text-xs font-medium text-[#4e774b]">
          <span className="inline-flex items-center gap-2">
            <Icon name="verified" size={17} /> {notice}
          </span>
          <button type="button" onClick={() => setNotice("")}>
            <Icon name="close" size={18} />
          </button>
        </div>
      )}

      <div className="mt-8 grid items-start gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-24">
          <FinanceNavigation active={section} onChange={openSection} />
        </div>
        <div className="min-w-0">
          {section === "overview" && (
            <div className="grid gap-5">
              <section className="grid gap-4 md:grid-cols-3">
                <FinanceCard
                  dark
                  label="Available balance"
                  value="$18,420"
                  detail="$12,000 pending clearance"
                  action="Withdraw earnings"
                  onAction={() => setModal("withdraw")}
                />
                <FinanceCard
                  label="Agency Connects"
                  value="112"
                  detail="34 used this month"
                  action="Buy Connects"
                  onAction={() => setModal("connects")}
                />
                <FinanceCard
                  label="Gross earnings"
                  value="$47,500"
                  detail="Across active agency contracts"
                  action="View earnings"
                  onAction={() => openSection("earnings")}
                />
              </section>
              <section className="overflow-hidden rounded-2xl border border-black/8 bg-white">
                <PanelHeader title="Recent agency earnings" description="Milestone payments received by Northstar Digital" action="View all" onAction={() => openSection("earnings")} />
                <EarningsRows items={agencyEarnings.slice(0, 3)} />
              </section>
              <section className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
                <h2 className="font-semibold">Financial readiness</h2>
                <p className="mt-1 text-xs text-[#7b8078]">
                  Keep the agency ready for compliant client payments.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Withdrawal method", "Bank •••• 1842", "wallet"],
                    ["Tax information", "Action required", "contract"],
                  ].map(([title, detail, icon]) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() =>
                        title === "Tax information" && openSection("tax")
                      }
                      className="flex items-center gap-3 rounded-xl border border-black/7 p-4 text-left hover:bg-[#f8f9f6]"
                    >
                      <Icon
                        name={icon as "verified"}
                        size={20}
                        className="text-[#597b56]"
                      />
                      <span>
                        <strong className="block text-xs">{title}</strong>
                        <span className="mt-1 block text-[11px] text-[#858a82]">
                          {detail}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {section === "earnings" && (
            <section className="overflow-hidden rounded-2xl border border-black/8 bg-white">
              <PanelHeader
                title="Agency earnings"
                description="Payments earned through agency contracts"
              />
              <div className="grid gap-3 border-b border-black/7 p-5 sm:grid-cols-3">
                {[
                  ["Available", "$18,420"],
                  ["Pending", "$12,000"],
                  ["Lifetime", "$186,750"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-[#f3f5f1] p-4">
                    <p className="text-[11px] text-[#7b8078]">{label}</p>
                    <p className="mt-1 text-xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="border-b border-black/7 p-4">
                <label className="flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 sm:w-72">
                  <Icon name="search" size={17} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search earnings"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                </label>
              </div>
              <EarningsRows items={filteredEarnings} />
            </section>
          )}

          {section === "withdrawals" && (
            <section className="overflow-hidden rounded-2xl border border-black/8 bg-white">
              <PanelHeader
                title="Withdrawals"
                description="Agency payout history and methods"
                action="Withdraw funds"
                onAction={() => setModal("withdraw")}
              />
              <div className="border-b border-black/7 p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-4 rounded-xl bg-[#f3f5f1] p-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-semibold">
                      Business bank •••• 1842
                    </p>
                    <p className="mt-1 text-xs text-[#7b8078]">
                      Primary · 1–3 business days
                    </p>
                  </div>
                  <button className="h-9 rounded-lg border border-black/10 bg-white px-3 text-xs font-semibold">
                    Manage methods
                  </button>
                </div>
              </div>
              {agencyWithdrawals.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 px-5 py-4 sm:px-6 ${
                    index ? "border-t border-black/6" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{item.reference}</p>
                    <p className="mt-1 text-xs text-[#858a82]">
                      {item.method} · {item.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{item.amount}</p>
                    <p className="mt-1 text-[10px] text-[#52784f]">
                      {item.status}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          )}

          {section === "connects" && (
            <section className="overflow-hidden rounded-2xl border border-black/8 bg-white">
              <PanelHeader
                title="Agency Connects"
                description="Track proposal credits owned by the agency"
                action="Buy Connects"
                onAction={() => setModal("connects")}
              />
              <div className="border-b border-black/7 p-5 sm:p-6">
                <p className="text-xs text-[#7b8078]">Available balance</p>
                <p className="mt-1 text-3xl font-semibold">
                  112{" "}
                  <span className="text-sm font-normal text-[#7b8078]">
                    Agency Connects
                  </span>
                </p>
              </div>
              {agencyConnectsHistory.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 px-5 py-4 sm:px-6 ${
                    index ? "border-t border-black/6" : ""
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      item.amount > 0
                        ? "bg-[#e7f2e4] text-[#4d784a]"
                        : "bg-[#f1f0e7] text-[#766f47]"
                    }`}
                  >
                    <Icon name="proposal" size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="mt-1 truncate text-xs text-[#858a82]">
                      {item.detail} · {item.date}
                    </p>
                  </div>
                  <strong
                    className={`text-sm ${
                      item.amount > 0 ? "text-[#4d784a]" : ""
                    }`}
                  >
                    {item.amount > 0 ? "+" : ""}
                    {item.amount}
                  </strong>
                </div>
              ))}
            </section>
          )}

          {section === "statements" && (
            <section className="overflow-hidden rounded-2xl border border-black/8 bg-white">
              <PanelHeader
                title="Official statements"
                description="Download verified agency earnings documents"
              />
              {[
                ["July 2026", "$35,500.00", "Monthly"],
                ["Q2 2026", "$68,250.00", "Quarterly"],
                ["2026 year to date", "$118,500.00", "Annual"],
              ].map(([period, total, type], index) => (
                <div
                  key={period}
                  className={`flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6 ${
                    index ? "border-t border-black/7" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold">{period}</p>
                    <p className="mt-1 text-xs text-[#7b8078]">
                      {type} agency statement · Gross earnings {total}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadStatement(period)}
                    className="h-10 rounded-xl border border-black/10 px-4 text-xs font-semibold"
                  >
                    Download statement
                  </button>
                </div>
              ))}
            </section>
          )}

          {section === "tax" && (
            <section className="overflow-hidden rounded-2xl border border-black/8 bg-white">
              <PanelHeader
                title="Agency tax information"
                description="Business tax details used for compliant payouts"
              />
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setNotice("Agency tax information saved.");
                }}
                className="grid gap-5 p-5 sm:p-6"
              >
                <div className="rounded-xl border border-[#dfd3a9] bg-[#faf7eb] p-4 text-sm">
                  <strong>Tax information requires attention</strong>
                  <p className="mt-1 text-xs leading-5 text-[#77705b]">
                    Complete the agency tax ID before the next withdrawal.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-semibold">
                    Registered business name
                    <input
                      defaultValue="Northstar Digital"
                      className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal"
                    />
                  </label>
                  <label className="text-xs font-semibold">
                    Tax residence
                    <select className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal">
                      <option>Thailand</option>
                    </select>
                  </label>
                </div>
                <label className="text-xs font-semibold">
                  Business tax identification number
                  <input
                    required
                    placeholder="Enter agency tax ID"
                    className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal"
                  />
                </label>
                <button
                  type="submit"
                  className="h-11 justify-self-start rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
                >
                  Save tax information
                </button>
              </form>
            </section>
          )}
        </div>
      </div>

      {modal && (
        <FinanceModal
          mode={modal}
          onClose={() => setModal(null)}
          onComplete={setNotice}
        />
      )}
    </AgencyShell>
  );
}

function FinanceCard({
  label,
  value,
  detail,
  action,
  onAction,
  dark = false,
}: {
  label: string;
  value: string;
  detail: string;
  action: string;
  onAction: () => void;
  dark?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl p-5 ${
        dark
          ? "bg-[#252724] text-white"
          : "border border-black/8 bg-white"
      }`}
    >
      <p className={`text-xs ${dark ? "text-white/60" : "text-[#7b8078]"}`}>
        {label}
      </p>
      <p className="mt-5 text-3xl font-semibold tracking-[-0.045em]">{value}</p>
      <p
        className={`mt-1 text-xs ${
          dark ? "text-white/55" : "text-[#7b8078]"
        }`}
      >
        {detail}
      </p>
      <button
        type="button"
        onClick={onAction}
        className={`mt-5 cursor-pointer h-10 w-full rounded-xl text-xs font-semibold ${
          dark
            ? "bg-white text-[#252724]"
            : "border border-black/10 hover:bg-black/3"
        }`}
      >
        {action}
      </button>
    </article>
  );
}

function PanelHeader({
  title,
  description,
  action,
  onAction,
}: {
  title: string;
  description: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-black/7 px-5 py-5 sm:px-6">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-xs text-[#7b8078]">{description}</p>
      </div>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 text-xs font-semibold text-[#52784f] hover:underline"
        >
          {action}
        </button>
      )}
    </header>
  );
}

function EarningsRows({
  items,
}: {
  items: typeof agencyEarnings;
}) {
  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center gap-4 px-5 py-4 sm:px-6 ${
            index ? "border-t border-black/6" : ""
          }`}
        >
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{item.title}</p>
            <p className="mt-1 truncate text-xs text-[#858a82]">
              {item.client} · {item.date}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{item.amount}</p>
            <p className="mt-1 text-[10px] text-[#52784f]">{item.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
