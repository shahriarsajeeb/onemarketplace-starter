"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Category =
  | "Proposals"
  | "Contracts"
  | "Messages"
  | "Payments"
  | "Account";

type Notification = {
  id: number;
  icon: string;
  title: string;
  description: string;
  time: string;
  date: "Today" | "Yesterday" | "Earlier";
  href: string;
  category: Category;
  unread: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    icon: "solar:users-group-rounded-linear",
    title: "New proposal received",
    description:
      "Northstar Digital applied to your collaborative workspace project.",
    time: "8 minutes ago",
    date: "Today",
    href: "/proposals",
    category: "Proposals",
    unread: true,
  },
  {
    id: 2,
    icon: "solar:flag-linear",
    title: "Milestone submitted",
    description:
      "The collaboration milestone is ready for your review and approval.",
    time: "42 minutes ago",
    date: "Today",
    href: "/contracts",
    category: "Contracts",
    unread: true,
  },
  {
    id: 3,
    icon: "solar:chat-round-dots-linear",
    title: "New message from Shahriar",
    description: "The responsive dashboard build is ready for review.",
    time: "2 hours ago",
    date: "Today",
    href: "/messages",
    category: "Messages",
    unread: true,
  },
  {
    id: 4,
    icon: "solar:shield-check-linear",
    title: "Escrow funding confirmed",
    description:
      "$12,000 is protected for the collaboration milestone.",
    time: "Yesterday",
    date: "Yesterday",
    href: "/contracts",
    category: "Payments",
    unread: false,
  },
  {
    id: 5,
    icon: "solar:case-round-linear",
    title: "Contract offer accepted",
    description:
      "Northstar Digital accepted your offer and the contract is now active.",
    time: "Yesterday",
    date: "Yesterday",
    href: "/contracts",
    category: "Contracts",
    unread: false,
  },
  {
    id: 6,
    icon: "solar:verified-check-linear",
    title: "Identity verification required",
    description: "Complete the secure Stripe Identity check before your first hire.",
    time: "July 25",
    date: "Earlier",
    href: "/settings?section=verifications",
    category: "Account",
    unread: false,
  },
];

const filters = [
  "All",
  "Proposals",
  "Contracts",
  "Messages",
  "Payments",
  "Account",
] as const;

export function ClientNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [search, setSearch] = useState("");

  const unreadCount = notifications.filter((item) => item.unread).length;
  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return notifications.filter(
      (item) =>
        (filter === "All" || item.category === filter) &&
        (!unreadOnly || item.unread) &&
        (!query ||
          `${item.title} ${item.description} ${item.category}`
            .toLowerCase()
            .includes(query)),
    );
  }, [filter, notifications, search, unreadOnly]);

  const grouped = visible.reduce<Record<string, Notification[]>>(
    (result, item) => {
      (result[item.date] ??= []).push(item);
      return result;
    },
    {},
  );

  const markRead = (id: number) =>
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    );

  return (
    <>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[.14em] text-[#62805f] uppercase">
            Activity center
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
            Notifications
          </h1>
          <p className="mt-2 text-sm text-[#72776f]">
            Review hiring, contract, payment, and account updates.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={() =>
              setNotifications((current) =>
                current.map((item) => ({ ...item, unread: false })),
              )
            }
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold hover:bg-black/3"
          >
            <Icon icon="solar:check-read-linear" width="19" />
            Mark all as read
          </button>
        )}
      </div>

      <section className="mt-8 overflow-hidden rounded-2xl border border-black/8 bg-white">
        <div className="flex flex-col gap-4 border-b border-black/7 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-1 overflow-x-auto">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold ${
                  filter === item
                    ? "bg-[#edf4ea] text-[#4e774b]"
                    : "text-[#747971] hover:bg-black/3"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              aria-pressed={unreadOnly}
              onClick={() => setUnreadOnly((current) => !current)}
              className={`h-10 rounded-xl px-3 text-xs font-semibold ${
                unreadOnly
                  ? "bg-[#252724] text-white"
                  : "border border-black/9 text-[#6e736c]"
              }`}
            >
              Unread only {unreadCount > 0 && `(${unreadCount})`}
            </button>
            <label className="flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 sm:w-64">
              <Icon
                icon="solar:magnifer-linear"
                width="18"
                className="text-[#7b8078]"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search notifications"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </label>
          </div>
        </div>

        {Object.entries(grouped).map(([date, items]) => (
          <section key={date}>
            <h2 className="border-b border-black/6 bg-[#fafbf9] px-5 py-3 text-[11px] font-semibold tracking-[.12em] text-[#7c8179] uppercase">
              {date}
            </h2>
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex gap-4 border-b border-black/6 px-5 py-5 last:border-b-0 sm:px-6 ${
                  item.unread ? "bg-[#f4f8f2]" : "bg-white"
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/6 bg-white text-[#52784f]">
                  <Icon icon={item.icon} width="21" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    {item.unread && (
                      <span className="h-2 w-2 rounded-full bg-[#5f8d5c]" />
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-[#71766e]">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <Link
                      href={item.href}
                      onClick={() => markRead(item.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#4e774b] hover:underline"
                    >
                      View {item.category.toLowerCase()}
                      <Icon
                        icon="solar:arrow-right-up-linear"
                        width="14"
                      />
                    </Link>
                    <span className="text-[11px] text-[#949990]">
                      {item.time}
                    </span>
                  </div>
                </div>
                {item.unread && (
                  <button
                    type="button"
                    onClick={() => markRead(item.id)}
                    aria-label={`Mark ${item.title} as read`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#71766e] hover:bg-white hover:text-[#4e774b]"
                  >
                    <Icon icon="solar:check-read-linear" width="19" />
                  </button>
                )}
              </div>
            ))}
          </section>
        ))}

        {!visible.length && (
          <div className="px-6 py-20 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4ea] text-[#52784f]">
              <Icon icon="solar:bell-off-linear" width="27" />
            </span>
            <h2 className="mt-4 font-semibold">No notifications found</h2>
            <p className="mt-2 text-sm text-[#7c8179]">
              Try another filter or search term.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
