import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ClientShell } from "../_components/dashboard/client-shell";
import { ClientSettings } from "./settings-client";

export const metadata: Metadata = {
  title: "Settings | OneMarketplace.io",
  description:
    "Manage client finances, company access, security, and marketplace preferences.",
};

const sections = [
  "overview",
  "finances",
  "company",
  "notifications",
  "verifications",
  "account",
];

export default async function ClientSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section } = await searchParams;
  if (!section || !sections.includes(section)) {
    redirect("/settings?section=overview");
  }

  return (
    <ClientShell>
      <ClientSettings initialSection={section} />
    </ClientShell>
  );
}
