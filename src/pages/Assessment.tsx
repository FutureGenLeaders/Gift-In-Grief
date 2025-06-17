
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import HomeNav from "@/components/home/HomeNav";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Assessment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What type of loss are you currently experiencing?",
      options: [
        "Loss of a loved one",
        "Relationship ending",
        "Job or career change", 
        "Health challenges",
        "Loss of dreams or goals",
        "Multiple losses"
      ]
    },
    {
      question: "How long ago did this loss occur?",
      options: [
        "Within the last month",
        "1-6 months ago",
        "6 months to 1 year ago",
        "1-2 years ago",
        "More than 2 years ago",
        "It's ongoing"
      ]
    },
    {
      question: "How would you describe your current emotional state?",
      options: [
        "Overwhelmed and struggling daily",
        "Sad but managing basic tasks",
        "Having good and bad days",
        "Slowly finding moments of peace",
        "Feeling stronger but still healing",
        "Ready to help others on their journey"
      ]
    },
    {
      question: "What kind of support resonates with you?",
      options: [
        "Connecting with others who understand",
        "Learning from someone who's walked this path",
        "Self-guided healing at my own pace",
        "Spiritual and mindfulness practices",
        "Creative expression and journaling",
        "I prefer to heal privately and independently"
      ]
    },
    {
      question: "What brings you the most comfort right now?",
      options: [
        "Quiet time for reflection",
        "Sharing with understanding people",
        "Creative expression",
        "Nature and movement",
        "Spiritual practices and meditation",
        "Taking action to help others"
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getPersonalizedGuidance = () => {
    return {
      title: "Your Unique Healing Path",
      description: "Based on your responses, here's guidance tailored to your journey. Remember, there's no right or wrong way to grieve - only your way.",
      recommendations: [
        "Honor your feelings exactly as they are - there's no timeline for healing",
        "Trust your inner wisdom about what support feels right for you", 
        "Remember that healing isn't linear - some days will be harder than others",
        "Consider our mindfulness mentoring sessions for private, self-guided support",
        "Join our community when you feel ready - no pressure, only invitation"
      ],
      nextSteps: [
        "Start your 2-week free trial to experience the healing magic",
        "Browse mindfulness mentoring sessions for personalized support",
        "Explore our weekly healing library when you're ready"
      ]
    };
  };

  if (showResults) {
    const guidance = getPersonalizedGuidance();
    
    return (
      <div className="min-h-screen bg-black">
        <HomeNav />
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Heart className="h-12 w-12 text-yellow-600" />
                </div>
                <CardTitle className="text-white text-2xl mb-2 font-light">
                  {guidance.title}
                </CardTitle>
                <p className="text-gray-300 font-light leading-relaxed">{guidance.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-yellow-600 font-medium mb-4 text-lg">Your Personalized Guidance:</h3>
                  <ul className="space-y-3">
                    {guidance.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-gray-300 font-light leading-relaxed">
                        <Heart className="h-4 w-4 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-yellow-600 font-medium mb-4 text-lg">Choose Your Next Step:</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start border-yellow-600/50 text-yellow-600 hover:bg-yellow-600/10 font-light py-6"
                      onClick={() => navigate("/subscribe")}
                    >
                      {guidance.nextSteps[0]}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start border-yellow-600/50 text-yellow-600 hover:bg-yellow-600/10 font-light py-6"
                      onClick={() => navigate("/")}
                    >
                      {guidance.nextSteps[1]}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-left justify-start border-yellow-600/50 text-yellow-600 hover:bg-yellow-600/10 font-light py-6"
                      onClick={() => navigate("/masterclass")}
                    >
                      {guidance.nextSteps[2]}
                    </Button>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Button
                    onClick={() => navigate("/subscribe")}
                    className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white font-light px-8 py-3"
                  >
                    Start Your 2-Week Free Trial
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <HomeNav />
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mb-4">
              Grief Assessment
            </h1>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              Help us understand where you are in your unique healing journey
            </p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <span className="text-yellow-600 text-sm font-light">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <Heart className="h-5 w-5 text-yellow-600" />
              </div>
              <Progress 
                value={((currentQuestion + 1) / questions.length) * 100} 
                className="mb-4"
              />
              <CardTitle className="text-white text-xl font-light leading-relaxed">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswer}
                className="space-y-4"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={option} 
                      id={`option-${index}`}
                      className="border-yellow-600 text-yellow-600"
                    />
                    <Label 
                      htmlFor={`option-${index}`}
                      className="text-gray-300 cursor-pointer flex-grow font-light leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between pt-6">
                <Button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 font-light"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion]}
                  className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white font-light"
                >
                  {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
