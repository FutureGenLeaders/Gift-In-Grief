
import React from "react";
import HomeNav from "@/components/home/HomeNav";
import HeroSection from "@/components/home/HeroSection";
import MonthlyMotivation from "@/components/MonthlyMotivation";
import LossTypesSection from "@/components/home/LossTypesSection";
import PillarsSection from "@/components/home/PillarsSection";
import JourneyOverviewSection from "@/components/home/JourneyOverviewSection";
import CtaSection from "@/components/home/CtaSection";

export default function AuthMarketingPage() {
  return (
    <main className="min-h-screen bg-black w-full">
      <HomeNav />
      <HeroSection />
      <MonthlyMotivation />
      <LossTypesSection />
      <PillarsSection />
      <JourneyOverviewSection />
      <CtaSection />
    </main>
  );
}
