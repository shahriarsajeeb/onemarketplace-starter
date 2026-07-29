"use client";

import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
import { DashboardHeader } from "../_components/dashboard/dashboard-header";
import { WorkspaceSidebar } from "../_components/dashboard/workspace-sidebar";
import { ConversationPanel } from "../_components/messages/conversation-panel";
import { InboxList } from "../_components/messages/inbox-list";
import { initialConversations } from "../_components/messages/messages-data";
import type { Conversation } from "../_components/messages/types";
import type { ContractMessage } from "../_components/messages/types";

export function MessagesDashboard() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const selected =
    conversations.find((conversation) => conversation.id === selectedId) ?? null;

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return conversations.filter(
      (conversation) =>
        !query ||
        `${conversation.client} ${conversation.company} ${conversation.project}`
          .toLowerCase()
          .includes(query),
    );
  }, [conversations, search]);

  const selectConversation = (conversation: Conversation) => {
    setSelectedId(conversation.id);
    setConversations((current) =>
      current.map((item) =>
        item.id === conversation.id ? { ...item, unread: 0 } : item,
      ),
    );
  };

  const sendMessage = (
    text: string,
    attachment?: { name: string; size: string; type?: string },
  ) => {
    if (!selectedId) return;
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              lastMessage: text,
              lastMessageTime: "Now",
              messages: [
                ...conversation.messages,
                {
                  id: Date.now(),
                  kind: "text" as const,
                  sender: "me" as const,
                  text,
                  time: "Now",
                  attachment,
                },
              ],
            }
          : conversation,
      ),
    );
  };

  const decideContract = (
    messageId: number,
    status: ContractMessage["status"],
  ) => {
    if (!selectedId) return;
    setConversations((current) =>
      current.map((conversation) => {
        if (conversation.id !== selectedId) return conversation;
        const accepted = status === "accepted";
        return {
          ...conversation,
          lastMessage: accepted
            ? "Contract offer accepted. Contract is now active."
            : "Contract offer declined.",
          lastMessageTime: "Now",
          messages: conversation.messages.map((item) =>
            item.id === messageId && item.kind === "contract"
              ? { ...item, status }
              : item,
          ),
        };
      }),
    );
  };

  return (
    <div className="min-h-svh bg-[#f4f6f2] font-(family-name:--font-dm-sans) text-[#242724]">
      <DashboardHeader />
      <main className="mx-auto max-w-360 px-5 py-6 sm:px-8 lg:py-8">
        <div className="grid items-start gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
          <div className="hidden xl:block">
            <WorkspaceSidebar />
          </div>

          <div className="min-w-0">
            <div className="mb-5 hidden items-end justify-between lg:flex">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">
                  Client communication
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em]">
                  Inbox
                </h1>
              </div>
              <p className="text-xs text-[#7b8078]">
                {conversations.reduce((count, item) => count + item.unread, 0)} unread messages
              </p>
            </div>

            <div className="grid h-[calc(100svh-7.5rem)] min-h-160 items-stretch gap-4 lg:h-[calc(100svh-15.5rem)] lg:grid-cols-[330px_minmax(0,1fr)]">
              <div className={`min-h-0 ${selected ? "hidden lg:block" : "block"}`}>
                <InboxList
                  conversations={filtered}
                  activeId={selectedId}
                  search={search}
                  onSearch={setSearch}
                  onSelect={selectConversation}
                />
              </div>

              <div className={`min-h-0 ${selected ? "block" : "hidden lg:block"}`}>
                {selected ? (
                  <ConversationPanel
                    conversation={selected}
                    onBack={() => setSelectedId(null)}
                    onSend={sendMessage}
                    onContractDecision={decideContract}
                  />
                ) : (
                  <section className="grid h-full min-h-0 place-items-center rounded-2xl border border-black/8 bg-white p-8 text-center">
                    <div>
                      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#edf4ea] text-[#52784f]">
                        <Icon icon="solar:chat-round-dots-linear" width="31" />
                      </span>
                      <h2 className="mt-5 text-lg font-semibold">Select a conversation</h2>
                      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#7b8078]">
                        Choose a client from your inbox to view messages, share files, or create a project meeting.
                      </p>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
