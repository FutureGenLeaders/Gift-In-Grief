
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Compass, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MindfulnessSessionsSection() {
  const navigate = useNavigate();

  const sessions = [
    {
      id: "loneliness-loved-one",
      title: "Loneliness After Loss of Loved One",
      duration: "85 minutes",
      description: "Self-guided journey through isolation and disconnection when processing the death of someone dear. Learn to transform loneliness into connection with deeper meaning.",
      icon: Heart,
      price: "$29"
    },
    {
      id: "anger-relationship",
      title: "Anger in Relationship Loss",
      duration: "85 minutes", 
      description: "Process rage, resentment, and disappointment when relationships end. Transform anger into personal empowerment and emotional sovereignty.",
      icon: Brain,
      price: "$29"
    },
    {
      id: "despair-identity",
      title: "Despair When Identity Shifts",
      duration: "85 minutes",
      description: "Navigate the darkness of not knowing who you are anymore. Find hope and rebuild identity through conscious grief work.",
      icon: Compass,
      price: "$29"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-light text-white mb-4 flex items-center justify-center">
          <Brain className="h-6 w-6 text-yellow-600 mr-2" />
          Mindfulness Mentoring Sessions
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          Self-guided emotional intelligence sessions that teach you to work through your emotions consciously. 
          Each session combines specific grief work with mindfulness practices to develop emotional sovereignty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessions.map((session) => {
          const IconComponent = session.icon;
          return (
            <Card key={session.id} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="h-6 w-6 text-yellow-600" />
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {session.duration}
                  </div>
                </div>
                <CardTitle className="text-white text-lg font-light">{session.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  {session.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-600 font-medium">{session.price}</span>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white font-light"
                    onClick={() => navigate("/masterclass")}
                  >
                    Start Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button
          onClick={() => navigate("/masterclass")}
          variant="outline"
          className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 font-light"
        >
          View All Sessions
        </Button>
      </div>
    </div>
  );
}
