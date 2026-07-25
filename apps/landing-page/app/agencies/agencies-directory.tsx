"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./agencies.module.css";

type Agency = {
  id: number;
  name: string;
  initials: string;
  color: string;
  verified: boolean;
  featured?: boolean;
  tagline: string;
  description: string;
  category: string;
  location: string;
  teamSize: string;
  hourlyRate: number;
  rating: number;
  reviews: number;
  projects: number;
  success: number;
  skills: string[];
};

const agencies: Agency[] = [
  {
    id: 1,
    name: "Northstar Studio",
    initials: "NS",
    color: "#577d73",
    verified: true,
    featured: true,
    tagline: "Digital products built for meaningful growth",
    description:
      "A senior product team partnering with ambitious companies from strategy and research through design, engineering, and launch.",
    category: "Product & Design",
    location: "New York, USA",
    teamSize: "10–49",
    hourlyRate: 120,
    rating: 4.9,
    reviews: 86,
    projects: 142,
    success: 98,
    skills: ["Product strategy", "UX/UI Design", "Next.js", "Brand systems"],
  },
  {
    id: 2,
    name: "Lattice Engineering",
    initials: "LE",
    color: "#466a7b",
    verified: true,
    tagline: "Scalable software without the enterprise drag",
    description:
      "Full-stack engineers and cloud architects who turn complex platforms into reliable, maintainable products.",
    category: "Development",
    location: "Toronto, Canada",
    teamSize: "10–49",
    hourlyRate: 135,
    rating: 5,
    reviews: 64,
    projects: 96,
    success: 100,
    skills: ["TypeScript", "Cloud architecture", "AI systems", "DevOps"],
  },
  {
    id: 3,
    name: "Common Ground",
    initials: "CG",
    color: "#88715b",
    verified: true,
    tagline: "Brands people remember and choose",
    description:
      "An independent creative agency building distinct identities, campaigns, and digital experiences for modern brands.",
    category: "Branding & Marketing",
    location: "London, UK",
    teamSize: "2–9",
    hourlyRate: 105,
    rating: 4.8,
    reviews: 53,
    projects: 118,
    success: 97,
    skills: ["Brand strategy", "Art direction", "Campaigns", "Web design"],
  },
  {
    id: 4,
    name: "Aster Data Lab",
    initials: "AD",
    color: "#685f82",
    verified: true,
    tagline: "Practical AI for real business outcomes",
    description:
      "Data scientists and ML engineers shipping intelligent systems that teams can understand, operate, and trust.",
    category: "Data & AI",
    location: "Berlin, Germany",
    teamSize: "10–49",
    hourlyRate: 155,
    rating: 4.9,
    reviews: 41,
    projects: 72,
    success: 99,
    skills: ["Machine learning", "Data platforms", "LLM apps", "MLOps"],
  },
  {
    id: 5,
    name: "Fieldwork Creative",
    initials: "FC",
    color: "#74805d",
    verified: false,
    tagline: "Content that earns attention",
    description:
      "A distributed creative collective producing editorial, video, social, and launch content for growing companies.",
    category: "Content",
    location: "Melbourne, Australia",
    teamSize: "2–9",
    hourlyRate: 85,
    rating: 4.7,
    reviews: 37,
    projects: 89,
    success: 96,
    skills: ["Copywriting", "Video", "Social content", "SEO"],
  },
  {
    id: 6,
    name: "Orbit Commerce",
    initials: "OC",
    color: "#8b625e",
    verified: true,
    tagline: "Commerce experiences engineered to convert",
    description:
      "Shopify and headless commerce specialists helping retail teams improve performance, conversion, and retention.",
    category: "E-commerce",
    location: "Singapore",
    teamSize: "50+",
    hourlyRate: 145,
    rating: 4.9,
    reviews: 72,
    projects: 131,
    success: 98,
    skills: ["Shopify", "Headless commerce", "CRO", "Integrations"],
  },
];

