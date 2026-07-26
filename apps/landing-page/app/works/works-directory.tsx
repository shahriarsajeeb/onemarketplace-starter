"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./works.module.css";

type Category =
  | "Design"
  | "Development"
  | "Marketing"
  | "Writing"
  | "Data & AI";
type Experience = "Entry level" | "Intermediate" | "Expert";

interface Job {
  id: number;
  title: string;
  category: Category;
  client: string;
  clientLocation: string;
  postedMinutesAgo: number;
  projectType: "Fixed price";
  budget: number;
  budgetLabel: string;
  duration: string;
  experience: Experience;
  paymentVerified: boolean;
  clientRating: number;
  clientSpent: string;
  proposals: number;
  description: string;
  skills: string[];
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior product designer for a collaborative finance platform",
    category: "Design",
    client: "Northstar Labs",
    clientLocation: "United States",
    postedMinutesAgo: 18,
    projectType: "Fixed price",
    budget: 14000,
    budgetLabel: "$10,000–$14,000",
    duration: "3–6 months",
    experience: "Expert",
    paymentVerified: true,
    clientRating: 4.9,
    clientSpent: "$180k+ spent",
    proposals: 7,
    description:
      "We are looking for a senior product designer to lead discovery and interaction design for a new collaborative finance workspace. You will partner directly with product and engineering.",
    skills: ["Product design", "Figma", "Design systems", "Prototyping"],
  },
  {
    id: 2,
    title: "Next.js engineer to build a modern B2B customer portal",
    category: "Development",
    client: "Aster Technologies",
    clientLocation: "United Kingdom",
    postedMinutesAgo: 34,
    projectType: "Fixed price",
    budget: 18000,
    budgetLabel: "$12,000–$18,000",
    duration: "1–3 months",
    experience: "Expert",
    paymentVerified: true,
    clientRating: 5,
    clientSpent: "$95k+ spent",
    proposals: 12,
    description:
      "Help us build a fast, accessible customer portal using Next.js, TypeScript, and PostgreSQL. Strong product judgment and clear communication are as important as technical depth.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "API design"],
  },
  {
    id: 3,
    title: "Brand strategist for an early-stage climate technology company",
    category: "Marketing",
    client: "Commonfolk Ventures",
    clientLocation: "Netherlands",
    postedMinutesAgo: 52,
    projectType: "Fixed price",
    budget: 12000,
    budgetLabel: "$8,000–$12,000",
    duration: "4–6 weeks",
    experience: "Expert",
    paymentVerified: true,
    clientRating: 4.8,
    clientSpent: "$64k+ spent",
    proposals: 5,
    description:
      "We need a strategic partner to sharpen positioning, audience priorities, messaging, and our launch narrative ahead of a seed-stage product release.",
    skills: ["Brand strategy", "Positioning", "Messaging", "Workshops"],
  },
  {
    id: 4,
    title: "Conversion copywriter for SaaS website and onboarding emails",
    category: "Writing",
    client: "Lumen Software",
    clientLocation: "Canada",
    postedMinutesAgo: 75,
    projectType: "Fixed price",
    budget: 5500,
    budgetLabel: "$3,500–$5,500",
    duration: "2–4 weeks",
    experience: "Intermediate",
    paymentVerified: true,
    clientRating: 4.9,
    clientSpent: "$42k+ spent",
    proposals: 18,
    description:
      "Rewrite our core website and onboarding email sequence in a clear, confident voice. Experience with B2B SaaS products and customer research is preferred.",
    skills: ["SaaS copywriting", "Web copy", "Email", "Messaging"],
  },
  {
    id: 5,
    title: "Applied AI engineer for document intelligence product",
    category: "Data & AI",
    client: "Vanta Research",
    clientLocation: "Singapore",
    postedMinutesAgo: 96,
    projectType: "Fixed price",
    budget: 28000,
    budgetLabel: "$18,000–$28,000",
    duration: "3–6 months",
    experience: "Expert",
    paymentVerified: true,
    clientRating: 5,
    clientSpent: "$220k+ spent",
    proposals: 9,
    description:
      "Join a small technical team building document extraction and evaluation workflows. You should be comfortable shipping LLM systems into production and measuring quality.",
    skills: ["Python", "LLMs", "RAG", "Evaluation", "MLOps"],
  },
  {
    id: 6,
    title: "React Native developer for health and wellness application",
    category: "Development",
    client: "Wellmade Health",
    clientLocation: "Australia",
    postedMinutesAgo: 135,
    projectType: "Fixed price",
    budget: 12000,
    budgetLabel: "$8,000–$12,000",
    duration: "1–3 months",
    experience: "Intermediate",
    paymentVerified: false,
    clientRating: 4.7,
    clientSpent: "$12k+ spent",
    proposals: 21,
    description:
      "We are extending an existing React Native app with guided programs, progress tracking, and subscription improvements. Experience shipping to both app stores is required.",
    skills: ["React Native", "TypeScript", "iOS", "Android"],
  },
  {
    id: 7,
    title: "UX researcher for customer onboarding study",
    category: "Design",
    client: "Fieldwork Systems",
    clientLocation: "Germany",
    postedMinutesAgo: 190,
    projectType: "Fixed price",
    budget: 7500,
    budgetLabel: "$6,000–$7,500",
    duration: "4 weeks",
    experience: "Intermediate",
    paymentVerified: true,
    clientRating: 4.9,
    clientSpent: "$38k+ spent",
    proposals: 6,
    description:
      "Plan and conduct a focused onboarding study with 10–12 participants, then synthesize findings into practical product recommendations and opportunity areas.",
    skills: ["UX research", "Interviews", "Usability testing", "Synthesis"],
  },
  {
    id: 8,
    title: "Marketing analyst to improve paid acquisition reporting",
    category: "Marketing",
    client: "Orbit Commerce",
    clientLocation: "United States",
    postedMinutesAgo: 260,
    projectType: "Fixed price",
    budget: 5000,
    budgetLabel: "$3,000–$5,000",
    duration: "Less than 1 month",
    experience: "Entry level",
    paymentVerified: true,
    clientRating: 4.6,
    clientSpent: "$28k+ spent",
    proposals: 14,
    description:
      "Help clean up campaign tracking, build a practical reporting dashboard, and document a repeatable weekly performance review for our internal marketing team.",
    skills: ["Marketing analytics", "GA4", "Looker Studio", "Paid media"],
  },
];

