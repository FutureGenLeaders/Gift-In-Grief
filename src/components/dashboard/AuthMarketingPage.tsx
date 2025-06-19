
import HeroSection from "@/components/home/HeroSection";
import LossTypesSection from "@/components/home/LossTypesSection";
import PillarsSection from "@/components/home/PillarsSection";
import JourneyOverviewSection from "@/components/home/JourneyOverviewSection";
import CtaSection from "@/components/home/CtaSection";
import HomeNav from "@/components/home/HomeNav";

export default function AuthMarketingPage() {
  return (
    <main className="min-h-screen bg-black w-full">
      <HomeNav />
      
      {/* Fixed container with proper spacing */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-20">
          <HeroSection />
          <div className="py-8">
            <LossTypesSection />
          </div>
          <div className="py-8">
            <PillarsSection />
          </div>
          <div className="py-8">
            <JourneyOverviewSection />
          </div>
          <div className="py-8">
            <CtaSection />
          </div>
        </div>
      </div>
    </main>
  );
}
