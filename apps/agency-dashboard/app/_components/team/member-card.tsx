"use client";

import { Icon } from "../ui/icon";
import type { AgencyMember } from "./types";

export function MemberCard({
  member,
  onView,
}: {
  member: AgencyMember;
  onView: (member: AgencyMember) => void;
}) {
  const pending = member.status === "Invitation pending";

  return (
    <article className="rounded-2xl border border-black/8 bg-white p-5">
      <div className="flex items-start gap-3">
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#496e67] text-xs font-semibold text-white">
          {member.initials}
          {!pending && (
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-[#64a665]" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate font-semibold">{member.name}</h2>
            {member.role === "Agency owner" && (
              <Icon name="verified" size={15} className="text-[#52784f]" />
            )}
          </div>
          <p className="mt-1 truncate text-xs text-[#6f756d]">{member.title}</p>
          <p className="mt-1 text-[11px] text-[#90958d]">{member.location}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            pending
              ? "bg-[#f2efe3] text-[#796f42]"
              : "bg-[#e6f2e3] text-[#477344]"
          }`}
        >
          {member.status}
        </span>
        <span className="text-[11px] font-medium text-[#6f756d]">
          {member.role}
        </span>
      </div>

      {!pending && (
        <div className="mt-5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#7b8078]">Profile completeness</span>
            <strong className="text-[#52784f]">{member.profileComplete}%</strong>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e5e9e2]">
            <div
              className="h-full rounded-full bg-[#638b60]"
              style={{ width: `${member.profileComplete}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {member.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-[#edf1eb] px-2 py-1 text-[10px] text-[#626960]"
          >
            {skill}
          </span>
        ))}
        {member.skills.length > 3 && (
          <span className="rounded-lg bg-[#edf1eb] px-2 py-1 text-[10px] text-[#626960]">
            +{member.skills.length - 3}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => onView(member)}
        className="mt-5 h-10 w-full cursor-pointer rounded-xl border border-black/10 text-xs font-semibold hover:bg-black/3"
      >
        {pending ? "Manage invitation" : "View member"}
      </button>
    </article>
  );
}
