import { Header } from "../_components/landing-page/header";
import { AgenciesDirectory } from "./agencies-directory";

export default function AgenciesPage() {
  return (
    <div className="min-h-svh bg-[#f8f9f6] font-(family-name:--font-dm-sans) text-[#20231f]">
      <Header />
      <AgenciesDirectory />
    </div>
  );
}
