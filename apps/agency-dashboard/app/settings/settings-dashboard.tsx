"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AgencyShell } from "../_components/dashboard/agency-shell";
import { SettingsNavigation } from "../_components/settings/settings-navigation";
import {
  MembersPanel,
  NotificationsPanel,
  OverviewPanel,
  SecurityPanel,
  VerificationPanel,
} from "../_components/settings/settings-panels";
import type { AgencySettingsSectionId } from "../_components/settings/settings-data";

export function AgencySettingsDashboard({
  initialSection,
}: {
  initialSection: AgencySettingsSectionId;
}) {
  const [section, setSection] =
    useState<AgencySettingsSectionId>(initialSection);
  const router = useRouter();

  const openSection = (nextSection: AgencySettingsSectionId) => {
    setSection(nextSection);
    router.push(`/settings?section=${nextSection}`, { scroll: false });
  };

  return (
    <AgencyShell>
      <div>
        <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">
          Agency account
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-[#72776f]">
          Manage your agency profile, access, and account preferences.
        </p>
      </div>

      <div className="mt-8 grid items-start gap-5 lg:grid-cols-[235px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-24">
          <SettingsNavigation active={section} onChange={openSection} />
        </div>
        <div className="min-w-0">
          {section === "overview" && (
            <OverviewPanel onOpenSection={openSection} />
          )}
          {section === "members" && <MembersPanel />}
          {section === "verification" && <VerificationPanel />}
          {section === "security" && <SecurityPanel />}
          {section === "notifications" && <NotificationsPanel />}
        </div>
      </div>
    </AgencyShell>
  );
}
