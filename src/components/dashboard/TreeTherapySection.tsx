
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Star, Shield } from "lucide-react";

export default function TreeTherapySection() {
  const sessions = [
    {
      title: "Processing Denial & Shock",
      duration: "45 min",
      price: "$55",
      description: "Gentle guidance through the initial stages of grief with self-inquiry practices",
      emotion: "Overwhelm"
    },
    {
      title: "Working Through Anger",
      duration: "50 min", 
      price: "$55",
      description: "Transform anger into understanding through mindful emotional intelligence",
      emotion: "Rage"
    },
    {
      title: "Navigating Bargaining",
      duration: "40 min",
      price: "$55", 
      description: "Release the need to control and find peace in acceptance",
      emotion: "Desperation"
    },
    {
      title: "Embracing Sadness",
      duration: "55 min",
      price: "$55",
      description: "Honor your grief and allow healing tears to flow naturally", 
      emotion: "Deep Sorrow"
    },
    {
      title: "Finding Acceptance",
      duration: "60 min",
      price: "$55",
      description: "Integrate your loss and discover the gift within your grief",
      emotion: "Peace"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-light bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mb-4 flex items-center justify-center">
          <Heart className="h-6 w-6 text-yellow-600 mr-3" />
          Mindfulness Mentoring Sessions
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
          Self-guided healing sessions designed to help you work through emotions and develop emotional intelligence through your grief journey. These private sessions allow you to tell your truth and heal at your own pace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="space-y-1">
                  <span className="text-xs text-yellow-600 font-medium">{session.emotion}</span>
                  <CardTitle className="text-white text-lg font-light leading-tight">
                    {session.title}
                  </CardTitle>
                </div>
                <Shield className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                {session.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-yellow-600" />
                    {session.duration}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-600" />
                    {session.price}
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white font-light"
                size="sm"
              >
                Purchase & Access
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-yellow-900/20 to-red-900/20 border border-yellow-700/30 rounded-xl p-6 text-center">
        <h3 className="text-xl font-light text-yellow-300 mb-3">Your Private Healing Space</h3>
        <p className="text-yellow-200 leading-relaxed font-light">
          These sessions remain in your personal library forever. Practice emotional intelligence, make empowered decisions, and heal through the transformative power of telling your truth - without judgment, without time limits, at your own sacred pace.
        </p>
      </div>
    </div>
  );
}
