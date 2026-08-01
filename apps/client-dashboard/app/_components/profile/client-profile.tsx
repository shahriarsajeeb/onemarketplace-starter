"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { completedClientContracts } from "../data/client-data";

export function ClientProfile({ editing = false }: { editing?: boolean }) {
  const [saved, setSaved] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [industry, setIndustry] = useState("Healthcare technology");

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[.14em] text-[#62805f] uppercase">
            Client account
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
            {editing ? "Edit profile" : "My profile"}
          </h1>
          <p className="mt-2 text-sm text-[#72776f]">
            {editing
              ? "Update the information talent sees on your jobs and contracts."
              : "Preview the client identity freelancers and agencies see."}
          </p>
        </div>
        <Link
          href={editing ? "/profile" : "/profile/edit"}
          className={`inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold ${
            editing
              ? "border border-black/10 bg-white"
              : "bg-[#252724] text-white"
          }`}
        >
          <Icon
            icon={editing ? "solar:eye-linear" : "solar:pen-2-linear"}
            width="18"
          />
          {editing ? "Preview profile" : "Edit profile"}
        </Link>
      </div>

      {saved && (
        <p
          role="status"
          className="mt-5 rounded-xl bg-[#e7f2e4] p-3 text-xs font-semibold text-[#4d784a]"
        >
          Client profile changes saved.
        </p>
      )}

      {editing ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(true);
          }}
          className="mt-8 grid gap-5"
        >
          <section className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
            <h2 className="font-semibold">Profile identity</h2>
            <p className="mt-1 text-xs text-[#7b8078]">
              Your photo and personal details identify the owner of the client
              account.
            </p>
            <div className="mt-5 flex flex-col gap-4 rounded-xl bg-[#f4f6f2] p-4 sm:flex-row sm:items-center">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt="Client avatar preview"
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#496e67] text-xl font-semibold text-white">
                  OB
                </span>
              )}
              <div>
                <h3 className="text-sm font-semibold">Profile photo</h3>
                <p className="mt-1 text-xs text-[#7b8078]">
                  Upload a square JPG, PNG, or WebP image.
                </p>
                <label className="mt-3 inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-xs font-semibold">
                  <Icon icon="solar:camera-linear" width="17" />
                  Change photo
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) setAvatarUrl(URL.createObjectURL(file));
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="First name" defaultValue="Olivia" />
              <Field label="Last name" defaultValue="Bennett" />
              <Field label="Role" defaultValue="Head of Product" />
              <Field
                label="Location"
                defaultValue="San Francisco, United States"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
            <h2 className="font-semibold">Company information</h2>
            <p className="mt-1 text-xs text-[#7b8078]">
              This information is attached to public job posts and proposals.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Company name" defaultValue="Wellmade Health" />
              <Field
                label="Company website"
                type="url"
                defaultValue="https://wellmade.health"
              />
              <SelectField
                label="Company size"
                defaultValue="51–200 employees"
                options={[
                  "Just me",
                  "2–10 employees",
                  "11–50 employees",
                  "51–200 employees",
                  "201–500 employees",
                  "501–1,000 employees",
                  "1,001–5,000 employees",
                  "5,001+ employees",
                ]}
              />
              <label className="text-xs font-semibold">
                Industry
                <select
                  value={industry}
                  onChange={(event) => setIndustry(event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal outline-none focus:border-[#6e916a]"
                >
                  {[
                    "Healthcare technology",
                    "Software & technology",
                    "Financial services",
                    "Retail & e-commerce",
                    "Education",
                    "Media & entertainment",
                    "Professional services",
                    "Manufacturing",
                    "Real estate",
                    "Nonprofit",
                    "Other",
                  ].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              {industry === "Other" && (
                <Field
                  label="Custom industry"
                  defaultValue=""
                  placeholder="Enter your industry"
                />
              )}
            </div>
            <label className="mt-4 block text-xs font-semibold">
              Company description
              <textarea
                rows={5}
                defaultValue="Wellmade Health builds collaborative software that helps clinical teams coordinate care and make better operational decisions."
                className="mt-2 w-full resize-none rounded-xl border border-black/10 p-3 text-sm font-normal outline-none focus:border-[#6e916a]"
              />
            </label>
          </section>

          <div className="flex justify-end gap-2">
            <Link
              href="/profile"
              className="h-11 rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="h-11 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
            >
              Save profile
            </button>
          </div>
        </form>
      ) : (
        <ProfilePreview avatarUrl={avatarUrl} />
      )}
    </>
  );
}

