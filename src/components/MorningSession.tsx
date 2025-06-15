
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sunrise, CheckCircle } from "lucide-react";
import CertificateModal from "./CertificateModal";

export default function MorningSession() {
  const [isCompleting, setIsCompleting] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleCompleteSession = async () => {
    setIsCompleting(true);

    const { data: user } = await supabase.auth.getUser();
    if (!user?.user?.id) {
      setIsCompleting(false);
      return;
    }

    // Get current streak
    const { data: recentSessions } = await supabase
      .from("daily_sessions")
      .select("completed_at")
      .eq("user_id", user.user.id)
      .order("completed_at", { ascending: false })
      .limit(1);

    let streakCount = 1;
    if (recentSessions && recentSessions.length > 0) {
      const lastSession = new Date(recentSessions[0].completed_at);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      lastSession.setHours(0, 0, 0, 0);

      if (lastSession.getTime() === yesterday.getTime()) {
        streakCount = await getCurrentStreak(user.user.id) + 1;
      }
    }

    // Record the session
    await supabase
      .from("daily_sessions")
      .insert({
        user_id: user.user.id,
        session_type: "morning",
        streak_count: streakCount
      });

    setIsCompleting(false);
    setShowCertificate(true);
  };

  const getCurrentStreak = async (userId: string): Promise<number> => {
    const { data: sessions } = await supabase
      .from("daily_sessions")
      .select("completed_at")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false })
      .limit(30);

    if (!sessions || sessions.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sessions.length; i++) {
      const sessionDate = new Date(sessions[i].completed_at);
      sessionDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (sessionDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  return (
    <>
      <div className="bg-gradient-to-r from-orange-900/40 to-yellow-900/40 border border-orange-700/30 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Sunrise className="h-8 w-8 text-orange-300 mr-3" />
          <div>
            <h3 className="text-xl font-bold text-orange-200">Morning Session</h3>
            <p className="text-orange-300/80">Start your day with intention and focus</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-black/20 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Today's Protocol:</h4>
            <ul className="text-orange-200 text-sm space-y-1">
              <li>• 5 minutes breath work</li>
              <li>• Intention setting</li>
              <li>• Nervous system check-in</li>
              <li>• Leadership reflection</li>
            </ul>
          </div>
          
          <Button 
            onClick={handleCompleteSession}
            disabled={isCompleting}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isCompleting ? (
              "Recording Session..."
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Morning Session
              </>
            )}
          </Button>
        </div>
      </div>

      <CertificateModal 
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        sessionType="Morning Session"
      />
    </>
  );
}
