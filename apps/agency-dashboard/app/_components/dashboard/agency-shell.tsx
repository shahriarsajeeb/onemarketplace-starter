import { AgencyHeader } from "./agency-header";
import { AgencySidebar } from "./agency-sidebar";

export function AgencyShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-[#f4f6f2] text-[#242724]">
      <AgencyHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <div className="grid items-start gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
          <AgencySidebar />
          <div className="min-w-0">{children}</div>
        </div>
      </main>
    </div>
  );
}
