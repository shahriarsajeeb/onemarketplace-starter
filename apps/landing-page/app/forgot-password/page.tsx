import Link from "next/link";
import { BrandMark } from "../_components/landing-page/brand-mark";
import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-white font-(family-name:--font-dm-sans)">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-128 bg-[radial-gradient(ellipse_at_top,rgba(224,246,220,0.8),rgba(247,252,245,0.48)_44%,transparent_76%)]"
        aria-hidden="true"
      ></div>

      <header className="relative z-10 px-5 py-7 sm:px-8 sm:py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5"
          aria-label="OneMarketplace.io home"
        >
          <BrandMark />
          <span className="text-xl font-semibold tracking-tight">
            OneMarketplace.io
          </span>
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
