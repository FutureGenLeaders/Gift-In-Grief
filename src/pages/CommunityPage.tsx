
import React from "react";
import HomeNav from "@/components/home/HomeNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Calendar, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <HomeNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              Sacred Circle Community
            </h1>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600/10"
            >
              Back to Dashboard
            </Button>
          </div>

          <p className="text-gray-300 mb-8">
            Connect with fellow leaders in our private community space for support, growth, and shared wisdom.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-green-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="h-6 w-6 text-green-400 mr-2" />
                  Community Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Join ongoing conversations with your peers about leadership challenges and breakthroughs.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Join Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-green-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="h-6 w-6 text-green-400 mr-2" />
                  Group Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Participate in weekly group coaching sessions and peer learning circles.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  View Schedule
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-green-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Heart className="h-6 w-6 text-green-400 mr-2" />
                  Peer Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Find accountability partners and create support networks for your growth journey.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Find Partners
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-green-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-6 w-6 text-green-400 mr-2" />
                  Success Stories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Share your wins and celebrate the achievements of fellow community members.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Share Story
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-700/30 rounded-xl">
            <h3 className="text-xl font-bold text-green-300 mb-4">Community Guidelines</h3>
            <ul className="text-green-200 space-y-2">
              <li>• Respect and support all community members</li>
              <li>• Share openly and vulnerably about your journey</li>
              <li>• Maintain confidentiality of shared experiences</li>
              <li>• Offer constructive feedback and encouragement</li>
              <li>• Stay present and engaged in conversations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