const categories = [
  "All",
  "Product & Design",
  "Development",
  "Branding & Marketing",
  "Data & AI",
  "Content",
  "E-commerce",
];
const teamSizes = ["2–9", "10–49", "50+"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="m6.4 10.1 2.2 2.2 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AgenciesDirectory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxRate, setMaxRate] = useState(200);
  const [sort, setSort] = useState("recommended");

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = agencies.filter((agency) => {
      const searchable = [
        agency.name,
        agency.tagline,
        agency.category,
        agency.location,
        ...agency.skills,
      ]
        .join(" ")
        .toLowerCase();
      return (
        (!query || searchable.includes(query)) &&
        (category === "All" || agency.category === category) &&
        (!size.length || size.includes(agency.teamSize)) &&
        (!verifiedOnly || agency.verified) &&
        agency.hourlyRate <= maxRate
      );
    });
    return [...filtered].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "projects") return b.projects - a.projects;
      if (sort === "rate-low") return a.hourlyRate - b.hourlyRate;
      return Number(b.featured) - Number(a.featured) || b.success - a.success;
    });
  }, [category, maxRate, search, size, sort, verifiedOnly]);

  const toggleSize = (value: string) =>
    setSize((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );

  const reset = () => {
    setCategory("All");
    setSize([]);
    setVerifiedOnly(false);
    setMaxRate(200);
  };

  return (
    <main>
      <section className="border-b border-[#cdd7ca] bg-[#e9f2e6]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#5d825a] uppercase">
            Specialized teams, exceptional work
          </p>
          <h1 className={styles.pageTitle}>
            Find the right agency for your next big move.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#697068] sm:text-lg">
            Discover trusted studios and expert teams with the capabilities to
            take your project from first idea to measurable impact.
          </p>
          <label className="mt-10 flex h-16 max-w-3xl items-center gap-4 rounded-2xl border border-black/8 bg-white px-5 focus-within:border-[#789b74]">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-[#7b8178]"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by expertise, agency name, or location"
              className="h-full w-full bg-transparent text-base outline-none placeholder:text-[#a0a59d]"
            />
          </label>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-10">
        <aside>
          <div className="rounded-2xl border border-black/8 bg-white p-6 lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h2 className={`${styles.uiHeading} text-lg`}>Filters</h2>
              <button onClick={reset} className="cursor-pointer text-xs font-semibold text-[#52784f] hover:underline">
                Reset
              </button>
            </div>

            <fieldset className="mt-7">
              <legend className="text-sm font-semibold">Expertise</legend>
              <div className="mt-4 grid gap-3">
                {categories.map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-3 text-sm text-[#656a63]">
                    <input
                      type="radio"
                      name="category"
                      checked={category === item}
                      onChange={() => setCategory(item)}
                      className="h-4 w-4 accent-[#52784f]"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7 border-t border-black/7 pt-6">
              <legend className="text-sm font-semibold">Team size</legend>
              <div className="mt-4 grid gap-3">
                {teamSizes.map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-3 text-sm text-[#656a63]">
                    <input
                      type="checkbox"
                      checked={size.includes(item)}
                      onChange={() => toggleSize(item)}
                      className="h-4 w-4 rounded accent-[#52784f]"
                    />
                    {item} people
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-7 border-t border-black/7 pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Hourly rate</p>
                <span className="text-xs font-semibold text-[#52784f]">Up to ${maxRate}</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                step="5"
                value={maxRate}
                onChange={(event) => setMaxRate(Number(event.target.value))}
                className="mt-4 w-full accent-[#52784f]"
              />
              <div className="mt-1 flex justify-between text-[11px] text-[#92968f]">
                <span>$50/hr</span>
                <span>$200/hr</span>
              </div>
            </div>

            <label className="mt-7 flex cursor-pointer items-center gap-3 border-t border-black/7 pt-6 text-sm text-[#656a63]">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(event) => setVerifiedOnly(event.target.checked)}
                className="h-4 w-4 rounded accent-[#52784f]"
              />
              Verified agencies only
            </label>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-[#777c75]">
              <strong className="text-[#252824]">{results.length}</strong>{" "}
              agencies ready to collaborate
            </p>
            <label className="flex items-center gap-3 text-sm text-[#777c75]">
              Sort by
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-11 rounded-xl border border-black/10 bg-white px-4 font-medium text-[#373a36] outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Top rated</option>
                <option value="projects">Most projects</option>
                <option value="rate-low">Rate: low to high</option>
              </select>
            </label>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {results.map((agency) => (
              <article
                key={agency.id}
                className="group flex flex-col rounded-2xl border border-black/8 bg-white p-6 transition hover:-translate-y-0.5 hover:border-black/14 hover:shadow-xl hover:shadow-black/5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-semibold text-white"
                    style={{ backgroundColor: agency.color }}
                  >
                    {agency.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className={`${styles.uiHeading} text-xl text-[#252824]`}>
                        {agency.name}
                      </h2>
                      {agency.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#e7f2e4] px-2 py-1 text-[11px] font-semibold text-[#4c7649]">
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#5a8357] text-white">
                            <CheckIcon />
                          </span>
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[#737870]">{agency.location} · {agency.teamSize} people</p>
                  </div>
                  {agency.featured && (
                    <span className="rounded-full bg-[#f4f0df] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#8a7135] uppercase">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className={`${styles.uiHeading} mt-6 text-lg leading-6`}>
                  {agency.tagline}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#686d66]">
                  {agency.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {agency.skills.map((skill) => (
                    <span key={skill} className="rounded-lg bg-[#eef2ec] px-2.5 py-1.5 text-xs font-medium text-[#596057]">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 border-y border-black/7 py-4 text-center">
                  <div>
                    <p className="text-base font-semibold">{agency.success}%</p>
                    <p className="mt-1 text-[11px] text-[#858a82]">Job success</p>
                  </div>
                  <div className="border-x border-black/7">
                    <p className="text-base font-semibold">{agency.projects}</p>
                    <p className="mt-1 text-[11px] text-[#858a82]">Projects</p>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[#d4a334]">★ <span className="text-[#252824]">{agency.rating}</span></p>
                    <p className="mt-1 text-[11px] text-[#858a82]">{agency.reviews} reviews</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <p className="text-sm text-[#7a7f77]">
                    From <strong className="text-base text-[#252824]">${agency.hourlyRate}</strong>/hr
                  </p>
                  <Link
                    href="/signup?role=client"
                    className="rounded-xl bg-[#252724] px-4 py-2.5 text-sm font-semibold text-white! transition group-hover:bg-[#3b3e39]"
                  >
                    View agency
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {!results.length && (
            <div className="rounded-2xl border border-dashed border-black/12 bg-white px-6 py-16 text-center">
              <h2 className={`${styles.uiHeading} text-xl`}>No agencies match those filters</h2>
              <p className="mt-2 text-sm text-[#777c75]">Try broadening your search or resetting the filters.</p>
              <button onClick={reset} className="mt-5 cursor-pointer text-sm font-semibold text-[#52784f] hover:underline">
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
