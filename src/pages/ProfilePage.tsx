
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, TrendingUp, Download, Clock } from "lucide-react";
import HomeNav from "@/components/home/HomeNav";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  full_name: string;
  created_at: string;
  trial_start_date: string;
  trial_end_date: string;
  subscription_status: string;
}

interface SessionHistory {
  id: string;
  session_type: string;
  completed_at: string;
  streak_count: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [sessionHistory, setSessionHistory] = useState<SessionHistory[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    currentStreak: 0,
    longestStreak: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfileData() {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;

      // Get user profile (now typed)
      const { data: profileData } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.user.id)
        .maybeSingle();

      // Get session history
      const { data: sessions } = await supabase
        .from("daily_sessions")
        .select("*")
        .eq("user_id", user.user.id)
        .order("completed_at", { ascending: false })
        .limit(10);

      // Calculate stats
      const totalSessions = sessions?.length || 0;
      let currentStreak = 0;
      let longestStreak = 0;

      if (sessions && sessions.length > 0) {
        // Calculate current streak
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < sessions.length; i++) {
          const sessionDate = new Date(sessions[i].completed_at);
          sessionDate.setHours(0, 0, 0, 0);
          
          const expectedDate = new Date(today);
          expectedDate.setDate(today.getDate() - i);
          
          if (sessionDate.getTime() === expectedDate.getTime()) {
            currentStreak++;
          } else {
            break;
          }
        }

        // Calculate longest streak
        longestStreak = Math.max(...sessions.map((s: any) => s.streak_count));
      }

      setProfile(profileData);
      setSessionHistory(sessions || []);
      setStats({ totalSessions, currentStreak, longestStreak });
      setLoading(false);
    }

    fetchProfileData();
  }, []);

  const downloadReport = () => {
    if (!sessionHistory.length) return;

    const csvContent = [
      ["Date", "Session Type", "Streak Count"],
      ...sessionHistory.map(session => [
        new Date(session.completed_at).toLocaleDateString(),
        session.session_type,
        session.streak_count.toString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "session-report.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const getTrialStatus = () => {
    if (!profile) return null;
    
    if (profile.subscription_status !== 'trial') {
      return <span className="text-green-400 font-semibold">Premium Member</span>;
    }

    const now = new Date();
    const endDate = new Date(profile.trial_end_date);
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
      return <span className="text-red-400 font-semibold">Trial Expired</span>;
    }

    return <span className="text-yellow-400 font-semibold">Trial Active ({daysLeft} days left)</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <HomeNav />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <HomeNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <User className="h-8 w-8 text-yellow-600 mr-3" />
              My Profile & Progress
            </h1>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Profile Info */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Name</label>
                  <p className="text-white font-semibold">{profile?.full_name || "Not set"}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Join Date</label>
                  <p className="text-white font-semibold">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Trial Status</label>
                  <p>{getTrialStatus()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-green-700/30">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-400">{stats.currentStreak}</p>
                <p className="text-green-200">Current Streak</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border-blue-700/30">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-400">{stats.totalSessions}</p>
                <p className="text-blue-200">Total Sessions</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border-purple-700/30">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-400">{stats.longestStreak}</p>
                <p className="text-purple-200">Longest Streak</p>
              </CardContent>
            </Card>
          </div>

          {/* Session History */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Recent Session History</CardTitle>
                <Button
                  onClick={downloadReport}
                  variant="outline"
                  size="sm"
                  className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
                  disabled={!sessionHistory.length}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {sessionHistory.length > 0 ? (
                <div className="space-y-3">
                  {sessionHistory.slice(0, 5).map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-white capitalize">
                          {session.session_type.replace('_', ' ')} Session
                        </p>
                        <p className="text-sm text-gray-400">
                          {new Date(session.completed_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-semibold">Completed</p>
                        <p className="text-xs text-gray-400">
                          Streak: {session.streak_count}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No sessions completed yet.</p>
                  <p className="text-sm">Complete your first session to see it here!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
