
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
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar, Crown, DollarSign, User } from "lucide-react";

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

  // If logged in, show the dashboard
  return (
    <main className="min-h-screen bg-black w-full">
      <HomeNav />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Trial Banner */}
          <TrialBanner />
          
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mb-4">
              Your Leadership Dashboard
            </h1>
            <p className="text-gray-300 text-lg">
              Welcome back to your transformation journey
            </p>
          </div>

          {/* Top Row: Personalized Insights & Monthly Motivation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PersonalizedInsights />
            <MonthlyMotivation />
          </div>

          {/* Daily Protocol Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MorningSession />
            </div>
            <div>
              <Leaderboard />
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/masterclass" className="block">
              <Card className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border-purple-700/30 hover:scale-105 transition-transform cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-200">
                    <BookOpen className="h-6 w-6 mr-2" />
                    Masterclass Library
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-300 text-sm">
                    Access our comprehensive library of leadership masterclasses and nervous system training.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/community" className="block">
              <Card className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-green-700/30 hover:scale-105 transition-transform cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-200">
                    <Users className="h-6 w-6 mr-2" />
                    Sacred Circle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-300 text-sm">
                    Connect with fellow leaders in our private community space for support and growth.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/sessions" className="block">
              <Card className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border-blue-700/30 hover:scale-105 transition-transform cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-200">
                    <Calendar className="h-6 w-6 mr-2" />
                    Strategic Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-300 text-sm">
                    Book 1:1 coaching sessions and group workshops to accelerate your development.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Subscription Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Crown className="h-5 w-5 mr-2 text-gray-400" />
                  Basic (Free)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">
                  Access to core content and daily protocols
                </p>
                <button className="w-full py-2 px-4 bg-gray-600 text-gray-400 rounded cursor-not-allowed">
                  Current Plan
                </button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 border-yellow-700/30">
              <CardHeader>
                <CardTitle className="text-yellow-200 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Premium ($49/mo)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-300 text-sm mb-4">
                  Unlock advanced content and 1:1 sessions
                </p>
                <Link to="/subscribe">
                  <button className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors">
                    Upgrade Now
                  </button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-red-700/30">
              <CardHeader>
                <CardTitle className="text-red-200 flex items-center">
                  <Crown className="h-5 w-5 mr-2 text-red-400" />
                  Executive ($499/mo)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-300 text-sm mb-4">
                  All features + private coaching and priority support
                </p>
                <Link to="/subscribe">
                  <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition-colors">
                    Go Executive
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Profile Link */}
          <div className="text-center">
            <Link to="/profile" className="inline-flex items-center text-yellow-600 hover:text-yellow-400 font-semibold">
              <User className="h-5 w-5 mr-2" />
              My Profile & Progress
            </Link>
          </div>

          {/* Additional Navigation */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link className="text-blue-700 underline hover:text-blue-500" to="/sessions">
              View & Book Sessions
            </Link>
            <Link className="text-teal-700 underline hover:text-teal-500" to="/create-session">
              Host: Create Session
            </Link>
            <Link className="text-yellow-600 underline hover:text-yellow-400" to="/announcements">
              Notice Board
            </Link>
          </div>

          {/* Curriculum Progress */}
          {joinDate ? (
            <>
              <div className="mt-12">
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
