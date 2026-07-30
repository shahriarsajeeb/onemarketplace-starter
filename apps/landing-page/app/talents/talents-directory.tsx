"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./talents.module.css";

type Category =
  | "Design"
  | "Development"
  | "Marketing"
  | "Writing"
  | "Data & AI";

interface Talent {
  id: number;
  name: string;
  initials: string;
  title: string;
  category: Category;
  verified: boolean;
  active: boolean;
  jobSuccess: number;
  completedProjects: number;
  rating: number;
  reviews: number;
  hourlyRate: number;
  location: string;
  skills: string[];
  summary: string;
  background: string;
}

const talents: Talent[] = [
  {
    id: 1,
    name: "Amelia Morgan",
    initials: "AM",
    title: "Senior Product Designer",
    category: "Design",
    verified: true,
    active: true,
    jobSuccess: 98,
    completedProjects: 84,
    rating: 4.9,
    reviews: 72,
    hourlyRate: 120,
    location: "London, UK",
    skills: ["Product design", "Figma", "Design systems"],
    summary:
      "I turn complex product ideas into clear, thoughtful experiences that customers enjoy using.",
    background: "linear-gradient(135deg, #925f46, #c58c6e)",
  },
  {
    id: 2,
    name: "Daniel Cho",
    initials: "DC",
    title: "Full-Stack TypeScript Engineer",
    category: "Development",
    verified: true,
    active: true,
    jobSuccess: 100,
    completedProjects: 63,
    rating: 5,
    reviews: 58,
    hourlyRate: 145,
    location: "Toronto, Canada",
    skills: ["Next.js", "Node.js", "PostgreSQL"],
    summary:
      "I build reliable web products from first prototype through production, with a focus on speed and maintainability.",
    background: "linear-gradient(135deg, #466b72, #73a2a8)",
  },
  {
    id: 3,
    name: "Sofia Mendes",
    initials: "SM",
    title: "Brand Strategist & Creative Director",
    category: "Marketing",
    verified: true,
    active: false,
    jobSuccess: 96,
    completedProjects: 109,
    rating: 4.9,
    reviews: 94,
    hourlyRate: 110,
    location: "Lisbon, Portugal",
    skills: ["Brand strategy", "Positioning", "Campaigns"],
    summary:
      "I help ambitious teams find a distinct point of view and express it consistently across every customer touchpoint.",
    background: "linear-gradient(135deg, #6f668e, #a095bd)",
  },
  {
    id: 4,
    name: "Jon Bell",
    initials: "JB",
    title: "Conversion Copywriter",
    category: "Writing",
    verified: false,
    active: true,
    jobSuccess: 94,
    completedProjects: 51,
    rating: 4.8,
    reviews: 45,
    hourlyRate: 90,
    location: "Austin, USA",
    skills: ["Web copy", "SaaS", "Email strategy"],
    summary:
      "I write clear, persuasive copy for technology companies that want to sound human and convert more customers.",
    background: "linear-gradient(135deg, #8b6f48, #bea071)",
  },
  {
    id: 5,
    name: "Maya Robinson",
    initials: "MR",
    title: "Machine Learning Engineer",
    category: "Data & AI",
    verified: true,
    active: true,
    jobSuccess: 99,
    completedProjects: 47,
    rating: 5,
    reviews: 42,
    hourlyRate: 165,
    location: "New York, USA",
    skills: ["Python", "LLM systems", "MLOps"],
    summary:
      "I design practical AI systems that move from experimentation to dependable, measurable production outcomes.",
    background: "linear-gradient(135deg, #46634b, #7ca181)",
  },
  {
    id: 6,
    name: "Noah Williams",
    initials: "NW",
    title: "Growth Marketing Lead",
    category: "Marketing",
    verified: true,
    active: true,
    jobSuccess: 97,
    completedProjects: 76,
    rating: 4.9,
    reviews: 69,
    hourlyRate: 105,
    location: "Melbourne, Australia",
    skills: ["Growth strategy", "Paid media", "Analytics"],
    summary:
      "I build sustainable acquisition programs by combining sharp positioning, rapid experiments, and useful analytics.",
    background: "linear-gradient(135deg, #566f8c, #87a5c4)",
  },
  {
    id: 7,
    name: "Aisha Rahman",
    initials: "AR",
    title: "UX Researcher",
    category: "Design",
    verified: true,
    active: false,
    jobSuccess: 95,
    completedProjects: 58,
    rating: 4.8,
    reviews: 52,
    hourlyRate: 100,
    location: "Singapore",
    skills: ["User research", "Usability testing", "Insights"],
    summary:
      "I uncover the customer evidence teams need to make confident product and service decisions.",
    background: "linear-gradient(135deg, #8c5366, #bd8094)",
  },
  {
    id: 8,
    name: "Leo Martins",
    initials: "LM",
    title: "Mobile Application Developer",
    category: "Development",
    verified: false,
    active: true,
    jobSuccess: 92,
    completedProjects: 39,
    rating: 4.7,
    reviews: 34,
    hourlyRate: 95,
    location: "São Paulo, Brazil",
    skills: ["React Native", "iOS", "Android"],
    summary:
      "I create polished cross-platform mobile apps with native-quality interactions and maintainable architecture.",
    background: "linear-gradient(135deg, #5b6d91, #8d9dc0)",
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

interface FilterControlsProps {
  prefix: string;
  category: string;
  setCategory: (category: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (checked: boolean) => void;
  activeOnly: boolean;
  setActiveOnly: (checked: boolean) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  minSuccess: number;
  setMinSuccess: (success: number) => void;
  minHourlyRate: number;
  setMinHourlyRate: (rate: number) => void;
  maxHourlyRate: number;
  setMaxHourlyRate: (rate: number) => void;
  resetFilters: () => void;
}

function FilterControls({
  prefix,
  category,
  setCategory,
  verifiedOnly,
  setVerifiedOnly,
  activeOnly,
  setActiveOnly,
  minRating,
  setMinRating,
  minSuccess,
  setMinSuccess,
  minHourlyRate,
  setMinHourlyRate,
  maxHourlyRate,
  setMaxHourlyRate,
  resetFilters,
}: FilterControlsProps) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-semibold">Category</p>
        <div className="mt-3 grid gap-2">
          {categories.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#62665f]"
            >
              <input
                type="radio"
                name={`${prefix}-category`}
                value={item}
                checked={category === item}
                onChange={() => setCategory(item)}
                className="h-4 w-4 accent-[#456f42]"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-black/7 pt-6">
        <p className="text-sm font-semibold">Talent status</p>
        <div className="mt-3 grid gap-3">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#62665f]">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(event) => setVerifiedOnly(event.target.checked)}
              className="h-4 w-4 rounded accent-[#456f42]"
            />
            Verified talent
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#62665f]">
            <input
              type="checkbox"
              checked={activeOnly}
              onChange={(event) => setActiveOnly(event.target.checked)}
              className="h-4 w-4 rounded accent-[#456f42]"
            />
            Available now
          </label>
        </div>
      </div>

      <label className="grid gap-2 border-t border-black/7 pt-6 text-sm font-semibold">
        Minimum rating
        <select
          value={minRating}
          onChange={(event) => setMinRating(Number(event.target.value))}
          className="h-11 rounded-xl border border-black/10 bg-white px-3 font-normal text-[#5d615a] outline-none focus:border-[#668c63]"
        >
          <option value={0}>Any rating</option>
          <option value={4.5}>4.5 and above</option>
          <option value={4.8}>4.8 and above</option>
          <option value={4.9}>4.9 and above</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold">
        Job success
        <select
          value={minSuccess}
          onChange={(event) => setMinSuccess(Number(event.target.value))}
          className="h-11 rounded-xl border border-black/10 bg-white px-3 font-normal text-[#5d615a] outline-none focus:border-[#668c63]"
        >
          <option value={0}>Any success rate</option>
          <option value={90}>90% and above</option>
          <option value={95}>95% and above</option>
          <option value={98}>98% and above</option>
        </select>
      </label>

      <div className="border-t border-black/7 pt-6">
        <p className="text-sm font-semibold">Hourly rate</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="grid gap-1.5 text-xs font-medium text-[#777b74]">
            Minimum
            <span className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-[#777b74]">
                $
              </span>
              <input
                type="number"
                min={0}
                step={5}
                value={minHourlyRate || ""}
                onChange={(event) =>
                  setMinHourlyRate(Math.max(0, Number(event.target.value)))
                }
                className="h-11 w-full rounded-xl border border-black/10 bg-white pr-2 pl-7 text-sm font-normal text-[#3d413c] outline-none focus:border-[#668c63]"
                placeholder="0"
                aria-label="Minimum hourly rate"
              />
            </span>
          </label>
          <label className="grid gap-1.5 text-xs font-medium text-[#777b74]">
            Maximum
            <span className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-[#777b74]">
                $
              </span>
              <input
                type="number"
                min={0}
                step={5}
                value={maxHourlyRate || ""}
                onChange={(event) =>
                  setMaxHourlyRate(Math.max(0, Number(event.target.value)))
                }
                className="h-11 w-full rounded-xl border border-black/10 bg-white pr-2 pl-7 text-sm font-normal text-[#3d413c] outline-none focus:border-[#668c63]"
                placeholder="Any"
                aria-label="Maximum hourly rate"
              />
            </span>
          </label>
        </div>
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

function VerifiedBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-[#eaf4e7] px-2 py-1 text-[11px] font-semibold text-[#477344]"
      title="Identity verified with Stripe"
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          fill="currentColor"
          d="m8 1.3 1.55 1.12 1.9-.04.55 1.82 1.56 1.08-.63 1.8.63 1.8L12 9.96l-.55 1.82-1.9-.04L8 12.86l-1.55-1.12-1.9.04L4 9.96 2.44 8.88l.63-1.8-.63-1.8L4 4.2l.55-1.82 1.9.04L8 1.3Z"
        />
        <path
          d="m5.55 7.2 1.55 1.55 3.35-3.4"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Verified
    </span>
  );
}

function TalentCard({ talent }: { talent: Talent }) {
  return (
    <article className="rounded-2xl border border-black/8 bg-white p-5 transition hover:-translate-y-0.5 hover:border-black/12 hover:shadow-xl hover:shadow-black/4 sm:p-6">
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white"
          style={{ background: talent.background }}
        >
          {talent.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              className={`${styles.uiHeading} truncate text-base sm:text-lg`}
            >
              {talent.name}
            </h2>
            {talent.verified && <VerifiedBadge />}
          </div>
          <p className="mt-1 truncate text-sm text-[#686c65]">{talent.title}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-[#777b74]">
            <span
              className={`h-2 w-2 rounded-full ${
                talent.active ? "bg-[#5a9b59]" : "bg-[#b5b8b2]"
              }`}
            ></span>
            {talent.active ? "Available now" : "Currently busy"}
            <span aria-hidden="true">·</span>
            {talent.location}
          </div>
        </div>
        <p className="shrink-0 text-sm font-semibold">
          ${talent.hourlyRate}
          <span className="font-normal text-[#83877f]">/hr</span>
        </p>
      </div>

      <p className="mt-5 text-sm leading-6 text-[#656962]">{talent.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {talent.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-[#f1f4ef] px-2.5 py-1.5 text-xs font-medium text-[#596057]"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 border-y border-black/7 py-4 text-center">
        <div>
          <p className="text-sm font-semibold text-[#2b2e2a]">
            {talent.jobSuccess}%
          </p>
          <p className="mt-1 text-[11px] text-[#858981]">Job success</p>
        </div>
        <div className="border-x border-black/7">
          <p className="text-sm font-semibold text-[#2b2e2a]">
            {talent.completedProjects}
          </p>
          <p className="mt-1 text-[11px] text-[#858981]">Projects completed</p>
        </div>
        <div>
          <p className="flex items-center justify-center gap-1 text-sm font-semibold text-[#2b2e2a]">
            <span className="text-[#d3a439]" aria-hidden="true">
              ★
            </span>
            {talent.rating.toFixed(1)}
          </p>
          <p className="mt-1 text-[11px] text-[#858981]">
            {talent.reviews} reviews
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          href={`/talent/${talent.id}`}
          className="flex-1 rounded-xl border border-black/10 px-4 py-2.5 text-center text-sm font-semibold transition hover:bg-[#f5f6f3]"
        >
          View profile
        </Link>
        <Link
          href="/signup?role=client"
          className="flex-1 rounded-xl bg-[#252724] px-4 py-2.5 text-center text-sm font-semibold text-white! transition hover:bg-[#3b3e39]"
        >
          Invite to job
        </Link>
      </div>
    </article>
  );
}

export function TalentsDirectory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [activeOnly, setActiveOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [minSuccess, setMinSuccess] = useState(0);
  const [minHourlyRate, setMinHourlyRate] = useState(0);
  const [maxHourlyRate, setMaxHourlyRate] = useState(0);
  const [sort, setSort] = useState("recommended");

  const filteredTalents = useMemo(() => {
    const query = search.trim().toLowerCase();
    const results = talents.filter((talent) => {
      const searchableText = [
        talent.name,
        talent.title,
        talent.category,
        talent.location,
        ...talent.skills,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!query || searchableText.includes(query)) &&
        (category === "All" || talent.category === category) &&
        (!verifiedOnly || talent.verified) &&
        (!activeOnly || talent.active) &&
        talent.rating >= minRating &&
        talent.jobSuccess >= minSuccess &&
        talent.hourlyRate >= minHourlyRate &&
        (!maxHourlyRate || talent.hourlyRate <= maxHourlyRate)
      );
    });

    return [...results].sort((first, second) => {
      if (sort === "rating") return second.rating - first.rating;
      if (sort === "success") return second.jobSuccess - first.jobSuccess;
      if (sort === "projects")
        return second.completedProjects - first.completedProjects;
      if (sort === "rate-low") return first.hourlyRate - second.hourlyRate;
      return (
        second.rating * second.jobSuccess -
        first.rating * first.jobSuccess
      );
    });
  }, [
    activeOnly,
    category,
    minRating,
    minSuccess,
    minHourlyRate,
    maxHourlyRate,
    search,
    sort,
    verifiedOnly,
  ]);

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setVerifiedOnly(false);
    setActiveOnly(false);
    setMinRating(0);
    setMinSuccess(0);
    setMinHourlyRate(0);
    setMaxHourlyRate(0);
    setSort("recommended");
  }

  const filterProps = {
    category,
    setCategory,
    verifiedOnly,
    setVerifiedOnly,
    activeOnly,
    setActiveOnly,
    minRating,
    setMinRating,
    minSuccess,
    setMinSuccess,
    minHourlyRate,
    setMinHourlyRate,
    maxHourlyRate,
    setMaxHourlyRate,
    resetFilters,
  };

  return (
    <>
      <section className="border-b border-black/7 bg-[#e8f1e5]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5a7d58]">
            Discover exceptional people
          </p>
          <h1 className={`${styles.pageTitle} max-w-3xl`}>
            Find the right talent for your next idea.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#667064] sm:text-base">
            Search verified independent professionals by expertise,
            availability, results, and experience.
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
            <span className="sr-only">Search talent</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-[#9a9e97]"
              placeholder="Search by skill, title, name, or location"
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
          <aside className="sticky top-6 hidden rounded-2xl border border-black/8 bg-white p-5 lg:block">
            <div className="mb-6 flex items-center justify-between">
              <h2 className={`${styles.uiHeading} text-base`}>
                Filters
              </h2>
            </div>
            <FilterControls prefix="desktop" {...filterProps} />
          </aside>

          <section>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#6d716a]" aria-live="polite">
                <strong className="text-[#272a26]">
                  {filteredTalents.length}
                </strong>{" "}
                talented professionals
              </p>
              <label className="flex items-center gap-3 text-sm text-[#6d716a]">
                Sort by
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="h-10 rounded-xl border border-black/10 bg-white px-3 font-medium text-[#3d413c] outline-none focus:border-[#668c63]"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest rated</option>
                  <option value="success">Job success</option>
                  <option value="projects">Most projects</option>
                  <option value="rate-low">Hourly rate: low to high</option>
                </select>
              </label>
            </div>

            {filteredTalents.length > 0 ? (
              <div className="grid gap-5 xl:grid-cols-2">
                {filteredTalents.map((talent) => (
                  <TalentCard key={talent.id} talent={talent} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-16 text-center">
                <p className="text-lg font-semibold">No matching talent found</p>
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
