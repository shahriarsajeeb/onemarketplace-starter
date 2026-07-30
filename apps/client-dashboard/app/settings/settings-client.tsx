"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { id: "overview", label: "Overview", description: "Account summary", icon: "solar:widget-2-linear" },
  { id: "finances", label: "Finances", description: "Cards and billing details", icon: "solar:wallet-money-linear" },
  { id: "company", label: "Company profile", description: "Business information", icon: "solar:buildings-2-linear" },
  { id: "notifications", label: "Notifications", description: "Email and product alerts", icon: "solar:bell-linear" },
  { id: "verifications", label: "Verification", description: "Secure identity check by Stripe", icon: "solar:verified-check-linear" },
  { id: "account", label: "Account", description: "Login and account controls", icon: "solar:user-id-linear" },
];

type PaymentCard = {
  id: number;
  brand: "Visa" | "Mastercard";
  last4: string;
  expiry: string;
  isDefault: boolean;
};

const initialCards: PaymentCard[] = [
  { id: 1, brand: "Visa", last4: "4821", expiry: "08/29", isDefault: true },
];

export function ClientSettings({ initialSection }: { initialSection: string }) {
  const [cards, setCards] = useState(initialCards);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const saveNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  return (
    <>
      <div>
        <p className="text-xs font-semibold tracking-[.14em] text-[#62805f] uppercase">Client account</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Settings</h1>
        <p className="mt-2 text-sm text-[#72776f]">Manage how your company hires, pays, and works on OneMarketplace.io.</p>
      </div>

      {notice && <div role="status" className="mt-5 rounded-xl border border-[#cfe2ca] bg-[#edf5ea] px-4 py-3 text-xs font-semibold text-[#52784f]">{notice}</div>}

      <div className="mt-8 grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <nav className="rounded-2xl border border-black/8 bg-white p-2 lg:sticky lg:top-24">
          {navigation.map((item) => {
            const active = item.id === initialSection;
            return (
              <Link key={item.id} href={`/settings?section=${item.id}`} className={`flex items-center gap-3 rounded-xl px-3 py-3 ${active ? "bg-[#edf4ea] text-[#4e774b]" : "hover:bg-[#f7f8f5]"}`}>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${active ? "bg-white" : "bg-[#f3f5f1]"}`}><Icon icon={item.icon} width="19" /></span>
                <span className="min-w-0 flex-1"><strong className="block text-sm">{item.label}</strong><span className="mt-0.5 block truncate text-[10px] font-normal opacity-65">{item.description}</span></span>
                <Icon icon="solar:alt-arrow-right-linear" width="14" />
              </Link>
            );
          })}
        </nav>

        <div className="min-w-0">
          {initialSection === "overview" && <Overview cards={cards} />}
          {initialSection === "finances" && <Finances cards={cards} setCards={setCards} onAddCard={() => setCardModalOpen(true)} onNotice={saveNotice} />}
          {initialSection === "company" && <CompanySettings onSave={() => saveNotice("Company profile updated.")} />}
          {initialSection === "notifications" && <NotificationSettings onSave={() => saveNotice("Notification preferences saved.")} />}
          {initialSection === "verifications" && <StripeVerification onNotice={saveNotice} />}
          {initialSection === "account" && <AccountSettings onNotice={saveNotice} />}
        </div>
      </div>

      {cardModalOpen && (
        <AddCardModal
          onClose={() => setCardModalOpen(false)}
          onAdd={(card) => {
            setCards((current) => [
              ...current,
              { ...card, id: Date.now(), isDefault: current.length === 0 },
            ]);
            setCardModalOpen(false);
            saveNotice("Payment method added.");
          }}
        />
      )}
    </>
  );
}

function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6"><h2 className="text-lg font-semibold">{title}</h2>{description && <p className="mt-1.5 text-sm text-[#777d75]">{description}</p>}<div className="mt-5">{children}</div></section>;
}

function Overview({ cards }: { cards: PaymentCard[] }) {
  const items = [
    { label: "Payment methods", value: `${cards.length} saved`, href: "finances", icon: "solar:card-linear" },
    { label: "Company profile", value: "Wellmade Health", href: "company", icon: "solar:buildings-2-linear" },
    { label: "Identity verification", value: "Stripe Identity", href: "verifications", icon: "solar:verified-check-linear" },
    { label: "Account", value: "Login and account controls", href: "account", icon: "solar:user-id-linear" },
  ];
  return <div className="grid gap-4 sm:grid-cols-2">{items.map((item) => <Link key={item.label} href={`/settings?section=${item.href}`} className="rounded-2xl border border-black/8 bg-white p-5 hover:bg-[#fafbf9]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ea] text-[#52784f]"><Icon icon={item.icon} width="20" /></span><h2 className="mt-5 font-semibold">{item.label}</h2><p className="mt-1 text-xs text-[#777d75]">{item.value}</p><span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#52784f]">Manage <Icon icon="solar:arrow-right-linear" width="13" /></span></Link>)}</div>;
}

function Finances({ cards, setCards, onAddCard, onNotice }: { cards: PaymentCard[]; setCards: React.Dispatch<React.SetStateAction<PaymentCard[]>>; onAddCard: () => void; onNotice: (message: string) => void }) {
  return <div className="grid gap-4">
    <SectionCard title="Payment methods" description="Cards are used to fund fixed-price milestones and contract offers.">
      <div className="grid gap-3">
        {cards.map((card) => <div key={card.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-black/8 p-4">
          <span className="flex h-11 w-16 items-center justify-center rounded-lg bg-[#252724] text-xs font-bold text-white">{card.brand}</span>
          <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{card.brand} ending in {card.last4}</p><p className="mt-1 text-[11px] text-[#7c8179]">Expires {card.expiry}</p></div>
          {card.isDefault ? <span className="rounded-full bg-[#edf4ea] px-2.5 py-1 text-[10px] font-semibold text-[#52784f]">Default</span> : <button type="button" onClick={() => { setCards((current) => current.map((item) => ({ ...item, isDefault: item.id === card.id }))); onNotice("Default payment method updated."); }} className="text-xs font-semibold text-[#52784f]">Make default</button>}
          <button type="button" onClick={() => setCards((current) => current.filter((item) => item.id !== card.id))} aria-label={`Remove ${card.brand} ending in ${card.last4}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9a5953] hover:bg-[#fff1ef]"><Icon icon="solar:trash-bin-trash-linear" width="17" /></button>
        </div>)}
      </div>
      <button type="button" onClick={onAddCard} className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white"><Icon icon="solar:add-circle-linear" width="17" />Add payment method</button>
    </SectionCard>
    <SectionCard title="Billing details" description="Used on invoices, receipts, and official payment records.">
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Legal company name" value="Wellmade Health, Inc." /><Field label="Billing email" value="billing@wellmade.health" /><Field label="Country" value="United States" /><Field label="Billing address" value="548 Market Street, San Francisco, CA" /></div>
      <button type="button" onClick={() => onNotice("Billing details saved.")} className="mt-5 h-10 rounded-xl border border-black/10 px-4 text-xs font-semibold">Save billing details</button>
    </SectionCard>
  </div>;
}

function Field({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return <label className="block"><span className="mb-2 block text-xs font-semibold">{label}</span><input type={type} defaultValue={value} className="h-11 w-full rounded-xl border border-black/10 px-3 text-sm outline-none focus:border-[#6f936b]" /></label>;
}

function CompanySettings({ onSave }: { onSave: () => void }) {
  return <SectionCard title="Company profile" description="Information freelancers and agencies see when reviewing your opportunities."><div className="grid gap-4 sm:grid-cols-2"><Field label="Company name" value="Wellmade Health" /><Field label="Website" value="https://wellmade.health" /><Field label="Industry" value="Healthcare technology" /><Field label="Company size" value="51–200 employees" /></div><label className="mt-4 block"><span className="mb-2 block text-xs font-semibold">Company description</span><textarea defaultValue="We build collaborative software for modern clinical teams." rows={5} className="w-full resize-none rounded-xl border border-black/10 p-3 text-sm outline-none focus:border-[#6f936b]" /></label><button type="button" onClick={onSave} className="mt-5 h-10 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white">Save company profile</button></SectionCard>;
}

function NotificationSettings({ onSave }: { onSave: () => void }) {
  return <SectionCard title="Notification preferences" description="Choose the marketplace activity that should reach your inbox."><div className="divide-y divide-black/7">{["New proposals on my jobs", "Messages from talent", "Contract and milestone updates", "Payment and billing activity", "Product news and recommendations"].map((label, index) => <label key={label} className="flex items-center justify-between gap-4 py-4 first:pt-0"><span className="text-sm">{label}</span><input type="checkbox" defaultChecked={index < 4} className="h-4 w-4 accent-[#5d8759]" /></label>)}</div><button type="button" onClick={onSave} className="mt-3 h-10 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white">Save preferences</button></SectionCard>;
}

function StripeVerification({ onNotice }: { onNotice: (message: string) => void }) {
  const [status, setStatus] = useState<"required" | "processing">("required");
  return <SectionCard title="Identity verification" description="Identity checks are securely completed and processed by Stripe Identity.">
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-black/8 p-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf4ea] text-[#52784f]"><Icon icon="solar:user-id-linear" width="22" /></span>
      <div className="min-w-0 flex-1"><p className="text-sm font-semibold">Verify your identity</p><p className="mt-1 text-[10px] leading-5 text-[#7c8179]">{status === "required" ? "Required before making your first hire." : "Stripe is processing your verification."}</p></div>
      {status === "required" ? <button type="button" data-stripe-identity-trigger onClick={() => { setStatus("processing"); onNotice("Stripe Identity verification started."); }} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white"><Icon icon="solar:shield-check-linear" width="17" />Verify with Stripe</button> : <span className="rounded-full bg-[#f5f0de] px-3 py-1.5 text-[10px] font-semibold text-[#82723f]">Processing</span>}
    </div>
    <div className="mt-5 flex gap-3 rounded-xl bg-[#f3f6f1] p-4 text-xs leading-5 text-[#667064]"><Icon icon="solar:lock-keyhole-linear" width="18" className="shrink-0 text-[#52784f]" /><p>OneMarketplace.io does not manually collect or review identity documents. Stripe securely handles the verification session and returns only its result.</p></div>
  </SectionCard>;
}

function AccountSettings({ onNotice }: { onNotice: (message: string) => void }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  return <>
    <div className="grid gap-4">
      <SectionCard title="Manage account" description="Update your email address, password, connected accounts, and sign-in security through your account provider.">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#f3f5f1] p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#527a73] text-xs font-semibold text-white">OB</span>
            <div>
              <p className="text-sm font-semibold">Olivia Bennett</p>
              <p className="mt-1 text-[10px] text-[#7c8179]">olivia@wellmade.health</p>
            </div>
          </div>
          <button
            type="button"
            data-clerk-account-trigger
            onClick={() => onNotice("Account manager will open through Clerk.")}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white"
          >
            <Icon icon="solar:user-id-linear" width="17" />
            Manage account
          </button>
        </div>
      </SectionCard>
      <section className="rounded-2xl border border-[#ead7d5] bg-white p-5 sm:p-6"><h2 className="font-semibold text-[#8e514c]">Delete client account</h2><p className="mt-2 text-sm leading-6 text-[#777d75]">You must close active contracts and clear outstanding balances before deleting your account.</p><button type="button" onClick={() => setDeleteOpen(true)} className="mt-5 h-10 rounded-xl border border-[#dcbab6] px-4 text-xs font-semibold text-[#8e514c]">Delete account</button></section>
    </div>
    {deleteOpen && <div className="fixed inset-0 z-90 grid place-items-center bg-[#1d221d]/45 p-5 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1ef] text-[#9a5953]"><Icon icon="solar:trash-bin-trash-linear" width="22" /></span><h2 className="mt-4 text-xl font-semibold">Delete client account?</h2><p className="mt-2 text-sm leading-6 text-[#737970]">This cannot be undone. Active contracts and outstanding balances must be resolved first.</p><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setDeleteOpen(false)} className="h-10 rounded-xl border border-black/10 px-4 text-sm font-semibold">Keep account</button><button type="button" onClick={() => { setDeleteOpen(false); onNotice("Account deletion request recorded."); }} className="h-10 rounded-xl bg-[#9a5953] px-4 text-sm font-semibold text-white">Request deletion</button></div></div></div>}
  </>;
}

function AddCardModal({ onClose, onAdd }: { onClose: () => void; onAdd: (card: Omit<PaymentCard, "id" | "isDefault">) => void }) {
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const digits = number.replace(/\D/g, "");
  const valid = digits.length === 16 && /^\d{2}\/\d{2}$/.test(expiry) && /^\d{3,4}$/.test(cvc);
  return <div className="fixed inset-0 z-90 grid place-items-center bg-[#1d221d]/45 p-5 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf4ea] text-[#52784f]"><Icon icon="solar:card-linear" width="23" /></span><button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full border border-black/8"><Icon icon="solar:close-circle-linear" width="19" /></button></div><h2 className="mt-4 text-xl font-semibold">Add payment method</h2><p className="mt-2 text-sm text-[#777d75]">Cards are verified before they can fund a milestone.</p><div className="mt-5 grid gap-4"><label><span className="mb-2 block text-xs font-semibold">Name on card</span><input className="h-11 w-full rounded-xl border border-black/10 px-3 text-sm outline-none" placeholder="Olivia Bennett" /></label><label><span className="mb-2 block text-xs font-semibold">Card number</span><input inputMode="numeric" value={number} onChange={(event) => setNumber(event.target.value.replace(/[^\d ]/g, "").slice(0, 19))} className="h-11 w-full rounded-xl border border-black/10 px-3 text-sm outline-none" placeholder="1234 5678 9012 3456" /></label><div className="grid grid-cols-2 gap-3"><label><span className="mb-2 block text-xs font-semibold">Expiry</span><input value={expiry} onChange={(event) => setExpiry(event.target.value.slice(0, 5))} className="h-11 w-full rounded-xl border border-black/10 px-3 text-sm outline-none" placeholder="MM/YY" /></label><label><span className="mb-2 block text-xs font-semibold">CVC</span><input inputMode="numeric" value={cvc} onChange={(event) => setCvc(event.target.value.replace(/\D/g, "").slice(0, 4))} className="h-11 w-full rounded-xl border border-black/10 px-3 text-sm outline-none" placeholder="123" /></label></div></div><p className="mt-4 flex items-center gap-2 text-[10px] text-[#777d75]"><Icon icon="solar:lock-keyhole-linear" width="14" />Payment details will be tokenized by the payment provider; card numbers should never be stored directly.</p><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={onClose} className="h-10 rounded-xl border border-black/10 px-4 text-sm font-semibold">Cancel</button><button type="button" disabled={!valid} onClick={() => onAdd({ brand: digits.startsWith("5") ? "Mastercard" : "Visa", last4: digits.slice(-4), expiry })} className="h-10 rounded-xl bg-[#252724] px-4 text-sm font-semibold text-white disabled:opacity-35">Add card</button></div></div></div>;
}
