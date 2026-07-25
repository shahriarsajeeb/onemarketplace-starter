import { AgenciesSection } from "./_components/landing-page/agencies-section";
import { Footer } from "./_components/landing-page/footer";
import { GetStartedSection } from "./_components/landing-page/get-started-section";
import { Header } from "./_components/landing-page/header";
import { HeroSection } from "./_components/landing-page/hero-section";
import { HowItWorksSection } from "./_components/landing-page/how-it-works-section";
import { LandingPageShell } from "./_components/landing-page/landing-page-shell";
import { TalentSection } from "./_components/landing-page/talent-section";
import { TrustedTeamsSection } from "./_components/landing-page/trusted-teams-section";
import { WorkSection } from "./_components/landing-page/work-section";

export default function HomePage() {
  return (
    <LandingPageShell>
      <Header />
      <main id="top">
        <HeroSection />
        <TrustedTeamsSection />
        <WorkSection />
        <TalentSection />
        <AgenciesSection />
        <HowItWorksSection />
        <GetStartedSection />
      </main>
      <Footer />
    </LandingPageShell>
  );
}
