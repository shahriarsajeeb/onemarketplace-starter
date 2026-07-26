"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardHeader } from "../_components/dashboard/dashboard-header";
import { WorkspaceSidebar } from "../_components/dashboard/workspace-sidebar";

type Status = "Interview" | "Viewed" | "Submitted" | "Archived" | "Withdrawn";

type Proposal = {
  id: number;
  jobId: number;
  title: string;
  company: string;
  status: Status;
  submitted: string;
  budget: string;
  bid: string;
  duration: string;
  connects: number;
  clientRating: string;
  clientSpent: string;
  activity: string;
  coverLetter: string;
  skills: string[];
};

const initialProposals: Proposal[] = [
  {
    id: 1,
    jobId: 1,
    title: "Senior Next.js developer for a collaborative workspace",
    company: "Northstar Labs",
    status: "Interview",
    submitted: "July 25, 2026",
    budget: "$12,000 fixed",
    bid: "$11,500",
    duration: "10 weeks",
    connects: 8,
    clientRating: "4.9",
    clientSpent: "$184K+ spent",
    activity: "Client sent a message 2 hours ago",
    coverLetter:
      "I’ve built real-time collaboration features across several production Next.js products, including presence, threaded comments, optimistic updates, and resilient WebSocket flows. I can begin with an architecture review and deliver the work in clear, testable milestones.",
    skills: ["Next.js", "TypeScript", "WebSockets"],
  },
  {
    id: 2,
    jobId: 2,
    title: "Design and build a polished SaaS analytics dashboard",
    company: "Aster Technologies",
    status: "Viewed",
    submitted: "July 24, 2026",
    budget: "$6,000 fixed",
    bid: "$5,800",
    duration: "7 weeks",
    connects: 6,
    clientRating: "4.8",
    clientSpent: "$92K+ spent",
    activity: "Viewed by client yesterday",
    coverLetter:
      "Your project is closely aligned with my recent analytics work. I can translate the approved Figma system into accessible, reusable React components and handle responsive behavior, chart states, documentation, and final QA.",
    skills: ["React", "Tailwind CSS", "Data visualization"],
  },
  {
    id: 3,
    jobId: 3,
    title: "Full-stack developer for AI-assisted research platform",
    company: "Lumen Research",
    status: "Submitted",
    submitted: "July 23, 2026",
    budget: "$18,500 fixed",
    bid: "$18,000",
    duration: "14 weeks",
    connects: 12,
    clientRating: "5.0",
    clientSpent: "$310K+ spent",
    activity: "Awaiting client review",
    coverLetter:
      "I combine strong TypeScript product engineering with hands-on LLM workflow experience. My proposed approach starts with an end-to-end evaluation-ready prototype, then moves into production ingestion, citations, observability, and launch.",
    skills: ["TypeScript", "OpenAI", "PostgreSQL"],
  },
  {
    id: 4,
    jobId: 4,
    title: "Frontend accessibility audit and implementation",
    company: "Commonfolk Studio",
    status: "Archived",
    submitted: "July 18, 2026",
    budget: "$3,800 fixed",
    bid: "$3,800",
    duration: "4 weeks",
    connects: 6,
    clientRating: "4.9",
    clientSpent: "$76K+ spent",
    activity: "Client hired another freelancer",
    coverLetter:
      "I can provide both the manual WCAG 2.2 AA audit and hands-on React remediation. Deliverables would include prioritized findings, component fixes, assistive-technology verification, regression coverage, and a maintenance checklist.",
    skills: ["Accessibility", "React", "WCAG"],
  },
  {
    id: 5,
    jobId: 2,
    title: "React component system for a fintech product",
    company: "Vanta Finance",
    status: "Withdrawn",
    submitted: "July 12, 2026",
    budget: "$7,500 fixed",
    bid: "$7,200",
    duration: "8 weeks",
    connects: 8,
    clientRating: "4.7",
    clientSpent: "$58K+ spent",
    activity: "Withdrawn on July 14",
    coverLetter:
      "I proposed a token-driven component architecture with accessibility, testing, and documentation built into each milestone.",
    skills: ["React", "Design systems", "Storybook"],
  },
];

const statusStyles: Record<Status, string> = {
  Interview: "bg-[#e6f2e3] text-[#477344]",
  Viewed: "bg-[#e7eef4] text-[#496c86]",
  Submitted: "bg-[#f1f0e7] text-[#766f47]",
  Archived: "bg-[#f0f1ee] text-[#747971]",
  Withdrawn: "bg-[#f4ebeb] text-[#875e5e]",
};

