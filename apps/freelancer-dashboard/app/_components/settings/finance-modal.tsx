"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

type FinanceModalProps = {
  mode: "connects" | "withdraw";
  onClose: () => void;
};

export function FinanceModal({ mode, onClose }: FinanceModalProps) {
  const [complete, setComplete] = useState(false);
  const [connects, setConnects] = useState(40);
  const buying = mode === "connects";

  if (complete) {
    return (
      <div role="dialog" aria-modal="true" className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f2e3] text-[#4d784a]"><Icon icon="solar:check-circle-bold" width="30" /></span>
          <h2 className="mt-5 text-xl font-semibold">{buying ? "Connects purchased" : "Withdrawal requested"}</h2>
          <p className="mt-2 text-sm leading-6 text-[#737870]">{buying ? `${connects} Connects were added to your balance.` : "Your withdrawal is being processed and should arrive within 1–2 business days."}</p>
          <button type="button" onClick={onClose} className="mt-6 h-11 w-full cursor-pointer rounded-xl bg-[#252724] text-sm font-semibold text-white">Done</button>
        </div>
      </div>
    );
  }

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="finance-modal-title" className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]">
      <form onSubmit={(event) => { event.preventDefault(); setComplete(true); }} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between">
          <div><p className="text-xs font-semibold tracking-wide text-[#62805f] uppercase">{buying ? "Proposal credits" : "Available balance"}</p><h2 id="finance-modal-title" className="mt-2 text-xl font-semibold">{buying ? "Buy Connects" : "Withdraw earnings"}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close" className="cursor-pointer"><Icon icon="solar:close-circle-linear" width="25" /></button>
        </div>
        {buying ? (
          <>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[20, 40, 80].map((amount) => <button key={amount} type="button" onClick={() => setConnects(amount)} className={`cursor-pointer rounded-xl border p-4 text-center ${connects === amount ? "border-[#6b9167] bg-[#edf4ea]" : "border-black/9"}`}><strong className="block text-lg">{amount}</strong><span className="mt-1 block text-[10px] text-[#7b8078]">${(amount * 0.15).toFixed(2)}</span></button>)}
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#f3f5f1] p-4 text-sm"><span>Total</span><strong>${(connects * 0.15).toFixed(2)}</strong></div>
            <p className="mt-3 text-[11px] leading-5 text-[#858a82]">Your saved payment method will be charged. Connects do not expire while your account remains active.</p>
          </>
        ) : (
          <>
            <div className="mt-6 rounded-xl bg-[#f3f5f1] p-4"><p className="text-[11px] text-[#7b8078]">Available to withdraw</p><p className="mt-1 text-2xl font-semibold">$4,850.00</p></div>
            <label className="mt-4 block text-xs font-semibold">Amount<input required type="number" min="50" max="4850" defaultValue="4850" className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none focus:border-[#6e916a]" /></label>
            <label className="mt-4 block text-xs font-semibold">Withdrawal method<select className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal"><option>Payoneer •••• 4821</option></select></label>
            <div className="mt-4 flex justify-between text-xs text-[#737870]"><span>Processing fee</span><strong className="text-[#343833]">$1.00</strong></div>
          </>
        )}
        <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={onClose} className="h-11 cursor-pointer rounded-xl border border-black/10 px-5 text-sm font-semibold">Cancel</button><button type="submit" className="h-11 cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white">{buying ? "Buy Connects" : "Withdraw"}</button></div>
      </form>
    </div>
  );
}
