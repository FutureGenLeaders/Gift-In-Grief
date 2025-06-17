
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
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-light text-white flex items-center">
              <Users className="h-8 w-8 text-yellow-600 mr-3" />
              Sacred Circle Community
            </h1>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
            >
              Back to Dashboard
            </Button>
          </div>

          <p className="text-gray-300 mb-8 font-light leading-relaxed">
            Connect with fellow healers in our private community space for support, growth, and shared wisdom.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-light">
                  <MessageSquare className="h-6 w-6 text-yellow-600 mr-2" />
                  Community Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 font-light leading-relaxed">
                  Join ongoing conversations with your peers about grief healing and transformation breakthroughs.
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white font-light">
                  Join Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-light">
                  <Calendar className="h-6 w-6 text-yellow-600 mr-2" />
                  Weekly Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 font-light leading-relaxed">
                  Participate in weekly group healing sessions and peer support circles.
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white font-light">
                  View Schedule
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-light">
                  <Heart className="h-6 w-6 text-yellow-600 mr-2" />
                  Peer Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 font-light leading-relaxed">
                  Find accountability partners and create support networks for your healing journey.
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white font-light">
                  Find Partners
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-light">
                  <Users className="h-6 w-6 text-yellow-600 mr-2" />
                  Success Stories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 font-light leading-relaxed">
                  Share your healing wins and celebrate the transformation of fellow community members.
                </p>
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white font-light">
                  Share Story
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-900/20 to-red-900/20 border border-yellow-700/30 rounded-xl">
            <h3 className="text-xl font-light text-yellow-300 mb-4">Community Guidelines</h3>
            <ul className="text-yellow-200 space-y-2 font-light">
              <li>• Respect and support all community members on their healing journey</li>
              <li>• Share openly and vulnerably about your transformation process</li>
              <li>• Maintain confidentiality of shared experiences and stories</li>
              <li>• Offer constructive feedback and gentle encouragement</li>
              <li>• Stay present and engaged in healing conversations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
