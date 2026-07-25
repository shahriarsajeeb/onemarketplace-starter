import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function Footer() {
  const footerLinkClass = "transition hover:text-[#20231f]";

  return (
    <footer className="border-t border-black/[0.07]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <BrandMark />
              <span className="text-xl font-semibold tracking-tight">
                OneMarketplace.io
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#747870]">
              A thoughtful marketplace for people who care about doing
              exceptional work.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[#777c75] uppercase">
              For clients
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#575b55]">
              <Link href="/talents" className={footerLinkClass}>
                Find talent
              </Link>
              <Link href="/agencies" className={footerLinkClass}>
                Browse agencies
              </Link>
              <Link href="/#how-it-works" className={footerLinkClass}>
                How to hire
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[#777c75] uppercase">
              For talent
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#575b55]">
              <Link href="/works" className={footerLinkClass}>
                Find work
              </Link>
              <Link href="/signup?role=freelancer" className={footerLinkClass}>
                Join OneMarketplace.io
              </Link>
              <Link href="/#how-it-works" className={footerLinkClass}>
                Resources
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] text-[#777c75] uppercase">
              Company
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#575b55]">
              <Link href="/#top" className={footerLinkClass}>
                About
              </Link>
              <Link href="/works" className={footerLinkClass}>
                Journal
              </Link>
              <a
                href="mailto:hello@onemarketplace.io"
                className={footerLinkClass}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-black/[0.07] pt-6 text-xs text-[#868a83] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 OneMinute Stack Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className={footerLinkClass}>
              Privacy
            </Link>
            <Link href="/terms" className={footerLinkClass}>
              Terms
            </Link>
            <Link href="/accessibility" className={footerLinkClass}>
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
