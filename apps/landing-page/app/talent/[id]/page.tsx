import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../_components/landing-page/header";
import styles from "./profile.module.css";

interface TalentProfile {
  name: string;
  initials: string;
  title: string;
  location: string;
  hourlyRate: number;
  jobSuccess: number;
  completedProjects: number;
  rating: number;
  reviews: number;
  totalEarned: string;
  color: string;
  summary: string;
  skills: string[];
}

const profiles: Record<string, TalentProfile> = {
  "1": {
    name: "Amelia Morgan",
    initials: "AM",
    title: "Senior Product Designer",
    location: "London, United Kingdom",
    hourlyRate: 120,
    jobSuccess: 98,
    completedProjects: 84,
    rating: 4.9,
    reviews: 72,
    totalEarned: "$240k+",
    color: "linear-gradient(135deg, #925f46, #c58c6e)",
    summary:
      "I help ambitious product teams turn complex ideas into clear, useful experiences. My work spans early product strategy, user journeys, interaction design, prototyping, and scalable design systems. I care deeply about the details, but always connect them back to measurable customer and business outcomes.",
    skills: [
      "Product design",
      "Figma",
      "Design systems",
      "Prototyping",
      "UX strategy",
      "User research",
    ],
  },
  "2": {
    name: "Daniel Cho",
    initials: "DC",
    title: "Full-Stack TypeScript Engineer",
    location: "Toronto, Canada",
    hourlyRate: 145,
    jobSuccess: 100,
    completedProjects: 63,
    rating: 5,
    reviews: 58,
    totalEarned: "$310k+",
    color: "linear-gradient(135deg, #466b72, #73a2a8)",
    summary:
      "I build reliable web products from first prototype through production. I work closely with product and design teams to create fast, accessible applications backed by maintainable systems, thoughtful APIs, and pragmatic engineering decisions.",
    skills: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "System design",
      "Cloud architecture",
    ],
  },
  "3": {
    name: "Sofia Mendes",
    initials: "SM",
    title: "Brand Strategist & Creative Director",
    location: "Lisbon, Portugal",
    hourlyRate: 110,
    jobSuccess: 96,
    completedProjects: 109,
    rating: 4.9,
    reviews: 94,
    totalEarned: "$275k+",
    color: "linear-gradient(135deg, #6f668e, #a095bd)",
    summary:
      "I help ambitious companies find a distinct point of view and express it consistently. From positioning and verbal identity to campaign direction, I bring strategy and creative execution into one focused process.",
    skills: [
      "Brand strategy",
      "Positioning",
      "Creative direction",
      "Campaigns",
      "Verbal identity",
      "Workshops",
    ],
  },
  "4": {
    name: "Jon Bell",
    initials: "JB",
    title: "Conversion Copywriter",
    location: "Austin, United States",
    hourlyRate: 90,
    jobSuccess: 94,
    completedProjects: 51,
    rating: 4.8,
    reviews: 45,
    totalEarned: "$160k+",
    color: "linear-gradient(135deg, #8b6f48, #bea071)",
    summary:
      "I write clear, persuasive copy for technology companies that want to sound human. My projects include product launches, high-converting websites, lifecycle email, and messaging systems that teams can actually use.",
    skills: [
      "Web copy",
      "SaaS",
      "Email strategy",
      "Messaging",
      "Content design",
      "Conversion",
    ],
  },
  "5": {
    name: "Maya Robinson",
    initials: "MR",
    title: "Machine Learning Engineer",
    location: "New York, United States",
    hourlyRate: 165,
    jobSuccess: 99,
    completedProjects: 47,
    rating: 5,
    reviews: 42,
    totalEarned: "$340k+",
    color: "linear-gradient(135deg, #46634b, #7ca181)",
    summary:
      "I design practical AI systems that move from experimentation to dependable production outcomes. I specialize in applied LLM products, evaluation systems, data pipelines, and the infrastructure required to operate them responsibly.",
    skills: ["Python", "LLM systems", "MLOps", "PyTorch", "Evaluation", "APIs"],
  },
  "6": {
    name: "Noah Williams",
    initials: "NW",
    title: "Growth Marketing Lead",
    location: "Melbourne, Australia",
    hourlyRate: 105,
    jobSuccess: 97,
    completedProjects: 76,
    rating: 4.9,
    reviews: 69,
    totalEarned: "$225k+",
    color: "linear-gradient(135deg, #566f8c, #87a5c4)",
    summary:
      "I build sustainable acquisition programs by combining sharp positioning, rapid experimentation, and useful analytics. I work best with teams ready to turn scattered channel activity into a coherent growth system.",
    skills: [
      "Growth strategy",
      "Paid media",
      "Analytics",
      "Experimentation",
      "Lifecycle",
      "Attribution",
    ],
  },
  "7": {
    name: "Aisha Rahman",
    initials: "AR",
    title: "UX Researcher",
    location: "Singapore",
    hourlyRate: 100,
    jobSuccess: 95,
    completedProjects: 58,
    rating: 4.8,
    reviews: 52,
    totalEarned: "$180k+",
    color: "linear-gradient(135deg, #8c5366, #bd8094)",
    summary:
      "I uncover the customer evidence teams need to make confident decisions. My research combines careful qualitative work with practical synthesis that product, design, and leadership teams can act on.",
    skills: [
      "User research",
      "Usability testing",
      "Interviews",
      "Research strategy",
      "Synthesis",
      "Journey mapping",
    ],
  },
  "8": {
    name: "Leo Martins",
    initials: "LM",
    title: "Mobile Application Developer",
    location: "São Paulo, Brazil",
    hourlyRate: 95,
    jobSuccess: 92,
    completedProjects: 39,
    rating: 4.7,
    reviews: 34,
    totalEarned: "$145k+",
    color: "linear-gradient(135deg, #5b6d91, #8d9dc0)",
    summary:
      "I create polished cross-platform mobile applications with native-quality interactions. I focus on dependable architecture, excellent performance, and a development process that keeps product teams moving.",
    skills: [
      "React Native",
      "iOS",
      "Android",
      "TypeScript",
      "Mobile UX",
      "App performance",
    ],
  },
};

