import type { Metadata } from "next";
import { MessagesDashboard } from "./messages-dashboard";

export const metadata: Metadata = {
  title: "Messages | OneMarketplace.io",
  description: "Chat with clients and coordinate project meetings.",
};

export default function MessagesPage() {
  return <MessagesDashboard />;
}