function ProfilePreview({ avatarUrl }: { avatarUrl: string }) {
  const contractsPerPage = 2;
  const [contractPage, setContractPage] = useState(1);
  const totalContractPages = Math.ceil(
    completedClientContracts.length / contractsPerPage,
  );
  const contractStart = (contractPage - 1) * contractsPerPage;
  const visibleContracts = completedClientContracts.slice(
    contractStart,
    contractStart + contractsPerPage,
  );

  const openContractPage = (page: number) => {
    setContractPage(Math.min(Math.max(page, 1), totalContractPages));
  };

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="grid gap-4 lg:sticky lg:top-24">
        <section className="rounded-2xl border border-black/8 bg-white p-6 text-center">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt="Olivia Bennett"
              className="mx-auto h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <span className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#496e67] text-2xl font-semibold text-white">
              OB
            </span>
          )}
          <h2 className="mt-5 inline-flex items-center justify-center gap-1.5 text-xl font-semibold">
            Olivia Bennett
            <Icon
              icon="solar:verified-check-bold"
              width="19"
              className="text-[#5b8658]"
            />
          </h2>
          <p className="mt-1 text-sm text-[#747a72]">
            Head of Product · Wellmade Health
          </p>
          <div className="mt-3 flex justify-center text-xs text-[#858a82]">
            <span className="inline-flex max-w-56 items-start gap-1.5 text-center">
              <Icon
                icon="solar:map-point-linear"
                width="16"
                className="mt-px shrink-0"
              />
              <span>San Francisco, United States</span>
            </span>
          </div>
          <div className="mt-5 border-t border-black/7 pt-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e8f3e5] px-3 py-2 text-xs font-semibold text-[#4d784a]">
              <Icon icon="solar:verified-check-bold" width="17" />
              Payment method verified
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-black/8 bg-white p-5">
          <h2 className="text-sm font-semibold">Hiring activity</h2>
          <dl className="mt-4 grid gap-4">
            <SidebarDetail label="Open jobs" value="2" />
            <SidebarDetail label="Total hires" value="31" />
            <SidebarDetail label="Hire rate" value="72%" />
            <SidebarDetail label="Average response" value="Within 1 day" />
          </dl>
        </section>

        <section className="rounded-2xl border border-black/8 bg-white p-5">
          <h2 className="text-sm font-semibold">Company details</h2>
          <dl className="mt-4 grid gap-4">
            <SidebarDetail label="Industry" value="Healthcare technology" />
            <SidebarDetail label="Company size" value="51–200" />
            <SidebarDetail label="Member since" value="2024" />
          </dl>
          <a
            href="https://wellmade.health"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#52784f] hover:underline"
          >
            wellmade.health
            <Icon icon="solar:arrow-right-up-linear" width="14" />
          </a>
        </section>
      </aside>

      <div className="grid gap-6">
        <section className="rounded-2xl border border-black/8 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[.13em] text-[#62805f] uppercase">
            About the company
          </p>
          <h2 className="mt-3 text-2xl font-semibold">Wellmade Health</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#676e66]">
            Wellmade Health builds collaborative software that helps clinical
            teams coordinate care and make better operational decisions.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Info label="Industry" value="Healthcare technology" />
            <Info label="Company size" value="51–200 employees" />
            <Info label="Member since" value="2024" />
          </div>
        </section>
        <section className="grid gap-4 sm:grid-cols-3">
          <InfoCard value="$184K" label="Total spent" />
          <InfoCard value="26" label="Contracts completed" />
          <InfoCard value="4.9" label="Talent rating" />
        </section>
        <section className="overflow-hidden rounded-2xl border border-black/8 bg-white">
          <header className="border-b border-black/7 p-5 sm:p-6">
            <p className="text-[10px] font-semibold tracking-[.13em] text-[#62805f] uppercase">
              Work history
            </p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Completed contracts</h2>
                <p className="mt-1 text-xs text-[#7b8078]">
                  Contract outcomes and feedback shared by both sides.
                </p>
              </div>
              <p className="text-xs text-[#8a8f87]">
                {completedClientContracts.length} completed contracts
              </p>
            </div>
          </header>
          <div className="divide-y divide-black/7">
            {visibleContracts.map((contract) => (
              <article key={contract.id} className="p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-base font-semibold">
                      {contract.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#737970]">
                      {contract.talent} · {contract.accountType}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-semibold">
                      ${contract.budget.toLocaleString()}
                    </p>
                    <p className="mt-1 text-[10px] text-[#8a8f87]">
                      Completed {contract.completed}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-2">
                  <ReviewCard
                    label={`Olivia’s review of ${contract.talent}`}
                    review={contract.clientReview}
                  />
                  <ReviewCard
                    label={`${contract.talent}’s review of Olivia`}
                    review={contract.talentReview}
                  />
                </div>
              </article>
            ))}
          </div>
          <footer className="flex flex-col gap-3 border-t border-black/7 bg-[#fafbf9] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs text-[#858a82]">
              Showing {contractStart + 1}–
              {Math.min(
                contractStart + contractsPerPage,
                completedClientContracts.length,
              )}{" "}
              of {completedClientContracts.length} contracts
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {contractPage > 1 && (
                <button
                  type="button"
                  onClick={() => openContractPage(contractPage - 1)}
                  className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3 text-xs font-semibold hover:bg-[#f6f8f4]"
                >
                  <Icon icon="solar:alt-arrow-left-linear" width="15" />
                  Previous
                </button>
              )}
              <div className="flex items-center gap-1">
                {Array.from(
                  { length: totalContractPages },
                  (_, index) => index + 1,
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    aria-label={`Open contract history page ${pageNumber}`}
                    aria-current={
                      contractPage === pageNumber ? "page" : undefined
                    }
                    onClick={() => openContractPage(pageNumber)}
                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-xs font-semibold ${
                      contractPage === pageNumber
                        ? "bg-[#edf4ea] text-[#4e774b]"
                        : "hover:bg-black/4"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
              {contractPage < totalContractPages && (
                <button
                  type="button"
                  onClick={() => openContractPage(contractPage + 1)}
                  className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white"
                >
                  See more contracts
                  <Icon icon="solar:alt-arrow-right-linear" width="15" />
                </button>
              )}
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
  placeholder,
}: {
  label: string;
  defaultValue: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="text-xs font-semibold">
      {label}
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none focus:border-[#6e916a]"
      />
    </label>
  );
}

function ProfileSkeleton({ editing }: { editing: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading profile information"
      className="animate-pulse"
    >
      <header className="flex items-end justify-between gap-4">
        <div>
          <div className="h-3 w-28 rounded-full bg-[#dfe5dc]" />
          <div className="mt-3 h-9 w-48 rounded-lg bg-[#e3e8e0]" />
          <div className="mt-3 h-4 w-72 max-w-[70vw] rounded-full bg-[#e9ede7]" />
        </div>
        <div className="hidden h-11 w-36 rounded-xl bg-[#e3e8e0] sm:block" />
      </header>

      {editing ? (
        <div className="mt-8 grid gap-5">
          <EditSectionSkeleton includeAvatar />
          <EditSectionSkeleton />
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="grid gap-4">
            <section className="rounded-2xl border border-black/6 bg-white p-6">
              <div className="mx-auto h-28 w-28 rounded-full bg-[#dce4d9]" />
              <div className="mx-auto mt-5 h-6 w-40 rounded-md bg-[#dfe5dc]" />
              <div className="mx-auto mt-3 h-3 w-48 rounded-full bg-[#e9ede7]" />
              <div className="mx-auto mt-3 h-3 w-32 rounded-full bg-[#e9ede7]" />
              <div className="mt-5 border-t border-black/6 pt-5">
                <div className="mx-auto h-8 w-44 rounded-full bg-[#e4ebe1]" />
              </div>
            </section>
            <section className="rounded-2xl border border-black/6 bg-white p-5">
              <div className="h-4 w-28 rounded bg-[#dfe5dc]" />
              <div className="mt-5 grid gap-4">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="flex justify-between gap-5">
                    <div className="h-3 w-20 rounded-full bg-[#e9ede7]" />
                    <div className="h-3 w-14 rounded-full bg-[#dfe5dc]" />
                  </div>
                ))}
              </div>
            </section>
          </aside>

          <main className="grid gap-6">
            <section className="rounded-2xl border border-black/6 bg-white p-6 sm:p-8">
              <div className="h-3 w-28 rounded-full bg-[#dfe5dc]" />
              <div className="mt-4 h-7 w-64 rounded-lg bg-[#dfe5dc]" />
              <div className="mt-5 h-3 w-full rounded-full bg-[#e9ede7]" />
              <div className="mt-3 h-3 w-4/5 rounded-full bg-[#e9ede7]" />
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="h-16 rounded-xl bg-[#f0f3ee]" />
                ))}
              </div>
            </section>
            <section className="grid gap-4 sm:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-24 rounded-2xl border border-black/6 bg-white p-5"
                >
                  <div className="h-6 w-20 rounded bg-[#dfe5dc]" />
                  <div className="mt-3 h-3 w-28 rounded-full bg-[#e9ede7]" />
                </div>
              ))}
            </section>
            <section className="h-72 rounded-2xl border border-black/6 bg-white p-6">
              <div className="h-5 w-44 rounded bg-[#dfe5dc]" />
              <div className="mt-3 h-3 w-64 rounded-full bg-[#e9ede7]" />
              <div className="mt-8 h-28 rounded-xl bg-[#f0f3ee]" />
            </section>
          </main>
        </div>
      )}
      <span className="sr-only">Loading profile information</span>
    </div>
  );
}

