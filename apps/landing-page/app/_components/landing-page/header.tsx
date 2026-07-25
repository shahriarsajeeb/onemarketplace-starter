"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "./brand-mark";

export function Header() {
  const [isFixed, setIsFixed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateHeaderPosition = () => {
      setIsFixed(window.scrollY >= window.innerHeight * 0.15);
    };

    updateHeaderPosition();
    window.addEventListener("scroll", updateHeaderPosition, { passive: true });
    window.addEventListener("resize", updateHeaderPosition);

    return () => {
      window.removeEventListener("scroll", updateHeaderPosition);
      window.removeEventListener("resize", updateHeaderPosition);
    };
  }, []);

  useEffect(() => {
    const updateActiveHash = () => setActiveHash(window.location.hash);

    updateActiveHash();
    window.addEventListener("hashchange", updateActiveHash);

    return () => window.removeEventListener("hashchange", updateActiveHash);
  }, [pathname]);

  const isHowItWorksActive =
    pathname === "/" && activeHash === "#how-it-works";

  return (
    <header
      className={`border-b border-black/[0.07] bg-[#fbfbfa]/95 backdrop-blur-sm ${
        isFixed ? "landing-header-enter fixed inset-x-0 top-0 z-50" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link
          href="/#"
          className="flex items-center gap-2.5"
          aria-label="OneMarketplace.io home"
        >
          <BrandMark />
          <span className="text-xl font-semibold tracking-tight">
            OneMarketplace.io
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#5f625e] lg:flex">
          <Link
            href="/talents"
            aria-current={pathname === "/talents" ? "page" : undefined}
            className={`px-3 py-2 transition ${
              pathname === "/talents"
                ? "font-semibold text-[#4f7a4c]!"
                : "hover:text-[#20211f]!"
            }`}
          >
            Find talent
          </Link>
          <Link
            href="/works"
            className={`
            ${
              pathname === "/works"
                ? "font-semibold text-[#4f7a4c]!"
                : "hover:text-[#20211f]!"
            }
            transition hover:text-[#20211f]`}
          >
            Find work
          </Link>
          <Link
            href="/agencies"
            aria-current={pathname === "/agencies" ? "page" : undefined}
            className={`transition ${
              pathname === "/agencies"
                ? "font-semibold text-[#4f7a4c]!"
                : "hover:text-[#20211f]!"
            }`}
          >
            For agencies
          </Link>
          <Link
            href="/#how-it-works"
            aria-current={isHowItWorksActive ? "page" : undefined}
            className={`transition ${
              isHowItWorksActive
                ? "font-semibold text-[#4f7a4c]!"
                : "hover:text-[#20211f]!"
            }`}
          >
            How it works
          </Link>
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#4f534e] transition hover:bg-black/4"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-[#242622] px-4 py-2.5 text-sm font-medium text-white! shadow-sm transition hover:bg-[#3c403a]"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/8 text-[#30322f] sm:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <Icon
            icon="solar:hamburger-menu-linear"
            width="21"
            strokeWidth="1.5"
          ></Icon>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-black/[0.07] px-5 py-4 sm:hidden sm:px-8 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-1">
          <Link
            href="/talents"
            aria-current={pathname === "/talents" ? "page" : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`rounded-lg px-3 py-3 text-sm font-medium ${
              pathname === "/talents"
                ? "font-semibold text-[#4f7a4c]"
                : "hover:bg-black/4"
            }`}
          >
            Find talent
          </Link>
          <Link
            href="/works"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`rounded-lg px-3 py-3 text-sm font-medium ${
              pathname === "/works"
                ? "font-semibold text-[#4f7a4c]"
                : "hover:bg-black/4"
            }`}
          >
            Find work
          </Link>
          <Link
            href="/agencies"
            aria-current={pathname === "/agencies" ? "page" : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`rounded-lg px-3 py-3 text-sm font-medium ${
              pathname === "/agencies"
                ? "font-semibold text-[#4f7a4c]"
                : "hover:bg-black/4"
            }`}
          >
            For agencies
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-current={isHowItWorksActive ? "page" : undefined}
            className={`rounded-lg px-3 py-3 text-sm font-medium ${
              isHowItWorksActive
                ? "font-semibold text-[#4f7a4c]"
                : "hover:bg-black/4"
            }`}
          >
            How it works
          </Link>
          <div className="mt-3 flex gap-3 border-t border-black/[0.07] pt-4">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 rounded-lg border border-black/10 px-4 py-2.5 text-center text-sm font-medium"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 rounded-lg bg-[#242622] px-4 py-2.5 text-center text-sm font-medium text-white!"
            >
              Get started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
