import type { Metadata } from "next";
import { ContractsDashboard } from "./contracts-dashboard";

export const metadata: Metadata = {
  title: "Agency Contracts | OneMarketplace.io",
  description:
    "Manage agency contracts, milestones, client approvals, and work submissions.",
};

export default function AgencyContractsPage() {
  return <ContractsDashboard />;
}
