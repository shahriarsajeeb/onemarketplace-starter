"use client";

import { useMemo, useState } from "react";
import { accounts, platformMetrics, recentActivity, reviewQueue } from "./admin-data";
import { AdminIcon } from "./admin-icon";

const navigation = [
  { label: "Overview", icon: "grid", href: "#overview" },
  { label: "Accounts", icon: "users", href: "#accounts" },
  { label: "Job posts", icon: "jobs", href: "#marketplace" },
  { label: "Proposals", icon: "proposal", href: "#marketplace" },
  { label: "Contracts", icon: "contract", href: "#contracts" },
  { label: "Transactions", icon: "wallet", href: "#contracts" },
  { label: "Reports", icon: "report", href: "#reviews", badge: 3 },
  { label: "Settings", icon: "settings", href: "#settings" },
] as const;

export function AdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [accountType, setAccountType] = useState("All");
  const [reviewed, setReviewed] = useState<number[]>([]);

  const visibleAccounts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return accounts.filter(
      (account) =>
        (accountType === "All" || account.type === accountType) &&
        (!normalized ||
          `${account.name} ${account.company} ${account.type} ${account.status}`
            .toLowerCase()
            .includes(normalized)),
    );
  }, [accountType, query]);

  return (
    <div className="min-h-svh bg-[#f4f6f2] text-[#242724]">
      <header className="sticky top-0 z-40 border-b border-black/7 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-17 max-w-400 items-center gap-4 px-5 sm:px-8">
          <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle admin navigation" className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/8 lg:hidden"><AdminIcon name={menuOpen ? "close" : "menu"} /></button>
          <a href="#overview" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#252724] text-white"><AdminIcon name="grid" size={18} /></span>
            <span className="hidden text-lg font-semibold sm:block">OneMarketplace.io</span>
          </a>
          <span className="hidden rounded-full bg-[#e8eee5] px-2.5 py-1 text-[9px] font-semibold tracking-[.08em] text-[#52784f] uppercase sm:block">Admin</span>
          <button type="button" className="ml-auto hidden h-10 w-full max-w-sm items-center gap-2 rounded-xl border border-black/8 px-3 text-left text-xs text-[#858a82] md:flex"><AdminIcon name="search" size={18} /><span className="flex-1">Search the platform</span><kbd className="rounded-md bg-[#f2f4f0] px-2 py-1 text-[9px]">⌘ K</kbd></button>
          <button type="button" aria-label="Admin notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#62675f] hover:bg-black/4"><AdminIcon name="bell" size={21} /><span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-[#5f8d5c] px-1 text-[8px] font-bold text-white">5</span></button>
          <button type="button" className="flex items-center gap-2 rounded-full border border-black/8 p-1 pr-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#496e67] text-[10px] font-semibold text-white">SA</span><span className="hidden text-xs font-semibold sm:block">Super admin</span></button>
        </div>
      </header>

      <div className="mx-auto grid max-w-400 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className={`${menuOpen ? "fixed inset-x-4 top-20 z-50 block shadow-2xl" : "hidden"} h-fit rounded-2xl border border-black/8 bg-white p-2 lg:sticky lg:top-21 lg:m-6 lg:block lg:shadow-none`}>
          <div className="border-b border-black/7 px-3 py-3"><p className="text-[10px] font-semibold tracking-[.14em] text-[#7c8179] uppercase">Operations console</p><p className="mt-1 text-xs text-[#858a82]">Production overview</p></div>
          <nav className="mt-2">
            {navigation.map((item, index) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${index === 0 ? "bg-[#edf4ea] font-semibold text-[#4e774b]" : "text-[#656b63] hover:bg-[#f5f6f3]"}`}><AdminIcon name={item.icon} size={18} /><span className="flex-1">{item.label}</span>{"badge" in item && item.badge && <span className="rounded-full bg-[#5f8d5c] px-2 py-0.5 text-[8px] font-bold text-white">{item.badge}</span>}</a>)}
          </nav>
          <div className="mt-2 rounded-xl bg-[#252724] p-4 text-white"><div className="flex items-center gap-2 text-xs font-semibold"><AdminIcon name="shield" size={18} />System status</div><p className="mt-2 text-[10px] leading-5 text-white/60">All marketplace services are operational.</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[99.98%] rounded-full bg-[#8aaa84]" /></div></div>
        </aside>

        <main id="overview" className="min-w-0 px-5 py-7 sm:px-8 lg:py-10 lg:pl-0">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-xs font-semibold tracking-[.14em] text-[#62805f] uppercase">Platform command center</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Marketplace overview</h1><p className="mt-2 text-sm text-[#72776f]">Explore activity, review risk, and monitor every side of OneMarketplace.io.</p></div>
            <div className="flex gap-2"><button type="button" className="h-10 rounded-xl border border-black/9 bg-white px-4 text-xs font-semibold">Export report</button><button type="button" className="h-10 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white">Open audit log</button></div>
          </div>

          <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {platformMetrics.map((metric, index) => <article key={metric.label} className="rounded-2xl border border-black/8 bg-white p-5"><div className="flex items-start justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ea] text-[#52784f]"><AdminIcon name={index === 0 ? "users" : index === 1 ? "jobs" : index === 2 ? "contract" : "wallet"} size={20} /></span><span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#52784f]"><AdminIcon name="trend" size={12} />{metric.change}</span></div><p className="mt-5 text-2xl font-semibold tracking-[-.04em]">{metric.value}</p><h2 className="mt-1 text-xs font-semibold">{metric.label}</h2><p className="mt-2 text-[10px] text-[#858a82]">{metric.detail}</p></article>)}
          </section>

          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,.75fr)]">
            <section id="contracts" className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Marketplace volume</h2><p className="mt-1 text-xs text-[#7c8179]">Contracts funded over the last 8 weeks</p></div><select className="h-9 rounded-xl border border-black/8 px-3 text-xs outline-none"><option>Last 8 weeks</option><option>Last 30 days</option></select></div><div className="mt-8 flex h-52 items-end gap-3 border-b border-black/8 px-2">{[38,52,46,67,61,78,72,94].map((height, index) => <div key={index} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-lg bg-[#789574] transition hover:bg-[#5f805b]" style={{height: `${height}%`}} /><span className="text-[9px] text-[#93978f]">W{index + 1}</span></div>)}</div><div className="mt-5 grid grid-cols-3 gap-3"><MiniMetric label="Funded" value="$2.48M" /><MiniMetric label="Released" value="$1.86M" /><MiniMetric label="Escrow" value="$620K" /></div></section>

            <section id="reviews" className="overflow-hidden rounded-2xl border border-black/8 bg-white"><header className="flex items-center justify-between border-b border-black/7 p-5"><div><h2 className="font-semibold">Action queue</h2><p className="mt-1 text-xs text-[#7c8179]">{reviewQueue.length - reviewed.length} items need review</p></div><span className="rounded-full bg-[#f4ece3] px-2.5 py-1 text-[10px] font-semibold text-[#8b6844]">Priority</span></header>{reviewQueue.filter((item) => !reviewed.includes(item.id)).slice(0, 4).map((item, index) => <article key={item.id} className={`p-4 ${index ? "border-t border-black/6" : ""}`}><div className="flex items-start gap-3"><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.priority === "Urgent" ? "bg-[#b35e57]" : item.priority === "High" ? "bg-[#c48b48]" : "bg-[#7b9477]"}`} /><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><h3 className="truncate text-xs font-semibold">{item.title}</h3><span className="text-[9px] text-[#969b94]">{item.age}</span></div><p className="mt-1 text-[11px] font-medium">{item.subject}</p><p className="mt-1 text-[10px] leading-4 text-[#7c8179]">{item.detail}</p><button type="button" onClick={() => setReviewed((current) => [...current, item.id])} className="mt-3 text-[10px] font-semibold text-[#52784f]">Review item →</button></div></div></article>)}{reviewQueue.length === reviewed.length && <div className="p-10 text-center"><AdminIcon name="verified" size={28} className="mx-auto text-[#52784f]" /><p className="mt-3 text-sm font-semibold">Queue cleared</p></div>}</section>
          </div>

          <section id="accounts" className="mt-5 overflow-hidden rounded-2xl border border-black/8 bg-white"><header className="flex flex-col gap-4 border-b border-black/7 p-5 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="font-semibold">Account explorer</h2><p className="mt-1 text-xs text-[#7c8179]">Preview clients, freelancers, and agencies</p></div><div className="flex flex-col gap-2 sm:flex-row"><div className="flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 sm:w-72"><AdminIcon name="search" size={17} className="text-[#858a82]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search accounts" className="min-w-0 flex-1 bg-transparent text-xs outline-none" /></div><select value={accountType} onChange={(event) => setAccountType(event.target.value)} className="h-10 rounded-xl border border-black/9 px-3 text-xs outline-none"><option>All</option><option>Client</option><option>Freelancer</option><option>Agency</option></select></div></header><div className="overflow-x-auto"><table className="w-full min-w-180 border-collapse text-left"><thead className="bg-[#fafbf9] text-[10px] font-semibold tracking-[.08em] text-[#7c8179] uppercase"><tr><th className="px-5 py-3">Account</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Organization</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Joined</th><th className="px-5 py-3 text-right">Action</th></tr></thead><tbody>{visibleAccounts.map((account) => <tr key={account.id} className="border-t border-black/6 text-xs hover:bg-[#fafbf9]"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#527a73] text-[9px] font-semibold text-white">{account.name.split(" ").map((part) => part[0]).slice(0,2).join("")}</span><strong>{account.name}</strong></div></td><td className="px-5 py-4 text-[#71766e]">{account.type}</td><td className="px-5 py-4 text-[#71766e]">{account.company}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${account.status === "Verified" ? "bg-[#edf4ea] text-[#52784f]" : account.status === "Flagged" ? "bg-[#f8eceb] text-[#9a5953]" : "bg-[#f5f0de] text-[#82723f]"}`}>{account.status}</span></td><td className="px-5 py-4 text-[#858a82]">{account.joined}</td><td className="px-5 py-4 text-right"><button type="button" className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#52784f]">Preview <AdminIcon name="arrow" size={13} /></button></td></tr>)}</tbody></table>{!visibleAccounts.length && <div className="p-12 text-center text-sm text-[#7c8179]">No accounts match this search.</div>}</div></section>

          <div id="marketplace" className="mt-5 grid gap-5 xl:grid-cols-2"><section className="rounded-2xl border border-black/8 bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-semibold">Marketplace inventory</h2><button type="button" className="text-xs font-semibold text-[#52784f]">Explore all</button></div><div className="mt-5 grid grid-cols-3 gap-3"><MiniMetric label="Open jobs" value="1,284" /><MiniMetric label="Proposals" value="4,821" /><MiniMetric label="Hire rate" value="31%" /></div><div className="mt-5 space-y-3">{["Engineering & Development · 42%","Design & Creative · 28%","AI & Data · 18%","Other categories · 12%"].map((item, index) => <div key={item}><div className="flex justify-between text-[10px]"><span>{item.split(" · ")[0]}</span><span>{item.split(" · ")[1]}</span></div><div className="mt-1.5 h-1.5 rounded-full bg-[#e7eae4]"><div className="h-full rounded-full bg-[#708e6c]" style={{width: ["42%","28%","18%","12%"][index]}} /></div></div>)}</div></section><section className="rounded-2xl border border-black/8 bg-white p-5"><div className="flex items-center justify-between"><h2 className="font-semibold">Recent activity</h2><button type="button" className="text-xs font-semibold text-[#52784f]">View audit log</button></div><div className="mt-4">{recentActivity.map((item, index) => <div key={item.title} className={`flex gap-3 py-3 ${index ? "border-t border-black/6" : ""}`}><span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${item.tone === "green" ? "bg-[#6f936b]" : item.tone === "blue" ? "bg-[#64859a]" : "bg-[#b19753]"}`} /><div className="min-w-0 flex-1"><p className="text-xs font-semibold">{item.title}</p><p className="mt-1 text-[10px] leading-4 text-[#777d75]">{item.detail}</p></div><span className="shrink-0 text-[9px] text-[#969b94]">{item.time}</span></div>)}</div></section></div>
        </main>
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-[#f3f5f1] p-3"><p className="text-lg font-semibold tracking-[-.03em]">{value}</p><p className="mt-1 text-[9px] text-[#7c8179]">{label}</p></div>;
}
