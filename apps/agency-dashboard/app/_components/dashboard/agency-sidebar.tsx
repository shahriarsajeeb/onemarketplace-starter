"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../ui/icon";
import { agencyNavigation } from "./navigation";

export function AgencySidebar() {
  const pathname = usePathname();
  return (
    <aside className="grid gap-5 xl:sticky xl:top-24">
      <section className="rounded-2xl border border-black/8 bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#496e67] text-sm font-semibold text-white">
            ND
          </span>
          <div className="min-w-0">
            <h2 className="truncate font-semibold">Northstar Digital</h2>
            <p className="truncate text-xs text-[#7b8078]">8 team members</p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between text-xs">
          <span className="font-medium">Agency profile</span>
          <strong className="text-[#52784f]">78%</strong>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e6e9e3]">
          <div className="h-full w-[78%] rounded-full bg-[#648b61]" />
        </div>
        <Link
          href={"/profile"}
          className="mt-4 text-xs font-semibold text-[#4e774b] hover:underline"
        >
          Preview agency profile
        </Link>
      </section>
      <nav className="rounded-2xl border border-black/8 bg-white p-2 text-sm">
        {agencyNavigation.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition ${active ? "bg-[#edf4ea] text-[#4e774b]" : "text-[#686d65] hover:bg-black/3"}`}
            >
              <Icon name={item.icon} size={19} active={active} />
              {item.label}
              {item.label === "Messages" && (
                <span className="ml-auto rounded-full bg-[#5f8d5c] px-1.5 py-0.5 text-[9px] font-bold text-white">
                  4
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
