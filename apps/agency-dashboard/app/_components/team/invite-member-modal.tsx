"use client";

import { useState } from "react";
import { Icon } from "../ui/icon";
import type { AgencyMember, AgencyMemberRole } from "./types";

export function InviteMemberModal({
  onClose,
  onInvite,
}: {
  onClose: () => void;
  onInvite: (member: AgencyMember) => void;
}) {
  const [complete, setComplete] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<AgencyMemberRole>("Agency member");

  const invite = () => {
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    onInvite({
      id: Date.now(),
      name,
      initials: initials || "NM",
      email,
      title: "Freelancer profile pending",
      specialty: "Not selected",
      location: "Not available",
      role,
      status: "Invitation pending",
      joined: "Invited just now",
      profileComplete: 0,
      publicProfile: false,
      skills: [],
      permissions: [],
    });
    setComplete(true);
  };

  if (complete) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]"
      >
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f2e3] text-[#4d784a]">
            <Icon name="team" size={29} />
          </span>
          <h2 className="mt-5 text-xl font-semibold">Invitation sent</h2>
          <p className="mt-2 text-sm leading-6 text-[#737870]">
            {name} was invited to join Northstar Digital. Their agency profile
            will remain hidden until they accept.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 h-11 w-full cursor-pointer rounded-xl bg-[#252724] text-sm font-semibold text-white"
          >
            Back to team
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-title"
      className="fixed inset-0 z-60 grid place-items-center bg-[#172018]/45 p-5 backdrop-blur-[2px]"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          invite();
        }}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#62805f] uppercase">
              Agency membership
            </p>
            <h2 id="invite-title" className="mt-2 text-xl font-semibold">
              Invite a freelancer
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
        <p className="mt-4 text-sm leading-6 text-[#737870]">
          Invited freelancers keep their personal accounts and choose whether
          to join your agency.
        </p>
        <label className="mt-5 block text-xs font-semibold">
          Freelancer name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Full name"
            className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none focus:border-[#6e916a]"
          />
        </label>
        <label className="mt-4 block text-xs font-semibold">
          Email address
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="freelancer@example.com"
            className="mt-2 h-11 w-full rounded-xl border border-black/10 px-3 text-sm font-normal outline-none focus:border-[#6e916a]"
          />
        </label>
        <label className="mt-4 block text-xs font-semibold">
          Agency account role
          <select
            value={role}
            onChange={(event) =>
              setRole(event.target.value as AgencyMemberRole)
            }
            className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal outline-none"
          >
            <option>Agency member</option>
            <option>Business manager</option>
          </select>
        </label>
        <div className="mt-4 rounded-xl bg-[#f3f5f1] p-4 text-xs leading-5 text-[#70766e]">
          Agency members appear on the public roster after accepting and
          completing their profile. This does not assign them to client work.
        </div>
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
            Send invitation
          </button>
        </div>
      </form>
    </div>
  );
}
