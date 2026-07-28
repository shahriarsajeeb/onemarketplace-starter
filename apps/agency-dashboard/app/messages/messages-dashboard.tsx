"use client";

import { useMemo, useState } from "react";
import { AgencyShell } from "../_components/dashboard/agency-shell";
import { ConversationPanel } from "../_components/messages/conversation-panel";
import { InboxList } from "../_components/messages/inbox-list";
import { initialAgencyConversations } from "../_components/messages/messages-data";
import type { AgencyConversation } from "../_components/messages/types";
import { Icon } from "../_components/ui/icon";

export function MessagesDashboard() {
  const [conversations, setConversations] = useState(
    initialAgencyConversations,
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const selected =
    conversations.find((conversation) => conversation.id === selectedId) ??
    null;

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return conversations.filter(
      (conversation) =>
        !query ||
        `${conversation.client} ${conversation.company} ${conversation.contextTitle}`
          .toLowerCase()
          .includes(query),
    );
  }, [conversations, search]);

  const selectConversation = (conversation: AgencyConversation) => {
    setSelectedId(conversation.id);
    setConversations((current) =>
      current.map((item) =>
        item.id === conversation.id ? { ...item, unread: 0 } : item,
      ),
    );
  };

  const sendMessage = (text: string) => {
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
                  sender: "agency" as const,
                  text,
                  time: "Now",
                },
              ],
            }
          : conversation,
      ),
    );
  };

  const unreadCount = conversations.reduce(
    (total, conversation) => total + conversation.unread,
    0,
  );

  return (
    <AgencyShell>
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
          {unreadCount} unread {unreadCount === 1 ? "message" : "messages"}
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
            />
          ) : (
            <section className="grid h-full min-h-0 place-items-center rounded-2xl border border-black/8 bg-white p-8 text-center">
              <div>
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#edf4ea] text-[#52784f]">
                  <Icon name="message" size={31} />
                </span>
                <h2 className="mt-5 text-lg font-semibold">
                  Select a conversation
                </h2>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#7b8078]">
                  Choose a client conversation to view messages, share files,
                  or create a project meeting.
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </AgencyShell>
  );
}