const portfolio = [
  {
    title: "Connected finance workspace",
    category: "Product strategy · UX/UI",
    background: "linear-gradient(135deg, #d8e8d5, #9fc49d)",
  },
  {
    title: "B2B analytics platform",
    category: "Research · Design system",
    background: "linear-gradient(135deg, #e8dfcf, #c9a97d)",
  },
  {
    title: "Customer onboarding",
    category: "Prototyping · Product design",
    background: "linear-gradient(135deg, #d9d8ec, #9d9ac5)",
  },
];

const reviews = [
  {
    quote:
      "A rare combination of strategic thinking and exceptional craft. The work gave our team clarity and helped us ship a significantly better product.",
    author: "VP Product, Northstar",
    project: "Product redesign",
  },
  {
    quote:
      "Communication was excellent from start to finish. Every decision was thoughtful, clearly explained, and grounded in what our customers needed.",
    author: "Founder, Lumen",
    project: "New product launch",
  },
];

interface TalentProfilePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return Object.keys(profiles).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: TalentProfilePageProps): Promise<Metadata> {
  const profile = profiles[(await params).id];
  return {
    title: profile
      ? `${profile.name} — ${profile.title} | OneMarketplace.io`
      : "Talent profile | OneMarketplace.io",
  };
}

export default async function TalentProfilePage({
  params,
}: TalentProfilePageProps) {
  const { id } = await params;
  const profile = profiles[id];
  if (!profile) notFound();

  return (
    <div className="min-h-svh bg-[#f7f8f5] font-(family-name:--font-dm-sans) text-[#20231f]">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
          <nav
            className="flex items-center gap-2 text-sm text-[#747870]"
            aria-label="Breadcrumb"
          >
            <Link href="/talents" className="hover:text-[#3f683d]">
              Talent
            </Link>
            <span aria-hidden="true">/</span>
            <span className="truncate text-[#3e423d]">{profile.name}</span>
          </nav>
        </div>

        <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-black/6 bg-[#e6efe3] p-6 sm:p-9 lg:p-11">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.8),transparent_30%),radial-gradient(circle_at_82%_100%,rgba(159,196,154,0.48),transparent_36%)]"
              aria-hidden="true"
            ></div>
            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div
                  className="flex h-28 w-28 shrink-0 items-center justify-center rounded-4xl text-2xl font-bold text-white shadow-lg shadow-black/8 sm:h-32 sm:w-32"
                  style={{ background: profile.color }}
                >
                  {profile.initials}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className={`${styles.profileTitle} text-[#182019]`}>
                      {profile.name}
                    </h1>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-2.5 py-1 text-xs font-semibold text-[#477344]"
                      title="Identity verified with Stripe"
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                        <path fill="currentColor" d="m8 1.3 1.55 1.12 1.9-.04.55 1.82 1.56 1.08-.63 1.8.63 1.8L12 9.96l-.55 1.82-1.9-.04L8 12.86l-1.55-1.12-1.9.04L4 9.96 2.44 8.88l.63-1.8-.63-1.8L4 4.2l.55-1.82 1.9.04L8 1.3Z" />
                        <path fill="white" d="m6.9 10.55-2.1-2.1.95-.95L6.9 8.65l3.35-3.35.95.95-4.3 4.3Z" />
                      </svg>
                      Identity verified
                    </span>
                  </div>
                  <p className="mt-2 text-lg text-[#596358]">{profile.title}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#677065]">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#559856]"></span>
                      Available now
                    </span>
                    <span>{profile.location}</span>
                    <span>Local time 10:24 AM</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/signup?role=client"
                  className="rounded-xl border border-black/10 cursor-pointer bg-white/70 px-4 py-3 text-sm font-semibold transition hover:bg-white"
                >
                  Save profile
                </Link>
                <Link
                  href="/signup?role=client"
                  className="rounded-xl bg-[#252724] px-5 py-3 text-sm font-semibold text-white! transition hover:bg-[#3b3e39]"
                >
                  Invite to a job
                </Link>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-4 -mt-5 grid grid-cols-2 overflow-hidden rounded-2xl border border-black/7 bg-white shadow-xl shadow-black/4 sm:mx-8 sm:grid-cols-4 lg:mx-12">
            {[
              ["Job success", `${profile.jobSuccess}%`],
              ["Projects completed", profile.completedProjects],
              ["Client rating", `${profile.rating.toFixed(1)} / 5`],
              ["Total earned", profile.totalEarned],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={`px-4 py-5 text-center ${index > 0 ? "sm:border-l sm:border-black/7" : ""} ${index > 1 ? "border-t border-black/7 sm:border-t-0" : ""}`}
              >
                <p className="text-lg font-semibold">{value}</p>
                <p className="mt-1 text-xs text-[#81857e]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl items-start gap-7 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_20rem] lg:px-10">
          <div className="space-y-7">
            <section className="rounded-2xl border border-black/7 bg-white p-6 sm:p-8">
              <h2 className={styles.sectionTitle}>About</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#646862] sm:text-base">
                {profile.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-[#eef2ec] px-3 py-2 text-xs font-semibold text-[#596257]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-black/7 bg-white p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#62805f]">
                    Selected work
                  </p>
                  <h2 className={`${styles.sectionTitle} mt-2`}>Portfolio</h2>
                </div>
                <Link
                  href={"/signup?role=client"}
                  className="text-sm font-semibold text-[#477344]"
                >
                  View all work
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {portfolio.map((project, index) => (
                  <article key={project.title}>
                    <div
                      className="relative aspect-4/3 overflow-hidden rounded-xl"
                      style={{ background: project.background }}
                    >
                      <div className="absolute inset-5 rounded-xl border border-white/45 bg-white/30 p-4 shadow-lg shadow-black/5 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-white/80"></span>
                          <span className="h-2 w-2 rounded-full bg-white/60"></span>
                          <span className="h-2 w-2 rounded-full bg-white/40"></span>
                        </div>
                        <div className="mt-7 space-y-2">
                          <span className="block h-2 w-3/4 rounded bg-white/70"></span>
                          <span className="block h-2 w-1/2 rounded bg-white/50"></span>
                        </div>
                        <span className="absolute right-4 bottom-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/70 text-xs font-bold">
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                    <h3 className={`${styles.itemTitle} mt-3`}>
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#81857e]">
                      {project.category}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-black/7 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className={styles.sectionTitle}>Client reviews</h2>
                <Link
                  href="/signup?role=client"
                  className="shrink-0 text-sm font-semibold text-[#477344] transition hover:text-[#315a2f] hover:underline"
                >
                  View more reviews
                  <span className="ml-1" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {reviews.map((review) => (
                  <article
                    key={review.author}
                    className="rounded-xl bg-[#f5f7f3] p-5"
                  >
                    <p className="text-sm tracking-widest text-[#d2a43b]">
                      ★★★★★
                    </p>
                    <blockquote className="mt-3 text-sm leading-6 text-[#555a53]">
                      “{review.quote}”
                    </blockquote>
                    <p className="mt-5 text-sm font-semibold">
                      {review.author}
                    </p>
                    <p className="mt-1 text-xs text-[#83877f]">
                      {review.project}
                    </p>
                  </article>
                ))}
              </div>
              <p className="mt-5 text-sm text-[#6f746c]">
                {profile.rating.toFixed(1)} average from {profile.reviews}{" "}
                verified client reviews
              </p>
            </section>

            <section className="rounded-2xl border border-black/7 bg-white p-6 sm:p-8">
              <h2 className={styles.sectionTitle}>Work history</h2>
              <div className="mt-6 space-y-6">
                {[
                  [
                    "Lead independent specialist",
                    "OneMarketplace.io",
                    "2021 — Present",
                  ],
                  [
                    "Senior product consultant",
                    "Northstar Studio",
                    "2018 — 2021",
                  ],
                ].map(([role, company, period]) => (
                  <div
                    key={role}
                    className="grid gap-2 border-l-2 border-[#c9ddc5] pl-5 sm:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <h3 className={styles.itemTitle}>{role}</h3>
                      <p className="mt-1 text-sm text-[#73776f]">{company}</p>
                    </div>
                    <p className="text-xs font-medium text-[#8a8e87]">
                      {period}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="sticky top-24 rounded-2xl border border-black/7 bg-white p-6 shadow-lg shadow-black/3">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[#688065]">
              Work with {profile.name.split(" ")[0]}
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">
              ${profile.hourlyRate}
              <span className="text-base font-normal text-[#7d817a]">/hr</span>
            </p>
            <p className="mt-2 text-sm leading-6 text-[#71756e]">
              Available for projects starting this week.
            </p>
            <Link
              href="/signup?role=client"
              className="mt-6 block rounded-xl bg-[#252724] px-4 py-3 text-center text-sm font-semibold text-white! transition hover:bg-[#3b3e39]"
            >
              Invite to a job
            </Link>
            <Link
              href="/signup?role=client"
              className="mt-3 block rounded-xl text-center border border-black/10 px-4 py-3 text-sm font-semibold transition hover:bg-[#f5f6f3]"
            >
              Send a message
            </Link>
            <div className="mt-6 space-y-4 border-t border-black/7 pt-6 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#7a7e77]">Response time</span>
                <span className="font-semibold">Within 2 hours</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#7a7e77]">English</span>
                <span className="font-semibold">Fluent</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#7a7e77]">Member since</span>
                <span className="font-semibold">2021</span>
              </div>
            </div>
            <div className="mt-6 rounded-xl bg-[#edf4ea] p-4">
              <p className="text-xs font-semibold text-[#4a7047]">
                OneMarketplace protected
              </p>
              <p className="mt-1 text-xs leading-5 text-[#6b7769]">
                Secure payments, verified work history, and dedicated support.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
