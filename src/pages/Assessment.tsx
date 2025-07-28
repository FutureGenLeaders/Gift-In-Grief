
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import HomeNav from "@/components/home/HomeNav";
import { Heart, ArrowLeft, ArrowRight, Shield, Compass } from "lucide-react";

const Assessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Get the original destination from location state
  const originalDestination = location.state?.from?.pathname || "/subscribe";

  const questions = [
    {
      question: "What type of loss are you currently experiencing or have experienced?",
      options: [
        "Loss of a loved one (death)",
        "Relationship ending or divorce", 
        "Job loss or career transition",
        "Health challenges or chronic illness",
        "Loss of dreams, goals, or future plans",
        "Loss of identity or sense of self",
        "Loss of security or safety",
        "Loss of faith or spiritual beliefs",
        "Multiple losses happening at once"
      ]
    },
    {
      question: "How long ago did this primary loss occur?",
      options: [
        "Within the last month",
        "1-6 months ago",
        "6 months to 1 year ago", 
        "1-2 years ago",
        "More than 2 years ago",
        "It's an ongoing or recent loss"
      ]
    },
    {
      question: "Which emotion feels most prominent in your grief experience right now?",
      options: [
        "Loneliness - feeling isolated and disconnected",
        "Anger - rage, resentment, or frustration",
        "Despair - hopelessness and darkness",
        "Fear - anxiety about the future or more loss",
        "Guilt - self-blame or regret",
        "Shame - feeling fundamentally flawed",
        "Sadness - deep sorrow and heartbreak",
        "Overwhelm - too much to process",
        "Numbness - feeling disconnected from emotions"
      ]
    },
    {
      question: "How would you describe your current emotional capacity?",
      options: [
        "Barely surviving - struggling with basic daily tasks",
        "Functioning but depleted - managing basics but emotionally drained",
        "Having ups and downs - some good days, some difficult ones",
        "Slowly finding stability - building emotional resilience",
        "Feeling stronger - ready to do deeper healing work",
        "Transforming pain into wisdom - wanting to help others heal"
      ]
    },
    {
      question: "What approach to healing resonates most with you?",
      options: [
        "Self-guided emotional work - processing at my own pace",
        "Learning emotional intelligence and self-awareness",
        "Understanding grief through mindfulness and consciousness",
        "Taking complete responsibility for my healing journey",
        "Connecting with others who understand this experience",
        "Integrating spiritual practices with emotional healing"
      ]
    },
    {
      question: "How do you prefer to approach difficult emotions?",
      options: [
        "I want to understand them deeply and learn from them",
        "I need gentle guidance and support to process them",
        "I prefer to work through them privately and independently", 
        "I want to transform them into wisdom and strength",
        "I need help developing better emotional regulation skills",
        "I want to honor them as part of my healing journey"
      ]
    },
    {
      question: "What would emotional sovereignty mean to you in your healing?",
      options: [
        "Taking complete responsibility for my emotional well-being",
        "Learning to be with difficult emotions without being overwhelmed",
        "No longer depending on others to regulate my emotions",
        "Understanding how my emotions influence my decisions and life",
        "Developing the capacity to heal and transform independently",
        "Becoming emotionally resilient and self-aware"
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
    const lossType = answers[0];
    const timeframe = answers[1]; 
    const primaryEmotion = answers[2];
    const capacity = answers[3];

    return {
      title: "Your Personalized Grief & Emotional Healing Path",
      philosophy: "You are entering an era of emotional sovereignty - taking complete responsibility for your healing journey while honoring your unique grief experience. True transformation comes through understanding yourself deeply and developing the capacity to be with difficult emotions without being destroyed by them.",
      assessment: {
        lossType: lossType?.split(' - ')[0] || "Multiple types of loss",
        primaryEmotion: primaryEmotion?.split(' - ')[0] || "Complex emotions",
        capacity: capacity?.split(' - ')[0] || "Building resilience",
        timeframe: timeframe || "Recent experience"
      },
      recommendations: [
        "Your healing journey is unique - there is no timeline or 'right way' to grieve",
        "Developing emotional sovereignty means learning to be with difficult emotions without being overwhelmed by them",
        "True healing comes from within - you have the capacity to transform your pain into wisdom and strength",
        "Grief is not pathology to be fixed but sacred transformation that leads to profound growth",
        "Taking responsibility for your healing doesn't mean doing it alone - seek appropriate support while maintaining your inner authority"
      ]
    };
  };

  if (showResults) {
    const guidance = getPersonalizedGuidance();
    
    return (
      <div className="min-h-screen bg-black">
        <HomeNav />
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Compass className="h-12 w-12 text-yellow-600" />
                </div>
                <CardTitle className="text-white text-2xl mb-4 font-light">
                  {guidance.title}
                </CardTitle>
                <div className="bg-gradient-to-r from-yellow-900/20 to-red-900/20 border border-yellow-700/30 rounded-lg p-4 mb-6">
                  <p className="text-yellow-200 font-light leading-relaxed italic">
                    {guidance.philosophy}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Assessment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-yellow-600 font-medium mb-2">Primary Loss Experience</h4>
                    <p className="text-gray-300 font-light">{guidance.assessment.lossType}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-yellow-600 font-medium mb-2">Dominant Emotion</h4>
                    <p className="text-gray-300 font-light">{guidance.assessment.primaryEmotion}</p>
                  </div>
                </div>

                {/* Personalized Recommendations */}
                <div>
                  <h3 className="text-yellow-600 font-medium mb-4 text-lg flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Your Emotional Sovereignty Journey
                  </h3>
                  <ul className="space-y-3">
                    {guidance.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-gray-300 font-light leading-relaxed">
                        <Heart className="h-4 w-4 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Call to Action - Fixed to redirect to trial signup */}
                <div className="space-y-4">
                  <h3 className="text-yellow-600 font-medium mb-4 text-lg">Begin Your Transformation Journey</h3>
                  <Button
                    className="w-full text-left justify-center bg-gradient-to-r from-yellow-600 to-red-700 hover:from-yellow-700 hover:to-red-800 text-white font-light py-6 text-lg"
                    onClick={() => {
                      if (user) {
                        // User is logged in, go to original destination
                        navigate(originalDestination);
                      } else {
                        // User not logged in, go to auth with original destination
                        navigate("/auth", { state: { from: { pathname: originalDestination } } });
                      }
                    }}
                  >
                    <Heart className="h-5 w-5 mr-3" />
                    Start Your 2-Week Free Trial - Experience the Healing Magic
                  </Button>
                  <p className="text-center text-gray-400 text-sm">
                    No payment required • Cancel anytime • Full access to all healing sessions
                  </p>
                </div>

                {/* Crisis Support Notice */}
                <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
                  <h4 className="text-red-300 font-medium mb-2">Need Immediate Support?</h4>
                  <p className="text-red-200 text-sm font-light leading-relaxed">
                    If you're having thoughts of self-harm, please reach out immediately: 
                    National Suicide Prevention Lifeline: 988 or 1-800-273-8255
                  </p>
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
              Comprehensive Grief & Emotional Healing Assessment
            </h1>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              Discover your unique grief pattern and receive personalized guidance for your emotional sovereignty journey
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
                  {currentQuestion === questions.length - 1 ? "Get Your Personalized Path" : "Next"}
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
