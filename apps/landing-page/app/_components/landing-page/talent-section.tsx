import { Icon } from "@iconify/react";
import Link from "next/link";

export function TalentSection() {
  return (
    <section id="talent" className="bg-[#f2f5f0] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#638462]">
              Exceptional people
            </p>
            <h2 className="mt-4 font-['Fraunces'] text-4xl font-medium tracking-tight sm:text-5xl">
              Meet your next collaborator.
            </h2>
          </div>
          <Link
            href="/talents"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#385f38]"
          >
            View all talent{" "}
            <Icon
              icon="solar:arrow-right-linear"
              width="18"
              strokeWidth="1.5"
            ></Icon>
          </Link>
        </div>

        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article className="overflow-hidden rounded-2xl bg-white">
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&amp;fit=crop&amp;w=700&amp;q=85"
              className="h-56 w-full object-cover object-top"
              alt="Maya Robinson"
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">Maya Robinson</h3>
                  <p className="mt-1 text-xs text-[#747872]">
                    Brand strategist
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium">
                  <Icon
                    icon="solar:star-bold"
                    width="13"
                    className="text-[#d5a73d]"
                  ></Icon>{" "}
                  5.0
                </span>
              </div>
              <p className="mt-4 text-xs text-[#6c706a]">
                $115/hr · New York, US
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl bg-white">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&amp;fit=crop&amp;w=700&amp;q=85"
              className="h-56 w-full object-cover object-top"
              alt="Jon Bell"
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">Jon Bell</h3>
                  <p className="mt-1 text-xs text-[#747872]">
                    Full-stack developer
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium">
                  <Icon
                    icon="solar:star-bold"
                    width="13"
                    className="text-[#d5a73d]"
                  ></Icon>{" "}
                  4.9
                </span>
              </div>
              <p className="mt-4 text-xs text-[#6c706a]">
                $135/hr · London, UK
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl bg-white">
            <img
              src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&amp;fit=crop&amp;w=700&amp;q=85"
              className="h-56 w-full object-cover object-top"
              alt="Sofia Mendes"
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">Sofia Mendes</h3>
                  <p className="mt-1 text-xs text-[#747872]">
                    Product designer
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium">
                  <Icon
                    icon="solar:star-bold"
                    width="13"
                    className="text-[#d5a73d]"
                  ></Icon>{" "}
                  5.0
                </span>
              </div>
              <p className="mt-4 text-xs text-[#6c706a]">
                $120/hr · Lisbon, PT
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl bg-white">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&amp;fit=crop&amp;w=700&amp;q=85"
              className="h-56 w-full object-cover object-top"
              alt="Daniel Cho"
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">Daniel Cho</h3>
                  <p className="mt-1 text-xs text-[#747872]">Growth marketer</p>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium">
                  <Icon
                    icon="solar:star-bold"
                    width="13"
                    className="text-[#d5a73d]"
                  ></Icon>{" "}
                  4.9
                </span>
              </div>
              <p className="mt-4 text-xs text-[#6c706a]">
                $95/hr · Toronto, CA
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
