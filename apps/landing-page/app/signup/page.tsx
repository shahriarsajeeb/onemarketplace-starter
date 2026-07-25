import Link from "next/link";
import { BrandMark } from "../_components/landing-page/brand-mark";
import { SignupForm } from "./signup-form";
import styles from "./signup.module.css";

function ClientIllustration() {
  return (
    <svg
      viewBox="0 0 96 96"
      className="h-24 w-24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="38" cy="30" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        d="M20 67V56c0-11 8-19 19-19 4 0 8 1 11 3"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect
        x="42"
        y="52"
        width="34"
        height="25"
        rx="5"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M53 52v-4c0-3 2-5 5-5h3c3 0 5 2 5 5v4M43 63h32"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FreelancerIllustration() {
  return (
    <svg
      viewBox="0 0 96 96"
      className="h-24 w-24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="38" cy="30" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        d="M20 67V56c0-11 8-19 19-19 5 0 9 1 13 4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M48 75h34M56 51h28l-6 24H50l6-24Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="70" cy="63" r="3" fill="currentColor" />
    </svg>
  );
}

const roles = [
  {
    title: "Client",
    description: "Post jobs and hire",
    href: "/signup?role=client",
    illustration: <ClientIllustration />,
    background: "linear-gradient(135deg, #e8f8bd 0%, #c8f4d5 100%)",
  },
  {
    title: "Freelancer",
    description: "Work and get paid",
    href: "/signup?role=freelancer",
    illustration: <FreelancerIllustration />,
    background: "linear-gradient(135deg, #cef7d4 0%, #f0f8bc 100%)",
  },
];

interface SignUpPageProps {
  searchParams: Promise<{
    role?: string | string[];
  }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const roleParam = (await searchParams).role;
  const role =
    roleParam === "client" || roleParam === "freelancer"
      ? roleParam
      : undefined;

  if (role) {
    return (
      <div className="relative flex min-h-svh flex-col overflow-hidden bg-white font-(family-name:--font-dm-sans)">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-128 bg-[radial-gradient(ellipse_at_top,rgba(224,246,220,0.8),rgba(247,252,245,0.48)_44%,transparent_76%)]"
          aria-hidden="true"
        ></div>

        <header className="relative z-10 px-5 py-7 sm:px-8 sm:py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5"
            aria-label="OneMarketplace home"
          >
            <BrandMark />
            <span className="text-xl font-semibold tracking-tight">
              OneMarketplace
            </span>
          </Link>
        </header>

        <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
          <SignupForm role={role} />
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-white font-(family-name:--font-dm-sans)">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-128 bg-[radial-gradient(ellipse_at_top,rgba(224,246,220,0.8),rgba(247,252,245,0.48)_44%,transparent_76%)]"
        aria-hidden="true"
      ></div>

      <header className="relative z-10 px-5 py-7 sm:px-8 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5"
          aria-label="OneMarketplace.io home"
        >
          <BrandMark />
          <span className="text-xl font-semibold tracking-tight">
            OneMarketplace.io
          </span>
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-5xl text-center">
          <h1 className={`${styles.title} text-[#171916]`}>
            Welcome to OneMarketplace
          </h1>
          <p className="mt-7 text-base font-semibold text-[#666963] sm:text-lg">
            Which describes you best?
          </p>

          <div className="mx-auto mt-12 grid max-w-132 gap-5 sm:grid-cols-2">
            {roles.map((role) => (
              <Link
                key={role.title}
                href={role.href}
                className="group rounded-xl border border-black/12 bg-white p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl hover:shadow-black/6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#477944]"
              >
                <div
                  className="flex aspect-square items-center justify-center rounded-xl text-[#171916]"
                  style={{ background: role.background }}
                >
                  {role.illustration}
                </div>
                <div className="px-3 pb-1 pt-6 text-center">
                  <h2
                    className={`${styles.roleTitle} flex items-center justify-center gap-2 text-xl text-[#181a17] sm:text-2xl`}
                  >
                    {role.title}
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </h2>
                  <p className="mt-2 text-sm text-[#a0a29e] sm:text-base">
                    {role.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-5 py-8 text-center text-sm font-medium text-[#252724] sm:text-base">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#357532] hover:underline! underline-offset-2"
        >
          Log in
        </Link>
      </footer>
    </div>
  );
}
