
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HomeNav from "@/components/home/HomeNav";
import { Play, Clock, User, Heart, BookOpen } from "lucide-react";

const MasterclassLibrary = () => {
  const navigate = useNavigate();

  const masterclasses = [
    {
      id: 1,
      title: "Understanding the Stages of Grief",
      instructor: "Dr. Elizabeth Kübler-Ross Foundation",
      duration: "45 min",
      description: "Learn about the natural process of grief and how to navigate each stage with compassion for yourself.",
      level: "Beginner",
      category: "Foundation"
    },
    {
      id: 2,
      title: "Healing Through Creative Expression",
      instructor: "Maria Santos, Art Therapist",
      duration: "35 min", 
      description: "Discover how art, writing, and music can help you process emotions and find new ways to honor your loss.",
      level: "All Levels",
      category: "Healing Arts"
    },
    {
      id: 3,
      title: "Finding Meaning After Loss",
      instructor: "Rev. Michael Thompson",
      duration: "50 min",
      description: "Explore how loss can transform into purpose and how your experience can become a gift to others.",
      level: "Intermediate",
      category: "Spiritual Growth"
    },
    {
      id: 4,
      title: "Supporting Children Through Grief",
      instructor: "Dr. Patricia Williams, Child Psychologist",
      duration: "40 min",
      description: "Learn gentle approaches to help children understand and process loss in age-appropriate ways.",
      level: "Beginner",
      category: "Family Support"
    },
    {
      id: 5,
      title: "Rebuilding Your Identity",
      instructor: "James Chen, LCSW",
      duration: "55 min",
      description: "Navigate the journey of rediscovering who you are after significant loss and change.",
      level: "Advanced",
      category: "Personal Growth"
    },
    {
      id: 6,
      title: "Mindful Grief: Present Moment Healing",
      instructor: "Sarah Kumar, Mindfulness Teacher",
      duration: "30 min",
      description: "Learn meditation and mindfulness practices specifically designed for those in grief.",
      level: "All Levels",
      category: "Mindfulness"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-900/50 text-green-300";
      case "Intermediate": return "bg-yellow-900/50 text-yellow-300";
      case "Advanced": return "bg-red-900/50 text-red-300";
      default: return "bg-blue-900/50 text-blue-300";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Foundation": return "bg-purple-900/50 text-purple-300";
      case "Healing Arts": return "bg-pink-900/50 text-pink-300";
      case "Spiritual Growth": return "bg-indigo-900/50 text-indigo-300";
      case "Family Support": return "bg-teal-900/50 text-teal-300";
      case "Personal Growth": return "bg-orange-900/50 text-orange-300";
      default: return "bg-cyan-900/50 text-cyan-300";
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <HomeNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mb-4 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-yellow-600 mr-3" />
              Healing Library
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Gentle guidance and wisdom for your healing journey
            </p>
            <p className="text-gray-400">
              Learn at your own pace with expert-led sessions on grief, healing, and finding hope
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
                  <CardTitle className="text-white text-lg line-clamp-2">
                    {masterclass.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {masterclass.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-yellow-600" />
                      {masterclass.instructor}
                    </div>
                  </div>
                  
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
