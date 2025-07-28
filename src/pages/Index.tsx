
import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import LossTypesSection from "@/components/home/LossTypesSection";
import FaqSection from "@/components/home/FaqSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
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
import MindfulnessSessionsSection from "@/components/dashboard/MindfulnessSessionsSection";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { VideoPlayer } from "@/components/VideoPlayer";

export default function Index() {
  const [joinDate, setJoinDate] = useState<Date | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const { user } = useAuth();

  // Get join date from auth user metadata
  useEffect(() => {
    if (user) {
      setJoinDate(user.created_at ? new Date(user.created_at) : null);
    }
  }, [user]);

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
  if (!user) {
    return (
      <main className="min-h-screen bg-black w-full">
        <HomeNav />
        
        {/* Marketing homepage with proper spacing - testimonials removed */}
        <div className="w-full">
          <div className="space-y-20">
            <HeroSection />
            <ProblemSection />
            <SolutionSection />
            <HowItWorksSection />
            <LossTypesSection />
            <FaqSection />
            <FinalCtaSection />
          </div>
        </div>
      </main>
    );
  }

  // If logged in, show the dashboard
  return (
    <main className="min-h-screen bg-black w-full">
      <HomeNav />
      
      <div className="container mx-auto px-6 py-8 max-w-6xl">
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
          <MindfulnessSessionsSection />

          {/* Featured Video Player Demo */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Featured Healing Session</h2>
            <VideoPlayer 
              src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
              title="Introduction to Grief Healing"
              description="A gentle introduction to understanding grief and beginning your healing journey."
              tier="Premium"
              onProgress={(currentTime, duration) => {
                // Track progress for analytics
                console.log(`Video progress: ${Math.round((currentTime / duration) * 100)}%`);
              }}
              onComplete={() => {
                console.log('Video completed');
              }}
            />
          </div>

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
