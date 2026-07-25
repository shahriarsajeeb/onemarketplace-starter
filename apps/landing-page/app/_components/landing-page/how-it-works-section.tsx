export function HowItWorksSection() {
  return (
        <section
          id="how-it-works"
          className="border-t border-black/[0.07] bg-white py-20 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#638462]">
                  Simple by design
                </p>
                <h2 className="mt-4 font-['Fraunces'] text-4xl font-medium tracking-tight sm:text-5xl">
                  Good work starts here.
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-6 text-[#6b6f69]">
                  Less searching, less uncertainty. More focus on the work that
                  matters.
                </p>
              </div>
              <div className="grid gap-7">
                <div className="flex gap-5 border-b border-black/[0.08] pb-7">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef4ed] text-sm font-semibold text-[#486d46]">
                    01
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      Tell us what you’re building
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#6c706a]">
                      Share your brief, timeline, budget, and the kind of
                      expertise you need.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 border-b border-black/[0.08] pb-7">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef4ed] text-sm font-semibold text-[#486d46]">
                    02
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      Meet the right fit
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#6c706a]">
                      Review considered matches, explore portfolios, and start a
                      conversation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef4ed] text-sm font-semibold text-[#486d46]">
                    03
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      Make progress, together
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#6c706a]">
                      Set milestones, keep communication flowing, and pay
                      securely as work is approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}