export function ProposalsDashboard() {
  const [proposals, setProposals] = useState(initialProposals);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Proposal | null>(null);
  const [withdrawTarget, setWithdrawTarget] = useState<Proposal | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return proposals.filter(
      (proposal) =>
        (activeTab === "All" || proposal.status === activeTab) &&
        (!query ||
          `${proposal.title} ${proposal.company} ${proposal.skills.join(" ")}`
            .toLowerCase()
            .includes(query)),
    );
  }, [activeTab, proposals, search]);

  const count = (status: Status) =>
    proposals.filter((proposal) => proposal.status === status).length;

  const withdraw = () => {
    if (!withdrawTarget) return;
    setProposals((current) =>
      current.map((proposal) =>
        proposal.id === withdrawTarget.id
          ? { ...proposal, status: "Withdrawn", activity: "Withdrawn just now" }
          : proposal,
      ),
    );
    setSelected((current) =>
      current?.id === withdrawTarget.id
        ? { ...current, status: "Withdrawn", activity: "Withdrawn just now" }
        : current,
    );
    setWithdrawTarget(null);
  };

  return (
    <div className="min-h-svh bg-[#f4f6f2] font-(family-name:--font-dm-sans) text-[#242724]">
      <DashboardHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <div className="grid items-start gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
          <WorkspaceSidebar />

          <div className="min-w-0">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">Opportunity pipeline</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">My proposals</h1>
            <p className="mt-2 text-sm text-[#72776f]">Track client activity and keep every opportunity moving.</p>
          </div>
          <Link href="/" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white! hover:bg-[#3b3e39]">
            <Icon icon="solar:magnifer-linear" width="18" /> Find more work
          </Link>
        </div>

        <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Interview", count("Interview"), "solar:chat-round-check-linear", "bg-[#e7f2e4] text-[#4d784a]"],
            ["Viewed", count("Viewed"), "solar:eye-linear", "bg-[#e8eff4] text-[#4c6e86]"],
            ["Submitted", count("Submitted"), "solar:plain-2-linear", "bg-[#f1f0e6] text-[#766f47]"],
            ["Connects used", proposals.filter((p) => p.status !== "Withdrawn").reduce((sum, p) => sum + p.connects, 0), "solar:bolt-linear", "bg-[#eeeaf5] text-[#6b5d82]"],
          ].map(([label, value, icon, color]) => (
            <div key={String(label)} className="flex items-center gap-4 rounded-2xl border border-black/8 bg-white p-5">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}><Icon icon={String(icon)} width="22" /></span>
              <div><p className="text-2xl font-semibold tracking-[-0.04em]">{value}</p><p className="mt-0.5 text-xs text-[#7c8179]">{label}</p></div>
            </div>
          ))}
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-black/8 bg-white">
          <div className="flex flex-col gap-4 border-b border-black/7 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-1 overflow-x-auto">
              {["All", "Interview", "Viewed", "Submitted", "Archived", "Withdrawn"].map((tab) => (
                <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`shrink-0 cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold ${activeTab === tab ? "bg-[#edf4ea] text-[#4e774b]" : "text-[#747971] hover:bg-black/3"}`}>
                  {tab}
                </button>
              ))}
            </div>
            <label className="flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 sm:w-72">
              <Icon icon="solar:magnifer-linear" width="18" className="text-[#7b8078]" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search proposals" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
            </label>
          </div>

          <div>
            {filtered.map((proposal, index) => (
              <article key={proposal.id} className={`p-5 sm:p-6 ${index ? "border-t border-black/7" : ""}`}>
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[proposal.status]}`}>{proposal.status}</span>
                      <span className="text-xs text-[#858a82]">Submitted {proposal.submitted}</span>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em]">{proposal.title}</h2>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#737870]">
                      <strong className="text-[#343833]">{proposal.company}</strong>
                      <span className="text-[#d1a238]">★ {proposal.clientRating}</span>
                      <span>{proposal.clientSpent}</span>
                    </div>
                    <p className={`mt-4 inline-flex items-center gap-2 text-xs font-medium ${proposal.status === "Interview" ? "text-[#4d784a]" : "text-[#737870]"}`}>
                      <Icon icon={proposal.status === "Interview" ? "solar:chat-round-dots-bold" : "solar:history-linear"} width="16" />
                      {proposal.activity}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-5 lg:justify-end">
                    <div><p className="text-sm font-semibold">{proposal.bid}</p><p className="mt-1 text-[11px] text-[#858a82]">Your bid · {proposal.duration}</p></div>
                    <button type="button" onClick={() => setSelected(proposal)} className="cursor-pointer rounded-xl border border-black/10 px-4 py-2.5 text-xs font-semibold hover:bg-black/3">View proposal</button>
                    {proposal.status === "Interview" && <button type="button" className="cursor-pointer rounded-xl bg-[#252724] px-4 py-2.5 text-xs font-semibold text-white">Message client</button>}
                  </div>
                </div>
              </article>
            ))}
            {!filtered.length && (
              <div className="px-6 py-16 text-center">
                <Icon icon="solar:document-text-linear" width="34" className="mx-auto text-[#858a82]" />
                <h2 className="mt-4 font-semibold">No proposals found</h2>
                <p className="mt-2 text-sm text-[#7c8179]">Try another status or search term.</p>
              </div>
            )}
          </div>
        </section>
          </div>
        </div>
      </main>

      {selected && (
        <div role="dialog" aria-modal="true" aria-labelledby="proposal-detail-title" className="fixed inset-0 z-50 flex justify-end bg-[#172018]/45 backdrop-blur-[2px]">
          <div className="h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-black/8 bg-white px-6 py-5 sm:px-8">
              <div><p className="text-xs font-semibold tracking-wide text-[#62805f] uppercase">Proposal details</p><h2 id="proposal-detail-title" className="mt-2 text-xl font-semibold">{selected.title}</h2></div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close" className="cursor-pointer"><Icon icon="solar:close-circle-linear" width="25" /></button>
            </div>
            <div className="grid gap-6 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[selected.status]}`}>{selected.status}</span>
                <Link href={`/jobs/${selected.jobId}`} target="_blank" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52784f] hover:underline">View job post <Icon icon="solar:arrow-right-up-linear" width="15" /></Link>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[["Your bid", selected.bid], ["Client budget", selected.budget], ["Duration", selected.duration], ["Connects", selected.connects]].map(([label, value]) => (
                  <div key={String(label)} className="rounded-xl bg-[#f3f5f1] p-3"><p className="text-[10px] text-[#858a82]">{label}</p><p className="mt-1.5 text-sm font-semibold">{value}</p></div>
                ))}
              </div>
              <section><h3 className="text-sm font-semibold">Cover letter</h3><p className="mt-3 whitespace-pre-line rounded-xl border border-black/8 p-4 text-sm leading-7 text-[#666c64]">{selected.coverLetter}</p></section>
              <section><h3 className="text-sm font-semibold">Relevant skills</h3><div className="mt-3 flex flex-wrap gap-2">{selected.skills.map((skill) => <span key={skill} className="rounded-lg bg-[#edf2eb] px-2.5 py-1.5 text-xs font-medium">{skill}</span>)}</div></section>
              <section className="rounded-xl bg-[#edf4ea] p-4"><p className="text-xs font-semibold text-[#4e774b]">{selected.activity}</p><p className="mt-1 text-xs leading-5 text-[#697168]">We’ll notify you when the client takes another action.</p></section>
              {!["Archived", "Withdrawn"].includes(selected.status) && (
                <button type="button" onClick={() => setWithdrawTarget(selected)} className="justify-self-start cursor-pointer text-xs font-semibold text-[#976060] hover:underline">Withdraw proposal</button>
              )}
            </div>
          </div>
        </div>
      )}

      {withdrawTarget && (
        <div role="alertdialog" aria-modal="true" aria-labelledby="withdraw-title" className="fixed inset-0 z-60 flex items-center justify-center bg-[#172018]/55 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4eaea] text-[#925f5f]"><Icon icon="solar:danger-triangle-linear" width="23" /></span>
            <h2 id="withdraw-title" className="mt-5 text-xl font-semibold">Withdraw this proposal?</h2>
            <p className="mt-2 text-sm leading-6 text-[#737870]">The client will no longer be able to hire you from this proposal. This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setWithdrawTarget(null)} className="cursor-pointer rounded-xl border border-black/10 px-4 py-2.5 text-sm font-semibold">Keep proposal</button>
              <button type="button" onClick={withdraw} className="cursor-pointer rounded-xl bg-[#8b5555] px-4 py-2.5 text-sm font-semibold text-white">Withdraw</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
