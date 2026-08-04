"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SubmitEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "../_components/dashboard/dashboard-header";

type PreviewPortfolio = {
  id: number;
  title: string;
  category: string;
  description: string;
  liveLink?: string;
  color: string;
  icon: string;
};

type FreelancerPortfolioValue = {
  client_id: string;
  title: string;
  category: string;
  description: string;
  live_url: string | null;
  cover_image: {
    imageId: string;
    url: string;
  };
};

type Language = {
  language: string;
  proficiency: "Conversational" | "Fluent" | "Native";
};

type FreelancerProfileFormValues = {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  professional_title: string;
  professional_description: string;
  hourly_rate: number;
  availability_status: string;
  weekly_availability: string;
  experience_level: string;
  languages: Language[];
  skills: string[];
  portfolios: FreelancerPortfolioValue[];
};

const languageOptions = [
  "Arabic",
  "Bengali",
  "Chinese",
  "Dutch",
  "English",
  "French",
  "German",
  "Hindi",
  "Indonesian",
  "Italian",
  "Japanese",
  "Korean",
  "Malay",
  "Portuguese",
  "Russian",
  "Spanish",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Vietnamese",
];

const initialLanguages: Language[] = [
  { language: "English", proficiency: "Fluent" },
];

const initialSkills = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "AWS",
  "UI Engineering",
];

const initialPortfolio: PreviewPortfolio[] = [
  {
    id: 1,
    title: "B2B analytics workspace",
    category: "SaaS product",
    description:
      "Designed and built a collaborative analytics platform used by 4,000+ product teams.",
    liveLink: "https://example.com/analytics-workspace",
    color: "from-[#dcebe2] to-[#abcbb8]",
    icon: "solar:chart-square-linear",
  },
  {
    id: 2,
    title: "AI research assistant",
    category: "AI application",
    description:
      "Production research workflow with source citations, evaluation, and team collaboration.",
    liveLink: "https://example.com/research-assistant",
    color: "from-[#e6e2f1] to-[#beb5d8]",
    icon: "solar:magic-stick-3-linear",
  },
];

const inputClass =
  "h-12 w-full rounded-xl border border-black/10 bg-white px-3.5 text-sm outline-none transition placeholder:text-[#a1a59e] focus:border-[#71936e] focus:ring-3 focus:ring-[#71936e]/10";
const labelClass = "grid gap-2 text-sm font-semibold text-[#343833]";

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

