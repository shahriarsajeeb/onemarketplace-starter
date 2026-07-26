import type { Metadata } from "next";
import { ContractsDashboard } from "./contracts-dashboard";

export const metadata: Metadata = {
  title: "My Contracts | OneMarketplace.io",
  description: "Manage active freelance contracts, milestones, and submissions.",
};

export default function ContractsPage() {
  return <ContractsDashboard />;
}
