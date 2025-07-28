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
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-bold text-gold mb-6 tracking-tight">
            Healing Sessions
          </h1>
          <p className="text-lg font-['Inter'] text-silver leading-relaxed mb-8 max-w-2xl mx-auto">
            Join weekly sessions to accelerate your healing and transformation journey
          </p>
          <Button
            onClick={() => navigate("/create-session")}
            className="bg-gold text-black hover:bg-silver font-semibold"
          >
            <Video className="h-4 w-4 mr-2" />
            Host a Session
          </Button>
        </div>

        {/* Session Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-900 border-gray-800 hover:border-gold/30 transition-colors">
            <CardHeader>
              <CardTitle className="font-['Playfair_Display'] text-gold flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Healing Circles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-['Inter'] text-silver text-sm leading-relaxed">
                Deep-dive sessions on specific grief stages and emotional healing topics
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-gold/30 transition-colors">
            <CardHeader>
              <CardTitle className="font-['Playfair_Display'] text-gold flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Group Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-['Inter'] text-silver text-sm leading-relaxed">
                Interactive sessions with guided healing practices and peer support
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:border-gold/30 transition-colors">
            <CardHeader>
              <CardTitle className="font-['Playfair_Display'] text-gold flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Q&A Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-['Inter'] text-silver text-sm leading-relaxed">
                Open forums to get your questions answered about healing and transformation
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Available Sessions */}
        <div className="mb-12">
          <h2 className="text-2xl font-['Playfair_Display'] font-semibold text-gold mb-6 flex items-center">
            <Clock className="h-6 w-6 mr-2" />
            Available Sessions
          </h2>
          <SessionList />
        </div>

        {/* Your Bookings */}
        <div className="mb-8">
          <h2 className="text-2xl font-['Playfair_Display'] font-semibold text-gold mb-6 flex items-center">
            <Users className="h-6 w-6 mr-2" />
            Your Bookings
          </h2>
          <MyBookings />
        </div>

        {/* Back to Dashboard */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="border-gray-600 text-silver hover:text-gold hover:border-gold"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sessions;