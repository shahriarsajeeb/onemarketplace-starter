import { TalentsDirectory } from "./talents-directory";
import { Header } from "../_components/landing-page/header";

export default function TalentsPage() {
  return (
    <div className="min-h-svh bg-[#f8f9f6] font-(family-name:--font-dm-sans) text-[#20231f]">
     <Header />

      <TalentsDirectory />
    </div>
  );
}
