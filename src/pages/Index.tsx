
import HeroSection from "@/components/home/HeroSection";
import LossTypesSection from "@/components/home/LossTypesSection";
import PillarsSection from "@/components/home/PillarsSection";
import JourneyOverviewSection from "@/components/home/JourneyOverviewSection";
import CtaSection from "@/components/home/CtaSection";
import HomeNav from "@/components/home/HomeNav";
import CurriculumProgress from "@/components/CurriculumProgress";
import MonthlyMotivation from "@/components/MonthlyMotivation";
import CompletionCertificate from "@/components/CompletionCertificate";
import PersonalizedInsights from "@/components/PersonalizedInsights";
import Leaderboard from "@/components/Leaderboard";
import TrialBanner from "@/components/TrialBanner";
import MorningSession from "@/components/MorningSession";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import DashboardNavigationCards from "@/components/dashboard/DashboardNavigationCards";
import SubscriptionCards from "@/components/dashboard/SubscriptionCards";
import ProfileLink from "@/components/dashboard/ProfileLink";
import AdditionalNavigation from "@/components/dashboard/AdditionalNavigation";
import AuthMarketingPage from "@/components/dashboard/AuthMarketingPage";
import TreeTherapySection from "@/components/dashboard/TreeTherapySection";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const [joinDate, setJoinDate] = useState<Date | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get join date from auth user metadata
  useEffect(() => {
    async function getJoinDate() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setIsLoggedIn(true);
        const metaDate = data?.user?.created_at;
        setJoinDate(metaDate ? new Date(metaDate) : null);
      }
    }
    getJoinDate();
  }, []);

  // Drip: decide whether to show certificate (simulate for now; would want logic to check for completion)
  // For demo, if joinDate was 9 months+ ago show certificate
  useEffect(() => {
    if (joinDate) {
      const now = new Date();
      const months = (now.getFullYear() - joinDate.getFullYear()) * 12 + now.getMonth() - joinDate.getMonth();
      if (months >= 9) {
        setShowCertificate(true);
      }
    }
  }, [joinDate]);

  // If not logged in, show the marketing page
  if (!isLoggedIn) {
    return <AuthMarketingPage />;
  }

  // If logged in, show the dashboard
  return (
    <main className="min-h-screen bg-black w-full">
      <HomeNav />
      
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="space-y-12">
          
          {/* Trial Banner */}
          <TrialBanner />

          {/* Welcome Section */}
          <WelcomeSection />

          {/* Top Row: Personalized Insights & Monthly Motivation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PersonalizedInsights />
            <div className="flex items-center justify-center">
              <MonthlyMotivation />
            </div>
          </div>

          {/* Daily Protocol Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MorningSession />
            </div>
            <div>
              <Leaderboard />
            </div>
          </div>

          {/* Mindfulness Mentoring Sessions */}
          <TreeTherapySection />

          {/* Navigation Cards */}
          <DashboardNavigationCards />

          {/* Subscription Cards */}
          <SubscriptionCards />

          {/* Profile Link */}
          <ProfileLink />

          {/* Additional Navigation */}
          <AdditionalNavigation />

          {/* Curriculum Progress */}
          {joinDate ? (
            <>
              <div className="mt-16">
                <CurriculumProgress joinDate={joinDate} />
              </div>
              {showCertificate && (
                <CompletionCertificate joinDate={joinDate} />
              )}
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
