
import HeroSection from "@/components/home/HeroSection";
import LossTypesSection from "@/components/home/LossTypesSection";
import PillarsSection from "@/components/home/PillarsSection";
import JourneyOverviewSection from "@/components/home/JourneyOverviewSection";
import CtaSection from "@/components/home/CtaSection";
import HomeNav from "@/components/home/HomeNav";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <main className="min-h-screen bg-background w-full">
      <HomeNav />

      <HeroSection />
      <LossTypesSection />
      <PillarsSection />

      <JourneyOverviewSection />
      <CtaSection />

      <div className="flex gap-4 mt-8">
        <Link className="text-blue-700 underline" to="/sessions">
          View & Book Sessions
        </Link>
        <Link className="text-teal-700 underline" to="/create-session">
          Host: Create Session
        </Link>
      </div>
    </main>
  );
}
