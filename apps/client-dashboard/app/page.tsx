import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";
import { ClientShell } from "./_components/dashboard/client-shell";
import { clientContracts, clientJobs, clientProposals } from "./_components/data/client-data";

export const metadata: Metadata = {
  title: "Overview",
  description: "Review your active job posts, proposals, and client contracts.",
};

export default function ClientDashboardPage() {
  const openJobs = clientJobs.filter((job) => job.status === "Open");
  const activeContracts = clientContracts.filter((contract) => contract.status !== "Completed");
  return (
    <ClientShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-xs font-semibold tracking-[.14em] text-[#62805f] uppercase">Client workspace</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Good morning, Olivia.</h1><p className="mt-2 text-sm text-[#72776f]">Keep hiring and delivery moving without the busywork.</p></div>
        <Link href="/jobs/new" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"><Icon icon="solar:add-circle-linear" width="18" /> Post a job</Link>
      </div>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon="solar:document-text-linear" label="Open job posts" value={String(openJobs.length)} detail={`${clientProposals.length + 20} total proposals`} />
        <Metric icon="solar:users-group-rounded-linear" label="New proposals" value="9" detail="3 strong matches" />
        <Metric icon="solar:case-round-linear" label="Active contracts" value={String(activeContracts.length)} detail="$15K currently funded" />
        <Metric icon="solar:wallet-money-linear" label="Total spent" value="$184K" detail="Across 26 contracts" />
      </section>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="overflow-hidden rounded-2xl border border-black/8 bg-white">
          <header className="flex items-center justify-between border-b border-black/7 p-5 sm:p-6"><div><h2 className="font-semibold">Active job posts</h2><p className="mt-1 text-xs text-[#7b8078]">Review proposals and keep hiring moving.</p></div><Link href="/jobs" className="text-xs font-semibold text-[#52784f]">View all</Link></header>
          {openJobs.map((job, index) => <div key={job.id} className={`p-5 sm:p-6 ${index ? "border-t border-black/6" : ""}`}><div className="flex flex-wrap justify-between gap-3"><div><h3 className="text-sm font-semibold">{job.title}</h3><p className="mt-2 text-xs text-[#7b8078]">Fixed price · ${job.budget.toLocaleString()} · {job.level} · {job.duration}</p></div><Link href={`/proposals?job=${job.id}`} className="h-9 rounded-lg border border-black/10 px-3 py-2 text-xs font-semibold">{job.proposals} proposals</Link></div></div>)}
        </section>
        <section className="rounded-2xl bg-[#252a25] p-6 text-white"><p className="text-xs text-white/55">Currently in escrow</p><p className="mt-2 text-3xl font-semibold">$15,000</p><div className="mt-6 space-y-4">{activeContracts.map((contract) => <div key={contract.id}><div className="flex justify-between gap-3 text-xs"><span>{contract.title}</span><span className="text-white/60">{contract.progress}%</span></div><div className="mt-2 h-1.5 rounded-full bg-white/10"><div style={{ width: `${contract.progress}%` }} className="h-full rounded-full bg-[#8aa486]" /></div></div>)}</div><Link href="/contracts" className="mt-7 inline-flex text-xs font-semibold text-[#a8c5a1]">Manage contracts →</Link></section>
      </div>
    </ClientShell>
  );
}

function Metric({ icon, label, value, detail }: { icon: string; label: string; value: string; detail: string }) {
  return <article className="rounded-2xl border border-black/8 bg-white p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ea] text-[#52784f]"><Icon icon={icon} width="20" /></span><p className="mt-5 text-2xl font-semibold">{value}</p><h2 className="mt-1 text-xs font-semibold">{label}</h2><p className="mt-1 text-[10px] text-[#858a82]">{detail}</p></article>;
}
