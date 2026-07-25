import { Header } from "../_components/landing-page/header";
import { WorksDirectory } from "./works-directory";

export default function WorksPage() {
  return (
    <div className="min-h-svh bg-[#f8f9f6] font-(family-name:--font-dm-sans) text-[#20231f]">
      <Header />
      <WorksDirectory />
    </div>
  );
}
