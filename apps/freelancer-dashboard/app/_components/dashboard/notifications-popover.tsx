"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { dashboardNotifications } from "../notifications/notifications-data";

export function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(
    dashboardNotifications.slice(0, 3),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((item) => item.unread).length;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, unread: false })),
    );
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((current) => !current)}
        className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#60655e] transition ${
          open ? "bg-[#edf4ea] text-[#4e774b]" : "hover:bg-black/5"
        }`}
      >
        <Icon icon={open ? "solar:bell-bold" : "solar:bell-linear"} width="22" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-[#5f8d5c] px-1 text-[8px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-17 z-40 cursor-default bg-black/10 sm:hidden"
          />
          <section
            role="dialog"
            aria-modal="false"
            aria-label="Notifications"
            className="fixed top-18 right-3 left-3 z-50 overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_24px_70px_rgba(26,34,26,0.18)] sm:absolute sm:top-12 sm:right-0 sm:left-auto sm:w-105"
          >
            <header className="flex items-center justify-between border-b border-black/7 px-5 py-4">
              <div>
                <h2 className="font-semibold">Notifications</h2>
                <p className="mt-0.5 text-[11px] text-[#81867e]">
                  {unreadCount ? `${unreadCount} unread updates` : "You’re all caught up"}
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="cursor-pointer text-xs font-semibold text-[#52784f] hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </header>

            <div className="max-h-105 overflow-y-auto">
              {notifications.map((notification, index) => (
                <Link
                  key={notification.id}
                  href={notification.href}
                  onClick={() => {
                    setNotifications((current) =>
                      current.map((item) =>
                        item.id === notification.id
                          ? { ...item, unread: false }
                          : item,
                      ),
                    );
                    setOpen(false);
                  }}
                  className={`relative flex gap-3.5 px-5 py-4 transition hover:bg-[#f7f8f5] ${
                    index ? "border-t border-black/6" : ""
                  } ${notification.unread ? "bg-[#f3f7f1]" : "bg-white"}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#52784f] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
                    <Icon icon={notification.icon} width="20" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      {notification.title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-[#737870]">
                      {notification.description}
                    </span>
                    <span className="mt-1.5 block text-[11px] text-[#93978f]">
                      {notification.time}
                    </span>
                  </span>
                  {notification.unread && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#5f8d5c]" />
                  )}
                </Link>
              ))}
            </div>

            <footer className="border-t border-black/7 bg-[#fafbf9] p-3">
              <Link
                href="/notifications"
                onClick={() => setOpen(false)}
                className="flex h-10 w-full items-center justify-center rounded-xl text-xs font-semibold text-[#4e774b] hover:bg-[#edf4ea]"
              >
                View all notifications
              </Link>
            </footer>
          </section>
        </>
      )}
    </div>
  );
}
