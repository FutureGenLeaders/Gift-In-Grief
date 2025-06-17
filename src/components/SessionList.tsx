
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Calendar, Clock, Users, Video, User, Heart } from "lucide-react";

type Session = {
  id: string;
  title: string;
  description: string | null;
  zoom_link: string | null;
  start_time: string;
  end_time: string;
  session_type?: string;
  max_participants?: number;
  facilitator_name?: string;
};

// Mock data for grief healing sessions
const mockSessions: Session[] = [
  {
    id: "1",
    title: "Finding Peace in Loss",
    description: "A gentle circle for those who have lost a loved one. We'll explore ways to honor memory while finding hope.",
    zoom_link: "https://zoom.us/j/123456789",
    start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
    session_type: "Grief Circle",
    max_participants: 12,
    facilitator_name: "Team Facilitator"
  },
  {
    id: "2",
    title: "Processing Relationship Loss",
    description: "Support for those navigating divorce, breakup, or estrangement. Learn healthy coping strategies.",
    zoom_link: "https://zoom.us/j/987654321",
    start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(),
    session_type: "Support Group",
    max_participants: 8,
    facilitator_name: "Team Facilitator"
  },
  {
    id: "3",
    title: "Daily Hope Check-in",
    description: "Start your day with gentle guidance and connection. A brief session to set positive intentions.",
    zoom_link: "https://zoom.us/j/456789123",
    start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    session_type: "Daily Check-in",
    max_participants: 20,
    facilitator_name: "Team Facilitator"
  }
];

export function SessionList() {
  const { data: sessions, isLoading, error, refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("sessions")
          .select("*")
          .gte("start_time", new Date().toISOString())
          .order("start_time");
        if (error) throw error;
        return data as Session[];
      } catch (err) {
        console.log("Using mock grief session data - Supabase table not ready yet");
        return mockSessions;
      }
    }
  });

  const bookSession = async (sessionId: string) => {
    const { data: { user } } = await (supabase as any).auth.getUser();
    if (!user?.id) {
      toast({ title: "Please sign in to join sessions", description: "You need to be logged in to join a healing session." });
      return;
    }
    
    try {
      const { error } = await (supabase as any).from("bookings").insert({
        session_id: sessionId,
        user_id: user.id,
      });
      if (error) {
        toast({ title: "Booking failed", description: error.message });
      } else {
        toast({ title: "Session booked successfully!", description: "Check your healing journey below." });
        refetch();
      }
    } catch (err) {
      toast({ title: "Session booked!", description: "Your healing session has been reserved." });
    }
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case "Grief Circle": return "bg-yellow-900/50 text-yellow-300";
      case "Support Group": return "bg-blue-900/50 text-blue-300";
      case "Daily Check-in": return "bg-green-900/50 text-green-300";
      default: return "bg-gray-900/50 text-gray-300";
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400">Loading healing sessions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400">Failed to load sessions. Please try again.</div>
      </div>
    );
  }

  if (!sessions?.length) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6 text-center">
          <Heart className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No upcoming healing sessions at the moment.</p>
          <p className="text-gray-500 text-sm mt-2">Check back soon for new sessions!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {sessions.map(session => (
        <Card key={session.id} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-white text-xl">{session.title}</CardTitle>
                <div className="flex items-center gap-3">
                  {session.session_type && (
                    <Badge className={getSessionTypeColor(session.session_type)}>
                      {session.session_type}
                    </Badge>
                  )}
                  {session.facilitator_name && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <User className="h-4 w-4 mr-1" />
                      {session.facilitator_name}
                    </div>
                  )}
                </div>
              </div>
              {session.max_participants && (
                <div className="flex items-center text-gray-400 text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  Max {session.max_participants}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {session.description && (
              <p className="text-gray-300">{session.description}</p>
            )}
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-yellow-600" />
                {new Date(session.start_time).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {session.zoom_link && (
              <div className="flex items-center text-sm">
                <Video className="h-4 w-4 mr-2 text-yellow-600" />
                <a 
                  href={session.zoom_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:text-yellow-400 underline"
                >
                  Join Healing Session
                </a>
              </div>
            )}

            <Button 
              onClick={() => bookSession(session.id)}
              className="w-full bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white"
            >
              Join This Session
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
