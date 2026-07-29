"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import type { ChatMessage, ContractMessage, Conversation } from "./types";

type ConversationPanelProps = {
  conversation: Conversation;
  onBack: () => void;
  onSend: (
    text: string,
    attachment?: { name: string; size: string; type?: string },
  ) => void;
  onContractDecision: (
    messageId: number,
    status: ContractMessage["status"],
  ) => void;
};

const milestoneLabels = {
  funded: "Funded",
  submitted: "Submitted",
  "changes-requested": "Changes requested",
  approved: "Approved",
};

function EventCard({
  item,
  onContractDecision,
}: {
  item: Exclude<ChatMessage, { kind: "text" }>;
  onContractDecision: ConversationPanelProps["onContractDecision"];
}) {
  if (item.kind === "proposal") {
    return (
      <article className="w-full rounded-2xl border border-black/8 bg-white p-4 shadow-[0_8px_24px_rgba(32,39,31,0.05)]">
        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-[#62805f] uppercase">
          <Icon icon="solar:document-text-linear" width="17" />
          Proposal submitted
        </div>
        <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
        <p className="mt-2 text-xs leading-5 text-[#737970]">{item.coverLetter}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
          <span><b>{item.bid}</b> bid</span>
          <span><b>{item.duration}</b> duration</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <span key={skill} className="rounded-lg bg-[#f0f3ee] px-2 py-1 text-[10px] text-[#657064]">{skill}</span>
          ))}
        </div>
        <button type="button" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#52784f]">
          View proposal <Icon icon="solar:arrow-right-up-linear" width="14" />
        </button>
      </article>
    );
  }

  if (item.kind === "meeting") {
    return (
      <article className="w-full rounded-2xl border border-[#d9e8d5] bg-[#f2f7ef] p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#52784f]">
            <Icon icon="solar:videocamera-record-linear" width="21" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-[#62805f] uppercase">Project meeting</p>
            <h3 className="mt-1 text-sm font-semibold">{item.title}</h3>
            <p className="mt-1 text-xs text-[#737970]">{item.schedule}</p>
          </div>
          <a href={item.meetingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-[#252724] px-3 text-xs font-semibold text-white">
            Join meeting <Icon icon="solar:arrow-right-up-linear" width="14" />
          </a>
        </div>
      </article>
    );
  }

  if (item.kind === "contract") {
    const pending = item.status === "pending";
    return (
      <article className={`w-full rounded-2xl border p-4 ${item.status === "accepted" ? "border-[#cfe2ca] bg-[#f1f7ef]" : item.status === "declined" ? "border-[#ead7d5] bg-[#fff8f7]" : "border-[#dfe4da] bg-white"}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-[#62805f] uppercase">
            <Icon icon="solar:case-round-linear" width="18" />
            Contract offer
          </div>
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold capitalize shadow-sm">{item.status === "pending" ? "Awaiting your response" : item.status}</span>
        </div>
        <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-black/[0.025] p-3 text-xs">
          <span><small className="block text-[#858a82]">Fixed budget</small><b>{item.budget}</b></span>
          <span><small className="block text-[#858a82]">Duration</small><b>{item.duration}</b></span>
        </div>
        {pending && (
          <>
            <p className="mt-3 text-[11px] leading-5 text-[#737970]">The contract only becomes active after you accept this offer.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => onContractDecision(item.id, "accepted")} className="h-9 rounded-xl bg-[#252724] px-4 text-xs font-semibold text-white">Accept contract</button>
              <button type="button" onClick={() => onContractDecision(item.id, "declined")} className="h-9 rounded-xl border border-black/10 px-4 text-xs font-semibold">Decline</button>
            </div>
          </>
        )}
        {item.status === "accepted" && <p className="mt-3 text-xs font-semibold text-[#52784f]">Contract active · You can now begin the funded work.</p>}
        {item.status === "declined" && <p className="mt-3 text-xs text-[#9a5953]">You declined this contract offer.</p>}
      </article>
    );
  }

  if (item.kind === "milestone") {
    return (
      <article className="w-full rounded-2xl border border-black/8 bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-[#62805f] uppercase">
            <Icon icon="solar:flag-2-linear" width="17" /> Milestone update
          </span>
          <span className="rounded-full bg-[#edf4ea] px-2.5 py-1 text-[10px] font-semibold text-[#52784f]">{milestoneLabels[item.status]}</span>
        </div>
        <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>
        <div className="mt-2 flex gap-4 text-xs text-[#737970]"><b className="text-[#2d312d]">{item.amount}</b><span>Due {item.dueDate}</span></div>
        {item.note && <p className="mt-3 border-t border-black/6 pt-3 text-xs leading-5 text-[#737970]">{item.note}</p>}
      </article>
    );
  }

  return (
    <article className={`w-full rounded-2xl border p-4 ${item.status === "released" ? "border-[#cfe2ca] bg-[#f1f7ef]" : "border-[#e5e1cf] bg-[#faf8ef]"}`}>
      <div className="flex gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#52784f]">
          <Icon icon={item.status === "released" ? "solar:wallet-money-linear" : "solar:shield-check-linear"} width="21" />
        </span>
        <div>
          <p className="text-[10px] font-semibold tracking-[0.12em] text-[#62805f] uppercase">{item.status === "released" ? "Payment released" : "Escrow funded"}</p>
          <h3 className="mt-1 text-sm font-semibold">{item.title} · {item.amount}</h3>
          <p className="mt-1 text-xs leading-5 text-[#737970]">{item.description}</p>
        </div>
      </div>
    </article>
  );
}

function ReplyPreview({
  messages,
  replyToId,
  dark,
}: {
  messages: ChatMessage[];
  replyToId: number;
  dark: boolean;
}) {
  const repliedMessage = messages.find((item) => item.id === replyToId);
  return (
    <div
      className={`mb-2 rounded-lg border-l-3 px-3 py-2 ${
        dark
          ? "border-[#9fbd9b] bg-white/10"
          : "border-[#6f966b] bg-white/70"
      }`}
    >
      <p
        className={`text-[9px] font-semibold tracking-wide uppercase ${
          dark ? "text-white/65" : "text-[#52784f]"
        }`}
      >
        Replying to proposal
      </p>
      <p className="mt-0.5 max-w-64 truncate text-[10px] font-medium opacity-75">
        {repliedMessage?.kind === "proposal"
          ? repliedMessage.title
          : "Previous message"}
      </p>
    </div>
  );
}

export function ConversationPanel({
  conversation,
  onBack,
  onSend,
  onContractDecision,
}: ConversationPanelProps) {
  const [message, setMessage] = useState("");
  const [declineId, setDeclineId] = useState<number | null>(null);
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  const submit = () => {
    const text = message.trim();
    if (!text) return;
    onSend(text);
    setMessage("");
  };

  const decideContract: ConversationPanelProps["onContractDecision"] = (id, status) => {
    if (status === "declined") {
      setDeclineId(id);
      return;
    }
    onContractDecision(id, status);
  };

  const chooseFile = (file?: File) => {
    setSelectedFile(null);
    setFileError("");
    if (!file) return;
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Use PDF, DOCX, PNG, JPG, or TXT files only.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError("The maximum attachment size is 10 MB.");
      return;
    }
    setSelectedFile(file);
  };

  const attachFile = () => {
    if (!selectedFile) return;
    onSend(message.trim() || "Shared an attachment.", {
      name: selectedFile.name,
      size: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
      type: selectedFile.type,
    });
    setMessage("");
    setSelectedFile(null);
    setAttachmentOpen(false);
  };

  return (
    <>
      <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-black/8 bg-white">
        <header className="flex items-center gap-3 border-b border-black/7 px-4 py-3.5 sm:px-5">
          <button type="button" onClick={onBack} aria-label="Back to inbox" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-black/4 lg:hidden">
            <Icon icon="solar:arrow-left-linear" width="20" />
          </button>
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#496e67] text-xs font-semibold text-white">
            {conversation.initials}
            {conversation.online && <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-[#64a665]" />}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold">{conversation.client}</h2>
            <p className="truncate text-[11px] text-[#777d75]">{conversation.online ? "Online" : conversation.company}</p>
          </div>
          <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 text-xs font-semibold hover:bg-black/3 sm:px-4">
            <Icon icon="solar:videocamera-record-linear" width="18" />
            <span className="hidden sm:inline">Create meeting</span>
            <Icon icon="solar:arrow-right-up-linear" width="14" className="hidden sm:block" />
          </a>
        </header>

        <div className="flex items-center justify-between border-b border-black/6 bg-[#fafbf9] px-5 py-2.5 text-[11px]">
          <span className="min-w-0 truncate text-[#737870]">{conversation.project}</span>
          <button type="button" className="ml-3 shrink-0 cursor-pointer font-semibold text-[#52784f] hover:underline">View proposal</button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto bg-[#fbfcfa] p-4 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-black/7" />
            <span className="text-[10px] font-medium text-[#999d96]">Project activity</span>
            <span className="h-px flex-1 bg-black/7" />
          </div>
          <div className="grid gap-4">
            {conversation.messages.map((item) => (
              <div key={item.id} className={`flex ${item.kind === "text" && item.sender === "me" ? "justify-end" : "justify-start"}`}>
                {item.kind === "text" ? (
                  <div className={`max-w-[82%] sm:max-w-[70%] ${item.sender === "me" ? "items-end" : "items-start"}`}>
                    <div className={`rounded-2xl px-4 py-3 text-sm leading-6 ${item.sender === "me" ? "rounded-br-md bg-[#252724] text-white" : "rounded-bl-md bg-[#eef2ec] text-[#343833]"}`}>
                      {item.replyToId && (
                        <ReplyPreview
                          messages={conversation.messages}
                          replyToId={item.replyToId}
                          dark={item.sender === "me"}
                        />
                      )}
                      {item.text}
                      {item.attachment && (
                        <button type="button" className={`mt-3 flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-left ${item.sender === "me" ? "bg-white/10" : "bg-white"}`}>
                          <Icon icon="solar:file-text-linear" width="21" />
                          <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold">{item.attachment.name}</span><span className="block text-[10px] opacity-60">{item.attachment.size}</span></span>
                          <Icon icon="solar:download-minimalistic-linear" width="18" />
                        </button>
                      )}
                    </div>
                    <p className={`mt-1 text-[10px] text-[#9a9e97] ${item.sender === "me" ? "text-right" : "text-left"}`}>{item.time}</p>
                  </div>
                ) : (
                  <div className="w-full">
                    <EventCard item={item} onContractDecision={decideContract} />
                    <p className="mt-1 text-[10px] text-[#9a9e97]">{item.time}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <footer className="border-t border-black/7 p-3 sm:p-4">
          <div className="flex items-end gap-2 rounded-2xl border border-black/9 bg-[#fbfcfa] p-2">
            <button type="button" onClick={() => setAttachmentOpen(true)} aria-label="Attach a file" className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#686e66] hover:bg-black/4"><Icon icon="solar:paperclip-linear" width="20" /></button>
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); submit(); } }} rows={1} placeholder="Reply about this project…" className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none" />
            <button type="button" onClick={submit} disabled={!message.trim()} aria-label="Send message" className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#252724] text-white disabled:cursor-not-allowed disabled:opacity-35"><Icon icon="solar:plain-2-bold" width="18" /></button>
          </div>
        </footer>
      </section>

      {declineId !== null && (
        <div className="fixed inset-0 z-80 grid place-items-center bg-[#1e231e]/45 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1ef] text-[#9a5953]"><Icon icon="solar:close-circle-linear" width="23" /></span>
            <h2 className="mt-4 text-xl font-semibold">Decline contract offer?</h2>
            <p className="mt-2 text-sm leading-6 text-[#737970]">This offer will be marked as declined and the contract will not become active.</p>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setDeclineId(null)} className="h-10 rounded-xl border border-black/10 px-4 text-sm font-semibold">Keep offer</button>
              <button type="button" onClick={() => { onContractDecision(declineId, "declined"); setDeclineId(null); }} className="h-10 rounded-xl bg-[#9a5953] px-4 text-sm font-semibold text-white">Decline offer</button>
            </div>
          </div>
        </div>
      )}
      {attachmentOpen && (
        <div className="fixed inset-0 z-90 grid place-items-center bg-[#1e231e]/45 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf4ea] text-[#52784f]"><Icon icon="solar:paperclip-linear" width="23" /></span>
              <button type="button" onClick={() => { setAttachmentOpen(false); setSelectedFile(null); setFileError(""); }} aria-label="Close attachment modal" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/8"><Icon icon="solar:close-circle-linear" width="19" /></button>
            </div>
            <h2 className="mt-4 text-xl font-semibold">Add an attachment</h2>
            <p className="mt-2 text-sm leading-6 text-[#737970]">Review the file before sharing it with the client.</p>
            <label className="mt-5 flex cursor-pointer flex-col items-center rounded-2xl border border-dashed border-black/15 bg-[#fafbf9] px-5 py-8 text-center">
              <Icon icon="solar:upload-minimalistic-linear" width="25" className="text-[#52784f]" />
              <span className="mt-2 text-sm font-semibold">Choose a file</span>
              <span className="mt-1 text-[11px] text-[#858a82]">PDF, DOCX, PNG, JPG, or TXT · Maximum 10 MB</span>
              <input type="file" accept=".pdf,.docx,.png,.jpg,.jpeg,.txt" className="sr-only" onChange={(event) => chooseFile(event.target.files?.[0])} />
            </label>
            {selectedFile && (
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#f0f3ee] p-3">
                <Icon icon="solar:file-text-linear" width="21" />
                <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{selectedFile.name}</p><p className="mt-0.5 text-[10px] text-[#858a82]">{(selectedFile.size / 1024 / 1024).toFixed(1)} MB</p></div>
                <Icon icon="solar:check-circle-bold" width="19" className="text-[#5d8759]" />
              </div>
            )}
            {fileError && <p role="alert" className="mt-3 text-xs font-medium text-[#9a5953]">{fileError}</p>}
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => { setAttachmentOpen(false); setSelectedFile(null); setFileError(""); }} className="h-10 rounded-xl border border-black/10 px-4 text-sm font-semibold">Cancel</button>
              <button type="button" onClick={attachFile} disabled={!selectedFile} className="h-10 rounded-xl bg-[#252724] px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-35">Attach file</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