function EditSectionSkeleton({
  includeAvatar = false,
}: {
  includeAvatar?: boolean;
}) {
  return (
    <section className="rounded-2xl border border-black/6 bg-white p-5 sm:p-6">
      <div className="h-5 w-40 rounded-md bg-[#dfe5dc]" />
      <div className="mt-2 h-3 w-72 max-w-full rounded-full bg-[#e9ede7]" />
      {includeAvatar && (
        <div className="mt-5 flex items-center gap-4 rounded-xl bg-[#f4f6f2] p-4">
          <div className="h-20 w-20 shrink-0 rounded-full bg-[#dce4d9]" />
          <div className="w-full max-w-sm">
            <div className="h-4 w-28 rounded bg-[#dfe5dc]" />
            <div className="mt-2 h-3 w-52 rounded-full bg-[#e5eae2]" />
            <div className="mt-3 h-9 w-28 rounded-lg bg-white" />
          </div>
        </div>
      )}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((item) => (
          <div key={item}>
            <div className="h-3 w-20 rounded-full bg-[#dfe5dc]" />
            <div className="mt-2 h-11 rounded-xl bg-[#f0f3ee]" />
          </div>
        ))}
      </div>
      {!includeAvatar && <div className="mt-4 h-28 rounded-xl bg-[#f0f3ee]" />}
    </section>
  );
}

