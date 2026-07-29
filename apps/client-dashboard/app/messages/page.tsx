import type { Metadata } from "next";
import { ClientShell } from "../_components/dashboard/client-shell";
import { MessagesDashboard } from "../_components/messages/messages-dashboard";

export const metadata: Metadata = { title: "Messages", description: "Communicate with freelancers and agencies connected to your jobs and contracts." };

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ person?: string; action?: string }>;
}) {
  const { person, action } = await searchParams;

  return (
    <ClientShell>
      <MessagesDashboard initialPerson={person} initialAction={action} />
    </ClientShell>
  );
}
