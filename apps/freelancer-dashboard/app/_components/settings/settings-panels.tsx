"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { connectsHistory, earningsHistory } from "./settings-data";

const Panel = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <section className="overflow-hidden rounded-2xl border border-black/8 bg-white">
    <header className="border-b border-black/7 px-5 py-5 sm:px-6"><h2 className="text-lg font-semibold">{title}</h2><p className="mt-1 text-xs text-[#7b8078]">{description}</p></header>
    {children}
  </section>
);

export function ConnectsPanel({ onBuy }: { onBuy: () => void }) {
  return (
    <Panel title="Connects" description="Track how you use Connects and purchase more when you need them.">
      <div className="flex flex-col justify-between gap-4 border-b border-black/7 p-5 sm:flex-row sm:items-center sm:p-6">
        <div><p className="text-xs text-[#7b8078]">Available balance</p><p className="mt-1 text-3xl font-semibold">64 <span className="text-sm font-normal text-[#7b8078]">Connects</span></p></div>
        <button type="button" onClick={onBuy} className="h-11 cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white">Buy Connects</button>
      </div>
      <div>
        {connectsHistory.map((item, index) => (
          <div key={item.id} className={`flex items-center gap-4 px-5 py-4 sm:px-6 ${index ? "border-t border-black/6" : ""}`}>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.amount > 0 ? "bg-[#e7f2e4] text-[#4d784a]" : "bg-[#f1f0e7] text-[#766f47]"}`}><Icon icon={item.amount > 0 ? "solar:add-circle-linear" : "solar:plain-2-linear"} width="18" /></span>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{item.label}</p><p className="mt-1 truncate text-xs text-[#858a82]">{item.detail} · {item.date}</p></div>
            <strong className={`text-sm ${item.amount > 0 ? "text-[#4d784a]" : "text-[#343833]"}`}>{item.amount > 0 ? "+" : ""}{item.amount}</strong>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function EarningsPanel({
  onWithdraw,
  onDownloadStatement,
}: {
  onWithdraw: () => void;
  onDownloadStatement: () => void;
}) {
  return (
    <Panel title="Earnings" description="Review payments from milestones and track when funds become available.">
      <div className="grid gap-3 border-b border-black/7 p-5 sm:grid-cols-3 sm:p-6">
        {[["Available", "$4,850"], ["Pending", "$3,500"], ["Lifetime earnings", "$86,420"]].map(([label, value]) => <div key={label} className="rounded-xl bg-[#f3f5f1] p-4"><p className="text-[11px] text-[#7b8078]">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></div>)}
      </div>
      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h3 className="text-sm font-semibold">Recent earnings</h3>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={onDownloadStatement} className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#52784f] hover:underline"><Icon icon="solar:download-minimalistic-linear" width="15" /> Download earnings statement</button>
          <button type="button" onClick={onWithdraw} className="cursor-pointer text-xs font-semibold text-[#52784f] hover:underline">Withdraw funds</button>
        </div>
      </div>
      {earningsHistory.map((item, index) => (
        <div key={item.id} className={`flex items-center gap-4 px-5 py-4 sm:px-6 ${index ? "border-t border-black/6" : ""}`}>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{item.milestone}</p><p className="mt-1 truncate text-xs text-[#858a82]">{item.client} · {item.date}</p></div>
          <div className="text-right"><p className="text-sm font-semibold">{item.amount}</p><p className="mt-1 text-[10px] text-[#6d826a]">{item.status}</p></div>
        </div>
      ))}
    </Panel>
  );
}

export function WithdrawalPanel({ onWithdraw }: { onWithdraw: () => void }) {
  return (
    <Panel title="Withdrawal methods" description="Choose where your available earnings should be sent.">
      <div className="grid gap-4 p-5 sm:p-6">
        <article className="flex flex-col justify-between gap-4 rounded-2xl border-2 border-[#8daa88] bg-[#f5f8f3] p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#52784f]"><Icon icon="solar:card-transfer-linear" width="23" /></span><div><div className="flex items-center gap-2"><h3 className="text-sm font-semibold">Payoneer</h3><span className="rounded-full bg-[#e4f0e1] px-2 py-0.5 text-[9px] font-semibold text-[#477344]">Primary</span></div><p className="mt-1 text-xs text-[#7b8078]">Account ending in 4821 · 1–2 business days</p></div></div>
          <button type="button" onClick={onWithdraw} className="h-10 cursor-pointer rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white">Withdraw now</button>
        </article>
        <button type="button" className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-black/15 p-5 text-sm font-semibold text-[#52784f] hover:bg-[#f8f9f6]"><Icon icon="solar:add-circle-linear" width="20" /> Add withdrawal method</button>
        <div className="rounded-xl bg-[#f1f3ef] p-4 text-xs leading-6 text-[#70766e]"><strong className="text-[#343833]">Withdrawal schedule:</strong> Automatic withdrawals are currently off. Your balance remains available until you withdraw it manually.</div>
      </div>
    </Panel>
  );
}

export function IdentityVerificationPanel() {
  const [status, setStatus] = useState<"required" | "processing">("required");

  return (
    <Panel
      title="Identity verification"
      description="Verify your identity to build trust and unlock marketplace contracts."
    >
      <div className="grid gap-5 p-5 sm:p-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-black/8 p-5 sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edf4ea] text-[#52784f]">
            <Icon icon="solar:user-id-linear" width="24" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold">Verify your identity</h3>
            <p className="mt-1 text-xs leading-5 text-[#7b8078]">
              {status === "required"
                ? "Complete verification before accepting your first contract."
                : "Your verification is being processed."}
            </p>
          </div>
          {status === "required" ? (
            <button
              type="button"
              data-stripe-identity-trigger
              onClick={() => setStatus("processing")}
              className="h-11 cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
            >
              Start verification
            </button>
          ) : (
            <span className="self-start rounded-full bg-[#f5f0de] px-3 py-1.5 text-xs font-semibold text-[#82723f] sm:self-auto">
              Processing
            </span>
          )}
        </div>
        <div className="flex gap-3 rounded-xl bg-[#f3f6f1] p-4 text-xs leading-5 text-[#667064]">
          <Icon
            icon="solar:shield-check-linear"
            width="19"
            className="shrink-0 text-[#52784f]"
          />
          <p>
            Verification is securely handled by Stripe. OneMarketplace does
            not store your identity document.
          </p>
        </div>
      </div>
    </Panel>
  );
}

export function AgencyPanel() {
  const [setupStarted, setSetupStarted] = useState(false);
  const [created, setCreated] = useState(false);
  const [agencyName, setAgencyName] = useState("");

  if (created) {
    return (
      <Panel
        title="Agency workspace created"
        description="Your new agency is ready for its profile and first team members."
      >
        <div className="p-6 text-center sm:p-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e6f2e3] text-[#4d784a]">
            <Icon icon="solar:buildings-2-bold" width="31" />
          </span>
          <h3 className="mt-5 text-xl font-semibold">{agencyName} is ready</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#737870]">
            Complete the agency profile, invite specialists, and choose which
            members can submit proposals on behalf of the agency.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button type="button" className="h-11 cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white">
              Open agency workspace
            </button>
            <button type="button" className="h-11 cursor-pointer rounded-xl border border-black/10 px-5 text-sm font-semibold">
              Invite team members
            </button>
          </div>
        </div>
      </Panel>
    );
  }

  if (setupStarted) {
    return (
      <Panel
        title="Create an agency"
        description="Set up the workspace clients will see when working with your team."
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setCreated(true);
          }}
          className="grid gap-5 p-5 sm:p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold">
              Agency name
              <input required value={agencyName} onChange={(event) => setAgencyName(event.target.value)} placeholder="e.g. Northstar Digital" className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none focus:border-[#6e916a]" />
            </label>
            <label className="text-xs font-semibold">
              Agency size
              <select defaultValue="" required className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal outline-none focus:border-[#6e916a]">
                <option value="" disabled>Select team size</option>
                <option>2–5 members</option>
                <option>6–10 members</option>
                <option>11–25 members</option>
                <option>26+ members</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold">
              Primary specialty
              <select defaultValue="" required className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal outline-none focus:border-[#6e916a]">
                <option value="" disabled>Select a specialty</option>
                <option>Web & software development</option>
                <option>Design & creative</option>
                <option>Data & AI</option>
                <option>Marketing</option>
                <option>Writing & content</option>
              </select>
            </label>
            <label className="text-xs font-semibold">
              Website <span className="font-normal text-[#8a8f87]">(optional)</span>
              <input type="url" placeholder="https://agency.com" className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none focus:border-[#6e916a]" />
            </label>
          </div>
          <label className="text-xs font-semibold">
            Agency overview
            <textarea required rows={4} placeholder="Describe your team, expertise, and the outcomes you deliver…" className="mt-2 w-full resize-none rounded-xl border border-black/10 p-3 text-sm font-normal outline-none focus:border-[#6e916a]" />
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-[#f3f5f1] p-4 text-xs leading-5 text-[#686e66]">
            <input required type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#5f875c]" />
            I confirm that I am authorized to create and administer this agency
            workspace.
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setSetupStarted(false)} className="h-11 cursor-pointer rounded-xl border border-black/10 px-5 text-sm font-semibold">
              Back
            </button>
            <button type="submit" className="h-11 cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white">
              Create agency
            </button>
          </div>
        </form>
      </Panel>
    );
  }

  return (
    <Panel
      title="Create an agency"
      description="Build a team workspace while keeping your individual freelancer profile."
    >
      <div className="grid gap-6 p-5 sm:p-6">
        <section className="overflow-hidden rounded-2xl bg-[#252724] p-6 text-white sm:p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#a8c5a1]">
            <Icon icon="solar:buildings-2-linear" width="23" />
          </span>
          <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
            Win larger projects together.
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
            An agency workspace lets you present a combined team, submit agency
            proposals, coordinate delivery, and manage shared contracts.
          </p>
          <button type="button" onClick={() => setSetupStarted(true)} className="mt-6 h-11 cursor-pointer rounded-xl bg-white px-5 text-sm font-semibold text-[#252724]">
            Start agency setup
          </button>
        </section>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Keep your profile", "Continue working independently whenever you choose.", "solar:user-circle-linear"],
            ["Invite specialists", "Build a trusted roster and assign clear agency roles.", "solar:users-group-rounded-linear"],
            ["Manage together", "Centralize proposals, contracts, messages, and payouts.", "solar:widget-5-linear"],
          ].map(([title, detail, icon]) => (
            <article key={title} className="rounded-xl border border-black/7 p-4">
              <Icon icon={icon} width="21" className="text-[#52784f]" />
              <h4 className="mt-3 text-sm font-semibold">{title}</h4>
              <p className="mt-1.5 text-xs leading-5 text-[#7b8078]">{detail}</p>
            </article>
          ))}
        </div>

        <div className="rounded-xl bg-[#f1f3ef] p-4 text-xs leading-6 text-[#70766e]">
          <strong className="text-[#343833]">Before you begin:</strong> Creating
          an agency does not replace or hide your individual freelancer
          account.
        </div>
      </div>
    </Panel>
  );
}

export function AccountPanel({ kind }: { kind: "tax" | "security" | "notifications" }) {
  if (kind === "tax") return (
    <Panel title="Tax information" description="Provide the information required for compliant marketplace payouts.">
      <div className="grid gap-5 p-5 sm:p-6">
        <div className="rounded-xl border border-[#dfd3a9] bg-[#faf7eb] p-4 text-sm"><strong>Tax form requires attention</strong><p className="mt-1 text-xs leading-5 text-[#77705b]">Complete your tax residence and taxpayer identification before your next withdrawal.</p></div>
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold">Tax residence<select className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal"><option>Bangladesh</option></select></label><label className="text-xs font-semibold">Taxpayer identification number<input placeholder="Enter tax ID" className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none" /></label></div>
        <button type="button" className="h-11 justify-self-start cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white">Save tax information</button>
      </div>
    </Panel>
  );

  if (kind === "security") return (
    <Panel title="Password & security" description="Protect your account and review active sessions.">
      <div className="grid gap-4 p-5 sm:p-6">
        {[["Password", "Last changed 3 months ago", "Change password"], ["Two-factor authentication", "Add an extra layer of account protection", "Set up 2FA"], ["Active sessions", "2 devices currently signed in", "Review sessions"]].map(([title, detail, action]) => <div key={title} className="flex flex-col justify-between gap-3 rounded-xl border border-black/7 p-4 sm:flex-row sm:items-center"><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-xs text-[#7b8078]">{detail}</p></div><button type="button" className="h-9 cursor-pointer rounded-lg border border-black/10 px-3 text-xs font-semibold">{action}</button></div>)}
      </div>
    </Panel>
  );

  return (
    <Panel title="Notification preferences" description="Control which account updates you receive.">
      <div className="divide-y divide-black/6 p-5 sm:p-6">
        {["Proposal and interview activity", "Contract and milestone updates", "Messages from clients", "Payments and withdrawals", "Product news and recommendations"].map((label, index) => <label key={label} className="flex cursor-pointer items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><span className="text-sm font-medium">{label}</span><input type="checkbox" defaultChecked={index < 4} className="h-4 w-4 accent-[#5f875c]" /></label>)}
      </div>
    </Panel>
  );
}
