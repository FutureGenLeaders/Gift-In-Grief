
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, TrendingUp } from "lucide-react";

interface UserStats {
  fullName: string;
  totalSessions: number;
  currentStreak: number;
  joinDate: string;
}

export default function PersonalizedInsights() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserStats() {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;

      // Get user profile
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("full_name, created_at")
        .eq("user_id", user.user.id)
        .single();

      // Get total sessions completed
      const { data: sessions } = await supabase
        .from("daily_sessions")
        .select("completed_at")
        .eq("user_id", user.user.id);

      // Calculate current streak
      const { data: recentSessions } = await supabase
        .from("daily_sessions")
        .select("completed_at")
        .eq("user_id", user.user.id)
        .order("completed_at", { ascending: false })
        .limit(30);

      let currentStreak = 0;
      if (recentSessions && recentSessions.length > 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < recentSessions.length; i++) {
          const sessionDate = new Date(recentSessions[i].completed_at);
          sessionDate.setHours(0, 0, 0, 0);
          
          const expectedDate = new Date(today);
          expectedDate.setDate(today.getDate() - i);
          
          if (sessionDate.getTime() === expectedDate.getTime()) {
            currentStreak++;
          } else {
            break;
          }
        }
      }

      setStats({
        fullName: profile?.full_name || user.user.email || "Friend",
        totalSessions: sessions?.length || 0,
        currentStreak,
        joinDate: profile?.created_at || user.user.created_at
      });
      setLoading(false);
    }

    fetchUserStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-700/30 rounded-xl p-6 animate-pulse">
        <div className="h-4 bg-blue-700/30 rounded mb-2"></div>
        <div className="h-8 bg-blue-700/30 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-700/30 rounded-xl p-6">
      <div className="flex items-center mb-4">
        <User className="h-6 w-6 text-blue-300 mr-2" />
        <h3 className="text-lg font-semibold text-blue-200">Your Journey</h3>
      </div>
      
      <div className="space-y-3">
        <p className="text-white text-lg">
          Welcome back, <span className="font-bold text-blue-300">{stats?.fullName}</span>! 
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/20 rounded-lg p-3">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-xs text-gray-300">Current Streak</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{stats?.currentStreak}</p>
            <p className="text-xs text-gray-400">days</p>
          </div>
          
          <div className="bg-black/20 rounded-lg p-3">
            <span className="text-xs text-gray-300">Total Sessions</span>
            <p className="text-2xl font-bold text-blue-300">{stats?.totalSessions}</p>
            <p className="text-xs text-gray-400">completed</p>
          </div>
        </div>
        
        <p className="text-sm text-blue-200">
          {stats?.currentStreak === 0 
            ? "Ready to start your streak? Complete today's session!"
            : `Amazing! You're on a ${stats.currentStreak}-day streak. Keep the momentum going!`
          }
        </p>
      </div>
    </div>
  );
}
