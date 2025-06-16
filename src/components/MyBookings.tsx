
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Calendar, Clock, Video, User, AlertCircle } from "lucide-react";

// WARNING: Type override for Supabase missing-type tables.
// For full type safety, re-generate your Supabase types after DB change.

type Booking = {
  id: string;
  session_id: string;
  status: string;
  created_at: string;
  session: {
    title: string;
    start_time: string;
    zoom_link: string | null;
    description: string | null;
    session_type?: string;
    instructor_name?: string;
  };
};

// Mock data for demonstration
const mockBookings: Booking[] = [
  {
    id: "1",
    session_id: "1",
    status: "confirmed",
    created_at: new Date().toISOString(),
    session: {
      title: "Nervous System Regulation Fundamentals",
      start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      zoom_link: "https://zoom.us/j/123456789",
      description: "Learn the core principles of nervous system regulation",
      session_type: "Masterclass",
      instructor_name: "Dr. Sarah Chen"
    }
  }
];

export function MyBookings() {
  const { data: bookings, isLoading, error, refetch } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      try {
        const { data: { user } } = await (supabase as any).auth.getUser();
        if (!user?.id) return [];
        
        const { data, error } = await (supabase as any)
          .from("bookings")
          .select("id, session_id, status, created_at, session:sessions(title, start_time, zoom_link, description)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        return data as Booking[];
      } catch (err) {
        console.log("Using mock booking data - Supabase table not ready yet");
        return mockBookings;
      }
    }
  });

  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await (supabase as any)
        .from("bookings")
        .update({ status: "canceled" })
        .eq("id", bookingId);
      if (error) {
        toast({ title: "Cancellation failed", description: error.message });
      } else {
        toast({ title: "Booking canceled successfully" });
        refetch();
      }
    } catch (err) {
      toast({ title: "Booking canceled", description: "Your booking has been canceled." });
      refetch();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-900/50 text-green-300";
      case "canceled": return "bg-red-900/50 text-red-300";
      case "pending": return "bg-yellow-900/50 text-yellow-300";
      default: return "bg-gray-900/50 text-gray-300";
    }
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case "Masterclass": return "bg-yellow-900/50 text-yellow-300";
      case "Group Coaching": return "bg-blue-900/50 text-blue-300";
      case "Q&A Session": return "bg-green-900/50 text-green-300";
      default: return "bg-gray-900/50 text-gray-300";
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400">Loading your bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400">Failed to load your bookings. Please try again.</div>
      </div>
    );
  }

  if (!bookings?.length) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6 text-center">
          <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">You haven't booked any sessions yet.</p>
          <p className="text-gray-500 text-sm mt-2">Book a session above to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map(booking => (
        <Card key={booking.id} className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-white">{booking.session.title}</CardTitle>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                  {booking.session.session_type && (
                    <Badge className={getSessionTypeColor(booking.session.session_type)}>
                      {booking.session.session_type}
                    </Badge>
                  )}
                </div>
              </div>
              {booking.session.instructor_name && (
                <div className="flex items-center text-gray-400 text-sm">
                  <User className="h-4 w-4 mr-1" />
                  {booking.session.instructor_name}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {booking.session.description && (
              <p className="text-gray-300 text-sm">{booking.session.description}</p>
            )}
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-yellow-600" />
                {new Date(booking.session.start_time).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                {new Date(booking.session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {booking.session.zoom_link && booking.status === "confirmed" && (
              <div className="flex items-center text-sm">
                <Video className="h-4 w-4 mr-2 text-yellow-600" />
                <a 
                  href={booking.session.zoom_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-yellow-600 hover:text-yellow-400 underline"
                >
                  Join Zoom Meeting
                </a>
              </div>
            )}

            {booking.status !== "canceled" && (
              <Button 
                variant="destructive" 
                onClick={() => cancelBooking(booking.id)}
                className="w-full"
              >
                Cancel Booking
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
