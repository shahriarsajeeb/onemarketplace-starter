import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Link from "next/link";
import { AgencyHeader } from "../_components/dashboard/agency-header";
import { FeaturedMembers } from "../_components/profile/featured-members";
import { ReviewsList } from "../_components/profile/reviews-list";
import {
  agencyPortfolio,
  agencySpecialties,
} from "../_components/profile/profile-data";

export const metadata: Metadata = {
  title: "Northstar Digital Agency Profile | OneMarketplace.io",
  description:
    "Preview Northstar Digital’s public agency profile, specialists, work, and client reviews.",
};

export default function AgencyProfilePage() {
  return (
    <div className="min-h-svh bg-[#f4f6f2] text-[#242724]">
      <AgencyHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">
            Public agency profile
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Northstar Digital
          </h1>
          <p className="mt-2 text-sm text-[#72776f]">
            This is how clients see your agency on OneMarketplace.io.
          </p>
        </div>
        <Link
          href="/profile/edit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#252724] px-5 text-sm font-semibold text-white"
        >
          <Icon icon="solar:pen-2-linear" width="18" />
          Edit agency profile
        </Link>
      </div>

      <div className="mt-8 grid items-start gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="grid gap-5 xl:sticky xl:top-24">
          <section className="rounded-2xl border border-black/8 bg-white p-6 text-center">
            <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[#496e67] text-2xl font-semibold text-white">
              ND
            </span>
            <h2 className="mt-5 text-xl font-semibold">Northstar Digital</h2>
            <p className="mt-1 text-sm text-[#757b73]">
              Product engineering agency
            </p>
            <div className="mt-3 flex justify-center text-xs text-[#7b8078]">
              <span className="inline-flex max-w-52 items-start gap-1.5 text-center">
                <Icon
                  icon="solar:map-point-linear"
                  width="16"
                  className="mt-px shrink-0"
                />
                <span>Chiang Mai, Thailand</span>
              </span>
            </div>
            <div className="mt-6 grid grid-cols-3 border-t border-black/7 py-4">
              <Stat value="98%" label="Success" />
              <Stat value="4.9" label="Rating" bordered />
              <Stat value="38" label="Projects" />
            </div>
          </section>

          <section className="rounded-2xl border border-black/8 bg-white p-5">
            <h2 className="text-sm font-semibold">Agency details</h2>
            <dl className="mt-4 grid gap-4 text-xs">
              <Detail label="Team size" value="8 specialists" />
              <Detail label="Founded" value="2022" />
              <Detail label="Response time" value="Within 4 hours" />
              <Detail label="Languages" value="English, Bengali" />
            </dl>
          </section>
        </aside>

        <div className="grid min-w-0 gap-6">
          <section className="overflow-hidden rounded-2xl border border-black/8 bg-white">
            <div className="bg-[radial-gradient(circle_at_82%_18%,rgba(151,195,145,.35),transparent_34%),linear-gradient(135deg,#e5efe2,#f8faf6)] p-6 sm:p-9">
              <p className="text-xs font-semibold tracking-[0.13em] text-[#62805f] uppercase">
                Available for selected projects
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                A senior product team for ambitious digital products.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-[#687067]">
                We partner with product teams to design and build dependable web
                applications—from strategy and prototypes through scalable
                engineering and launch. Clients work with one accountable agency
                backed by a focused roster of specialists.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {agencySpecialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="rounded-full bg-white/85 px-3 py-2 text-xs font-medium text-[#527052]"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <ProfileSection
            eyebrow="Selected work"
            title="Agency portfolio"
            detail="3 featured projects"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {agencyPortfolio.map((project) => (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-xl border border-black/7"
                >
                  <div
                    className={`flex aspect-[1.5] items-center justify-center ${project.tone}`}
                  >
                    <Icon
                      icon={project.icon}
                      width="42"
                      className="text-[#46645a]"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-medium text-[#758076]">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-sm font-semibold leading-5">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-xs text-[#52784f]">
                      {project.result}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </ProfileSection>

          <ProfileSection
            eyebrow="Our specialists"
            title="Featured agency members"
            detail="8 agency members"
          >
            <FeaturedMembers />
          </ProfileSection>

          <ProfileSection
            eyebrow="Client feedback"
            title="Recent reviews"
            detail="6 verified reviews · 4.9 average"
          >
            <ReviewsList />
          </ProfileSection>
        </div>
      </div>
      </main>
    </div>
  );
}

function ProfileSection({
  eyebrow,
  title,
  detail,
  children,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/8 bg-white p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.13em] text-[#62805f] uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-xs text-[#8a8f87]">{detail}</p>
      </div>
      {children}
    </section>
  );
}

function Stat({
  value,
  label,
  bordered = false,
}: {
  value: string;
  label: string;
  bordered?: boolean;
}) {
  return (
    <div className={bordered ? "border-x border-black/7" : ""}>
      <dt className="text-base font-semibold">{value}</dt>
      <dd className="mt-1 text-[10px] text-[#8a8f87]">{label}</dd>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-[#898e86]">{label}</dt>
      <dd className="text-right font-medium text-[#3f443e]">{value}</dd>
    </div>
  );
}
