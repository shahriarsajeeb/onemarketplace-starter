import type { Metadata } from "next";
import { ProposalsDashboard } from "./proposals-dashboard";

export const metadata: Metadata = {
  title: "My Proposals | OneMarketplace.io",
  description: "Track and manage your freelance proposals.",
};

export default function MyProposalsPage() {
  return <ProposalsDashboard />;
}
