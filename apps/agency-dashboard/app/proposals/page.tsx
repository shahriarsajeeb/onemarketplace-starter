import type { Metadata } from "next";
import { ProposalsDashboard } from "./proposals-dashboard";

export const metadata: Metadata = {
  title: "Agency Proposals | OneMarketplace.io",
  description: "Track proposals submitted by your agency.",
};

export default function AgencyProposalsPage() {
  return <ProposalsDashboard />;
}
