import type { Metadata } from "next";
import { ClientHeader } from "../../_components/dashboard/client-header";
import { ClientProfile } from "../../_components/profile/client-profile";

export const metadata: Metadata = {
  title: "Set Up Client Profile | OneMarketplace.io",
  description:
    "Set up the client and company information shown across jobs, proposals, and contracts.",
};

export default function EditClientProfilePage() {
  return (
    <div className="min-h-svh bg-[#f4f6f2] text-[#242724]">
      <ClientHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <ClientProfile editing />
      </main>
    </div>
  );
}
