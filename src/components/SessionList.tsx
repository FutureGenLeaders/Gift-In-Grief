
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

// WARNING: Type override for Supabase missing-type tables.
// For full type safety, re-generate your Supabase types after DB change.

type Session = {
  id: string;
  title: string;
  description: string | null;
  zoom_link: string | null;
  start_time: string;
  end_time: string;
};

export function SessionList() {
  const { data: sessions, isLoading, error, refetch } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("sessions")
        .select("*")
        .gte("start_time", new Date().toISOString())
        .order("start_time");
      if (error) throw error;
      return data as Session[];
    }
  });

  const bookSession = async (sessionId: string) => {
    const { data: { user } } = await (supabase as any).auth.getUser();
    if (!user?.id) {
      toast({ title: "Please sign in to book.", description: "" });
      return;
    }
    const { error } = await (supabase as any).from("bookings").insert({
      session_id: sessionId,
      user_id: user.id,
    });
    if (error) {
      toast({ title: "Booking failed", description: error.message });
    } else {
      toast({ title: "Session booked!", description: "" });
      refetch();
    }
  };

  if (isLoading) return <div>Loading sessions...</div>;
  if (error) return <div>Failed to load sessions.</div>;
  if (!sessions?.length) return <div>No upcoming sessions available.</div>;

  return (
    <ul className="space-y-4">
      {sessions.map(sess => (
        <li key={sess.id} className="border rounded p-4 shadow-sm flex flex-col gap-2 bg-background">
          <div>
            <span className="text-lg font-semibold">{sess.title}</span>
            <span className="block text-gray-500 text-sm">{sess.description}</span>
          </div>
          <div><b>Start:</b> {new Date(sess.start_time).toLocaleString()}</div>
          {sess.zoom_link && (
            <div>
              <b>Zoom:</b>{" "}
              <a className="text-primary underline" href={sess.zoom_link} target="_blank" rel="noopener noreferrer">
                {sess.zoom_link}
              </a>
            </div>
          )}
          <Button className="w-max" onClick={() => bookSession(sess.id)}>Book</Button>
        </li>
      ))}
    </ul>
  );
}
