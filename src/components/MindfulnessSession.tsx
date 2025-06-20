
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Lock, Play, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Session {
  id: string;
  title: string;
  emotion: string;
  lossType: string;
  duration: number;
  description: string;
  price: number;
  isPurchased: boolean;
  isCompleted: boolean;
}

const sessions: Session[] = [
  {
    id: "loneliness-loved-one",
    title: "Navigating Loneliness After Loss of Loved One",
    emotion: "Loneliness",
    lossType: "Loss of Loved One",
    duration: 55,
    description: "Deep emotional intelligence work for processing isolation and disconnection after losing someone precious. Learn to be with loneliness without being consumed by it.",
    price: 55,
    isPurchased: false,
    isCompleted: false
  },
  {
    id: "anger-relationship",
    title: "Transforming Anger from Relationship Loss",
    emotion: "Anger",
    lossType: "Loss of Relationship",
    duration: 60,
    description: "Self-guided session for processing rage, resentment, and righteous fury after relationship endings. Transform anger into wisdom about boundaries and self-worth.",
    price: 55,
    isPurchased: false,
    isCompleted: false
  },
  {
    id: "despair-identity",
    title: "Finding Light in Identity Loss Despair",
    emotion: "Despair",
    lossType: "Loss of Identity",
    duration: 50,
    description: "Navigate hopelessness and existential pain when your sense of self has been shattered. Gentle guidance for rebuilding identity from authentic foundation.",
    price: 55,
    isPurchased: false,
    isCompleted: false
  },
  {
    id: "fear-health",
    title: "Facing Fear After Health Loss",
    emotion: "Fear",
    lossType: "Loss of Health",
    duration: 45,
    description: "Address anxiety about the future, terror of more loss, and survival fears after health challenges. Build emotional sovereignty around uncertainty.",
    price: 55,
    isPurchased: false,
    isCompleted: false
  }
];

export default function MindfulnessSession() {
  const [purchasingSession, setPurchasingSession] = useState<string | null>(null);

  const handlePurchaseSession = async (sessionId: string) => {
    setPurchasingSession(sessionId);
    
    try {
      const { data, error } = await supabase.functions.invoke("purchase-session", {
        body: { sessionId, price: 5500 } // $55 in cents
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Open payment in new tab
        window.open(data.url, "_blank");
        toast({
          title: "Redirecting to secure checkout",
          description: "Complete your payment to access this healing session forever."
        });
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast({
        title: "Purchase Error",
        description: "Unable to process purchase. Please try again.",
        variant: "destructive"
      });
    } finally {
      setPurchasingSession(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mb-4">
          Mindfulness Mentoring Sessions
        </h2>
        <p className="text-gray-300 text-lg font-light leading-relaxed max-w-3xl mx-auto">
          Self-guided emotional intelligence sessions where you can tell the truth about your grief. 
          Each session builds emotional sovereignty and decision-making strength through your unique loss experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.map((session) => (
          <Card key={session.id} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="space-y-2">
                  <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                    {session.emotion}
                  </Badge>
                  <Badge variant="outline" className="border-slate-500 text-slate-300">
                    {session.lossType}
                  </Badge>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{session.duration}min</span>
                </div>
              </div>
              <CardTitle className="text-white text-lg font-light leading-tight">
                {session.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                {session.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl font-light text-yellow-600">${session.price}</span>
                  <span className="text-gray-400 text-sm ml-2">one-time</span>
                </div>
                
                {session.isPurchased ? (
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={session.isCompleted}
                  >
                    {session.isCompleted ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Session
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlePurchaseSession(session.id)}
                    disabled={purchasingSession === session.id}
                    className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white"
                  >
                    {purchasingSession === session.id ? (
                      "Processing..."
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Purchase Session
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-yellow-900/20 to-red-900/20 border border-yellow-700/30 rounded-lg p-6 mt-8">
        <div className="flex items-center mb-4">
          <Heart className="h-6 w-6 text-yellow-600 mr-3" />
          <h3 className="text-yellow-200 font-medium text-lg">Why Individual Sessions?</h3>
        </div>
        <ul className="space-y-2 text-yellow-200 font-light">
          <li>• <strong>Yours Forever:</strong> Once purchased, access your session library anytime</li>
          <li>• <strong>Self-Paced Healing:</strong> Process at your own emotional capacity and timing</li>
          <li>• <strong>Truth-Telling Space:</strong> Safe environment to be completely honest about your grief</li>
          <li>• <strong>Emotional Sovereignty:</strong> Build decision-making strength through your healing journey</li>
          <li>• <strong>Targeted Support:</strong> Specific sessions for your exact grief pattern and emotions</li>
        </ul>
      </div>
    </div>
  );
}
