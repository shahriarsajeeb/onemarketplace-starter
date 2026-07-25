import { Icon } from "@iconify/react";
import Link from "next/link";

export function WorkSection() {
  return (
    <section
      id="work"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
    >
      <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#638462]">
            Built for better work
          </p>
          <h2 className="mt-4 font-['Fraunces'] text-4xl font-medium tracking-tight sm:text-5xl">
            One place. The right people.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-[#6c706a]">
          Whether you’re hiring one exceptional freelancer or engaging a full
          agency, OneMarketplace.io makes every step clear and secure.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-black/8 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-black/4 sm:p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff5ee] text-[#527750]">
            <Icon
              icon="solar:user-check-linear"
              width="23"
              strokeWidth="1.5"
            ></Icon>
          </span>
          <h3 className="mt-7 text-lg font-semibold tracking-tight">
            Quality, verified
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#6d716b]">
            Every professional is reviewed for expertise, communication, and a
            proven record of delivery.
          </p>
          <Link
            href="/talents"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#3f663e]"
          >
            Browse talent{" "}
            <Icon
              icon="solar:arrow-right-linear"
              width="16"
              strokeWidth="1.5"
            ></Icon>
          </Link>
        </article>

        <article className="rounded-2xl border border-black/8 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-black/4 sm:p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8f2e7] text-[#98733d]">
            <Icon
              icon="solar:chat-round-dots-linear"
              width="23"
              strokeWidth="1.5"
            ></Icon>
          </span>
          <h3 className="mt-7 text-lg font-semibold tracking-tight">
            Made for collaboration
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#6d716b]">
            Manage proposals, milestones, messages, and feedback without losing
            the thread.
          </p>
          <Link
            href="/#how-it-works"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#765426]"
          >
            See how it works{" "}
            <Icon
              icon="solar:arrow-right-linear"
              width="16"
              strokeWidth="1.5"
            ></Icon>
          </Link>
        </article>

        <article className="rounded-2xl border border-black/8 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-black/4 sm:p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff1f9] text-[#596ca2]">
            <Icon
              icon="solar:shield-check-linear"
              width="23"
              strokeWidth="1.5"
            ></Icon>
          </span>
          <h3 className="mt-7 text-lg font-semibold tracking-tight">
            Payments with confidence
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#6d716b]">
            Fund work securely, approve milestones on your terms, and pay only
            for work you love.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#4c6096]"
          >
            Learn about payments{" "}
            <Icon
              icon="solar:arrow-right-linear"
              width="16"
              strokeWidth="1.5"
            ></Icon>
          </Link>
        </article>
      </div>
    </section>
  );
}
