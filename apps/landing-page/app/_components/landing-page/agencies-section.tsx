import { Icon } from "@iconify/react";
import Link from "next/link";

export function AgenciesSection() {
  return (
    <section
      id="agencies"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
    >
      <div className="overflow-hidden rounded-3xl bg-[#242622]">
        <div className="grid lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-[#d6e7d3]">
              <Icon
                icon="solar:buildings-3-linear"
                width="15"
                strokeWidth="1.5"
              ></Icon>
              OneMarketplace.io for agencies
            </span>
            <h2 className="mt-7 max-w-lg font-['Fraunces'] text-4xl font-medium tracking-tight text-white sm:text-5xl">
              Your agency, in a stronger room.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#bbc2b9] sm:text-base">
              Build your public profile, bring in your team, and connect with
              clients looking for an experienced partner — not just another
              vendor.
            </p>
            <Link
              href="/agencies"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#dcefd9] px-5 py-3 text-sm font-medium text-[#254024] transition hover:bg-white"
            >
              Explore for agencies
              <Icon
                icon="solar:arrow-right-linear"
                width="18"
                strokeWidth="1.5"
              ></Icon>
            </Link>
          </div>

          <div className="relative min-h-88 overflow-hidden bg-[#d7e4d5]">
            <div className="absolute right-8 top-8 rounded-2xl bg-white p-4 shadow-xl shadow-[#355034]/10 sm:right-12 sm:top-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#263f2a] text-sm font-semibold text-white">
                  A
                </span>
                <div>
                  <p className="text-sm font-semibold">Atelier North</p>
                  <p className="text-xs text-[#747872]">
                    Brand &amp; digital studio
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <span className="rounded-md bg-[#eff5ee] px-2 py-1 text-xs text-[#557554]">
                  Branding
                </span>
                <span className="rounded-md bg-[#eff5ee] px-2 py-1 text-xs text-[#557554]">
                  Web design
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&amp;fit=crop&amp;w=1000&amp;q=85"
              className="absolute bottom-0 left-0 h-64 w-[88%] rounded-tr-[5rem] object-cover object-center sm:h-72"
              alt="Agency team collaborating"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
