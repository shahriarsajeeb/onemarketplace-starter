import type { Metadata } from "next";
import { MessagesDashboard } from "./messages-dashboard";

export const metadata: Metadata = {
  title: "Agency Messages | OneMarketplace.io",
  description:
    "Manage agency conversations with clients about proposals and contracts.",
};

export default function AgencyMessagesPage() {
  return <MessagesDashboard />;
}
