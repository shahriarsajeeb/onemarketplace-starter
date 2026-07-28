import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { financeSections } from "../_components/finances/finance-data";
import { FinancesDashboard } from "./finances-dashboard";

export const metadata: Metadata = {
  title: "Agency Finances | OneMarketplace.io",
  description:
    "Manage agency earnings, withdrawals, Connects, statements, and tax information.",
};

export default async function AgencyFinancesPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  const valid = financeSections.some((item) => item.id === section);
  if (!valid) redirect("/finances?section=overview");
  return <FinancesDashboard key={section} initialSection={section} />;
}
