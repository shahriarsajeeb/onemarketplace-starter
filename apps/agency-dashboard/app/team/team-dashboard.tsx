"use client";

import { useMemo, useState } from "react";
import { AgencyShell } from "../_components/dashboard/agency-shell";
import { InviteMemberModal } from "../_components/team/invite-member-modal";
import { MemberCard } from "../_components/team/member-card";
import { MemberDrawer } from "../_components/team/member-drawer";
import { initialAgencyMembers } from "../_components/team/team-data";
import type { AgencyMember } from "../_components/team/types";
import { Icon } from "../_components/ui/icon";

const filters = ["All members", "Active", "Invitation pending"] as const;

export function TeamDashboard() {
  const [members, setMembers] = useState(initialAgencyMembers);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All members");
  const [role, setRole] = useState("All roles");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AgencyMember | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<AgencyMember | null>(null);
  const [notice, setNotice] = useState("");

  const visibleMembers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return members.filter(
      (member) =>
        (filter === "All members" || member.status === filter) &&
        (role === "All roles" || member.role === role) &&
        (!query ||
          `${member.name} ${member.email} ${member.title} ${member.specialty} ${member.skills.join(" ")}`
            .toLowerCase()
            .includes(query)),
    );
  }, [filter, members, role, search]);

  const updateMember = (updated: AgencyMember) => {
    setMembers((current) =>
      current.map((member) => (member.id === updated.id ? updated : member)),
    );
    setSelected(updated);
    setNotice(`${updated.name}'s agency access was updated.`);
  };

  const removeMember = () => {
    if (!removeTarget) return;
    setMembers((current) =>
      current.filter((member) => member.id !== removeTarget.id),
    );
    setSelected(null);
    setNotice(
      removeTarget.status === "Invitation pending"
        ? `Invitation for ${removeTarget.name} was cancelled.`
        : `${removeTarget.name} was removed from the agency.`,
    );
    setRemoveTarget(null);
  };

  return (
    <AgencyShell>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">
            Agency membership
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Agency team
          </h1>
          <p className="mt-2 text-sm text-[#72776f]">
            Manage the freelancers displayed on your agency profile and their
            account permissions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setInviteOpen(true)}
          className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
        >
          <Icon name="plus" size={18} /> Invite freelancer
        </button>
      </div>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            "Total members",
            members.length,
            "team",
            "bg-[#e7f2e4] text-[#4d784a]",
          ],
          [
            "Active profiles",
            members.filter(
              (member) => member.status === "Active" && member.publicProfile,
            ).length,
            "verified",
            "bg-[#e8eff4] text-[#4c6e86]",
          ],
          [
            "Business managers",
            members.filter((member) => member.role === "Business manager")
              .length,
            "settings",
            "bg-[#f1f0e6] text-[#766f47]",
          ],
          [
            "Pending invites",
            members.filter(
              (member) => member.status === "Invitation pending",
            ).length,
            "message",
            "bg-[#eeeaf5] text-[#6b5d82]",
          ],
        ].map(([label, value, icon, color]) => (
          <div
            key={String(label)}
            className="flex items-center gap-4 rounded-2xl border border-black/8 bg-white p-5"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
            >
              <Icon name={icon as "team"} size={22} />
            </span>
            <div>
              <p className="text-2xl font-semibold tracking-[-0.04em]">
                {value}
              </p>
              <p className="mt-0.5 text-xs text-[#7c8179]">{label}</p>
            </div>
          </div>
        ))}
      </section>

      {notice && (
        <div className="mt-5 flex items-center justify-between rounded-xl border border-[#cfdfcb] bg-[#edf4ea] px-4 py-3 text-xs font-medium text-[#4e774b]">
          <span className="inline-flex items-center gap-2">
            <Icon name="verified" size={17} /> {notice}
          </span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss"
            className="cursor-pointer"
          >
            <Icon name="close" size={18} />
          </button>
        </div>
      )}

      <section className="mt-5 flex flex-col gap-4 rounded-2xl border border-black/8 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-1 overflow-x-auto">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`shrink-0 cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold ${
                filter === item
                  ? "bg-[#edf4ea] text-[#4e774b]"
                  : "text-[#747971] hover:bg-black/3"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="h-10 rounded-xl border border-black/9 bg-white px-3 text-xs font-semibold outline-none"
          >
            <option>All roles</option>
            <option>Agency owner</option>
            <option>Business manager</option>
            <option>Agency member</option>
          </select>
          <label className="flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 sm:w-72">
            <Icon name="search" size={18} className="text-[#7b8078]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search team members"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </label>
        </div>
      </section>

      <div className="mt-4 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {visibleMembers.map((member) => (
          <MemberCard key={member.id} member={member} onView={setSelected} />
        ))}
      </div>

      {!visibleMembers.length && (
        <div className="mt-4 rounded-2xl border border-dashed border-black/12 bg-white px-6 py-16 text-center">
          <Icon
            name="team"
            size={35}
            className="mx-auto text-[#858a82]"
          />
          <h2 className="mt-4 font-semibold">No team members found</h2>
          <p className="mt-2 text-sm text-[#7c8179]">
            Try another role, status, or search term.
          </p>
        </div>
      )}

      {selected && (
        <MemberDrawer
          member={selected}
          onClose={() => setSelected(null)}
          onUpdate={updateMember}
          onRemove={setRemoveTarget}
          onResend={(member) =>
            setNotice(`Invitation resent to ${member.email}.`)
          }
        />
      )}

      {inviteOpen && (
        <InviteMemberModal
          onClose={() => setInviteOpen(false)}
          onInvite={(member) => {
            setMembers((current) => [...current, member]);
            setNotice(`Invitation sent to ${member.email}.`);
          }}
        />
      )}

      {removeTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-semibold">
              {removeTarget.status === "Invitation pending"
                ? "Cancel this invitation?"
                : "Remove this agency member?"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#737870]">
              {removeTarget.name}{" "}
              {removeTarget.status === "Invitation pending"
                ? "will no longer be able to accept this invitation."
                : "will lose access to Northstar Digital and will no longer appear on its public roster. Their personal freelancer account will not be affected."}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRemoveTarget(null)}
                className="h-10 cursor-pointer rounded-xl border border-black/10 px-4 text-xs font-semibold"
              >
                Keep member
              </button>
              <button
                type="button"
                onClick={removeMember}
                className="h-10 cursor-pointer rounded-xl bg-[#8b5656] px-4 text-xs font-semibold text-white"
              >
                {removeTarget.status === "Invitation pending"
                  ? "Cancel invitation"
                  : "Remove member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AgencyShell>
  );
}
