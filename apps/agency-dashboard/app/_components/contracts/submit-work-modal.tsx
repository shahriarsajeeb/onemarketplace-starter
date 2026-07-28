"use client";

import { useState } from "react";
import { Icon } from "../ui/icon";
import type { AgencyContract } from "./types";

export function SubmitWorkModal({
  contract,
  onClose,
  onSubmitted,
}: {
  contract: AgencyContract;
  onClose: () => void;
  onSubmitted: (contract: AgencyContract) => void;
}) {
  const [complete, setComplete] = useState(false);

  if (complete) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]"
      >
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f2e3] text-[#4d784a]">
            <Icon name="verified" size={29} />
          </span>
          <h2 className="mt-5 text-xl font-semibold">Agency work submitted</h2>
          <p className="mt-2 text-sm leading-6 text-[#737870]">
            Northstar Digital’s submission was sent to {contract.client} for
            review.
          </p>
          <button
            type="button"
            onClick={() => {
              onSubmitted(contract);
              onClose();
            }}
            className="mt-6 h-11 w-full cursor-pointer rounded-xl bg-[#252724] text-sm font-semibold text-white"
          >
            Back to contracts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-title"
      className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setComplete(true);
        }}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#62805f] uppercase">
              Agency milestone submission
            </p>
            <h2 id="submit-title" className="mt-2 text-xl font-semibold">
              Submit work for review
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer"
          >
            <Icon name="close" size={25} />
          </button>
        </div>
        <div className="mt-5 rounded-xl bg-[#f2f5f0] p-4">
          <p className="text-[11px] text-[#7b8078]">
            {contract.client} · Submitted as Northstar Digital
          </p>
          <p className="mt-1 text-sm font-semibold">
            {contract.currentMilestone}
          </p>
        </div>
        <label className="mt-5 block text-xs font-semibold">
          Message to client
          <textarea
            required
            rows={5}
            placeholder="Summarize what the agency completed and anything the client should review…"
            className="mt-2 w-full resize-none rounded-xl border border-black/10 p-3 text-sm font-normal outline-none focus:border-[#6e916a]"
          />
        </label>
        <label className="mt-4 block text-xs font-semibold">
          Deliverable link{" "}
          <span className="font-normal text-[#8a8f87]">(optional)</span>
          <input
            type="url"
            placeholder="https://…"
            className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none focus:border-[#6e916a]"
          />
        </label>
        <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-black/15 p-4 text-sm text-[#696f67] hover:bg-black/2">
          <Icon name="plus" size={20} />
          <span>
            <strong className="font-semibold text-[#343833]">
              Attach deliverables
            </strong>
            <br />
            <span className="text-xs">PDF, ZIP, PNG, or JPG up to 25 MB</span>
          </span>
          <input type="file" multiple className="sr-only" />
        </label>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 cursor-pointer rounded-xl border border-black/10 px-5 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-11 cursor-pointer rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
          >
            Submit agency work
          </button>
        </div>
      </form>
    </div>
  );
}
