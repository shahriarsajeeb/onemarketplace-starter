import type { Metadata } from "next";
import { SettingsDashboard } from "./settings-dashboard";

export const metadata: Metadata = {
  title: "Settings | OneMarketplace.io",
  description: "Manage your freelancer account, finances, Connects, and security.",
};

export default function SettingsPage() {
  return <SettingsDashboard />;
}
