import { Icon } from "@iconify/react";
import Link from "next/link";
import type { Job } from "./types";

type JobCardProps = {
  job: Job;
  saved: boolean;
  onSave: () => void;
  onPropose: () => void;
};

export function JobCard({
  job,
  saved,
  onSave,
  onPropose,
}: JobCardProps) {
  return (
    <article className="rounded-2xl border border-black/8 bg-white p-5 transition hover:border-black/14 hover:shadow-lg hover:shadow-black/4 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-medium text-[#858a82]">
              Posted {job.posted}
            </p>
            {job.featured && (
              <span className="rounded-full bg-[#f1eedc] px-2 py-1 text-[10px] font-semibold tracking-wide text-[#826b31] uppercase">
                Great match
              </span>
            )}
          </div>
          <h2 className="mt-2 text-xl leading-7 font-semibold tracking-tight text-[#242724]">
            {job.title}
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={`/jobs/${job.id}`}
            aria-label={`Open full job details for ${job.title}`}
            title="Open full job details"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#777c74] transition hover:border-[#9eb49b] hover:bg-[#f3f7f1] hover:text-[#4e784b]"
          >
            <Icon icon="solar:arrow-right-up-linear" width="20" />
          </Link>
          <button
            type="button"
            onClick={onSave}
            aria-label={saved ? "Remove saved job" : "Save job"}
            aria-pressed={saved}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition ${
              saved
                ? "border-[#a8c3a4] bg-[#e8f2e5] text-[#4e784b]"
                : "border-black/10 text-[#777c74] hover:bg-[#f3f5f1]"
            }`}
          >
            <Icon
              icon={saved ? "solar:bookmark-bold" : "solar:bookmark-linear"}
              width="20"
            />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#656a63]">
        <span>{job.type}</span>
        <span>{job.budget}</span>
        <span>{job.level}</span>
        <span>{job.duration}</span>
      </div>
      <p className="mt-5 text-sm leading-6 text-[#626860]">{job.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-[#eef2ec] px-2.5 py-1.5 text-xs font-medium text-[#596057]"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-col justify-between gap-5 border-t border-black/7 pt-5 xl:flex-row xl:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#737870]">
            <strong className="font-semibold text-[#30342f]">{job.company}</strong>
            {job.verified && (
              <span className="inline-flex items-center gap-1 font-semibold text-[#4f784c]">
                <Icon icon="solar:verified-check-bold" width="15" />
                Payment verified
              </span>
            )}
            <span className="text-[#d2a43a]">★</span>
            <span>{job.clientRating.toFixed(1)}</span>
            <span>{job.clientSpent}</span>
            <span>{job.location}</span>
          </div>
          <p className="mt-2 text-xs text-[#858a82]">
            {job.proposals} proposals
          </p>
        </div>
        <button
          type="button"
          onClick={onPropose}
          className="cursor-pointer rounded-xl bg-[#252724] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3b3e39]"
        >
          Submit a proposal
        </button>
      </div>
    </article>
  );
}
