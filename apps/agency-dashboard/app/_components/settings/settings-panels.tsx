"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import type { AgencySettingsSectionId } from "./settings-data";

function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-black/8 bg-white">
      <header className="border-b border-black/7 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-xs text-[#7b8078]">{description}</p>
      </header>
      {children}
    </section>
  );
}

function SavedNotice({ message }: { message: string }) {
  return (
    <p
      role="status"
      className="rounded-xl bg-[#eaf3e7] px-4 py-3 text-xs font-medium text-[#4e774b]"
    >
      {message}
    </p>
  );
}

export function OverviewPanel({
  onOpenSection,
}: {
  onOpenSection: (section: AgencySettingsSectionId) => void;
}) {
  const items = [
    {
      title: "Members & access",
      detail: "8 active agency members",
      section: "members" as const,
      icon: "solar:users-group-rounded-linear",
    },
    {
      title: "Identity verification",
      detail: "Agency owner verified through Stripe",
      section: "verification" as const,
      icon: "solar:verified-check-linear",
    },
    {
      title: "Password & security",
      detail: "Two-factor authentication is enabled",
      section: "security" as const,
      icon: "solar:shield-keyhole-linear",
    },
    {
      title: "Notifications",
      detail: "Client and contract updates enabled",
      section: "notifications" as const,
      icon: "solar:bell-linear",
    },
  ];

  return (
    <Panel
      title="Agency settings overview"
      description="Review the essentials for your agency account."
    >
      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
        {items.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => onOpenSection(item.section)}
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-black/7 p-4 text-left transition hover:bg-[#f8f9f6]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf4ea] text-[#52784f]">
              <Icon icon={item.icon} width="20" />
            </span>
            <span className="min-w-0 flex-1">
              <strong className="block text-sm">{item.title}</strong>
              <span className="mt-1 block text-xs text-[#7b8078]">
                {item.detail}
              </span>
            </span>
            <Icon
              icon="solar:alt-arrow-right-linear"
              width="16"
              className="text-[#858a82]"
            />
          </button>
        ))}
      </div>
      <div className="border-t border-black/7 px-5 py-4 text-xs text-[#737870] sm:px-6">
        Financial settings, Connects, and statements are managed from the{" "}
        <a href="/finances?section=overview" className="font-semibold text-[#52784f] hover:underline">
          Finances page
        </a>
        .
      </div>
    </Panel>
  );
}

