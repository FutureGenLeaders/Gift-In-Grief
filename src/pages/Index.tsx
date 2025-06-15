import HeroSection from "@/components/home/HeroSection";
import LossTypesSection from "@/components/home/LossTypesSection";
import PillarsSection from "@/components/home/PillarsSection";
import JourneyOverviewSection from "@/components/home/JourneyOverviewSection";
import CtaSection from "@/components/home/CtaSection";
import HomeNav from "@/components/home/HomeNav";
import { Link } from "react-router-dom";
import CurriculumProgress from "@/components/CurriculumProgress";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const [joinDate, setJoinDate] = useState<Date | null>(null);

  // Get join date from auth user metadata
  useEffect(() => {
    async function getJoinDate() {
      const { data } = await supabase.auth.getUser();
      const metaDate = data?.user?.created_at;
      setJoinDate(metaDate ? new Date(metaDate) : null);
    }
    getJoinDate();
  }, []);

  return (
    <main className="min-h-screen bg-black w-full">
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
        <Link className="text-yellow-600 underline" to="/announcements">
          Notice Board
        </Link>
      </div>

      {joinDate ? (
        <div className="mt-12">
          <CurriculumProgress joinDate={joinDate} />
        </div>
      ) : null}
    </main>
  );
}
