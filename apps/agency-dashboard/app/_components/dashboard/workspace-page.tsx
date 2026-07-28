import { AgencyShell } from "./agency-shell";
import { Icon } from "../ui/icon";

type WorkspaceRow = {
  title: string;
  subtitle: string;
  meta: string;
  value: string;
  status: string;
};

export function WorkspacePage({
  eyebrow,
  title,
  description,
  action,
  rows,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  rows: WorkspaceRow[];
}) {
  return (
    <AgencyShell>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">{eyebrow}</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{title}</h1><p className="mt-2 text-sm text-[#72776f]">{description}</p></div>
        <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"><Icon name="plus" size={17} />{action}</button>
      </div>
      <section className="mt-8 overflow-hidden rounded-2xl border border-black/8 bg-white">
        <div className="flex flex-col gap-3 border-b border-black/7 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1">{["All", "Active", "Needs attention", "Completed"].map((filter, index) => <button key={filter} type="button" className={`rounded-lg px-3 py-2 text-xs font-semibold ${index === 0 ? "bg-[#edf4ea] text-[#4e774b]" : "text-[#747971]"}`}>{filter}</button>)}</div>
          <label className="flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 sm:w-72"><Icon name="search" size={17} className="text-[#7b8078]" /><input placeholder={`Search ${title.toLowerCase()}`} className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
        </div>
        {rows.map((row, index) => <article key={row.title} className={`flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6 ${index ? "border-t border-black/7" : ""}`}><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-semibold">{row.title}</h2><span className="rounded-full bg-[#e8f1e5] px-2.5 py-1 text-[10px] font-semibold text-[#52784f]">{row.status}</span></div><p className="mt-1 text-sm text-[#71766e]">{row.subtitle}</p><p className="mt-2 text-xs text-[#90958d]">{row.meta}</p></div><div className="flex items-center gap-4"><strong className="text-sm">{row.value}</strong><button type="button" className="h-10 rounded-xl border border-black/10 px-4 text-xs font-semibold">View details</button></div></article>)}
      </section>
    </AgencyShell>
  );
}
