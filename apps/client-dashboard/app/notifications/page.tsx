import type { Metadata } from "next";
import { ClientShell } from "../_components/dashboard/client-shell";
import { ClientNotifications } from "./client-notifications";

export const metadata: Metadata = {
  title: "Notifications | OneMarketplace.io",
  description:
    "Review client updates about proposals, contracts, messages, and payments.",
};

export default function ClientNotificationsPage() {
  return (
    <ClientShell>
      <ClientNotifications />
    </ClientShell>
  );
}
