import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { settingsSections } from "../_components/settings/settings-data";
import { SettingsDashboard } from "./settings-dashboard";

export const metadata: Metadata = {
  title: "Settings | OneMarketplace.io",
  description: "Manage your freelancer account, finances, Connects, and security.",
};

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  const validSection = settingsSections.some((item) => item.id === section);

  if (!validSection) {
    redirect("/settings?section=overview");
  }

  return (
    <SettingsDashboard
      key={section}
      initialSection={section}
    />
  );
}
