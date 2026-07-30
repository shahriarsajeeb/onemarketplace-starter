import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { AgencyHeader } from "../../_components/dashboard/agency-header";
import { ProfilePanel } from "../../_components/settings/settings-panels";

export const metadata: Metadata = {
  title: "Set Up Agency Profile | OneMarketplace.io",
  description:
    "Set up your agency identity, positioning, specialties, and portfolio.",
};

export default function EditAgencyProfilePage() {
  return (
    <div className="min-h-svh bg-[#f4f6f2] text-[#242724]">
      <AgencyHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">
              Agency onboarding
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Set up agency profile
            </h1>
            <p className="mt-2 text-sm text-[#72776f]">
              Complete the information clients will see across the marketplace.
            </p>
          </div>
          <Link
            href="/profile"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold"
          >
            Preview profile
            <Icon icon="solar:arrow-right-up-linear" width="18" />
          </Link>
        </div>
        <ProfilePanel />
      </main>
    </div>
  );
}
