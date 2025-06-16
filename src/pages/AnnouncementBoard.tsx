
import React from "react";
import AnnouncementBoard from "@/components/AnnouncementBoard";
import HomeNav from "@/components/home/HomeNav";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Megaphone } from "lucide-react";

export default function AnnouncementBoardPage() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-black pb-12">
      <HomeNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mb-4 flex items-center justify-center">
              <Megaphone className="h-10 w-10 text-yellow-600 mr-3" />
              Notice Board
            </h1>
            <p className="text-gray-300 text-lg">
              Stay updated with the latest announcements and community news
            </p>
          </div>
          
          <AnnouncementBoard />
          
          <div className="text-center pt-10">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
            >
              ← Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
