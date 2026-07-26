import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardHeader } from "../../_components/dashboard/dashboard-header";

type JobDetail = {
  title: string;
  company: string;
  posted: string;
  budget: string;
  duration: string;
  level: string;
  summary: string[];
  skills: string[];
  requirements: string[];
  deliverables: string[];
  milestones: Array<{ title: string; description: string; amount: string }>;
  rating: string;
  spent: string;
  hires: string;
  proposals: string;
};

const jobs: Record<string, JobDetail> = {
  "1": {
    title: "Senior Next.js developer for a collaborative workspace",
    company: "Northstar Labs",
    posted: "18 minutes ago",
    budget: "$12,000",
    duration: "10–12 weeks",
    level: "Expert",
    summary: [
      "We’re building a collaborative workspace for distributed product teams and need a senior product engineer to own a focused set of real-time collaboration features.",
      "You’ll work directly with our technical lead and product designer. The application is in private beta, the core architecture is in place, and specifications are ready in Figma and Linear.",
    ],
    skills: ["Next.js", "TypeScript", "React", "PostgreSQL", "WebSockets"],
    requirements: [
      "5+ years of professional frontend or full-stack experience",
      "Strong production experience with Next.js and TypeScript",
      "Experience implementing presence, comments, or real-time features",
      "Clear written communication and weekly progress updates",
      "At least 20 hours of availability per week",
    ],
    deliverables: [
      "Real-time presence and collaborator state",
      "Threaded comments with mentions and notifications",
      "Optimistic updates and offline recovery",
      "Automated tests and implementation notes",
      "Performance review and production launch support",
    ],
    milestones: [
      { title: "Architecture and technical plan", description: "Review the application, validate requirements, and finalize the implementation plan.", amount: "$1,500" },
      { title: "Collaboration foundation", description: "Deliver presence state, live cursors, and the underlying real-time architecture.", amount: "$4,000" },
      { title: "Comments and notifications", description: "Build threaded discussions, mentions, notifications, and associated tests.", amount: "$4,000" },
      { title: "Quality and launch", description: "Complete performance work, edge-case testing, documentation, and handoff.", amount: "$2,500" },
    ],
    rating: "4.9",
    spent: "$184K+",
    hires: "38 hires",
    proposals: "Less than 5",
  },
  "2": {
    title: "Design and build a polished SaaS analytics dashboard",
    company: "Aster Technologies",
    posted: "42 minutes ago",
    budget: "$6,000",
    duration: "6–8 weeks",
    level: "Intermediate",
    summary: [
      "We need a thoughtful UI engineer to translate completed Figma designs into a responsive analytics dashboard.",
      "The project includes reusable data visualization, accessible interaction states, and a production-ready component system.",
    ],
    skills: ["React", "Tailwind CSS", "Figma", "Data visualization"],
    requirements: ["Strong React and responsive UI experience", "Portfolio showing complex SaaS interfaces", "Working knowledge of accessibility", "Comfort collaborating asynchronously"],
    deliverables: ["Responsive dashboard views", "Reusable chart and table components", "Accessible loading and error states", "Component documentation and QA"],
    milestones: [
      { title: "Foundation", description: "Tokens, layout, navigation, and reusable component structure.", amount: "$1,500" },
      { title: "Core analytics", description: "Dashboard views, tables, filtering, and charts.", amount: "$3,000" },
      { title: "QA and handoff", description: "Responsive testing, accessibility review, and documentation.", amount: "$1,500" },
    ],
    rating: "4.8",
    spent: "$92K+",
    hires: "21 hires",
    proposals: "5 to 10",
  },
  "3": {
    title: "Full-stack developer for AI-assisted research platform",
    company: "Lumen Research",
    posted: "1 hour ago",
    budget: "$18,500",
    duration: "12–16 weeks",
    level: "Expert",
    summary: ["Join a small senior team building an AI-assisted research product for knowledge workers.", "You will own end-to-end workflows and help design reliable LLM orchestration and evaluation tools."],
    skills: ["TypeScript", "Node.js", "OpenAI", "Python", "AWS"],
    requirements: ["Production experience with LLM-powered software", "Strong TypeScript and database fundamentals", "Experience with evaluation or observability", "Pragmatic architectural judgment"],
    deliverables: ["Research ingestion workflow", "LLM orchestration and evaluation suite", "Citations and source management", "Monitoring, tests, and documentation"],
    milestones: [
      { title: "Discovery and prototype", description: "Technical discovery and validated end-to-end prototype.", amount: "$3,500" },
      { title: "Core research workflow", description: "Production ingestion, processing, and research experience.", amount: "$7,000" },
      { title: "Evaluation and reliability", description: "Evaluation tools, observability, and quality improvements.", amount: "$5,000" },
      { title: "Launch", description: "Final QA, deployment, documentation, and handoff.", amount: "$3,000" },
    ],
    rating: "5.0",
    spent: "$310K+",
    hires: "52 hires",
    proposals: "10 to 15",
  },
  "4": {
    title: "Frontend accessibility audit and implementation",
    company: "Commonfolk Studio",
    posted: "2 hours ago",
    budget: "$3,800",
    duration: "3–4 weeks",
    level: "Expert",
    summary: ["Audit our customer portal against WCAG 2.2 AA and work with our engineers to implement the highest-priority improvements.", "We need actionable findings, tested fixes, and clear documentation—not only an automated report."],
    skills: ["Accessibility", "React", "WCAG", "Testing"],
    requirements: ["Demonstrable accessibility audit experience", "Hands-on React implementation skills", "Screen reader testing experience", "Clear developer documentation"],
    deliverables: ["Prioritized accessibility audit", "Implementation of critical fixes", "Assistive technology verification", "Final report and maintenance checklist"],
    milestones: [
      { title: "Audit", description: "Manual and automated audit with prioritized findings.", amount: "$1,200" },
      { title: "Implementation", description: "Critical fixes, component improvements, and regression tests.", amount: "$2,000" },
      { title: "Verification", description: "Final assistive technology testing and documentation.", amount: "$600" },
    ],
    rating: "4.9",
    spent: "$76K+",
    hires: "17 hires",
    proposals: "Less than 5",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const job = jobs[(await params).id];
  return {
    title: job ? `${job.title} | OneMarketplace.io` : "Job not found",
    description: job?.summary[0],
  };
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = jobs[id];
  if (!job) notFound();

  return (
    <div className="min-h-svh bg-[#f4f6f2] font-(family-name:--font-dm-sans) text-[#242724]">
      <DashboardHeader />

      <main className="mx-auto grid max-w-7xl items-start gap-7 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:py-12">
        <article className="overflow-hidden rounded-3xl border border-black/8 bg-white">
          <div className="border-b border-black/7 p-6 sm:p-9">
            <p className="text-xs text-[#7a8078]">Posted {job.posted} · Worldwide</p>
            <h1 className="mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">{job.title}</h1>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-lg bg-[#edf4ea] px-3 py-2 text-xs font-semibold text-[#4e774b]">Fixed-price project</span>
              <span className="rounded-lg bg-[#f2f3f0] px-3 py-2 text-xs font-medium">{job.level}</span>
              <span className="rounded-lg bg-[#f2f3f0] px-3 py-2 text-xs font-medium">{job.duration}</span>
            </div>
          </div>

          <div className="p-6 sm:p-9">
            <section>
              <h2 className="text-xl font-semibold tracking-[-0.025em]">About the project</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#626860]">
                {job.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>

            <section className="mt-9 border-t border-black/7 pt-8">
              <h2 className="text-xl font-semibold tracking-[-0.025em]">Required skills and experience</h2>
              <ul className="mt-4 grid gap-3 text-sm text-[#626860]">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Icon icon="solar:check-circle-linear" width="19" className="mt-0.5 shrink-0 text-[#5b8458]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {job.skills.map((skill) => <span key={skill} className="rounded-lg bg-[#eef2ec] px-3 py-2 text-xs font-medium text-[#596057]">{skill}</span>)}
              </div>
            </section>

            <section className="mt-9 border-t border-black/7 pt-8">
              <h2 className="text-xl font-semibold tracking-[-0.025em]">Project deliverables</h2>
              <ul className="mt-4 grid gap-3 text-sm text-[#626860] sm:grid-cols-2">
                {job.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 rounded-xl bg-[#f6f7f4] p-4">
                    <Icon icon="solar:document-add-linear" width="19" className="shrink-0 text-[#5b8458]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-9 border-t border-black/7 pt-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.025em]">Proposed milestones</h2>
                  <p className="mt-1 text-sm text-[#7a8078]">Payments release as each milestone is approved.</p>
                </div>
                <strong className="text-xl">{job.budget}</strong>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-black/8">
                {job.milestones.map((milestone, index) => (
                  <div key={milestone.title} className={`flex gap-4 p-5 ${index ? "border-t border-black/7" : ""}`}>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e9f2e6] text-xs font-semibold text-[#4d764a]">{index + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-4">
                        <h3 className="font-semibold">{milestone.title}</h3>
                        <strong className="shrink-0 text-sm">{milestone.amount}</strong>
                      </div>
                      <p className="mt-1.5 text-sm leading-6 text-[#71766f]">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>

        <aside className="grid gap-5 lg:sticky lg:top-6">
          <section className="rounded-3xl border border-black/8 bg-white p-6 shadow-lg shadow-black/3">
            <p className="text-xs font-medium text-[#7c8179]">Total fixed budget</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{job.budget}</p>
            <p className="mt-2 text-xs leading-5 text-[#777d75]">Protected through milestone-based payments.</p>
            <Link href={`/?proposal=${id}`} className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#252724] px-5 py-3 text-sm font-semibold text-white! hover:bg-[#3b3e39]">Submit a proposal</Link>
            <button type="button" className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold hover:bg-black/3">
              <Icon icon="solar:bookmark-linear" width="18" /> Save job
            </button>
            <p className="mt-5 text-center text-xs text-[#81867e]">{job.proposals} proposals</p>
          </section>

          <section className="rounded-3xl border border-black/8 bg-white p-6">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{job.company}</h2>
              <Icon icon="solar:verified-check-bold" width="17" className="text-[#568153]" />
            </div>
            <p className="mt-1 text-xs font-medium text-[#548050]">Payment verified</p>
            <div className="mt-5 grid grid-cols-2 gap-y-5 text-sm">
              <div><p className="font-semibold text-[#d0a136]">★ <span className="text-[#2f332e]">{job.rating}</span></p><p className="mt-1 text-xs text-[#838880]">Client rating</p></div>
              <div><p className="font-semibold">{job.spent}</p><p className="mt-1 text-xs text-[#838880]">Total spent</p></div>
              <div><p className="font-semibold">{job.hires}</p><p className="mt-1 text-xs text-[#838880]">On platform</p></div>
              <div><p className="font-semibold">United States</p><p className="mt-1 text-xs text-[#838880]">Client location</p></div>
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
