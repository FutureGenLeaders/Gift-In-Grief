
import React from "react";
import { SessionList } from "@/components/SessionList";
import { MyBookings } from "@/components/MyBookings";
import HomeNav from "@/components/home/HomeNav";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, Video, BookOpen } from "lucide-react";

const Sessions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <HomeNav />
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-light bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mb-4">
              Weekly Healing Sessions
            </h1>
            <p className="text-gray-300 text-lg mb-6 font-light leading-relaxed">
              Join weekly sessions to accelerate your healing and transformation journey
            </p>
            <Button
              onClick={() => navigate("/create-session")}
              className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white font-light"
            >
              <Video className="h-4 w-4 mr-2" />
              Host a Session
            </Button>
          </div>

          {/* Session Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-yellow-600 flex items-center font-light">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Healing Circles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  Deep-dive sessions on specific grief stages and emotional healing topics
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-yellow-600 flex items-center font-light">
                  <Users className="h-5 w-5 mr-2" />
                  Group Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  Interactive sessions with guided healing practices and peer support
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-yellow-600 flex items-center font-light">
                  <Calendar className="h-5 w-5 mr-2" />
                  Q&A Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  Open forums to get your questions answered about healing and transformation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Available Sessions */}
          <div className="mb-12">
            <h2 className="text-2xl font-light text-white mb-6 flex items-center">
              <Clock className="h-6 w-6 text-yellow-600 mr-2" />
              Available Sessions
            </h2>
            <SessionList />
          </div>

          {/* Your Bookings */}
          <div className="mb-8">
            <h2 className="text-2xl font-light text-white mb-6 flex items-center">
              <Users className="h-6 w-6 text-yellow-600 mr-2" />
              Your Bookings
            </h2>
            <MyBookings />
          </div>

          {/* Back to Dashboard */}
          <div className="text-center">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 font-light"
            >
              ← Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
