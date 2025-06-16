
import React from "react";
import HomeNav from "@/components/home/HomeNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Play, Clock, Lock, Star, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const masterclasses = [
  {
    id: 1,
    title: "Nervous System Mastery Fundamentals",
    description: "Master the foundational principles of nervous system regulation for peak performance and emotional resilience in leadership.",
    duration: "45 min",
    level: "Beginner",
    isLocked: false,
    instructor: "Dr. Sarah Chen",
    rating: 4.9,
    students: 1250,
    preview: "Learn the science behind nervous system states and how they impact your leadership effectiveness.",
    topics: ["Polyvagal Theory", "Stress Response", "Regulation Techniques", "Leadership Applications"]
  },
  {
    id: 2,
    title: "Leadership Under Pressure",
    description: "Develop unshakeable leadership skills for high-stress environments through nervous system mastery.",
    duration: "60 min",
    level: "Intermediate",
    isLocked: false,
    instructor: "Marcus Thompson",
    rating: 4.8,
    students: 980,
    preview: "Transform pressure into performance with advanced nervous system regulation strategies.",
    topics: ["Pressure Response", "Decision Making", "Team Leadership", "Crisis Management"]
  },
  {
    id: 3,
    title: "Advanced Emotional Intelligence",
    description: "Master sophisticated emotional awareness and regulation techniques for exceptional leadership.",
    duration: "55 min",
    level: "Advanced",
    isLocked: true,
    instructor: "Dr. Elena Rodriguez",
    rating: 4.9,
    students: 750,
    preview: "Unlock the highest levels of emotional intelligence through nervous system optimization.",
    topics: ["Emotional Mapping", "Advanced Regulation", "Empathetic Leadership", "Influence Mastery"]
  },
  {
    id: 4,
    title: "Strategic Communication Mastery",
    description: "Learn advanced communication frameworks that leverage nervous system states for maximum influence.",
    duration: "50 min",
    level: "Advanced",
    isLocked: true,
    instructor: "James Morrison",
    rating: 4.7,
    students: 620,
    preview: "Master the art of influential communication through nervous system awareness.",
    topics: ["Communication States", "Influence Patterns", "Persuasion Ethics", "Leadership Presence"]
  },
  {
    id: 5,
    title: "Building Resilient Teams",
    description: "Create psychologically safe and high-performing teams through collective nervous system regulation.",
    duration: "65 min",
    level: "Intermediate",
    isLocked: false,
    instructor: "Dr. Michael Park",
    rating: 4.8,
    students: 890,
    preview: "Build teams that thrive under pressure and maintain peak performance.",
    topics: ["Team Dynamics", "Collective Regulation", "Psychological Safety", "Performance Optimization"]
  },
  {
    id: 6,
    title: "Trauma-Informed Leadership",
    description: "Lead with wisdom and compassion by understanding trauma's impact on nervous systems.",
    duration: "70 min",
    level: "Advanced",
    isLocked: true,
    instructor: "Dr. Rachel Kim",
    rating: 4.9,
    students: 540,
    preview: "Develop trauma-informed leadership approaches that heal and empower.",
    topics: ["Trauma Understanding", "Healing Leadership", "Safe Environments", "Recovery Support"]
  }
];

export default function MasterclassLibrary() {
  const navigate = useNavigate();

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-900/50 text-green-300';
      case 'Intermediate': return 'bg-yellow-900/50 text-yellow-300';
      case 'Advanced': return 'bg-red-900/50 text-red-300';
      default: return 'bg-gray-900/50 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <HomeNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mb-4 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-yellow-600 mr-3" />
              Masterclass Library
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Comprehensive training in leadership development and nervous system mastery
            </p>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="pt-6">
                <BookOpen className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{masterclasses.length}</p>
                <p className="text-gray-400 text-sm">Masterclasses</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">5,000+</p>
                <p className="text-gray-400 text-sm">Students</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700 text-center">
              <CardContent className="pt-6">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">4.8</p>
                <p className="text-gray-400 text-sm">Average Rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Masterclasses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {masterclasses.map((masterclass) => (
              <Card key={masterclass.id} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-white text-xl leading-tight">
                      {masterclass.title}
                    </CardTitle>
                    {masterclass.isLocked && <Lock className="h-5 w-5 text-yellow-600 flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getLevelColor(masterclass.level)}>
                      {masterclass.level}
                    </Badge>
                    <div className="flex items-center text-yellow-600 text-sm">
                      <Star className="h-4 w-4 mr-1" />
                      {masterclass.rating}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      {masterclass.students}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{masterclass.description}</p>
                  
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-gray-300 text-sm italic">"{masterclass.preview}"</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {masterclass.duration}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {masterclass.instructor}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white">What you'll learn:</p>
                    <div className="flex flex-wrap gap-2">
                      {masterclass.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${
                      masterclass.isLocked 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white'
                    }`}
                    disabled={masterclass.isLocked}
                  >
                    {masterclass.isLocked ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Upgrade to Access
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Masterclass
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upgrade CTA */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-yellow-600/10 to-red-700/10 border-yellow-600/50 max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-white mb-4">Unlock All Masterclasses</h3>
                <p className="text-gray-300 mb-6">
                  Get unlimited access to our complete library of advanced leadership and nervous system mastery content.
                </p>
                <Button 
                  onClick={() => navigate("/subscribe")}
                  className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white px-8 py-3"
                >
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
