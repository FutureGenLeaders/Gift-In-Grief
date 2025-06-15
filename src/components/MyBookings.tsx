
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

// WARNING: Type override for Supabase missing-type tables.
// For full type safety, re-generate your Supabase types after DB change.

type Booking = {
  id: string;
  session_id: string;
  status: string;
  session: {
    title: string;
    start_time: string;
    zoom_link: string | null;
  };
};

export function MyBookings() {
  const { data: bookings, isLoading, error, refetch } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const { data: { user } } = await (supabase as any).auth.getUser();
      if (!user?.id) return [];
      const { data, error } = await (supabase as any)
        .from("bookings")
        .select("id, session_id, status, session:sessions(title, start_time, zoom_link)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Booking[];
    }
  });

  const cancelBooking = async (bookingId: string) => {
    const { error } = await (supabase as any).from("bookings").update({ status: "canceled" }).eq("id", bookingId);
    if (error) {
      toast({ title: "Cancellation failed", description: error.message });
    } else {
      toast({ title: "Booking canceled" });
      refetch();
    }
  };

  if (isLoading) return <div>Loading your bookings...</div>;
  if (error) return <div>Failed to load your bookings.</div>;
  if (!bookings?.length) return <div>You haven’t booked any sessions yet.</div>;

  return (
    <ul className="space-y-3">
      {bookings.map(booking => (
        <li key={booking.id} className="border rounded p-4 flex flex-col gap-2 bg-background">
          <div>
            <b>{booking.session.title}</b> — {new Date(booking.session.start_time).toLocaleString()}
          </div>
          {booking.session.zoom_link && (
            <div>
              <b>Zoom:</b>{" "}
              <a className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" href={booking.session.zoom_link}>{booking.session.zoom_link}</a>
            </div>
          )}
          <div>Status: <span className="capitalize">{booking.status}</span></div>
          {booking.status !== "canceled" && (
            <Button variant="destructive" onClick={() => cancelBooking(booking.id)}>Cancel</Button>
          )}
        </li>
      ))}
    </ul>
  );
}
