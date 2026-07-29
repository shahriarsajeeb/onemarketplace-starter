import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientHeader } from "../../_components/dashboard/client-header";
import { clientProposals } from "../../_components/data/client-data";
import { PublicMarketplaceProfile } from "../../_components/profiles/public-marketplace-profile";

export const metadata: Metadata = {
  title: "Agency Profile",
  description: "Review an agency’s public marketplace profile, team, and work.",
};

export default async function AgencyProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = clientProposals.find(
    (proposal) =>
      proposal.id === Number(id) && proposal.accountType === "Agency",
  );

  if (!profile) notFound();

  return (
    <div className="min-h-svh bg-[#f4f6f2] text-[#242724]">
      <ClientHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <PublicMarketplaceProfile profile={profile} />
      </main>
    </div>
  );
}
