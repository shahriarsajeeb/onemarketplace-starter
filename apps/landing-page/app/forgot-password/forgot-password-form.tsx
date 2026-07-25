"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "../signup/signup.module.css";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setEmail(String(formData.get("email") ?? ""));
    setSubmitted(true);
    setResendMessage("");
  }

  function handleResend() {
    setResendMessage(
      "Another reset link will be sent when Clerk is connected.",
    );
  }

  if (submitted) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5f2e2] text-[#477244]">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="3.5"
              y="5.5"
              width="17"
              height="13"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="m5.5 8 5.1 4a2.3 2.3 0 0 0 2.8 0l5.1-4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={`${styles.formTitle} mt-6 text-[#171916]`}>
          Check your email
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#72766f]">
          If an account exists for <strong className="text-[#393c37]">{email}</strong>,
          a password reset link will be sent there.
        </p>

        <div className="mt-8 grid gap-3">
          <button
            type="button"
            onClick={handleResend}
            className="h-12 cursor-pointer rounded-xl bg-[#252724] text-sm font-semibold text-white shadow-sm transition hover:bg-[#3b3e39] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4c7849]"
          >
            Resend email
          </button>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="h-12 cursor-pointer rounded-xl border border-black/13 bg-white text-sm font-semibold text-[#3f433d] transition hover:bg-[#f7f8f6]"
          >
            Use a different email
          </button>
        </div>

        {resendMessage && (
          <p
            className="mt-4 rounded-xl bg-[#edf5eb] px-4 py-3 text-xs font-medium text-[#4e704b]"
            role="status"
          >
            {resendMessage}
          </p>
        )}

        <Link
          href="/login"
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#477445] hover:underline!"
        >
          <span aria-hidden="true">←</span>
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md text-left">
      <Link
        href="/login"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#5e625c] transition hover:text-[#252724]"
      >
        <span aria-hidden="true">←</span>
        Back to login
      </Link>

      <div className="text-center">
        <span className="inline-flex rounded-full bg-[#e9f4e6] px-3 py-1.5 text-xs font-semibold text-[#4f754d]">
          Account recovery
        </span>
        <h1 className={`${styles.formTitle} mt-4 text-[#171916]`}>
          Forgot your password?
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#72766f]">
          Enter the email associated with your account and we’ll send you a
          secure reset link.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-semibold text-[#30332f]">
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={email}
            required
            autoFocus
            className="h-12 rounded-xl border border-black/13 bg-white px-4 font-normal outline-none transition placeholder:text-[#a2a59f] focus:border-[#5d8b59] focus:ring-3 focus:ring-[#dcebd9]"
            placeholder="you@example.com"
          />
        </label>

        <button
          type="submit"
          className="h-12 w-full cursor-pointer rounded-xl bg-[#252724] text-sm font-semibold text-white shadow-sm transition hover:bg-[#3b3e39] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4c7849]"
        >
          Send reset link
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-[#555952]">
        Don’t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[#397236] hover:underline!"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
