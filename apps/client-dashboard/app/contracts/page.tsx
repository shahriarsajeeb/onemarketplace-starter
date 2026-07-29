import type { Metadata } from "next";
import { ClientShell } from "../_components/dashboard/client-shell";
import { ContractsDashboard } from "../_components/contracts/contracts-dashboard";

export const metadata: Metadata = {
  title: "Contracts",
  description:
    "Fund milestones, review submitted work, and manage client contracts.",
};

export default function ContractsPage() {
  return (
    <ClientShell>
      <ContractsDashboard />
    </ClientShell>
  );
}
