import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  agencySettingsSections,
  type AgencySettingsSectionId,
} from "../_components/settings/settings-data";
import { AgencySettingsDashboard } from "./settings-dashboard";

export const metadata: Metadata = {
  title: "Agency Settings | OneMarketplace.io",
  description:
    "Manage your agency profile, members, security, and notification preferences.",
};

export default async function AgencySettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  const validSection = agencySettingsSections.some(
    (item) => item.id === section,
  );

  if (!validSection) {
    redirect("/settings?section=overview");
  }

  return (
    <AgencySettingsDashboard
      key={section}
      initialSection={section as AgencySettingsSectionId}
    />
  );
}