const categories: Array<"All" | Category> = [
  "All",
  "Design",
  "Development",
  "Marketing",
  "Writing",
  "Data & AI",
];
const experienceLevels: Experience[] = [
  "Entry level",
  "Intermediate",
  "Expert",
];
interface FilterProps {
  prefix: string;
  category: string;
  setCategory: (value: string) => void;
  experience: Experience[];
  toggleExperience: (value: Experience) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  lowProposalsOnly: boolean;
  setLowProposalsOnly: (value: boolean) => void;
  minBudget: number;
  setMinBudget: (value: number) => void;
  maxBudget: number;
  setMaxBudget: (value: number) => void;
  resetFilters: () => void;
}

function FilterControls(props: FilterProps) {
  const {
    prefix,
    category,
    setCategory,
    experience,
    toggleExperience,
    verifiedOnly,
    setVerifiedOnly,
    lowProposalsOnly,
    setLowProposalsOnly,
    minBudget,
    setMinBudget,
    maxBudget,
    setMaxBudget,
    resetFilters,
  } = props;
  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="text-sm font-semibold">Category</legend>
        <div className="mt-3 grid gap-2.5">
          {categories.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#62665f]"
            >
              <input
                type="radio"
                name={`${prefix}-category`}
                checked={category === item}
                onChange={() => setCategory(item)}
                className="h-4 w-4 accent-[#456f42]"
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="border-t border-black/7 pt-6">
        <fieldset>
          <legend className="text-sm font-semibold">Experience level</legend>
          <div className="mt-3 grid gap-3">
            {experienceLevels.map((level) => (
              <label
                key={level}
                className="flex cursor-pointer items-center gap-3 text-sm text-[#62665f]"
              >
                <input
                  type="checkbox"
                  checked={experience.includes(level)}
                  onChange={() => toggleExperience(level)}
                  className="h-4 w-4 rounded accent-[#456f42]"
                />
                {level}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="border-t border-black/7 pt-6">
        <p className="text-sm font-semibold">Client quality</p>
        <div className="mt-3 grid gap-3">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#62665f]">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="h-4 w-4 rounded accent-[#456f42]"
            />
            Payment verified
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#62665f]">
            <input
              type="checkbox"
              checked={lowProposalsOnly}
              onChange={(e) => setLowProposalsOnly(e.target.checked)}
              className="h-4 w-4 rounded accent-[#456f42]"
            />
            Fewer than 10 proposals
          </label>
        </div>
      </div>

      <div className="border-t border-black/7 pt-6">
        <p className="text-sm font-semibold">Budget</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="grid gap-1.5 text-xs font-medium text-[#777b74]">
            Minimum
            <span className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                value={minBudget || ""}
                onChange={(e) =>
                  setMinBudget(Math.max(0, Number(e.target.value)))
                }
                className="h-11 w-full rounded-xl border border-black/10 bg-white pr-2 pl-7 text-sm font-normal outline-none focus:border-[#668c63]"
                placeholder="0"
              />
            </span>
          </label>
          <label className="grid gap-1.5 text-xs font-medium text-[#777b74]">
            Maximum
            <span className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                value={maxBudget || ""}
                onChange={(e) =>
                  setMaxBudget(Math.max(0, Number(e.target.value)))
                }
                className="h-11 w-full rounded-xl border border-black/10 bg-white pr-2 pl-7 text-sm font-normal outline-none focus:border-[#668c63]"
                placeholder="Any"
              />
            </span>
          </label>
        </div>
        <p className="mt-2 text-[11px] leading-4 text-[#8a8e87]">
          Applies to the total fixed-price project budget.
        </p>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="text-sm font-semibold text-[#477344] hover:underline"
      >
        Reset all filters
      </button>
    </div>
  );
}

function JobCard({
  job,
  saved,
  toggleSaved,
}: {
  job: Job;
  saved: boolean;
  toggleSaved: () => void;
}) {
  const posted =
    job.postedMinutesAgo < 60
      ? `${job.postedMinutesAgo} minutes`
      : `${Math.floor(job.postedMinutesAgo / 60)} ${Math.floor(job.postedMinutesAgo / 60) === 1 ? "hour" : "hours"}`;
  return (
    <article className="rounded-2xl border border-black/8 bg-white p-6 transition hover:border-black/13 hover:shadow-xl hover:shadow-black/4 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#81857e]">
            Posted {posted} ago
          </p>
          <h2 className={`${styles.uiHeading} mt-2 text-xl text-[#252824]`}>
            {job.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={toggleSaved}
          className={`flex cursor-pointer h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${saved ? "border-[#9dbc99] bg-[#e9f3e6] text-[#477344]" : "border-black/10 text-[#747870] hover:bg-[#f4f5f2]"}`}
          aria-label={saved ? "Remove saved job" : "Save job"}
          aria-pressed={saved}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill={saved ? "currentColor" : "none"}
            aria-hidden="true"
          >
            <path
              d="M12 20.2 4.8 13A4.9 4.9 0 0 1 12 6.4 4.9 4.9 0 0 1 19.2 13L12 20.2Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#666b64]">
        <span>{job.projectType}</span>
        <span>{job.budgetLabel}</span>
        <span>{job.duration}</span>
        <span>{job.experience}</span>
      </div>
      <p className="mt-5 text-sm leading-6 text-[#626760]">{job.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-[#eef2ec] px-2.5 py-1.5 text-xs font-medium text-[#596057]"
          >
            {skill}
          </span>
        ))}
      </div>
	      <div className="mt-6 flex flex-col justify-between gap-4 border-t border-black/7 pt-5 sm:flex-row sm:items-center">
	        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#737870]">
	          <span className="inline-flex items-center gap-1.5 font-semibold text-[#31352f]">
	            <svg
	              viewBox="0 0 24 24"
	              className="h-4 w-4 text-[#668c63]"
	              fill="none"
	              aria-hidden="true"
	            >
	              <path
	                d="M4.5 20V7.5L12 4l7.5 3.5V20M8 10h1m3-1v1m3-1v1m-7 4h1m3-1v1m3-1v1M3 20h18"
	                stroke="currentColor"
	                strokeWidth="1.7"
	                strokeLinecap="round"
	                strokeLinejoin="round"
	              />
	            </svg>
	            {job.client}
	          </span>
	          {job.paymentVerified ? (
            <span className="inline-flex items-center gap-1 font-semibold text-[#4d764a]">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#e4f1e1] text-[10px]">
                ✓
              </span>
              Payment verified
            </span>
          ) : (
            <span>Payment unverified</span>
          )}
          <span className="text-[#d2a43a]">★</span>
          <span>{job.clientRating.toFixed(1)}</span>
          <span>{job.clientSpent}</span>
          <span>{job.clientLocation}</span>
        </div>
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <span className="text-xs text-[#858981]">
            {job.proposals} proposals
          </span>
          <Link
            href="/signup?role=freelancer"
            className="rounded-xl bg-[#252724] px-4 py-2.5 text-sm font-semibold text-white! transition hover:bg-[#3b3e39]"
          >
            View job
          </Link>
        </div>
      </div>
    </article>
  );
}

export function WorksDirectory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [experience, setExperience] = useState<Experience[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [lowProposalsOnly, setLowProposalsOnly] = useState(false);
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(0);
  const [sort, setSort] = useState("newest");
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const toggleExperience = (value: Experience) =>
    setExperience((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = jobs.filter((job) => {
      const searchable = [
        job.title,
        job.description,
        job.category,
        job.client,
        ...job.skills,
      ]
        .join(" ")
        .toLowerCase();
      return (
        (!query || searchable.includes(query)) &&
        (category === "All" || job.category === category) &&
        (!experience.length || experience.includes(job.experience)) &&
        (!verifiedOnly || job.paymentVerified) &&
        (!lowProposalsOnly || job.proposals < 10) &&
        job.budget >= minBudget &&
        (!maxBudget || job.budget <= maxBudget)
      );
    });
    return [...result].sort((a, b) => {
      if (sort === "budget") return b.budget - a.budget;
      if (sort === "rating") return b.clientRating - a.clientRating;
      if (sort === "proposals") return a.proposals - b.proposals;
      return a.postedMinutesAgo - b.postedMinutesAgo;
    });
  }, [
    category,
    experience,
    lowProposalsOnly,
    maxBudget,
    minBudget,
    search,
    sort,
    verifiedOnly,
  ]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setExperience([]);
    setVerifiedOnly(false);
    setLowProposalsOnly(false);
    setMinBudget(0);
    setMaxBudget(0);
    setSort("newest");
  };
  const filterProps = {
    category,
    setCategory,
    experience,
    toggleExperience,
    verifiedOnly,
    setVerifiedOnly,
    lowProposalsOnly,
    setLowProposalsOnly,
    minBudget,
    setMinBudget,
    maxBudget,
    setMaxBudget,
    resetFilters,
  };

  return (
    <>
      <section className="border-b border-black/7 bg-[#e8f1e5]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5a7d58]">
            Fresh opportunities
          </p>
          <h1 className={`${styles.pageTitle} max-w-3xl`}>
            Find meaningful work with great clients.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#667064] sm:text-base">
            Explore recent projects from verified companies looking for
            independent expertise.
          </p>
          <label className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 focus-within:border-[#6e916b] focus-within:ring-3 focus-within:ring-white/60">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-[#7d827a]"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10.8"
                cy="10.8"
                r="6.6"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="m16 16 4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="sr-only">Search jobs</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-[#9a9e97]"
              placeholder="Search jobs by title, skill, category, or client"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-xs font-semibold text-[#62705f]"
              >
                Clear
              </button>
            )}
          </label>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <details className="mb-6 rounded-2xl border border-black/8 bg-white p-5 lg:hidden">
          <summary className="cursor-pointer list-none text-sm font-semibold">
            Filters
          </summary>
          <div className="mt-6">
            <FilterControls prefix="mobile" {...filterProps} />
          </div>
        </details>
        <div className="grid items-start gap-8 lg:grid-cols-[17rem_1fr]">
          <aside className="sticky top-24 hidden rounded-2xl border border-black/8 bg-white p-5 lg:block">
            <h2 className={`${styles.uiHeading} text-base`}>Filters</h2>
            <div className="mt-6">
              <FilterControls prefix="desktop" {...filterProps} />
            </div>
          </aside>
          <section>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#6d716a]" aria-live="polite">
                <strong className="text-[#272a26]">
                  {filteredJobs.length}
                </strong>{" "}
                recent job posts
              </p>
              <label className="flex items-center gap-3 text-sm text-[#6d716a]">
                Sort by
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-10 rounded-xl border border-black/10 bg-white px-3 font-medium text-[#3d413c] outline-none focus:border-[#668c63]"
                >
                  <option value="newest">Newest</option>
                  <option value="budget">Highest budget</option>
                  <option value="rating">Client rating</option>
                  <option value="proposals">Fewest proposals</option>
                </select>
              </label>
            </div>
            {filteredJobs.length ? (
              <div className="space-y-5">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    saved={savedJobs.includes(job.id)}
                    toggleSaved={() =>
                      setSavedJobs((current) =>
                        current.includes(job.id)
                          ? current.filter((id) => id !== job.id)
                          : [...current, job.id],
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-16 text-center">
                <p className="text-lg font-semibold">No matching jobs found</p>
                <p className="mt-2 text-sm text-[#777b74]">
                  Try a broader search or reset your filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-[#252724] px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
