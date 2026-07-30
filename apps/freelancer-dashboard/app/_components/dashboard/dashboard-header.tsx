"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "../../brand-mark";
import { AccountDropdown } from "./account-dropdown";
import { MessagesHeaderLink } from "./messages-header-link";
import { headerNavigation } from "./navigation";
import { NotificationsPopover } from "./notifications-popover";

export function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/7 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-17 max-w-360 items-center gap-5 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <BrandMark />
          <span className="hidden text-lg font-semibold tracking-tight sm:block">
            OneMarketplace.io
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {headerNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-[#edf4ea] font-semibold text-[#4e774b]"
                    : "font-medium text-[#62675f] hover:bg-black/4"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <MessagesHeaderLink />
          <NotificationsPopover />
          <AccountDropdown />
        </div>
      </div>
    </header>
  );
}