function SelectField({
  label,
  defaultValue,
  options,
}: {
  label: string;
  defaultValue: string;
  options: string[];
}) {
  return (
    <label className="text-xs font-semibold">
      {label}
      <select
        defaultValue={defaultValue}
        className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal outline-none focus:border-[#6e916a]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#f3f5f1] p-4">
      <p className="text-[10px] text-[#858a82]">{label}</p>
      <p className="mt-1 text-xs font-semibold">{value}</p>
    </div>
  );
}

function InfoCard({ value, label }: { value: string; label: string }) {
  return (
    <article className="rounded-2xl border border-black/8 bg-white p-5">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-[#7b8078]">{label}</p>
    </article>
  );
}

function SidebarDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-xs">
      <dt className="text-[#898e86]">{label}</dt>
      <dd className="text-right font-semibold text-[#414640]">{value}</dd>
    </div>
  );
}

function ReviewCard({
  label,
  review,
}: {
  label: string;
  review?: { rating: number; text: string };
}) {
  return (
    <div className="rounded-xl bg-[#f4f6f2] p-4">
      <p className="text-[10px] font-semibold text-[#71776f]">{label}</p>
      {review ? (
        <>
          <p className="mt-2 flex items-center gap-1 text-xs font-semibold">
            <Icon
              icon="solar:star-bold"
              width="15"
              className="text-[#d4a934]"
            />
            {review.rating.toFixed(1)}
          </p>
          <p className="mt-2 text-xs leading-6 text-[#656b64]">
            “{review.text}”
          </p>
        </>
      ) : (
        <p className="mt-3 text-xs text-[#969a93]">No review available.</p>
      )}
    </div>
  );
}
