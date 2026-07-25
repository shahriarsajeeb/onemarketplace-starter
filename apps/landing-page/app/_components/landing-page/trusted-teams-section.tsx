export function TrustedTeamsSection() {
  return (
        <section className="border-y border-black/[0.07] bg-white py-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-5 px-5 text-center sm:justify-between sm:px-8 lg:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8a8e87]">
              Chosen by teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4 text-lg font-semibold tracking-tight text-[#686c66]">
              <span>Northstar</span>
              <span className="font-['Fraunces'] text-xl">Lumen</span>
              <span>VANTA</span>
              <span className="font-['Fraunces'] text-xl">Aster</span>
              <span>commonfolk</span>
            </div>
          </div>
        </section>
  );
}
