
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  posted_at: string;
}

// Mock data for grief-focused announcements
const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Welcome to Your Healing Journey",
    content: "Remember that healing isn't linear. Some days will be harder than others, and that's completely normal. You're exactly where you need to be in this moment.",
    posted_at: new Date().toISOString()
  },
  {
    id: "2", 
    title: "New Guided Meditation Available",
    content: "We've added a new 10-minute morning meditation for gentle grief processing. Find it in your daily practices section.",
    posted_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    title: "Upcoming Grief Circle Session",
    content: "Join us this Thursday at 7 PM EST for our weekly grief circle. This week's theme: 'Finding Light in Dark Moments'.",
    posted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export default function AnnouncementBoard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      setLoading(true);
      try {
        const { data, error } = await (supabase as any)
          .from("announcements")
          .select("id, title, content, posted_at")
          .order("posted_at", { ascending: false });

        if (!error && data) {
          setAnnouncements(data);
        } else {
          console.log("Using mock announcement data - Supabase table not ready yet");
          setAnnouncements(mockAnnouncements);
        }
      } catch (err) {
        setAnnouncements(mockAnnouncements);
      }
      setLoading(false);
    }
    fetchAnnouncements();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-2">
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading community messages...</div>
      ) : (
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-yellow-600 flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  {announcement.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-200">{announcement.content}</p>
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(announcement.posted_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
          {announcements.length === 0 && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6 text-center">
                <Heart className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No community messages yet.</p>
                <p className="text-gray-500 text-sm mt-2">Check back soon for updates and encouragement!</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
