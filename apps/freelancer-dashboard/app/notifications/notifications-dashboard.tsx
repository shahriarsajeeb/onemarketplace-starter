"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DashboardHeader } from "../_components/dashboard/dashboard-header";
import { WorkspaceSidebar } from "../_components/dashboard/workspace-sidebar";
import { dashboardNotifications } from "../_components/notifications/notifications-data";
import type { DashboardNotification } from "../_components/notifications/types";

const filters = ["All", "Contracts", "Proposals", "Messages", "Payments", "Account"];

export function NotificationsDashboard() {
  const [notifications, setNotifications] = useState(dashboardNotifications);
  const [filter, setFilter] = useState("All");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return notifications.filter(
      (notification) =>
        (filter === "All" || notification.category === filter) &&
        (!unreadOnly || notification.unread) &&
        (!query ||
          `${notification.title} ${notification.description} ${notification.category}`
            .toLowerCase()
            .includes(query)),
    );
  }, [filter, notifications, search, unreadOnly]);

  const unreadCount = notifications.filter((item) => item.unread).length;
  const grouped = visible.reduce<Record<string, DashboardNotification[]>>(
    (result, notification) => {
      (result[notification.date] ??= []).push(notification);
      return result;
    },
    {},
  );

  const markRead = (id: number) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, unread: false } : item)),
    );
  };

  return (
    <div className="min-h-svh bg-[#f4f6f2] font-(family-name:--font-dm-sans) text-[#242724]">
      <DashboardHeader />
      <main className="mx-auto max-w-360 px-5 py-8 sm:px-8 lg:py-10">
        <div className="grid items-start gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
          <WorkspaceSidebar />
          <div className="min-w-0">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[#62805f] uppercase">Activity center</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Notifications</h1>
                <p className="mt-2 text-sm text-[#72776f]">
                  Stay on top of contracts, proposals, payments, and client messages.
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
                  className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold hover:bg-black/3"
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
                      className={`shrink-0 cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold ${
                        filter === item
                          ? "bg-[#edf4ea] text-[#4e774b]"
                          : "text-[#747971] hover:bg-black/3"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    aria-pressed={unreadOnly}
                    onClick={() => setUnreadOnly((current) => !current)}
                    className={`h-10 cursor-pointer rounded-xl px-3 text-xs font-semibold ${
                      unreadOnly ? "bg-[#252724] text-white" : "border border-black/9 text-[#6e736c]"
                    }`}
                  >
                    Unread only {unreadCount > 0 && `(${unreadCount})`}
                  </button>
                  <label className="flex h-10 items-center gap-2 rounded-xl border border-black/9 px-3 sm:w-64">
                    <Icon icon="solar:magnifer-linear" width="18" className="text-[#7b8078]" />
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
                  <h2 className="border-b border-black/6 bg-[#fafbf9] px-5 py-3 text-[11px] font-semibold tracking-[0.12em] text-[#7c8179] uppercase">
                    {date}
                  </h2>
                  {items.map((notification) => (
                    <div
                      key={notification.id}
                      className={`group flex gap-4 border-b border-black/6 px-5 py-5 last:border-b-0 sm:px-6 ${
                        notification.unread ? "bg-[#f4f8f2]" : "bg-white"
                      }`}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/6 bg-white text-[#52784f]">
                        <Icon icon={notification.icon} width="21" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold">{notification.title}</h3>
                          {notification.unread && <span className="h-2 w-2 rounded-full bg-[#5f8d5c]" />}
                        </div>
                        <p className="mt-1 text-sm leading-6 text-[#71766e]">{notification.description}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <Link
                            href={notification.href}
                            onClick={() => markRead(notification.id)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#4e774b] hover:underline"
                          >
                            View {notification.category.toLowerCase()}
                            <Icon icon="solar:arrow-right-up-linear" width="14" />
                          </Link>
                          <span className="text-[11px] text-[#949990]">{notification.time}</span>
                        </div>
                      </div>
                      {notification.unread && (
                        <button
                          type="button"
                          onClick={() => markRead(notification.id)}
                          aria-label={`Mark ${notification.title} as read`}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#71766e] hover:bg-white hover:text-[#4e774b]"
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
                  <p className="mt-2 text-sm text-[#7c8179]">Try another filter or search term.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
