import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientHeader } from "../../_components/dashboard/client-header";
import { clientTalentProfiles } from "../../_components/data/client-data";
import { PublicMarketplaceProfile } from "../../_components/profiles/public-marketplace-profile";

export const metadata: Metadata = {
  title: "Talent Profile",
  description: "Review a freelancer’s public marketplace profile and work.",
};

export default async function TalentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = clientTalentProfiles.find(
    (talent) => talent.id === Number(id),
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
