import type { Metadata } from "next";
import { NotificationsDashboard } from "./notifications-dashboard";

export const metadata: Metadata = {
  title: "Notifications | OneMarketplace.io",
  description: "Review updates about contracts, proposals, payments, and messages.",
};

export default function NotificationsPage() {
  return <NotificationsDashboard />;
}
