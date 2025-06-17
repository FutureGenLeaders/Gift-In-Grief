
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HomeNav from "@/components/home/HomeNav";
import { Play, Clock, Heart, BookOpen } from "lucide-react";

const MasterclassLibrary = () => {
  const navigate = useNavigate();

  const masterclasses = [
    {
      id: 1,
      title: "Understanding the Stages of Grief",
      duration: "45 min",
      description: "Journey through the natural process of grief with someone who has walked this path. Learn to navigate each stage with compassion for yourself.",
      level: "Foundation",
      category: "Core Healing"
    },
    {
      id: 2,
      title: "Healing Through Creative Expression",
      duration: "35 min", 
      description: "Discover how art, writing, and music became my lifelines. Learn how creative expression can help you process emotions and honor your loss.",
      level: "Practical Tools",
      category: "Healing Arts"
    },
    {
      id: 3,
      title: "Finding Your Gift in Grief",
      duration: "50 min",
      description: "My personal journey of how devastating loss transformed into purpose. Learn how your experience can become your greatest gift to others.",
      level: "Advanced Integration",
      category: "Transformation"
    },
    {
      id: 4,
      title: "Supporting Your Inner Child Through Loss",
      duration: "40 min",
      description: "Gentle approaches I learned for healing the wounded child within during grief. Honor all parts of yourself in this process.",
      level: "Deep Healing",
      category: "Inner Work"
    },
    {
      id: 5,
      title: "Rebuilding Your Identity After Loss",
      duration: "55 min",
      description: "Navigate the journey of rediscovering who you are after significant loss. My personal process of identity reconstruction.",
      level: "Advanced Integration",
      category: "Personal Growth"
    },
    {
      id: 6,
      title: "Sacred Presence in Grief",
      duration: "30 min",
      description: "Mindfulness and presence practices that held me during my darkest moments. Learn to be with your grief without being consumed by it.",
      level: "Foundation",
      category: "Mindfulness"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Foundation": return "bg-green-900/50 text-green-300";
      case "Practical Tools": return "bg-blue-900/50 text-blue-300";
      case "Deep Healing": return "bg-purple-900/50 text-purple-300";
      case "Advanced Integration": return "bg-yellow-900/50 text-yellow-300";
      default: return "bg-gray-900/50 text-gray-300";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Core Healing": return "bg-red-900/50 text-red-300";
      case "Healing Arts": return "bg-pink-900/50 text-pink-300";
      case "Transformation": return "bg-orange-900/50 text-orange-300";
      case "Inner Work": return "bg-indigo-900/50 text-indigo-300";
      case "Personal Growth": return "bg-teal-900/50 text-teal-300";
      default: return "bg-cyan-900/50 text-cyan-300";
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <HomeNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mb-4 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-yellow-600 mr-3" />
              Healing Library
            </h1>
            <p className="text-gray-300 text-lg mb-6 font-light">
              Wisdom from my personal journey through grief and transformation
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              These sessions are born from my lived experience of finding the gift in grief. 
              Each one offers authentic guidance from someone who has walked this path and found healing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {masterclasses.map((masterclass) => (
              <Card key={masterclass.id} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-2">
                      <Badge className={getCategoryColor(masterclass.category)}>
                        {masterclass.category}
                      </Badge>
                      <Badge className={getLevelColor(masterclass.level)}>
                        {masterclass.level}
                      </Badge>
                    </div>
                    <Heart className="h-5 w-5 text-yellow-600" />
                  </div>
                  <CardTitle className="text-white text-lg line-clamp-2 font-light">
                    {masterclass.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
                    {masterclass.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="h-4 w-4 mr-1 text-yellow-600" />
                      {masterclass.duration}
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white"
                      size="sm"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
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
    </div>
  );
};

export default MasterclassLibrary;