export function ProfilePanel() {
  const [saved, setSaved] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [agencyTags, setAgencyTags] = useState(
    "Next.js, TypeScript, Product design, Node.js, PostgreSQL, AI integration, Design systems",
  );
  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      title: "Collaborative healthcare workspace",
      category: "Product design · Full-stack development",
      link: "https://northstar.digital/work/healthcare",
      coverUrl: "",
    },
    {
      id: 2,
      title: "AI-assisted research platform",
      category: "AI integration · Platform engineering",
      link: "https://northstar.digital/work/research",
      coverUrl: "",
    },
  ]);

  return (
    <Panel
      title="Agency profile"
      description="Manage the identity, positioning, and work clients see on your public profile."
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
        className="grid gap-5 p-5 sm:p-6"
      >
        {saved && <SavedNotice message="Agency profile changes saved." />}
        <section className="flex flex-col gap-4 rounded-xl bg-[#f4f6f2] p-4 sm:flex-row sm:items-center">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt="Agency avatar preview"
              className="h-20 w-20 rounded-2xl object-cover"
            />
          ) : (
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#496e67] text-xl font-semibold text-white">
              ND
            </span>
          )}
          <div className="min-w-0">
            <h3 className="text-sm font-semibold">Agency avatar</h3>
            <p className="mt-1 text-xs leading-5 text-[#7b8078]">
              Upload a square JPG, PNG, or WebP image. Recommended size: 400 ×
              400px.
            </p>
            <label className="mt-3 inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-xs font-semibold">
              <Icon icon="solar:camera-linear" width="17" />
              Change avatar
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
        </section>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Agency name" defaultValue="Northstar Digital" />
          <Field label="Website" defaultValue="https://northstar.digital" type="url" />
        </div>
        <Field
          label="Profile title"
          defaultValue="A senior product team for ambitious digital products"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Primary specialty"
            options={["Web & software development", "Design & creative", "Data & AI", "Marketing"]}
          />
          <SelectField
            label="Agency size"
            options={["2–5 members", "6–10 members", "11–25 members", "26+ members"]}
            defaultValue="6–10 members"
          />
        </div>
        <label className="text-xs font-semibold">
          Profile description
          <textarea
            rows={6}
            defaultValue="We partner with product teams to design and build dependable web applications—from strategy and prototypes through scalable engineering and launch. Clients work with one accountable agency backed by a focused roster of specialists."
            className="mt-2 w-full resize-none rounded-xl border border-black/10 p-3 text-sm font-normal outline-none focus:border-[#6e916a]"
          />
        </label>
        <section>
          <label className="text-xs font-semibold">
            Agency tags
            <input
              value={agencyTags}
              onChange={(event) => setAgencyTags(event.target.value)}
              placeholder="Next.js, Product design, TypeScript"
              className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none focus:border-[#6e916a]"
            />
          </label>
          <p className="mt-2 text-[10px] text-[#8b9088]">
            Separate tags with commas. These tags appear on your public profile
            and help clients discover your agency.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {agencyTags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#edf3ea] px-3 py-1.5 text-[10px] font-medium text-[#527052]"
                >
                  {tag}
                </span>
              ))}
          </div>
        </section>
        <section className="border-t border-black/7 pt-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold">Portfolio</h3>
              <p className="mt-1 text-xs text-[#7b8078]">
                Showcase the strongest work completed by your agency.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setPortfolio((current) => [
                  ...current,
                  {
                    id: Date.now(),
                    title: "Untitled agency project",
                    category: "Add project category",
                    link: "",
                    coverUrl: "",
                  },
                ])
              }
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-black/10 px-3 text-xs font-semibold"
            >
              <Icon icon="solar:add-circle-linear" width="17" />
              Add project
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            {portfolio.map((project) => (
              <article
                key={project.id}
                className="grid gap-4 rounded-xl border border-black/7 p-4 sm:grid-cols-[150px_minmax(0,1fr)_auto]"
              >
                <div>
                  {project.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.coverUrl}
                      alt={`${project.title} cover preview`}
                      className="aspect-[4/3] w-full rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,#dcebdd,#c4dec9)] text-[#527052]">
                      <Icon icon="solar:gallery-wide-linear" width="28" />
                    </div>
                  )}
                  <label className="mt-2 flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-black/10 text-[10px] font-semibold">
                    <Icon icon="solar:camera-linear" width="15" />
                    {project.coverUrl ? "Change cover" : "Add cover"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="sr-only"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        const coverUrl = URL.createObjectURL(file);
                        setPortfolio((current) =>
                          current.map((item) =>
                            item.id === project.id
                              ? { ...item, coverUrl }
                              : item,
                          ),
                        );
                      }}
                    />
                  </label>
                  <p className="mt-1.5 text-center text-[9px] leading-4 text-[#91968e]">
                    JPG, PNG, or WebP
                  </p>
                </div>
                <div className="grid min-w-0 gap-3 sm:grid-cols-2">
                  <label className="text-[10px] font-semibold text-[#737870]">
                    Project title
                    <input
                      value={project.title}
                      onChange={(event) =>
                        setPortfolio((current) =>
                          current.map((item) =>
                            item.id === project.id
                              ? { ...item, title: event.target.value }
                              : item,
                          ),
                        )
                      }
                      className="mt-1.5 h-10 w-full rounded-lg border border-black/10 px-3 text-xs font-normal text-[#242724] outline-none focus:border-[#6e916a]"
                    />
                  </label>
                  <label className="text-[10px] font-semibold text-[#737870]">
                    Category
                    <input
                      value={project.category}
                      onChange={(event) =>
                        setPortfolio((current) =>
                          current.map((item) =>
                            item.id === project.id
                              ? { ...item, category: event.target.value }
                              : item,
                          ),
                        )
                      }
                      className="mt-1.5 h-10 w-full rounded-lg border border-black/10 px-3 text-xs font-normal text-[#242724] outline-none focus:border-[#6e916a]"
                    />
                  </label>
                  <label className="text-[10px] font-semibold text-[#737870] sm:col-span-2">
                    Live link <span className="font-normal">(optional)</span>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(event) =>
                        setPortfolio((current) =>
                          current.map((item) =>
                            item.id === project.id
                              ? { ...item, link: event.target.value }
                              : item,
                          ),
                        )
                      }
                      placeholder="https://project.com"
                      className="mt-1.5 h-10 w-full rounded-lg border border-black/10 px-3 text-xs font-normal text-[#242724] outline-none focus:border-[#6e916a]"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${project.title}`}
                  onClick={() =>
                    setPortfolio((current) =>
                      current.filter((item) => item.id !== project.id),
                    )
                  }
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-[#8b5656] hover:bg-[#f8eeee]"
                >
                  <Icon icon="solar:trash-bin-trash-linear" width="18" />
                </button>
              </article>
            ))}
          </div>
        </section>
        <button
          type="submit"
          className="h-11 justify-self-start cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
        >
          Save profile
        </button>
      </form>
    </Panel>
  );
}

export function MembersPanel() {
  const members = [
    ["Shahriar Sajeeb", "Owner", "Full access"],
    ["Maya Robinson", "Business manager", "Proposals and members"],
    ["Daniel Cho", "Agency member", "Profile access"],
  ];

  return (
    <Panel
      title="Members & access"
      description="Review who can represent and administer the agency."
    >
      <div className="divide-y divide-black/6">
        {members.map(([name, role, access], index) => (
          <div
            key={name}
            className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-6"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#527a73] text-xs font-semibold text-white">
              {name.split(" ").map((part) => part[0]).join("")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{name}</p>
              <p className="mt-1 text-xs text-[#7b8078]">
                {role} · {access}
              </p>
            </div>
            {index > 0 && (
              <button
                type="button"
                className="h-9 cursor-pointer rounded-lg border border-black/10 px-3 text-xs font-semibold"
              >
                Manage access
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-black/7 p-5 sm:p-6">
        <a
          href="/team"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
        >
          <Icon icon="solar:users-group-rounded-linear" width="18" />
          Manage agency team
        </a>
      </div>
    </Panel>
  );
}

export function SecurityPanel() {
  const items = [
    ["Password", "Last changed 3 months ago", "Change password"],
    ["Two-factor authentication", "Enabled for the agency owner", "Manage 2FA"],
    ["Active sessions", "2 devices currently signed in", "Review sessions"],
  ];

  return (
    <Panel
      title="Password & security"
      description="Protect the owner account that controls this agency."
    >
      <div className="grid gap-4 p-5 sm:p-6">
        {items.map(([title, detail, action]) => (
          <div
            key={title}
            className="flex flex-col justify-between gap-3 rounded-xl border border-black/7 p-4 sm:flex-row sm:items-center"
          >
            <div>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-1 text-xs text-[#7b8078]">{detail}</p>
            </div>
            <button
              type="button"
              className="h-9 cursor-pointer rounded-lg border border-black/10 px-3 text-xs font-semibold"
            >
              {action}
            </button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function VerificationPanel() {
  const [status, setStatus] = useState<"verified" | "processing">("verified");

  return (
    <Panel
      title="Identity verification"
      description="The agency owner completes identity verification securely through Stripe Identity."
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-black/8 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf4ea] text-[#52784f]">
            <Icon icon="solar:user-id-linear" width="22" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Shahriar Sajeeb</p>
            <p className="mt-1 text-xs text-[#7b8078]">
              {status === "verified"
                ? "Agency owner identity verified by Stripe."
                : "Stripe is processing the verification."}
            </p>
          </div>
          {status === "verified" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf4ea] px-3 py-1.5 text-xs font-semibold text-[#52784f]">
              <Icon icon="solar:verified-check-bold" width="15" />
              Verified
            </span>
          ) : (
            <button
              type="button"
              data-stripe-identity-trigger
              onClick={() => setStatus("processing")}
              className="h-10 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white"
            >
              Verify with Stripe
            </button>
          )}
        </div>
        <p className="mt-4 rounded-xl bg-[#f3f6f1] p-4 text-xs leading-5 text-[#667064]">
          Stripe securely handles identity information. OneMarketplace does
          not manually collect or review identity documents.
        </p>
      </div>
    </Panel>
  );
}

export function NotificationsPanel() {
  const [saved, setSaved] = useState(false);
  const preferences = [
    "Proposal and interview activity",
    "Contract and milestone updates",
    "Messages from clients",
    "Agency member updates",
    "Payments and withdrawals",
  ];

  return (
    <Panel
      title="Notification preferences"
      description="Choose which agency activity should reach the owner account."
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
        className="p-5 sm:p-6"
      >
        {saved && <SavedNotice message="Notification preferences saved." />}
        <div className="mt-2 divide-y divide-black/6">
          {preferences.map((label) => (
            <label
              key={label}
              className="flex cursor-pointer items-center justify-between gap-4 py-4"
            >
              <span className="text-sm font-medium">{label}</span>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-[#5f875c]"
              />
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="mt-2 h-11 cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
        >
          Save preferences
        </button>
      </form>
    </Panel>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <label className="text-xs font-semibold">
      {label}
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none focus:border-[#6e916a]"
      />
    </label>
  );
}

function SelectField({
  label,
  options,
  defaultValue,
}: {
  label: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <label className="text-xs font-semibold">
      {label}
      <select
        defaultValue={defaultValue ?? options[0]}
        className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal outline-none focus:border-[#6e916a]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
