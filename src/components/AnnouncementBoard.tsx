
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Announcement {
  id: string;
  title: string;
  content: string;
  posted_at: string;
}

export default function AnnouncementBoard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      setLoading(true);
      const { data, error } = await supabase
        .from("announcements" as any)
        .select("id, title, content, posted_at")
        .order("posted_at", { ascending: false });
      if (!error && data) setAnnouncements(data);
      setLoading(false);
    }
    fetchAnnouncements();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-2">
      <h1 className="text-3xl font-bold mb-6 text-yellow-600">Notice Board</h1>
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : (
        <div className="space-y-6">
          {announcements.map((a) => (
            <div key={a.id} className="bg-black/50 border border-yellow-900/30 rounded-lg p-4 shadow">
              <div className="font-bold text-lg text-yellow-300">{a.title}</div>
              <div className="text-gray-200 mb-2">{a.content}</div>
              <div className="text-xs text-gray-400">{new Date(a.posted_at).toLocaleString()}</div>
            </div>
          ))}
          {announcements.length === 0 && (
            <div className="text-center text-gray-400">No announcements yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
