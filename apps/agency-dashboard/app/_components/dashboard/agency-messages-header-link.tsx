"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { initialAgencyConversations } from "../messages/messages-data";
import { Icon } from "../ui/icon";

export function AgencyMessagesHeaderLink() {
  const pathname = usePathname();
  const unreadCount = initialAgencyConversations.reduce(
    (total, conversation) => total + conversation.unread,
    0,
  );
  const active = pathname === "/messages";

  return (
    <Link
      href="/messages"
      aria-label={`Messages${unreadCount ? `, ${unreadCount} unread` : ""}`}
      className={`relative hidden h-10 w-10 items-center justify-center rounded-full transition sm:flex ${
        active
          ? "bg-[#edf4ea] text-[#4e774b]"
          : "text-[#60655e] hover:bg-black/5"
      }`}
    >
      <Icon name="message" size={22} active={active} />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-[#5f8d5c] px-1 text-[8px] font-bold text-white">
          {unreadCount}
        </span>
      )}
    </Link>
  );
}
