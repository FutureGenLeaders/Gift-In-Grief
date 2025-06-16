
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
      question: "What support do you currently have?",
      options: [
        "Very little support",
        "Some family or friends",
        "Strong support system",
        "Professional counseling",
        "Support groups",
        "I prefer to handle things alone"
      ]
    },
    {
      question: "What brings you the most comfort right now?",
      options: [
        "Quiet time alone",
        "Connecting with others",
        "Creative expression",
        "Nature and movement",
        "Spiritual practices",
        "Helping others"
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
      title: "Your Healing Path",
      description: "Based on your responses, here's what we recommend for your journey:",
      recommendations: [
        "Start with daily gentle check-ins to honor your feelings",
        "Consider joining our grief circles for community support", 
        "Explore creative expression as a way to process emotions",
        "Practice mindful breathing when overwhelmed",
        "Remember that healing isn't linear - be patient with yourself"
      ],
      nextSteps: [
        "Join our daily practices for gentle guidance",
        "Book a one-on-one session with a grief counselor",
        "Connect with others in our community space"
      ]
    };
  };

  if (showResults) {
    const guidance = getPersonalizedGuidance();
    
    return (
      <div className="min-h-screen bg-black">
        <HomeNav />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Heart className="h-12 w-12 text-yellow-600" />
                </div>
                <CardTitle className="text-white text-2xl mb-2">
                  {guidance.title}
                </CardTitle>
                <p className="text-gray-300">{guidance.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-yellow-600 font-semibold mb-3">Recommended Practices:</h3>
                  <ul className="space-y-2">
                    {guidance.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <Heart className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-yellow-600 font-semibold mb-3">Next Steps:</h3>
                  <div className="space-y-3">
                    {guidance.nextSteps.map((step, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start border-yellow-600/50 text-yellow-600 hover:bg-yellow-600/10"
                        onClick={() => {
                          if (index === 0) navigate("/");
                          if (index === 1) navigate("/sessions");
                          if (index === 2) navigate("/community");
                        }}
                      >
                        {step}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button
                    onClick={() => navigate("/")}
                    className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white"
                  >
                    Begin Your Healing Journey
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-700 bg-clip-text text-transparent mb-4">
              Grief Assessment
            </h1>
            <p className="text-gray-300 text-lg">
              Help us understand where you are in your healing journey
            </p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <span className="text-yellow-600 text-sm">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <Heart className="h-5 w-5 text-yellow-600" />
              </div>
              <Progress 
                value={((currentQuestion + 1) / questions.length) * 100} 
                className="mb-4"
              />
              <CardTitle className="text-white text-xl">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={option} 
                      id={`option-${index}`}
                      className="border-yellow-600 text-yellow-600"
                    />
                    <Label 
                      htmlFor={`option-${index}`}
                      className="text-gray-300 cursor-pointer flex-grow"
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
                  className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion]}
                  className="bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white"
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
