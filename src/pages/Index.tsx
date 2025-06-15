
import HeroSection from "@/components/home/HeroSection";
import LossTypesSection from "@/components/home/LossTypesSection";
import PillarsSection from "@/components/home/PillarsSection";
import JourneyOverviewSection from "@/components/home/JourneyOverviewSection";
import CtaSection from "@/components/home/CtaSection";
import HomeNav from "@/components/home/HomeNav";
import CurriculumProgress from "@/components/CurriculumProgress";
import MonthlyMotivation from "@/components/MonthlyMotivation";
import CompletionCertificate from "@/components/CompletionCertificate";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export default function Index() {
  const [joinDate, setJoinDate] = useState<Date | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Get join date from auth user metadata
  useEffect(() => {
    async function getJoinDate() {
      const { data } = await supabase.auth.getUser();
      const metaDate = data?.user?.created_at;
      setJoinDate(metaDate ? new Date(metaDate) : null);
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

  return (
    <main className="min-h-screen bg-black w-full">
      <HomeNav />

      <HeroSection />
      <MonthlyMotivation />
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
        <Link className="text-yellow-600 underline" to="/announcements">
          Notice Board
        </Link>
      </div>

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
    </main>
  );
}
