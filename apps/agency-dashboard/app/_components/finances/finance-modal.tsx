"use client";

import { useState } from "react";
import { Icon } from "../ui/icon";

export function FinanceModal({
  mode,
  onClose,
  onComplete,
}: {
  mode: "withdraw" | "connects";
  onClose: () => void;
  onComplete: (message: string) => void;
}) {
  const [connects, setConnects] = useState(80);
  const buying = mode === "connects";

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="finance-action-title" className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]">
      <form onSubmit={(event) => { event.preventDefault(); onComplete(buying ? `${connects} Agency Connects were added.` : "Agency withdrawal request submitted."); onClose(); }} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between"><div><p className="text-xs font-semibold tracking-wide text-[#62805f] uppercase">{buying ? "Proposal credits" : "Agency balance"}</p><h2 id="finance-action-title" className="mt-2 text-xl font-semibold">{buying ? "Buy Agency Connects" : "Withdraw agency earnings"}</h2></div><button type="button" onClick={onClose} aria-label="Close" className="cursor-pointer"><Icon name="close" size={25} /></button></div>
        {buying ? (
          <>
            <div className="mt-6 grid grid-cols-3 gap-2">{[40, 80, 160].map((amount) => <button key={amount} type="button" onClick={() => setConnects(amount)} className={`cursor-pointer rounded-xl border p-4 text-center ${connects === amount ? "border-[#6b9167] bg-[#edf4ea]" : "border-black/9"}`}><strong className="block text-lg">{amount}</strong><span className="mt-1 block text-[10px] text-[#7b8078]">${(amount * 0.15).toFixed(2)}</span></button>)}</div>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f3f5f1] p-4 text-sm"><span>Total</span><strong>${(connects * 0.15).toFixed(2)}</strong></div>
            <p className="mt-3 text-[11px] leading-5 text-[#858a82]">The saved agency payment method will be charged. Agency Connects belong to the agency account.</p>
          </>
        ) : (
          <>
            <div className="mt-6 rounded-xl bg-[#f3f5f1] p-4"><p className="text-[11px] text-[#7b8078]">Available to withdraw</p><p className="mt-1 text-2xl font-semibold">$18,420.00</p></div>
            <label className="mt-4 block text-xs font-semibold">Amount<input required type="number" min="100" max="18420" defaultValue="18420" className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none focus:border-[#6e916a]" /></label>
            <label className="mt-4 block text-xs font-semibold">Withdrawal method<select className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal"><option>Business bank •••• 1842</option><option>Payoneer •••• 4821</option></select></label>
            <div className="mt-4 flex justify-between text-xs text-[#737870]"><span>Processing fee</span><strong className="text-[#343833]">$1.00</strong></div>
          </>
        )}
        <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={onClose} className="h-11 cursor-pointer rounded-xl border border-black/10 px-5 text-sm font-semibold">Cancel</button><button type="submit" className="h-11 cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white">{buying ? "Buy Connects" : "Withdraw"}</button></div>
      </form>
    </div>
  );
}
