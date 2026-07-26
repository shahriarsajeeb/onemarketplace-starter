"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardHeader } from "../_components/dashboard/dashboard-header";
import { WorkspaceSidebar } from "../_components/dashboard/workspace-sidebar";

type Job = {
  id: number;
  title: string;
  company: string;
  saved: string;
  posted: string;
  budget: string;
  duration: string;
  description: string;
  skills: string[];
  rating: string;
  spent: string;
  proposals: string;
};

const initialJobs: Job[] = [
  {
    id: 1,
    title: "Senior Next.js developer for a collaborative workspace",
    company: "Northstar Labs",
    saved: "Saved today",
    posted: "18 minutes ago",
    budget: "$12,000",
    duration: "10–12 weeks",
    description: "Build real-time collaboration features, improve application performance, and help shape a thoughtful frontend architecture.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    rating: "4.9",
    spent: "$184K+ spent",
    proposals: "Less than 5",
  },
  {
    id: 3,
    title: "Full-stack developer for AI-assisted research platform",
    company: "Lumen Research",
    saved: "Saved yesterday",
    posted: "1 hour ago",
    budget: "$18,500",
    duration: "12–16 weeks",
    description: "Own end-to-end workflows across the TypeScript stack and help design reliable LLM orchestration and evaluation tools.",
    skills: ["TypeScript", "Node.js", "OpenAI", "Python"],
    rating: "5.0",
    spent: "$310K+ spent",
    proposals: "10 to 15",
  },
  {
    id: 4,
    title: "Frontend accessibility audit and implementation",
    company: "Commonfolk Studio",
    saved: "Saved 3 days ago",
    posted: "2 hours ago",
    budget: "$3,800",
    duration: "3–4 weeks",
    description: "Audit a customer portal against WCAG 2.2 AA and implement the highest-priority accessibility improvements.",
    skills: ["Accessibility", "React", "WCAG", "Testing"],
    rating: "4.9",
    spent: "$76K+ spent",
    proposals: "Less than 5",
  },
];

export function SavedJobsDashboard() {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [removed, setRemoved] = useState<Job | null>(null);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = jobs.filter((job) => `${job.title} ${job.company} ${job.skills.join(" ")}`.toLowerCase().includes(query));
    return sort === "budget" ? [...result].sort((a, b) => Number(b.budget.replace(/\D/g, "")) - Number(a.budget.replace(/\D/g, ""))) : result;
  }, [jobs, search, sort]);

  const remove = (job: Job) => {
    setJobs((current) => current.filter((item) => item.id !== job.id));
    setRemoved(job);
    window.setTimeout(() => setRemoved(null), 3500);
  };

  return (
    <div className="min-h-svh bg-[#f4f6f2] font-(family-name:--font-dm-sans) text-[#242724]">
      <DashboardHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <div className="grid items-start gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
          <WorkspaceSidebar />
          <div className="min-w-0">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">Your shortlist</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Saved jobs</h1><p className="mt-2 text-sm text-[#72776f]">Keep promising opportunities together and apply when you’re ready.</p></div>
              <Link href="/" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white! hover:bg-[#3b3e39]"><Icon icon="solar:magnifer-linear" width="18" />Browse jobs</Link>
            </div>
            <section className="mt-8 rounded-2xl border border-black/8 bg-white p-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex h-11 flex-1 items-center gap-3 rounded-xl border border-black/9 px-3.5"><Icon icon="solar:magnifer-linear" width="19" className="text-[#7b8078]" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search saved jobs by title, company, or skill" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-11 rounded-xl border border-black/9 bg-white px-4 text-sm font-medium outline-none"><option value="recent">Recently saved</option><option value="budget">Highest budget</option></select>
              </div>
            </section>
            <div className="mt-4 grid gap-4">
              {visible.map((job) => (
                <article key={job.id} className="rounded-2xl border border-black/8 bg-white p-5 transition hover:border-black/14 hover:shadow-lg hover:shadow-black/4 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0"><p className="text-xs text-[#858a82]">{job.saved} · Posted {job.posted}</p><h2 className="mt-3 text-xl leading-7 font-semibold tracking-[-0.025em]">{job.title}</h2></div>
                    <div className="flex shrink-0 gap-2"><Link href={`/jobs/${job.id}`} target="_blank" aria-label="Open full job" className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#737870] hover:bg-[#f2f5f0] hover:text-[#4e774b]"><Icon icon="solar:arrow-right-up-linear" width="20" /></Link><button type="button" onClick={() => remove(job)} aria-label="Remove saved job" className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#a8c3a4] bg-[#e8f2e5] text-[#4e784b]"><Icon icon="solar:bookmark-bold" width="20" /></button></div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#656a63]"><span>Fixed price</span><span>{job.budget}</span><span>Expert</span><span>{job.duration}</span></div>
                  <p className="mt-5 text-sm leading-6 text-[#626860]">{job.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-lg bg-[#eef2ec] px-2.5 py-1.5 text-xs font-medium text-[#596057]">{skill}</span>)}</div>
                  <div className="mt-6 flex flex-col justify-between gap-4 border-t border-black/7 pt-5 sm:flex-row sm:items-center">
                    <div><div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#737870]"><strong className="text-[#343833]">{job.company}</strong><span className="inline-flex items-center gap-1 font-semibold text-[#4f784c]"><Icon icon="solar:verified-check-bold" width="15" />Payment verified</span><span className="text-[#d1a238]">★ {job.rating}</span><span>{job.spent}</span></div><p className="mt-2 text-xs text-[#858a82]">{job.proposals} proposals</p></div>
                    <Link href={`/jobs/${job.id}`} className="rounded-xl bg-[#252724] px-5 py-2.5 text-center text-sm font-semibold text-white! hover:bg-[#3b3e39]">Submit a proposal</Link>
                  </div>
                </article>
              ))}
              {!visible.length && <div className="rounded-2xl border border-dashed border-black/12 bg-white px-6 py-16 text-center"><Icon icon="solar:bookmark-linear" width="30" className="mx-auto text-[#788076]" /><h2 className="mt-4 text-lg font-semibold">No saved jobs found</h2><p className="mt-2 text-sm text-[#777c74]">{jobs.length ? "Try a different search term." : "Save opportunities from the job feed and they’ll appear here."}</p></div>}
            </div>
          </div>
        </div>
      </main>
      {removed && <div role="status" className="fixed right-5 bottom-5 z-50 flex items-center gap-4 rounded-xl bg-[#252724] px-5 py-3.5 text-sm text-white shadow-xl"><span>Removed from saved jobs</span><button type="button" onClick={() => { setJobs((current) => [removed, ...current]); setRemoved(null); }} className="cursor-pointer font-semibold text-[#a9cba5]">Undo</button></div>}
    </div>
  );
}