function SectionCard({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-black/8 bg-white p-5 sm:p-7"
    >
      <div className="border-b border-black/7 pb-5">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1.5 text-sm leading-6 text-[#747a72]">{description}</p>
      </div>
      <div className="pt-6">{children}</div>
    </section>
  );
}

function ProfilePreview() {
  const completedJobs = [
    {
      title: "Build a collaborative analytics dashboard",
      client: "Northstar Labs",
      completed: "June 2026",
      budget: "$8,400",
      rating: "5.0",
      review:
        "Shahriar brought strong product judgment to every decision. The implementation was fast, polished, and exceptionally well documented.",
      skills: ["Next.js", "TypeScript", "PostgreSQL"],
    },
    {
      title: "Frontend architecture for an AI research platform",
      client: "Lumen Research",
      completed: "March 2026",
      budget: "$12,750",
      rating: "5.0",
      review:
        "A genuinely senior engineer. He simplified a difficult architecture and delivered each milestone exactly when promised.",
      skills: ["React", "Node.js", "OpenAI"],
    },
    {
      title: "SaaS design system and accessibility upgrade",
      client: "Aster Technologies",
      completed: "December 2025",
      budget: "$5,600",
      rating: "4.9",
      review:
        "Excellent attention to detail and communication. Our product is more consistent, accessible, and much easier to maintain.",
      skills: ["Design systems", "WCAG", "Tailwind CSS"],
    },
  ];

  return (
    <div className="min-h-svh bg-[#f4f6f2] font-(family-name:--font-dm-sans) text-[#242724]">
      <DashboardHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#587855] hover:underline"
            >
              <Icon icon="solar:arrow-left-linear" width="18" />
              Back to dashboard
            </Link>
            <p className="mt-3 text-xs font-semibold tracking-[0.14em] text-[#6f766d] uppercase">
              My public profile
            </p>
          </div>
          <Link
            href="/profile/edit"
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white hover:bg-[#3b3e39]"
          >
            <Icon icon="solar:pen-new-square-linear" width="18" />
            Edit profile
          </Link>
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          <aside className="grid gap-5 lg:sticky lg:top-24">
            <section className="rounded-3xl border border-black/8 bg-white p-6 text-center">
              <div className="relative mx-auto h-28 w-28">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-[#496e67] text-3xl font-semibold text-white">
                  SK
                </span>
                <span
                  className="absolute right-1 bottom-1 h-5 w-5 rounded-full border-4 border-white bg-[#59a05d]"
                  title="Available now"
                />
              </div>
              <h1 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
                Shahriar Sajeeb
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#656b63]">
                Full-stack product engineer
                <br />
                Next.js & TypeScript
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#777c74]">
                <Icon icon="solar:map-point-linear" width="16" />
                Chiang Mai, Thailand
              </p>

              <div className="mt-6 grid grid-cols-3 border-y border-black/7 py-4">
                <div>
                  <strong className="block">100%</strong>
                  <span className="mt-1 block text-[10px] text-[#858a82]">
                    Job success
                  </span>
                </div>
                <div className="border-x border-black/7">
                  <strong className="block">4.9</strong>
                  <span className="mt-1 block text-[10px] text-[#858a82]">
                    Rating
                  </span>
                </div>
                <div>
                  <strong className="block">24</strong>
                  <span className="mt-1 block text-[10px] text-[#858a82]">
                    Projects
                  </span>
                </div>
              </div>

              <div className="mt-5 text-left">
                <p className="text-xs font-semibold tracking-wide text-[#7b8078] uppercase">
                  Availability
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#59a05d]" />
                  20–30 hours per week
                </p>
                <p className="mt-4 text-xs font-semibold tracking-wide text-[#7b8078] uppercase">
                  Languages
                </p>
                <p className="mt-2 text-sm text-[#656b63]">English — Fluent</p>
                <p className="mt-1 text-sm text-[#656b63]">Bengali — Native</p>
              </div>
            </section>

            <section className="rounded-2xl border border-[#d2dfcf] bg-[#edf4ea] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#476f44]">
                <Icon icon="solar:shield-check-bold" width="20" />
                Identity verified
              </div>
              <div className="mt-4 grid gap-3 text-xs text-[#657063]">
                <p className="flex items-center gap-2">
                  <Icon
                    icon="solar:check-circle-bold"
                    width="15"
                    className="text-[#5d895a]"
                  />
                  Email verified
                </p>
                <p className="flex items-center gap-2">
                  <Icon
                    icon="solar:check-circle-bold"
                    width="15"
                    className="text-[#5d895a]"
                  />
                  Payment method verified
                </p>
              </div>
            </section>
          </aside>

          <div className="grid gap-5">
            <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-[#5c8159] uppercase">
                    Available for selected projects
                  </p>
                  <h2 className="mt-3 max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.04em]">
                    I build dependable digital products from idea to production.
                  </h2>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="text-xs text-[#7c8179]">Hourly rate</p>
                  <p className="mt-1 text-xl font-semibold">
                    $85
                    <span className="text-sm font-medium text-[#7c8179]">
                      /hr
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-7 text-[#626860]">
                <p>
                  I help product teams turn complex ideas into fast, dependable
                  web applications. My work spans product architecture, polished
                  React interfaces, scalable APIs, and production
                  infrastructure.
                </p>
                <p>
                  I communicate clearly, ship in thoughtful milestones, and care
                  deeply about the details users feel—from accessibility and
                  performance to the quality of the final handoff.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {initialSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl bg-[#edf2eb] px-3 py-2 text-xs font-medium text-[#4f584d]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-[#6e756c] uppercase">
                    Selected work
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                    Portfolio
                  </h2>
                </div>
                <span className="text-xs text-[#838880]">
                  {initialPortfolio.length} projects
                </span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {initialPortfolio.map((project) => (
                  <article
                    key={project.id}
                    className="overflow-hidden rounded-2xl border border-black/8"
                  >
                    <div
                      className={`flex h-44 items-center justify-center bg-linear-to-br ${project.color}`}
                    >
                      <Icon
                        icon={project.icon}
                        width="48"
                        className="text-[#425a48]"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] font-semibold tracking-wide text-[#62805f] uppercase">
                        {project.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#747a72]">
                        {project.description}
                      </p>
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#52784f] hover:underline"
                        >
                          View live project
                          <Icon icon="solar:arrow-right-up-linear" width="15" />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-[#6e756c] uppercase">
                    Work history
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                    Completed jobs
                  </h2>
                </div>
                <span className="text-xs text-[#838880]">24 completed</span>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-black/8">
                {completedJobs.map((job, index) => (
                  <article
                    key={job.title}
                    className={`p-5 sm:p-6 ${index ? "border-t border-black/7" : ""}`}
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="mt-1.5 text-xs text-[#7b8078]">
                          {job.client} · Completed {job.completed}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="text-sm font-semibold text-[#d1a238]">
                          ★ <span className="text-[#30342f]">{job.rating}</span>
                        </span>
                        <span className="text-sm font-semibold">
                          {job.budget}
                        </span>
                      </div>
                    </div>
                    <blockquote className="mt-4 border-l-2 border-[#b8ceb4] pl-4 text-sm leading-6 text-[#687067]">
                      “{job.review}”
                    </blockquote>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg bg-[#f0f2ee] px-2.5 py-1.5 text-[11px] font-medium text-[#656b63]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <Link
                href={"/contracts"}
                className="mt-5 cursor-pointer text-sm font-semibold text-[#52784f] hover:underline"
              >
                Show all completed jobs
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export function ProfileEditor({
  initialEditing = false,
}: {
  initialEditing?: boolean;
}) {
  const isEditing = initialEditing;
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<FreelancerProfileFormValues>({
    mode: "onChange",
    defaultValues: {
      firstName: "Shahriar",
      lastName: "Sajeeb",
      country: "Thailand",
      city: "Chiang Mai",
      professional_title: "Full-stack product engineer · Next.js & TypeScript",
      professional_description:
        "I help product teams turn complex ideas into fast, dependable web applications. My work spans product architecture, polished React interfaces, scalable APIs, and production infrastructure. I communicate clearly, ship in thoughtful milestones, and care deeply about the details users feel.",
      hourly_rate: 85,
      availability_status: "AVAILABLE",
      weekly_availability: "20–30 hours / week",
      experience_level: "Expert",
    },
  });
  const [activeSection, setActiveSection] = useState("profile-details");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [portfolio, setPortfolio] = useState<FreelancerPortfolioValue[]>([]);
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedDynamicValues, setSavedDynamicValues] = useState(() =>
    JSON.stringify({ skills: [], languages: initialLanguages, portfolio: [] }),
  );

  const updateLanguage = (index: number, update: Partial<Language>) => {
    setLanguages((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...update } : item,
      ),
    );
    clearErrors("languages");
  };

  const addLanguage = () => {
    if (languages.length < 5 && languages.every((item) => item.language)) {
      setLanguages((current) => [
        ...current,
        { language: "", proficiency: "Conversational" },
      ]);
    }
  };

  const addSkill = () => {
    const skill = skillInput.trim();

    if (skill.length > 20) {
      setError("skills", {
        message: "A skill cannot be longer than 20 characters.",
      });
      toast.error("A skill cannot be longer than 20 characters.");
      return;
    }

    if (
      skill &&
      !skills.some((item) => item.toLowerCase() === skill.toLowerCase())
    ) {
      const updatedSkills = [...skills, skill];
      setSkills(updatedSkills);
      setSkillInput("");
      if (updatedSkills.length >= 3) clearErrors("skills");
    }
  };

  const addPortfolio = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const coverImage = data.get("cover_image");

    if (!(coverImage instanceof File) || !coverImage.size) {
      toast.error("Please select a portfolio cover image.");
      return;
    }

    const coverImageUrl = await readFileAsDataUrl(coverImage);

    setPortfolio((current) => [
      ...current,
      {
        client_id: crypto.randomUUID(),
        title: String(data.get("title")),
        category: String(data.get("category")),
        description: String(data.get("description")),
        live_url: String(data.get("live_url") || "") || null,
        cover_image: {
          imageId: "",
          url: coverImageUrl,
        },
      },
    ]);
    clearErrors("portfolios");
    setShowPortfolioForm(false);
  };

  const onSubmit = (values: FreelancerProfileFormValues) => {
    let hasCollectionError = false;

    if (languages.some((item) => !item.language)) {
      setError("languages", { message: "Select every language." });
      hasCollectionError = true;
    }

    if (skills.length < 3) {
      setError("skills", {
        message: "Add at least 3 skills or expertise tags.",
      });
      hasCollectionError = true;
    }

    if (portfolio.length < 1) {
      setError("portfolios", {
        message: "Add at least 1 portfolio project.",
      });
      hasCollectionError = true;
    }

    if (hasCollectionError) {
      toast.error("Please complete all required profile fields.");
      return;
    }

    const profileValues = {
      clerk_profile: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      freelancer_metadata: {
        professional_title: values.professional_title,
        professional_description: values.professional_description,
        hourly_rate: values.hourly_rate,
        country: values.country,
        city: values.city,
        availability_status: values.availability_status,
        weekly_availability: values.weekly_availability,
        experience_level: values.experience_level,
        skills,
        languages,
      },
      freelancer_portfolios: portfolio.map((project) => ({
        title: project.title,
        category: project.category,
        description: project.description,
        live_url: project.live_url,
        cover_image: project.cover_image,
      })),
    };

    console.log("Freelancer profile values:", profileValues);
    reset(values);
    setSavedDynamicValues(JSON.stringify({ skills, languages, portfolio }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  const onInvalid = () => {
    toast.error("Please fix the highlighted fields before saving.");
  };

  const hasDynamicChanges =
    JSON.stringify({ skills, languages, portfolio }) !== savedDynamicValues;

  const canSave =
    (isDirty || hasDynamicChanges) &&
    isValid &&
    skills.length >= 3 &&
    portfolio.length >= 1 &&
    languages.length > 0 &&
    languages.every((item) => item.language);

  const strength = Math.min(100, 75 + skills.length + portfolio.length * 3);

  useEffect(() => {
    if (!isEditing) return;

    const sectionIds = [
      "profile-details",
      "professional",
      "skills",
      "portfolio",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isEditing]);

  if (!isEditing) {
    return <ProfilePreview />;
  }

  return (
    <div className="min-h-svh bg-[#f4f6f2] font-(family-name:--font-dm-sans) text-[#242724]">
      <DashboardHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#587855] hover:underline"
            >
              <Icon icon="solar:arrow-left-linear" width="18" />
              Back to dashboard
            </Link>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              My profile
            </h1>
            <p className="mt-2 text-sm text-[#72776f]">
              Keep your profile complete, credible, and ready for the right
              clients.
            </p>
          </div>
          <Link
            href="/my-profile"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold hover:bg-black/3"
          >
            Preview public profile
            <Icon icon="solar:arrow-right-up-linear" width="18" />
          </Link>
        </div>

        <div className="mt-8 grid items-start gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="grid gap-5 xl:sticky xl:top-24">
            <section className="rounded-2xl border border-black/8 bg-white p-5 text-center">
              <div className="relative mx-auto h-24 w-24">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-[#496e67] text-2xl font-semibold text-white">
                  SK
                </span>
                <button
                  type="button"
                  aria-label="Change profile photo"
                  className="absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#252724] text-white"
                >
                  <Icon icon="solar:camera-linear" width="16" />
                </button>
              </div>
              <h2 className="mt-4 text-lg font-semibold">Shahriar Sajeeb</h2>
              <p className="mt-1 text-xs text-[#777c74]">
                Full-stack product engineer
              </p>
              <div className="mt-5 flex items-center justify-between text-xs">
                <span className="font-medium">Profile strength</span>
                <strong className="text-[#52784f]">{strength}%</strong>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e6e9e3]">
                <div
                  className="h-full rounded-full bg-[#648b61] transition-all"
                  style={{ width: `${strength}%` }}
                />
              </div>
            </section>

            <nav className="rounded-2xl border border-black/8 bg-white p-2 text-sm">
              {[
                ["profile-details", "solar:user-linear", "Profile details"],
                ["professional", "solar:case-round-linear", "Professional"],
                ["skills", "solar:stars-minimalistic-linear", "Skills"],
                ["portfolio", "solar:gallery-wide-linear", "Portfolio"],
              ].map(([href, icon, label]) => (
                <a
                  key={href}
                  href={`#${href}`}
                  aria-current={activeSection === href ? "location" : undefined}
                  onClick={() => setActiveSection(href)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition ${
                    activeSection === href
                      ? "bg-[#edf4ea] text-[#4e774b]"
                      : "text-[#686d65] hover:bg-[#f0f4ee] hover:text-[#4e774b]"
                  }`}
                >
                  <Icon icon={icon} width="19" />
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="grid gap-5"
            noValidate
          >
            <SectionCard
              id="profile-details"
              title="Profile details"
              description="The personal information clients see when reviewing your profile."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  First name *
                  <input
                    className={inputClass}
                    {...register("firstName", {
                      required: "First name is required.",
                    })}
                  />
                  {errors.firstName && (
                    <span className="text-xs font-medium text-[#a44c4c]">
                      {errors.firstName.message}
                    </span>
                  )}
                </label>
                <label className={labelClass}>
                  Last name *
                  <input
                    className={inputClass}
                    {...register("lastName", {
                      required: "Last name is required.",
                    })}
                  />
                  {errors.lastName && (
                    <span className="text-xs font-medium text-[#a44c4c]">
                      {errors.lastName.message}
                    </span>
                  )}
                </label>
                <label className={labelClass}>
                  Country *
                  <select
                    className={inputClass}
                    {...register("country", {
                      required: "Country is required.",
                    })}
                  >
                    <option>Thailand</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                  {errors.country && (
                    <span className="text-xs font-medium text-[#a44c4c]">
                      {errors.country.message}
                    </span>
                  )}
                </label>
                <label className={labelClass}>
                  City *
                  <input
                    className={inputClass}
                    {...register("city", { required: "City is required." })}
                  />
                  {errors.city && (
                    <span className="text-xs font-medium text-[#a44c4c]">
                      {errors.city.message}
                    </span>
                  )}
                </label>
                <div className="grid gap-3 sm:col-span-2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-[#343833]">
                      Languages *
                    </span>
                    <span className="text-xs text-[#777c74]">
                      {languages.length}/5 languages
                    </span>
                  </div>

                  {languages.map((item, index) => (
                    <div
                      key={index}
                      className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px_44px]"
                    >
                      <select
                        name={`languages.${index}.language`}
                        value={item.language}
                        required
                        onChange={(event) =>
                          updateLanguage(index, {
                            language: event.target.value,
                          })
                        }
                        className={inputClass}
                      >
                        <option value="">Select language</option>
                        {languageOptions.map((language) => (
                          <option
                            key={language}
                            value={language}
                            disabled={languages.some(
                              (selected, selectedIndex) =>
                                selectedIndex !== index &&
                                selected.language === language,
                            )}
                          >
                            {language}
                          </option>
                        ))}
                      </select>

                      <select
                        name={`languages.${index}.proficiency`}
                        value={item.proficiency}
                        onChange={(event) =>
                          updateLanguage(index, {
                            proficiency: event.target
                              .value as Language["proficiency"],
                          })
                        }
                        className={inputClass}
                      >
                        <option value="Conversational">Conversational</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Native">Native</option>
                      </select>

                      <button
                        type="button"
                        aria-label={`Remove ${item.language || "language"}`}
                        disabled={languages.length === 1}
                        onClick={() =>
                          setLanguages((current) => {
                            return current.filter(
                              (_, itemIndex) => itemIndex !== index,
                            );
                          })
                        }
                        className="flex h-12 cursor-pointer items-center justify-center rounded-xl border border-black/10 text-[#767b73] transition hover:bg-[#f4f6f2] hover:text-[#9a4d45] disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <Icon icon="solar:trash-bin-trash-linear" width="18" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addLanguage}
                    disabled={
                      languages.length >= 5 ||
                      languages.some((item) => !item.language)
                    }
                    className="inline-flex h-11 w-fit cursor-pointer items-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold transition hover:bg-[#f4f6f2] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <Icon icon="solar:add-circle-linear" width="18" />
                    Add language
                  </button>
                  {errors.languages && (
                    <span className="text-xs font-medium text-[#a44c4c]">
                      {errors.languages.message}
                    </span>
                  )}
                </div>
              </div>
            </SectionCard>

            <SectionCard
              id="professional"
              title="Professional profile"
              description="Show clients what you do best and the value you bring."
            >
              <div className="grid gap-5">
                <label className={labelClass}>
                  Professional title *
                  <input
                    className={inputClass}
                    {...register("professional_title", {
                      required: "Professional title is required.",
                    })}
                  />
                  {errors.professional_title && (
                    <span className="text-xs font-medium text-[#a44c4c]">
                      {errors.professional_title.message}
                    </span>
                  )}
                </label>
                <label className={labelClass}>
                  Professional Description *
                  <textarea
                    rows={7}
                    {...register("professional_description", {
                      required: "Professional description is required.",
                      minLength: {
                        value: 80,
                        message:
                          "Professional description must be at least 80 characters.",
                      },
                    })}
                    className="w-full resize-none rounded-xl border border-black/10 bg-white p-3.5 text-sm leading-6 outline-none focus:border-[#71936e] focus:ring-3 focus:ring-[#71936e]/10"
                  />
                  {errors.professional_description && (
                    <span className="text-xs font-medium text-[#a44c4c]">
                      {errors.professional_description.message}
                    </span>
                  )}
                </label>
                <div className="grid gap-5 sm:grid-cols-3">
                  <label className={labelClass}>
                    Hourly rate *
                    <span className="relative">
                      <span className="absolute inset-y-0 left-3.5 flex items-center text-[#777c74]">
                        $
                      </span>
                      <input
                        type="number"
                        min="5"
                        max="1000"
                        className={`${inputClass} px-8`}
                        {...register("hourly_rate", {
                          required: "Hourly rate is required.",
                          valueAsNumber: true,
                          min: {
                            value: 5,
                            message: "Hourly rate must be at least $5.",
                          },
                          max: {
                            value: 1000,
                            message: "Hourly rate cannot exceed $1,000.",
                          },
                        })}
                      />
                      <span className="absolute inset-y-0 right-3.5 flex items-center text-xs text-[#777c74]">
                        / hour
                      </span>
                    </span>
                    {errors.hourly_rate && (
                      <span className="text-xs font-medium text-[#a44c4c]">
                        {errors.hourly_rate.message}
                      </span>
                    )}
                  </label>
                  <label className={labelClass}>
                    Availability status *
                    <select
                      className={inputClass}
                      {...register("availability_status", {
                        required: "Availability status is required.",
                      })}
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="LIMITED">Limited availability</option>
                      <option value="UNAVAILABLE">Not available</option>
                    </select>
                    {errors.availability_status && (
                      <span className="text-xs font-medium text-[#a44c4c]">
                        {errors.availability_status.message}
                      </span>
                    )}
                  </label>
                  <label className={labelClass}>
                    Weekly availability *
                    <select
                      className={inputClass}
                      {...register("weekly_availability", {
                        required: "Weekly availability is required.",
                      })}
                    >
                      <option>Less than 20 hours / week</option>
                      <option>20–30 hours / week</option>
                      <option>30+ hours / week</option>
                    </select>
                    {errors.weekly_availability && (
                      <span className="text-xs font-medium text-[#a44c4c]">
                        {errors.weekly_availability.message}
                      </span>
                    )}
                  </label>
                  <label className={labelClass}>
                    Experience level *
                    <select
                      className={inputClass}
                      {...register("experience_level", {
                        required: "Experience level is required.",
                      })}
                    >
                      <option value="Entry">Entry</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                    {errors.experience_level && (
                      <span className="text-xs font-medium text-[#a44c4c]">
                        {errors.experience_level.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              id="skills"
              title="Skills and expertise"
              description="Add at least 3 of your strongest skills. You can include up to 15."
            >
              <p className="mb-3 text-sm font-semibold text-[#343833]">
                Skills and expertise *
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#edf2eb] px-3 py-2 text-sm font-medium text-[#4f584d]"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSkills = skills.filter(
                          (item) => item !== skill,
                        );
                        setSkills(updatedSkills);
                        if (updatedSkills.length < 3) {
                          setError("skills", {
                            message: "Add at least 3 skills or expertise tags.",
                          });
                        }
                      }}
                      aria-label={`Remove ${skill}`}
                      className="cursor-pointer text-[#858b83] hover:text-[#a44c4c]"
                    >
                      <Icon icon="solar:close-circle-linear" width="16" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-5 flex max-w-lg gap-2">
                <input
                  value={skillInput}
                  onChange={(event) => setSkillInput(event.target.value)}
                  maxLength={20}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addSkill();
                    }
                  }}
                  disabled={skills.length >= 15}
                  className={inputClass}
                  placeholder="Add a skill"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  disabled={!skillInput.trim() || skills.length >= 15}
                  className="cursor-pointer rounded-xl border border-black/10 px-5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Add
                </button>
              </div>
              <p className="mt-2 text-xs text-[#858a82]">
                {skills.length} of 15 skills added · 20 characters maximum per
                skill
              </p>
              {errors.skills && (
                <p className="mt-2 text-xs font-medium text-[#a44c4c]">
                  {errors.skills.message}
                </p>
              )}
            </SectionCard>

            <SectionCard
              id="portfolio"
              title="Portfolio"
              description="Add at least 1 project that best represents your skills and results."
            >
              <p className="mb-3 text-sm font-semibold text-[#343833]">
                Portfolio projects *
              </p>
              <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {portfolio.map((project) => (
                  <article
                    key={project.client_id}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-black/9 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-black/14 hover:shadow-lg hover:shadow-black/6"
                  >
                    <div
                      className="relative aspect-video overflow-hidden bg-[#e4ead8] bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${project.cover_image.url})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/28 via-transparent to-transparent opacity-70" />
                      <button
                        type="button"
                        onClick={() =>
                          setPortfolio((current) => {
                            const updatedPortfolio = current.filter(
                              (item) => item.client_id !== project.client_id,
                            );
                            if (updatedPortfolio.length < 1) {
                              setError("portfolios", {
                                message: "Add at least 1 portfolio project.",
                              });
                            }
                            return updatedPortfolio;
                          })
                        }
                        aria-label={`Remove ${project.title}`}
                        className="absolute top-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/65 bg-white/92 text-[#565d54] shadow-md transition hover:bg-white hover:text-[#a44c4c] focus-visible:opacity-100 group-hover:opacity-100 md:opacity-0"
                      >
                        <Icon icon="solar:trash-bin-trash-linear" width="17" />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[10px] font-semibold tracking-[0.12em] text-[#62805f] uppercase">
                        {project.category}
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-base font-semibold tracking-[-0.015em] text-[#292d28]">
                        {project.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-xs leading-5 text-[#777c74]">
                        {project.description}
                      </p>
                      <div className="mt-5 border-t border-black/7 pt-4">
                        {project.live_url ? (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52784f] transition hover:text-[#365f34]"
                          >
                            View live project
                            <Icon
                              icon="solar:arrow-right-up-linear"
                              width="15"
                            />
                          </a>
                        ) : (
                          <span className="text-xs text-[#969b94]">
                            Portfolio case study
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
                <button
                  type="button"
                  onClick={() => setShowPortfolioForm(true)}
                  className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-black/16 bg-[#fafbf9] p-6 text-center transition hover:border-[#8faa8c] hover:bg-[#f4f8f2]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f1e4] text-[#52784f]">
                    <Icon icon="solar:add-circle-linear" width="24" />
                  </span>
                  <span className="mt-4 text-sm font-semibold">
                    Add portfolio project
                  </span>
                  <span className="mt-1.5 max-w-48 text-xs leading-5 text-[#858a82]">
                    Add a cover image, project details, and an optional live
                    link
                  </span>
                </button>
              </div>
              {errors.portfolios && (
                <p className="mt-3 text-xs font-medium text-[#a44c4c]">
                  {errors.portfolios.message}
                </p>
              )}
            </SectionCard>

            <div className="sticky bottom-4 z-20 flex items-center justify-between gap-4 rounded-2xl border border-black/9 bg-white/95 p-4 shadow-xl shadow-black/8 backdrop-blur">
              <p className="hidden text-xs text-[#777c74] sm:block">
                Review your changes before saving.
              </p>
              <button
                type="submit"
                disabled={!canSave}
                className="ml-auto cursor-pointer rounded-xl bg-[#252724] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3b3e39] disabled:cursor-not-allowed disabled:opacity-45"
              >
                Save profile
              </button>
            </div>
          </form>
        </div>
      </main>

      {showPortfolioForm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#172018]/55 p-4 backdrop-blur-[2px]"
        >
          <form
            onSubmit={addPortfolio}
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[#5d815a] uppercase">
                  Portfolio
                </p>
                <h2
                  id="portfolio-title"
                  className="mt-2 text-2xl font-semibold tracking-[-0.03em]"
                >
                  Add a project
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowPortfolioForm(false)}
                aria-label="Close"
                className="cursor-pointer"
              >
                <Icon icon="solar:close-circle-linear" width="24" />
              </button>
            </div>
            <div className="mt-6 grid gap-5">
              <label className={labelClass}>
                Project title *
                <input
                  name="title"
                  required
                  className={inputClass}
                  placeholder="e.g. Fintech mobile experience"
                />
              </label>
              <label className={labelClass}>
                Category *
                <input
                  name="category"
                  required
                  className={inputClass}
                  placeholder="e.g. Web application"
                />
              </label>
              <label className={labelClass}>
                Description *
                <textarea
                  name="description"
                  required
                  minLength={40}
                  rows={4}
                  className="resize-none rounded-xl border border-black/10 p-3.5 text-sm leading-6 outline-none focus:border-[#71936e]"
                  placeholder="What did you build, what was your role, and what changed?"
                />
              </label>
              <label className={labelClass}>
                <span>
                  Live link{" "}
                  <span className="font-normal text-[#8a8f87]">(optional)</span>
                </span>
                <span className="relative">
                  <Icon
                    icon="solar:link-linear"
                    width="18"
                    className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#858a82]"
                  />
                  <input
                    name="live_url"
                    type="url"
                    className={`${inputClass} pl-10`}
                    placeholder="https://your-project.com"
                  />
                </span>
              </label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 bg-[#f8f9f6] px-4 py-6 text-sm font-semibold text-[#5e655d]">
                <Icon icon="solar:upload-linear" width="20" /> Upload cover
                image *
                <input
                  name="cover_image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  required
                  className="sr-only"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3 border-t border-black/7 pt-5">
              <button
                type="button"
                onClick={() => setShowPortfolioForm(false)}
                className="cursor-pointer rounded-xl border border-black/10 px-5 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-[#252724] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Add project
              </button>
            </div>
          </form>
        </div>
      )}

      {saved && (
        <div
          role="status"
          className="fixed right-5 bottom-5 z-60 flex items-center gap-3 rounded-xl bg-[#252724] px-5 py-3.5 text-sm font-semibold text-white shadow-xl"
        >
          <Icon
            icon="solar:check-circle-bold"
            width="20"
            className="text-[#9ac296]"
          />
          Profile saved successfully
        </div>
      )}
    </div>
  );
}
