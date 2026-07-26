"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import type { Conversation } from "./types";

type ConversationPanelProps = {
  conversation: Conversation;
  onBack: () => void;
  onSend: (text: string) => void;
};

export function ConversationPanel({
  conversation,
  onBack,
  onSend,
}: ConversationPanelProps) {
  const [message, setMessage] = useState("");

  const submit = () => {
    const text = message.trim();
    if (!text) return;
    onSend(text);
    setMessage("");
  };

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-black/8 bg-white">
      <header className="flex items-center gap-3 border-b border-black/7 px-4 py-3.5 sm:px-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to inbox"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-black/4 lg:hidden"
        >
          <Icon icon="solar:arrow-left-linear" width="20" />
        </button>
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#496e67] text-xs font-semibold text-white">
          {conversation.initials}
          {conversation.online && (
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-[#64a665]" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold">
            {conversation.client}
          </h2>
          <p className="truncate text-[11px] text-[#777d75]">
            {conversation.online ? "Online" : conversation.company}
          </p>
        </div>
        <a
          href="https://meet.google.com/new"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 text-xs font-semibold hover:bg-black/3 sm:px-4"
        >
          <Icon icon="solar:videocamera-record-linear" width="18" />
          <span className="hidden sm:inline">Create meeting</span>
          <Icon
            icon="solar:arrow-right-up-linear"
            width="14"
            className="hidden sm:block"
          />
        </a>
      </header>

      <div className="flex items-center justify-between border-b border-black/6 bg-[#fafbf9] px-5 py-2.5 text-[11px]">
        <span className="min-w-0 truncate text-[#737870]">
          {conversation.project}
        </span>
        <button
          type="button"
          className="cursor-pointer ml-3 shrink-0 font-semibold text-[#52784f] hover:underline"
        >
          View proposal
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-black/7" />
          <span className="text-[10px] font-medium text-[#999d96]">Today</span>
          <span className="h-px flex-1 bg-black/7" />
        </div>
        <div className="grid gap-4">
          {conversation.messages.map((item) => (
            <div
              key={item.id}
              className={`flex ${item.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] sm:max-w-[70%] ${item.sender === "me" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                    item.sender === "me"
                      ? "rounded-br-md bg-[#252724] text-white"
                      : "rounded-bl-md bg-[#eef2ec] text-[#343833]"
                  }`}
                >
                  {item.text}
                  {item.attachment && (
                    <button
                      type="button"
                      className={`mt-3 flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-left ${
                        item.sender === "me" ? "bg-white/10" : "bg-white"
                      }`}
                    >
                      <Icon icon="solar:file-text-linear" width="21" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold">
                          {item.attachment.name}
                        </span>
                        <span
                          className={`block text-[10px] ${item.sender === "me" ? "text-white/60" : "text-[#8b9088]"}`}
                        >
                          {item.attachment.size}
                        </span>
                      </span>
                      <Icon
                        icon="solar:download-minimalistic-linear"
                        width="18"
                      />
                    </button>
                  )}
                </div>
                <p
                  className={`mt-1 text-[10px] text-[#9a9e97] ${item.sender === "me" ? "text-right" : "text-left"}`}
                >
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-black/7 p-3 sm:p-4">
        <div className="flex items-end gap-2 rounded-2xl border border-black/9 bg-[#fbfcfa] p-2">
          <button
            type="button"
            aria-label="Attach a file"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#686e66] hover:bg-black/4"
          >
            <Icon icon="solar:paperclip-linear" width="20" />
          </button>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit();
              }
            }}
            rows={1}
            placeholder="Write a message…"
            className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!message.trim()}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#252724] text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Icon icon="solar:plain-2-bold" width="18" />
          </button>
        </div>
        <p className="mt-2 hidden text-center text-[10px] text-[#9a9e97] sm:block">
          Press Enter to send · Shift + Enter for a new line
        </p>
      </footer>
    </section>
  );
}
