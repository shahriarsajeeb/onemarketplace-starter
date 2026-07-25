import { Icon } from "@iconify/react";
import Link from "next/link";
import { HeroSearch } from "./hero-search";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#bdd0ba] bg-[#f4f8f2] px-3 py-1.5 text-xs font-medium text-[#486248]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5d9860]"></span>
            Trusted by teams building what’s next
          </div>

          <h1 className="mt-7 font-['Fraunces'] text-5xl font-medium tracking-tight text-[#20211f] sm:text-6xl lg:text-7xl">
            Find your next teammate
            <br className="hidden sm:block" /> not just a freelancer.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#60645e] sm:text-lg">
            Hire verified professionals, collaborate in real time, and manage
            every project from proposal to payment—all in one place.
          </p>

          <HeroSearch />

          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[#757972]">
            <span className="font-medium text-[#555952]">Popular:</span>
            <Link
              href="/talents"
              className="underline decoration-[#b9bcb7] underline-offset-4 hover:text-[#252724]"
            >
              Product design
            </Link>
            <Link
              href="/talents"
              className="underline decoration-[#b9bcb7] underline-offset-4 hover:text-[#252724]"
            >
              Development
            </Link>
            <Link
              href="/talents"
              className="underline decoration-[#b9bcb7] underline-offset-4 hover:text-[#252724]"
            >
              Marketing
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 grid w-full max-w-296 gap-4 text-left sm:mt-20 lg:grid-cols-[1.85fr_1fr]">
          <div className="relative min-h-102 overflow-hidden rounded-4xl bg-[#deecdc] p-8 sm:p-10">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_76%_36%,rgba(255,255,255,0.82),transparent_30%),radial-gradient(circle_at_72%_88%,rgba(150,194,143,0.5),transparent_38%)]"
              aria-hidden="true"
            ></div>

            <div className="relative z-10 max-w-md">
              <span className="inline-flex rounded-full bg-white/75 px-3.5 py-2 text-xs font-semibold text-[#557055]">
                Featured talent
              </span>
              <h2 className="mt-6 font-['Fraunces'] text-4xl font-medium leading-[1.08] tracking-tight text-[#18221c]">
                Meet people who
                <br />
                make the difference.
              </h2>
              <p className="mt-4 max-w-76 text-sm leading-6 text-[#668064]">
                Vetted specialists with the experience to take ideas from brief
                to breakthrough.
              </p>
              <Link
                href="/talents"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#356435] hover:underline!"
              >
                Explore talent
                <Icon
                  icon="solar:arrow-right-up-linear"
                  width="20"
                  strokeWidth="2"
                ></Icon>
              </Link>
            </div>

            <div className="absolute right-[5%] top-[50%] hidden text-xs font-semibold text-[#50734f] sm:block">
              <span className="absolute -right-2 -top-6 whitespace-nowrap rounded-full bg-white/80 px-3.5 py-2.5 shadow-sm shadow-[#6d9668]/5">
                Brand strategy
              </span>
              <span className="absolute right-32 top-4 whitespace-nowrap rounded-full bg-white/80 px-3.5 py-2.5 shadow-sm shadow-[#6d9668]/5">
                Product design
              </span>
              <span className="absolute -right-4 top-12 whitespace-nowrap rounded-full bg-white/80 px-3.5 py-2.5 shadow-sm shadow-[#6d9668]/5">
                Engineering
              </span>
              <span className="absolute right-24 top-18 whitespace-nowrap rounded-full bg-white/80 px-3.5 py-2.5 shadow-sm shadow-[#6d9668]/5">
                Growth
              </span>
            </div>

            <div className="absolute bottom-6 right-6 left-6 flex items-center justify-between gap-3 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-sm sm:left-auto sm:w-60">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#925f46] text-xs font-semibold text-white">
                  AM
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-[#20251f]">
                    Amelia Morgan
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[#879084]">
                    Senior product designer
                  </p>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-0.5 text-[11px] font-semibold text-[#567353]">
                4.9
                <Icon icon="solar:star-bold" width="13"></Icon>
              </span>
            </div>
          </div>

          <div className="relative min-h-102 overflow-hidden rounded-4xl bg-[#242824] p-8 text-white sm:p-10">
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <Icon
                  icon="solar:home-2-linear"
                  width="23"
                  strokeWidth="1.6"
                ></Icon>
              </span>
              <span className="rounded-full bg-[#d9efd5]/10 px-4 py-2 text-xs font-semibold text-[#cce5c8]">
                For agencies
              </span>
            </div>

            <div className="absolute inset-x-8 bottom-10 z-10 max-w-76">
              <h3 className="text-[1.75rem] font-semibold tracking-tight">
                Bring your whole team.
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#b9c0b7]">
                Win better projects, showcase your work, and collaborate in one
                place.
              </p>
              <Link
                href="/agencies"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline"
              >
                Explore agency workspace
                <Icon
                  icon="solar:arrow-right-up-linear"
                  width="20"
                  strokeWidth="2"
                ></Icon>
              </Link>
            </div>

            <div
              className="absolute right-5 bottom-0 z-0 flex h-36 items-end gap-3 opacity-65"
              aria-hidden="true"
            >
              <span className="h-12 w-6 rounded-t-xl bg-[#465046]"></span>
              <span className="h-20 w-6 rounded-t-xl bg-[#465046]"></span>
              <span className="h-32 w-6 rounded-t-xl bg-[#465046]"></span>
              <span className="h-24 w-6 rounded-t-xl bg-[#465046]"></span>
              <span className="h-36 w-6 rounded-t-xl bg-[#465046]"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
