"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

export type JobFilters = {
  experienceLevels: string[];
  durations: string[];
  minBudget: string;
  maxBudget: string;
  proposalRange: string;
  verifiedOnly: boolean;
};

export const emptyJobFilters: JobFilters = {
  experienceLevels: [],
  durations: [],
  minBudget: "",
  maxBudget: "",
  proposalRange: "Any number",
  verifiedOnly: false,
};

type JobFilterPopoverProps = {
  filters: JobFilters;
  activeCount: number;
  onApply: (filters: JobFilters) => void;
  onClear: () => void;
};

const toggleValue = (values: string[], value: string) =>
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];

export function JobFilterPopover({
  filters,
  activeCount,
  onApply,
  onClear,
}: JobFilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(filters);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filters, open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={`Filter jobs${activeCount ? `, ${activeCount} active` : ""}`}
        aria-expanded={open}
        onClick={() => {
          if (!open) setDraft(filters);
          setOpen((current) => !current);
        }}
        className={`relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition ${
          open || activeCount
            ? "border-[#8eaa8a] bg-[#edf4ea] text-[#4e774b]"
            : "border-black/8 text-[#737870] hover:bg-black/3"
        }`}
      >
        <Icon icon="solar:tuning-2-linear" width="19" />
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#5f8d5c] px-1 text-[8px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <section
          role="dialog"
          aria-label="Job filters"
          className="fixed inset-x-3 top-20 z-50 max-h-[calc(100svh-6rem)] overflow-y-auto rounded-2xl border border-black/8 bg-white shadow-[0_24px_70px_rgba(26,34,26,0.18)] sm:absolute sm:inset-x-auto sm:top-12 sm:right-0 sm:w-105"
        >
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-black/7 bg-white px-5 py-4">
            <div>
              <h3 className="font-semibold">Filter jobs</h3>
              <p className="mt-0.5 text-[11px] text-[#858a82]">
                Refine opportunities in your feed
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close filters" className="cursor-pointer">
              <Icon icon="solar:close-circle-linear" width="23" />
            </button>
          </header>

          <div className="grid gap-6 p-5">
            <FilterGroup title="Experience level">
              {["Entry", "Intermediate", "Expert"].map((value) => (
                <CheckOption key={value} label={value} checked={draft.experienceLevels.includes(value)} onChange={() => setDraft((current) => ({ ...current, experienceLevels: toggleValue(current.experienceLevels, value) }))} />
              ))}
            </FilterGroup>

            <FilterGroup title="Budget">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <label><span className="sr-only">Minimum budget</span><input type="number" min="0" value={draft.minBudget} onChange={(event) => setDraft((current) => ({ ...current, minBudget: event.target.value }))} placeholder="Min $" className="h-10 w-full rounded-xl border border-black/10 px-3 text-sm outline-none focus:border-[#6e916a]" /></label>
                <span className="text-xs text-[#92978f]">to</span>
                <label><span className="sr-only">Maximum budget</span><input type="number" min="0" value={draft.maxBudget} onChange={(event) => setDraft((current) => ({ ...current, maxBudget: event.target.value }))} placeholder="Max $" className="h-10 w-full rounded-xl border border-black/10 px-3 text-sm outline-none focus:border-[#6e916a]" /></label>
              </div>
            </FilterGroup>

            <FilterGroup title="Project duration">
              {["Less than 1 month", "1–2 months", "3–6 months", "6+ months"].map((value) => (
                <CheckOption key={value} label={value} checked={draft.durations.includes(value)} onChange={() => setDraft((current) => ({ ...current, durations: toggleValue(current.durations, value) }))} />
              ))}
            </FilterGroup>

            <FilterGroup title="Number of proposals">
              <select value={draft.proposalRange} onChange={(event) => setDraft((current) => ({ ...current, proposalRange: event.target.value }))} className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none">
                <option>Any number</option><option>Less than 5</option><option>5 to 10</option><option>10 to 15</option>
              </select>
            </FilterGroup>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-[#f3f6f1] p-4">
              <span><strong className="block text-xs">Payment verified only</strong><span className="mt-1 block text-[10px] text-[#7b8078]">Show clients with a verified payment method</span></span>
              <input type="checkbox" checked={draft.verifiedOnly} onChange={(event) => setDraft((current) => ({ ...current, verifiedOnly: event.target.checked }))} className="h-4 w-4 accent-[#5f875c]" />
            </label>
          </div>

          <footer className="sticky bottom-0 flex items-center justify-between border-t border-black/7 bg-white p-4">
            <button type="button" onClick={() => { setDraft(emptyJobFilters); onClear(); }} className="cursor-pointer text-xs font-semibold text-[#777c74] hover:underline">Clear all</button>
            <button type="button" onClick={() => { onApply(draft); setOpen(false); }} className="h-10 cursor-pointer rounded-xl bg-[#252724] px-5 text-xs font-semibold text-white">Apply filters</button>
          </footer>
        </section>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <fieldset><legend className="mb-3 text-xs font-semibold">{title}</legend><div className="grid gap-2.5">{children}</div></fieldset>;
}

function CheckOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#656b63]"><input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-[#5f875c]" />{label}</label>;
}
