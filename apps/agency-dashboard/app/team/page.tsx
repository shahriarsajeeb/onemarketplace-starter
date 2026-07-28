import type { Metadata } from "next";
import { TeamDashboard } from "./team-dashboard";

export const metadata: Metadata = {
  title: "Agency Team | OneMarketplace.io",
  description:
    "Manage agency membership, freelancer profiles, roles, and account permissions.",
};

export default function AgencyTeamPage() {
  return <TeamDashboard />;
}
