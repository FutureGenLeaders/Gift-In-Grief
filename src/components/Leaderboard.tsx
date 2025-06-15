
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  full_name: string;
  email: string;
  session_count: number;
  rank: number;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      // Get user profiles with session counts
      const { data, error } = await supabase
        .from("user_profiles")
        .select(`
          full_name,
          user_id,
          daily_sessions!inner(user_id)
        `);

      if (!error && data) {
        // Count sessions per user and create leaderboard
        const userSessionCounts = data.map(profile => ({
          full_name: profile.full_name || "Anonymous",
          email: "", // We'll get this from auth if needed
          session_count: profile.daily_sessions?.length || 0,
          rank: 0
        }));

        // Sort by session count and assign ranks
        const sortedLeaders = userSessionCounts
          .sort((a, b) => b.session_count - a.session_count)
          .slice(0, 5)
          .map((user, index) => ({
            ...user,
            rank: index + 1
          }));

        setLeaders(sortedLeaders);
      }
      setLoading(false);
    }

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-400" />;
      default:
        return <span className="h-5 w-5 flex items-center justify-center text-sm font-bold text-gray-400">#{rank}</span>;
    }
  };

  return (
    <div className="bg-gradient-to-b from-yellow-900/20 to-orange-900/20 border border-yellow-700/30 rounded-xl p-6">
      <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center">
        <Trophy className="h-6 w-6 mr-2" />
        Leaderboard
      </h3>
      
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-lg animate-pulse">
              <div className="h-4 bg-yellow-700/30 rounded w-32"></div>
              <div className="h-4 bg-yellow-700/30 rounded w-8"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {leaders.map((leader) => (
            <div
              key={leader.rank}
              className={`flex items-center justify-between p-3 rounded-lg ${
                leader.rank === 1 
                  ? 'bg-gradient-to-r from-yellow-900/40 to-yellow-800/40 border border-yellow-600/40' 
                  : 'bg-black/20'
              }`}
            >
              <div className="flex items-center space-x-3">
                {getRankIcon(leader.rank)}
                <span className="font-medium text-white">{leader.full_name}</span>
              </div>
              <span className="text-sm font-bold text-yellow-300">
                {leader.session_count} sessions
              </span>
            </div>
          ))}
          
          {leaders.length === 0 && (
            <div className="text-center text-gray-400 py-4">
              No data available yet. Complete sessions to appear on the leaderboard!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
