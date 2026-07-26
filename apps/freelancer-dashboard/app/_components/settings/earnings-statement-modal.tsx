"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

type EarningsStatementModalProps = {
  onClose: () => void;
};

const periodTotals = {
  "July 2026": "$8,500.00",
  "Q2 2026": "$21,750.00",
  "2026 year to date": "$48,920.00",
  "All time": "$86,420.00",
} as const;

export function EarningsStatementModal({
  onClose,
}: EarningsStatementModalProps) {
  const [period, setPeriod] =
    useState<keyof typeof periodTotals>("2026 year to date");
  const statementId = "OMS-2026-0726-SK4821";

  const downloadStatement = () => {
    const issued = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date());
    const content = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>OneMarketplace.io Earnings Statement</title>
  <style>
    body{font-family:Arial,sans-serif;color:#242724;max-width:820px;margin:48px auto;padding:0 32px;line-height:1.55}
    header{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #242724;padding-bottom:24px}
    .brand{font-size:22px;font-weight:700}.badge{background:#edf4ea;color:#4e774b;padding:8px 12px;border-radius:999px;font-size:12px;font-weight:700}
    h1{font-size:34px;margin:48px 0 8px}.muted{color:#737870}.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:32px 0}
    .card{border:1px solid #dfe3dc;border-radius:12px;padding:18px}.label{font-size:11px;color:#737870;text-transform:uppercase;letter-spacing:.08em}
    .value{font-size:18px;font-weight:700;margin-top:6px}.total{background:#242724;color:white;border-radius:14px;padding:24px;margin:28px 0}
    footer{border-top:1px solid #dfe3dc;margin-top:48px;padding-top:20px;font-size:12px;color:#737870}
  </style>
</head>
<body>
  <header><div class="brand">OneMarketplace.io</div><div class="badge">Verified statement</div></header>
  <h1>Official Earnings Statement</h1>
  <p class="muted">This document confirms marketplace earnings received by the freelancer named below.</p>
  <div class="grid">
    <div class="card"><div class="label">Freelancer</div><div class="value">Shahriar Sajeeb</div></div>
    <div class="card"><div class="label">Account ID</div><div class="value">OMP-FL-4821</div></div>
    <div class="card"><div class="label">Statement period</div><div class="value">${period}</div></div>
    <div class="card"><div class="label">Issued</div><div class="value">${issued}</div></div>
  </div>
  <div class="total"><div class="label" style="color:#bfc7bc">Gross marketplace earnings</div><div style="font-size:32px;font-weight:700;margin-top:8px">${periodTotals[period]}</div></div>
  <p>These earnings were generated through verified client contracts completed or actively delivered through OneMarketplace.io. This statement may be used as supporting evidence of professional freelance activity and income.</p>
  <footer>Statement reference: ${statementId}<br>Verify this statement by contacting verification@onemarketplace.io and providing the reference above.</footer>
</body>
</html>`;
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `OneMarketplace-Earnings-Statement-${period.replaceAll(" ", "-")}.html`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="statement-title"
      className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#62805f] uppercase">
              Verified document
            </p>
            <h2 id="statement-title" className="mt-2 text-xl font-semibold">
              Earnings statement
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer"
          >
            <Icon icon="solar:close-circle-linear" width="25" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#737870]">
          Download an official statement confirming your marketplace earnings
          and professional freelance activity.
        </p>

        <label className="mt-5 block text-xs font-semibold">
          Statement period
          <select
            value={period}
            onChange={(event) =>
              setPeriod(event.target.value as keyof typeof periodTotals)
            }
            className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal outline-none focus:border-[#6e916a]"
          >
            {Object.keys(periodTotals).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <div className="mt-5 rounded-2xl border border-black/8 bg-[#f5f7f3] p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e3efe0] text-[#4d784a]">
              <Icon icon="solar:verified-check-bold" width="22" />
            </span>
            <div>
              <p className="text-sm font-semibold">Official earnings record</p>
              <p className="mt-0.5 text-[11px] text-[#7b8078]">
                Reference {statementId}
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-end justify-between border-t border-black/7 pt-4">
            <div>
              <p className="text-[10px] text-[#7b8078]">Statement period</p>
              <p className="mt-1 text-sm font-semibold">{period}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[#7b8078]">Gross earnings</p>
              <p className="mt-1 text-lg font-semibold">{periodTotals[period]}</p>
            </div>
          </div>
        </div>

        <p className="mt-4 flex gap-2 text-[11px] leading-5 text-[#858a82]">
          <Icon icon="solar:info-circle-linear" width="16" className="mt-0.5 shrink-0" />
          The statement includes your verified name, account reference, issue
          date, selected period, and gross earnings.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 cursor-pointer rounded-xl border border-black/10 px-5 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={downloadStatement}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
          >
            <Icon icon="solar:download-minimalistic-linear" width="18" />
            Download statement
          </button>
        </div>
      </div>
    </div>
  );
}
