import type { Metadata } from "next";
import { FreelancerDashboard } from "./freelancer-dashboard";

export const metadata: Metadata = {
  title: "Freelancer Dashboard | OneMarketplace.io",
  description:
    "Discover matching projects, manage proposals, and grow your freelance business.",
};

export default function MainDashboardPage() {
  return <FreelancerDashboard />;
}
