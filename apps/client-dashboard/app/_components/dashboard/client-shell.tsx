import { ClientHeader } from "./client-header";
import { ClientSidebar } from "./client-sidebar";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-[#f4f6f2] text-[#242724]">
      <ClientHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <div className="grid items-start gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
          <ClientSidebar />
          <div className="min-w-0">{children}</div>
        </div>
      </main>
    </div>
  );
}
