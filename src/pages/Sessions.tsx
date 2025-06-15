
import React from "react";
import { SessionList } from "@/components/SessionList";
import { MyBookings } from "@/components/MyBookings";

const Sessions = () => (
  <div className="max-w-2xl mx-auto pt-8 space-y-10">
    <h1 className="text-3xl font-bold mb-4">Available Sessions</h1>
    <SessionList />
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-2">Your Bookings</h2>
      <MyBookings />
    </div>
  </div>
);

export default Sessions;
