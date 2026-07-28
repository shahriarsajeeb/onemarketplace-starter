"use client";

import { Icon } from "@iconify/react";
import {
  agencySettingsSections,
  type AgencySettingsSectionId,
} from "./settings-data";

export function SettingsNavigation({
  active,
  onChange,
}: {
  active: AgencySettingsSectionId;
  onChange: (section: AgencySettingsSectionId) => void;
}) {
  return (
    <nav className="rounded-2xl border border-black/8 bg-white p-2">
      {agencySettingsSections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onChange(section.id)}
          className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
            active === section.id
              ? "bg-[#edf4ea] text-[#4e774b]"
              : "text-[#686d65] hover:bg-black/3"
          }`}
        >
          <Icon
            icon={
              active === section.id
                ? section.icon.replace("-linear", "-bold")
                : section.icon
            }
            width="19"
          />
          {section.label}
        </button>
      ))}
    </nav>
  );
}
