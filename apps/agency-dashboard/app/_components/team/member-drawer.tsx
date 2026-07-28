"use client";

import { Icon } from "../ui/icon";
import { allAgencyPermissions } from "./team-data";
import type {
  AgencyMember,
  AgencyMemberRole,
  AgencyPermission,
} from "./types";

export function MemberDrawer({
  member,
  onClose,
  onUpdate,
  onRemove,
  onResend,
}: {
  member: AgencyMember;
  onClose: () => void;
  onUpdate: (member: AgencyMember) => void;
  onRemove: (member: AgencyMember) => void;
  onResend: (member: AgencyMember) => void;
}) {
  const owner = member.role === "Agency owner";
  const pending = member.status === "Invitation pending";

  const setRole = (role: AgencyMemberRole) => {
    const permissions =
      role === "Agency member"
        ? []
        : role === "Business manager"
          ? member.permissions
          : [...allAgencyPermissions];
    onUpdate({ ...member, role, permissions: [...permissions] });
  };

  const togglePermission = (permission: AgencyPermission) => {
    onUpdate({
      ...member,
      permissions: member.permissions.includes(permission)
        ? member.permissions.filter((item) => item !== permission)
        : [...member.permissions, permission],
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#172018]/45 backdrop-blur-[2px]"
    >
      <div className="h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-black/8 bg-white px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#62805f] uppercase">
              Agency member
            </p>
            <h2 id="member-title" className="mt-2 text-xl font-semibold">
              {pending ? "Manage invitation" : "Member details"}
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
        </header>

        <div className="grid gap-7 p-6 sm:p-8">
          <section className="flex items-center gap-4 rounded-2xl bg-[#f1f5ef] p-5">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#496e67] text-sm font-semibold text-white">
              {member.initials}
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-semibold">{member.name}</h3>
              <p className="mt-1 truncate text-sm text-[#6f756d]">
                {member.title}
              </p>
              <p className="mt-1 truncate text-xs text-[#858a82]">
                {member.email}
              </p>
            </div>
          </section>

          {pending ? (
            <>
              <section>
                <h3 className="text-sm font-semibold">Invitation status</h3>
                <div className="mt-3 rounded-xl border border-[#dfd3a9] bg-[#faf7eb] p-4">
                  <p className="text-sm font-semibold text-[#6f653d]">
                    Waiting for {member.name} to join
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#7a745f]">
                    The invitation was sent to {member.email}. They must accept
                    it before appearing on the public agency profile.
                  </p>
                </div>
              </section>
              <section>
                <h3 className="text-sm font-semibold">Planned account role</h3>
                <select
                  value={member.role}
                  onChange={(event) =>
                    setRole(event.target.value as AgencyMemberRole)
                  }
                  className="mt-3 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none"
                >
                  <option>Agency member</option>
                  <option>Business manager</option>
                </select>
              </section>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onResend(member)}
                  className="h-11 flex-1 cursor-pointer rounded-xl bg-[#252724] px-4 text-sm font-semibold text-white"
                >
                  Resend invitation
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(member)}
                  className="h-11 cursor-pointer rounded-xl border border-[#d8bcbc] px-4 text-sm font-semibold text-[#8b5656]"
                >
                  Cancel invite
                </button>
              </div>
            </>
          ) : (
            <>
              <section>
                <h3 className="text-sm font-semibold">Public agency profile</h3>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[
                    ["Specialty", member.specialty],
                    ["Location", member.location],
                    ["Profile", `${member.profileComplete}% complete`],
                    [
                      "Visibility",
                      member.publicProfile ? "Public" : "Hidden",
                    ],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-black/7 p-3"
                    >
                      <p className="text-[10px] text-[#858a82]">{label}</p>
                      <p className="mt-1.5 text-xs font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-[#edf2eb] px-2.5 py-1.5 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold">Agency account role</h3>
                <select
                  disabled={owner}
                  value={member.role}
                  onChange={(event) =>
                    setRole(event.target.value as AgencyMemberRole)
                  }
                  className="mt-3 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none disabled:bg-[#f1f3ef] disabled:text-[#7b8078]"
                >
                  <option>Agency owner</option>
                  <option>Business manager</option>
                  <option>Agency member</option>
                </select>
                <p className="mt-2 text-[11px] leading-5 text-[#858a82]">
                  {owner
                    ? "The agency owner has every permission and cannot be removed."
                    : "Roles control access to the agency account, not internal project assignments."}
                </p>
              </section>

              {!owner && member.role === "Business manager" && (
                <section>
                  <h3 className="text-sm font-semibold">Permissions</h3>
                  <div className="mt-3 divide-y divide-black/6 overflow-hidden rounded-xl border border-black/8">
                    {allAgencyPermissions.map((permission) => (
                      <label
                        key={permission}
                        className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 text-sm"
                      >
                        {permission}
                        <input
                          type="checkbox"
                          checked={member.permissions.includes(permission)}
                          onChange={() => togglePermission(permission)}
                          className="h-4 w-4 accent-[#5f875c]"
                        />
                      </label>
                    ))}
                  </div>
                </section>
              )}

              {!owner && (
                <section className="border-t border-black/7 pt-6">
                  <button
                    type="button"
                    onClick={() => onRemove(member)}
                    className="cursor-pointer text-xs font-semibold text-[#8b5656] hover:underline"
                  >
                    Remove from agency
                  </button>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
