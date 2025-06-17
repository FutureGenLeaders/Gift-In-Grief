
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TreePine, Play, Lock, Star, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const treeTherapySessions = [
  {
    id: "1",
    title: "Denial & Shock Clearing",
    stage: "Stage 1: Denial",
    description: "A powerful African mysticism transmission to help release the energy of denial and shock, allowing truth to emerge gently.",
    duration: "22 minutes",
    emotion: "Confusion, Numbness",
    price: 55,
    available: true
  },
  {
    id: "2", 
    title: "Anger Transformation",
    stage: "Stage 2: Anger",
    description: "Sacred clearing transmission to transform raw anger into purposeful energy and reclaim your inner fire.",
    duration: "28 minutes",
    emotion: "Rage, Resentment",
    price: 55,
    available: true
  },
  {
    id: "3",
    title: "Bargaining Release",
    stage: "Stage 3: Bargaining", 
    description: "Mystical session to release the energy of bargaining and 'what ifs', guiding you toward acceptance of what is.",
    duration: "25 minutes",
    emotion: "Desperation, Hope",
    price: 55,
    available: true
  },
  {
    id: "4",
    title: "Depression Transmutation", 
    stage: "Stage 4: Depression",
    description: "Deep healing transmission to transmute the heavy energy of depression into wisdom and inner strength.",
    duration: "35 minutes",
    emotion: "Sadness, Emptiness",
    price: 55,
    available: false
  },
  {
    id: "5",
    title: "Acceptance Integration",
    stage: "Stage 5: Acceptance",
    description: "Sacred clearing to integrate acceptance and find peace with your new reality, honoring your journey.",
    duration: "30 minutes", 
    emotion: "Peace, Understanding",
    price: 55,
    available: false
  }
];

export default function TreeTherapySection() {
  const handlePurchase = (sessionId: string, title: string) => {
    toast({
      title: "Preparing Your Session",
      description: `Preparing your purchase of "${title}" - $55`,
    });
    // TODO: Implement payment processing
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <TreePine className="h-8 w-8 text-yellow-600" />
          <h2 className="text-3xl font-light bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent">
            Tree Therapy Sessions
          </h2>
        </div>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Powerful African mysticism clearing transmissions based on the grief journey. 
          These recorded sessions allow you to heal at your own pace, speak your truth, and clear energy without judgment.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-yellow-600">
          <Star className="h-4 w-4" />
          <span>Self-guided healing • Private access • Your personal library</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treeTherapySessions.map((session) => (
          <Card key={session.id} className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border-slate-700/50 hover:border-yellow-600/30 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="text-yellow-600 border-yellow-600/40 bg-yellow-600/10">
                  {session.stage}
                </Badge>
                {session.available ? (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">${session.price}</div>
                    <div className="text-xs text-gray-400">one-time</div>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-500 text-sm">
                    <Lock className="h-4 w-4 mr-1" />
                    <span>Coming Soon</span>
                  </div>
                )}
              </div>
              <CardTitle className="text-xl font-medium text-white group-hover:text-yellow-600 transition-colors">
                {session.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                {session.description}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-400">
                  <Play className="h-4 w-4 mr-2 text-yellow-600" />
                  <span>{session.duration}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Heart className="h-4 w-4 mr-2 text-red-600" />
                  <span>Emotions: {session.emotion}</span>
                </div>
              </div>

              <Button 
                onClick={() => handlePurchase(session.id, session.title)}
                disabled={!session.available}
                className={`w-full ${
                  session.available 
                    ? "bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white" 
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                {session.available ? `Purchase Session - $${session.price}` : "Coming Soon"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-400 text-sm">
          Each session becomes part of your permanent healing library. 
          <span className="text-yellow-600 ml-1">Speak your truth, heal at your pace.</span>
        </p>
      </div>
    </div>
  );
}
