import type { Metadata } from "next";
import { ClientHeader } from "../_components/dashboard/client-header";
import { ClientProfile } from "../_components/profile/client-profile";

export const metadata: Metadata = {
  title: "Client Profile",
  description: "Preview and edit your public client and company profile.",
};

export default function ClientProfilePage() {
  return (
    <div className="min-h-svh bg-[#f4f6f2] text-[#242724]">
      <ClientHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <ClientProfile />
      </main>
    </div>
  );
}
