
import React from "react";
import AnnouncementBoard from "@/components/AnnouncementBoard";
import HomeNav from "@/components/home/HomeNav";
import { useNavigate } from "react-router-dom";

export default function AnnouncementBoardPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-black pb-12">
      <HomeNav />
      <AnnouncementBoard />
      <div className="text-center pt-10">
        <button
          onClick={() => navigate("/")}
          className="text-gray-400 underline hover:text-yellow-200"
        >
          ← Back to Dashboard
        </button>
      </div>
    </main>
  );
}
