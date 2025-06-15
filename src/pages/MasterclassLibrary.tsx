
import React from "react";
import HomeNav from "@/components/home/HomeNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Play, Clock, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const masterclasses = [
  {
    id: 1,
    title: "Nervous System Mastery Fundamentals",
    description: "Learn the foundational principles of nervous system regulation for peak performance.",
    duration: "45 min",
    level: "Beginner",
    isLocked: false
  },
  {
    id: 2,
    title: "Leadership Under Pressure",
    description: "Master decision-making and leadership skills in high-stress environments.",
    duration: "60 min",
    level: "Intermediate",
    isLocked: false
  },
  {
    id: 3,
    title: "Advanced Emotional Intelligence",
    description: "Develop sophisticated emotional awareness and regulation techniques.",
    duration: "55 min",
    level: "Advanced",
    isLocked: true
  },
  {
    id: 4,
    title: "Strategic Communication Mastery",
    description: "Advanced communication frameworks for influential leadership.",
    duration: "50 min",
    level: "Advanced",
    isLocked: true
  }
];

export default function MasterclassLibrary() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      <HomeNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <BookOpen className="h-8 w-8 text-yellow-600 mr-3" />
              Masterclass Library
            </h1>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
            >
              Back to Dashboard
            </Button>
          </div>

          <p className="text-gray-300 mb-8">
            Dive deep into leadership development and nervous system mastery with our comprehensive masterclass collection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {masterclasses.map((masterclass) => (
              <Card key={masterclass.id} className="bg-slate-800/50 border-slate-700 hover:border-yellow-600/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>{masterclass.title}</span>
                    {masterclass.isLocked && <Lock className="h-5 w-5 text-yellow-600" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{masterclass.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {masterclass.duration}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      masterclass.level === 'Beginner' ? 'bg-green-900/50 text-green-300' :
                      masterclass.level === 'Intermediate' ? 'bg-yellow-900/50 text-yellow-300' :
                      'bg-red-900/50 text-red-300'
                    }`}>
                      {masterclass.level}
                    </span>
                  </div>

                  <Button 
                    className={`w-full ${
                      masterclass.isLocked 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-yellow-600 hover:bg-yellow-700 text-white'
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
        </div>
      </div>
    </div>
  );
}
