import Link from "next/link";

export function GetStartedSection() {
  return (
    <section
      id="get-started"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
    >
      <div className="rounded-3xl bg-[#e5efe2] px-6 py-12 text-center sm:px-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#587957]">
          A better way to work
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-['Fraunces'] text-4xl font-medium tracking-tight sm:text-5xl">
          Bring the right people into your next chapter.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#60715e]">
          Whether you’re growing a company, an independent career, or a creative
          practice, there’s a place for you here.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/signup?role=client"
            className="rounded-xl bg-[#242622] px-5 py-3 text-sm font-medium text-white! transition hover:bg-[#3b4039]"
          >
            Hire exceptional talent
          </Link>
          <Link
            href="/signup?role=freelancer"
            className="rounded-xl border border-[#a8c0a5] bg-white/60 px-5 py-3 text-sm font-medium text-[#355334] transition hover:bg-white"
          >
            Join as a professional
          </Link>
        </div>
      </div>
    </section>
  );
}
