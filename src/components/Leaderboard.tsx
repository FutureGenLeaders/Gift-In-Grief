
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Crown, Heart, Compass, Brain } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  progress: number;
  streak: number;
  level: string;
  joinDate: string;
}

// Mock data for grief healing progress leaderboard
const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Sarah M.",
    progress: 89,
    streak: 45,
    level: "Wisdom Guide",
    joinDate: "8 months ago"
  },
  {
    id: "2", 
    name: "Michael R.",
    progress: 76,
    streak: 32,
    level: "Heart Healer",
    joinDate: "6 months ago"
  },
  {
    id: "3",
    name: "Elena C.",
    progress: 68,
    streak: 28,
    level: "Brave Navigator",
    joinDate: "5 months ago"
  },
  {
    id: "4",
    name: "David L.",
    progress: 55,
    streak: 21,
    level: "Growing Strong",
    joinDate: "4 months ago"
  },
  {
    id: "5",
    name: "Maria S.",
    progress: 43,
    streak: 15,
    level: "Finding Path",
    joinDate: "3 months ago"
  }
];

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from Supabase
    // For now, using mock data focused on grief healing journey
    setLeaderboard(mockLeaderboard);
    setUserRank(7); // User's current rank in healing journey
  }, []);

  const getLevelIcon = (level: string) => {
    if (level.includes("Wisdom")) return Crown;
    if (level.includes("Heart")) return Heart;
    if (level.includes("Navigator")) return Compass;
    return Brain;
  };

  const getLevelColor = (level: string) => {
    if (level.includes("Wisdom")) return "text-yellow-400";
    if (level.includes("Heart")) return "text-red-400";
    if (level.includes("Navigator")) return "text-blue-400";
    return "text-green-400";
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 h-fit">
      <CardHeader>
        <CardTitle className="text-white flex items-center font-light">
          <Crown className="h-5 w-5 text-yellow-600 mr-2" />
          Healing Journey Leaders
        </CardTitle>
        <p className="text-gray-400 text-sm font-light">
          Community members thriving in their grief transformation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaderboard.map((entry, index) => {
          const IconComponent = getLevelIcon(entry.level);
          const levelColor = getLevelColor(entry.level);
          
          return (
            <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-600/50 text-sm font-medium text-gray-300">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm">{entry.name}</span>
                    <IconComponent className={`h-4 w-4 ${levelColor}`} />
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      {entry.level}
                    </Badge>
                    <span className="text-xs text-gray-500">{entry.joinDate}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-yellow-600">{entry.progress}%</div>
                <div className="text-xs text-gray-400">{entry.streak} day streak</div>
              </div>
            </div>
          );
        })}
        
        {userRank && (
          <div className="border-t border-slate-600 pt-4 mt-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-900/20 border border-yellow-600/30">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-600/20 text-sm font-medium text-yellow-400">
                  {userRank}
                </div>
                <div>
                  <span className="text-white font-medium text-sm">Your Journey</span>
                  <div className="text-xs text-yellow-400 mt-1">Keep growing! 🌱</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-yellow-400">32%</div>
                <div className="text-xs text-yellow-500">12 day streak</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
