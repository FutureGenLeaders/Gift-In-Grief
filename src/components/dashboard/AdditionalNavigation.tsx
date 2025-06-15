
import React from "react";
import { Link } from "react-router-dom";

export default function AdditionalNavigation() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Link className="text-blue-700 underline hover:text-blue-500" to="/sessions">
        View & Book Sessions
      </Link>
      <Link className="text-teal-700 underline hover:text-teal-500" to="/create-session">
        Host: Create Session
      </Link>
      <Link className="text-yellow-600 underline hover:text-yellow-400" to="/announcements">
        Notice Board
      </Link>
    </div>
  );
}
