"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNavigation } from "./navigation";

type WorkspaceSidebarProps = {
  profileStrength?: number;
};

export function WorkspaceSidebar({
  profileStrength = 89,
}: WorkspaceSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="grid gap-5 xl:sticky xl:top-24">
      <section className="rounded-2xl border border-black/8 bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#496e67] text-sm font-semibold text-white">
            SK
          </span>
          <div className="min-w-0">
            <h2 className="truncate font-semibold">Shahriar Sajeeb</h2>
            <p className="truncate text-xs text-[#7b8078]">
              Full-stack developer
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between text-xs">
          <span className="font-medium">Profile strength</span>
          <strong className="text-[#52784f]">{profileStrength}%</strong>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e6e9e3]">
          <div
            className="h-full rounded-full bg-[#648b61]"
            style={{ width: `${profileStrength}%` }}
          />
        </div>
        <Link
          href="/my-profile"
          className="mt-4 inline-block text-xs font-semibold text-[#4e774b] hover:underline"
        >
          Preview your profile
        </Link>
      </section>

      <nav className="rounded-2xl border border-black/8 bg-white p-2 text-sm">
        {sidebarNavigation.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition ${
                active
                  ? "bg-[#edf4ea] text-[#4e774b]"
                  : "text-[#686d65] hover:bg-black/3"
              }`}
            >
              <Icon
                icon={
                  active
                    ? item.icon.replace("-linear", "-bold")
                    : item.icon
                }
                width="19"
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
